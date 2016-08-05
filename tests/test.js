

import * as PNG from './test.png'
import * as JPEG from './test.jpg'
import * as SVG from './test.svg'
import * as CASE from './case.PNG'
import * as SVGALT from './test-alt.svg'
import * as WEBP from './test.webp'

[
    { test: 'WEBP', data: WEBP  },
    { test: 'PNG', data: PNG    },
    { test: 'JPEG', data: JPEG  },
    { test: 'SVG', data: SVG    },
    { test: 'CASE', data: CASE  },  
    { test: 'SVG ALTERNATIVE', data: SVGALT  }  
].forEach(c => {
    let test = c.test;
    let data = c.data;

    if (data.base64 == null) throw new Error(`No data from ${test}`);

    if (data.format != null) {
        if (data.width != 42) throw new Error(`Incorrect width from ${test} (${data.width})`);
        if (data.height != 24) throw new Error(`Incorrect height from ${test} (${data.height})`);
    }
});
