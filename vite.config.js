import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// ----------------------------------------------------------------

import { viteStaticCopy } from 'vite-plugin-static-copy';

const base = './node_modules/@mediapipe/tasks-vision/wasm'; // remove cdn and allow game without internet
const easm = (base) => ({ src: `${base}/vision_wasm_internal.wasm`, dest: './mediapipe-wasm' });
const ejs = (base) => ({ src: `${base}/vision_wasm_internal.js`, dest: './mediapipe-wasm' });
const nasm = (base) => ({ src: `${base}/vision_wasm_nosimd_internal.wasm`, dest: './mediapipe-wasm' });
const njs = (base) => ({ src: `${base}/vision_wasm_nosimd_internal.js`, dest: './mediapipe-wasm' });
const copy = () => viteStaticCopy({ targets: [easm(base), ejs(base), nasm(base), njs(base)] });

// ----------------------------------------------------------------

import { fileURLToPath, URL } from 'node:url';

const linker = (key, value) => ({ [key]: fileURLToPath(new URL(value, import.meta.url)) });
const components = linker('components', './src/components'); // create alias for components directory
const views = linker('views', './src/views'); // create alias for views directory
const router = linker('router', './src/router'); // create alias for router directory
const stores = linker('stores', './src/stores'); // create alias for stores directory
const alias = () => ({ ...linker('@', './src'), ...components, ...views, ...router, ...stores });

// ----------------------------------------------------------------

export default defineConfig({ base: './', plugins: [vue(), copy()], resolve: { alias: alias() } });
