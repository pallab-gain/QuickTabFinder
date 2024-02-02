import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';


const popupScript = {
    input: 'src/popupscript.ts',
    output: [
        {
            file: 'extension/popupscript.js',
            format: 'umd',
            name: 'QuickTabFinder',
            sourcemap: false
        }
    ],
    plugins: [
        typescript(),
        terser({
            mangle: {
                keep_fnames: true, // Prevents renaming of function names
                keep_classnames: true // Prevents renaming of class names (if applicable)
            },
            compress: false,
            format: {
                beautify: true,
            }
        }),
    ]
};

export default [popupScript];
