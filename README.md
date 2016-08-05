# rollup-plugin-imagedata

[![Circle CI](https://img.shields.io/circleci/project/redsift/rollup-plugin-imagedata.svg?style=flat-square)](https://circleci.com/gh/redsift/rollup-plugin-imagedata)
[![npm](https://img.shields.io/npm/v/@redsift/rollup-plugin-imagedata.svg?style=flat-square)](https://www.npmjs.com/package/@redsift/rollup-plugin-imagedata)
[![MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/redsift/rollup-plugin-imagedata/master/LICENSE)

Import metadata and base64 encoded image content from JPG, PNG, GIF, WEBP and SVG.

## Installation

```bash
npm install --save-dev rollup-plugin-imagedata
```

## Usage

```js
// rollup.config.js
import image from 'rollup-plugin-imagedata';

export default {
  entry: './index.js',
  dest: 'distribution/my-lib.js',
  plugins: [
    image()
  ]
};
```

```js
// use.js
import { width, height, base64 } from './tests/test.png';

console.log(`My image is ${width} pixels wide`);
...

```

Note that base64 makes the images 33% larger than the size on disk.

Tree shaking via rollup will ensure large payloads such as the base64 string will be stripped from the bundle if not imported or used by your code.

## ImageMagick

This plugin relies on having ImageMagick installed and in the path as this tool is used to extract metadata from the images. If you wish to use WebP, ensure your binary has support for the format. You can verify your binary by inspecting the built in delegates.

```bash
$ convert -version
Version: ImageMagick 6.9.3-7 Q16 x86_64 2016-04-13 http://www.imagemagick.org
Copyright: Copyright (C) 1999-2016 ImageMagick Studio LLC
License: http://www.imagemagick.org/script/license.php
Features: Cipher DPC HDRI Modules
Delegates (built-in): bzlib freetype jng jp2 jpeg lcms ltdl lzma png tiff webp xml zlib
```

Tested on OS-X with `ImageMagick-6.9.3-7`

### OS-X & Homebrew

To reinstall imagemagick with WebP support `brew reinstall imagemagick --with-webp`

## Acknowledgements

This plugin is derived from [rollup-plugin-image](https://github.com/rollup/rollup-plugin-image).