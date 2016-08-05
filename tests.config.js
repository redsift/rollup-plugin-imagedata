import { image } from './distribution/rollup-plugin-imagedata.js';
import buble from 'rollup-plugin-buble';

export default {
	entry: './tests/test.js',
	plugins: [ 
        image(),
        buble() 
    ]
};