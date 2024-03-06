import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/index.vue',
  output: {
    format: 'esm',
    file: 'dist/index.js'
  },
  plugins: [
    vue(),
    typescript(),
    terser()
  ]
};
