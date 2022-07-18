import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const deps = Object.keys(pkg.dependencies);
const vue = require('rollup-plugin-vue');

export default [
  {
    input: path.resolve(__dirname, 'packages/index.ts'),
    output: [
      {
        format: 'es',
        file: pkg.module,
      },
      {
        name: 'EmojiReaction',
        format: 'umd',
        file: pkg.main,
        exports: 'named',
        globals: {
          vue: 'Vue',
          'leancloud-storage': 'AV',
          uuid: 'uuid',
        },
      },
    ],
    plugins: [
      resolve(),
      vue(),
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: true,
          },
          include: [
            'packages/**/*',
            'typings/shims-vue.d.ts',
          ],
          exclude: [
            'node_modules',
          ],
        },
        abortOnError: false,
      }),
      postcss({
        plugins: [autoprefixer],
        inject: true,
        // extract: true,
        minimize: true,
        sourceMap: false,
        extensions: ['.css'],
      }),
      terser(),
    ],
    external(id) {
      return /^vue/.test(id)
        || deps.some((k) => new RegExp(`^${k}`).test(id));
    },
  },
];
