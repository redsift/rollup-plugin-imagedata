import { readFileSync } from 'fs';
import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';
import * as gm from 'gm';

const im = gm.subClass({imageMagick: true});

const svgXml = new Buffer('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n');

const whitelist = {
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.webp': 'image/webp',
	'.svg':  'image/svg+xml'
};

function warn(s) {
    // Replace with proper reporting API when available

    /* eslint-disable no-console */
    console.warn(s);
    /* eslint-enable no-console */
}

export default function image(opts = {}) {
    const filter = createFilter(opts.include, opts.exclude);
    const patch = opts.patch || true;
    const ignore = opts.ignoreParsingErrors || false;

    return {
        name: 'imagedata',
        load(img) {
            if (img == null) return null;
            if (filter(img)) {
                let mime = whitelist[extname(img).toLowerCase()];
                if (mime != null) {
                    let file = readFileSync(img);

                    if (mime === whitelist['.svg'] && patch) {
                        // ImageMagick SVG delegate is quite fussy about the XML header
                        if (file[0] !== svgXml[0] || file[1] !== svgXml[1]) {
                            warn(`SVG file ${img} does not include XML header, patching`);
                            file = Buffer.concat([ svgXml, file ]);
                        }
                    }

                    return new Promise(function (ok, ko) {
                        im(file, img).identify(function (err, data) {
                            if (err) {
                                if (ignore) {
                                    data = {
                                        size: {
                                            width: null,
                                            height: null
                                        },
                                        format: null
                                    }
                                    warn(err);
                                } else {
                                    ko(err);
                                    return;
                                }
                            } else {
                                const imMime = data['Mime type'];
                                if (imMime !== undefined) {
                                    mime = imMime;
                                }
                            }
                            const code = `export const width = ${data.size.width};
                                    export const height = ${data.size.height};
                                    export const format = '${data.format}';
                                    export const mime = '${mime}';
                                    export const base64 = 'data:${mime};base64,${file.toString('base64')}';`;
                            ok({ 
                                ast: {
                                    type: 'Program',
                                    sourceType: 'module',
                                    start: 0,
                                    end: null,
                                    body: []
                                }, 
                                code: code, 
                                map: { mappings: '' } 
                            });
                        });
                    });
                }
            }
            return null;
        }
    }
}