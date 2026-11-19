import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { delimiter } from 'node:path';

const { build } = createRequire(import.meta.url)('esbuild');
await build({
  absWorkingDir: fileURLToPath(new URL('.', import.meta.url)),
  entryPoints: ['mount.tsx'],
  nodePaths: process.env.NODE_PATH?.split(delimiter),
  outfile: '../../color-studio/vehicle-renderer.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'eof',
  banner: { js: '/*! Third-party license notices: ./vehicle-licenses.txt */' },
});
