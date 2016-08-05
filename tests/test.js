

import * as PNG from './test.png'
import * as JPEG from './test.jpg'
import * as WEBP from './test.webp'
import * as SVG from './test.svg'
import * as CASE from './case.PNG'

[
    { test: 'PNG', data: PNG    },
    { test: 'JPEG', data: JPEG  },
    { test: 'WEBP', data: WEBP  },
    { test: 'SVG', data: SVG    },
    { test: 'CASE', data: CASE  },       
].forEach(c => {
    let test = c.test;
    let data = c.data;

    if (data.base64 == null) throw new Error(`No data from ${test}`);
    if (data.width != 42) throw new Error(`Incorrect width from ${test} (${data.width})`);
    if (data.height != 24) throw new Error(`Incorrect height from ${test} (${data.height})`);
    if (data.format == null) throw new Error(`No format from ${test}`);
});
