import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import buble from 'rollup-plugin-buble';

export default {
	entry: 'index.js',
	plugins: [ 
        json({
            include: './package.json', 
            exclude: [  ]
        }),
        nodeResolve({
            skip: [ 'gm', 'minimatch' ],
            jsnext: true
        }),
        buble() 
    ]
};