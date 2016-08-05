import { readFileSync } from 'fs';
import { extname } from 'path';
import { createFilter } from 'rollup-pluginutils';
import * as gm from 'gm';

const im = gm.subClass({imageMagick: true});

const whitelist = {
	'.jpg':  'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png':  'image/png',
	'.gif':  'image/gif',
	'.webp': 'image/webp',
	'.svg':  'image/svg+xml'
};

export default function image(opts = {}) {
    const filter = createFilter(opts.include, opts.exclude);

    return {
        name: 'imagedata',
        load(img) {
            if (img == null) return null;
            if (filter(img)) {
                let mime = whitelist[extname(img).toLowerCase()];
                if (mime != null) {
                    const file = readFileSync(img);

                    return new Promise(function (ok, ko) {
                        im(file, img).identify(function (err, data) {
                            if (err) {
                                ko(err);
                                return;
                            }

                            const imMime = data['Mime type'];
                            if (imMime !== undefined) {
                                mime = imMime;
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