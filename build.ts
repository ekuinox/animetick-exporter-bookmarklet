import path from 'path';
import { build as esbuild, BuildOptions } from 'esbuild';
import { readFile, writeFile, appendFile } from 'fs/promises';

const convert = async () => {
  const codePath = path.join(__dirname, 'out', 'bookmarklet.js');
  const outPath = path.join(__dirname, 'out', 'bookmarklet');
  const code = await readFile(codePath);
  await writeFile(outPath, 'javascript:', { encoding: 'utf-8' });
  await appendFile(outPath, code);
};

const build = async () => {
  const options: BuildOptions = {
    entryPoints: [path.join(__dirname, './src/bookmarklet.ts')],
    outdir: path.join(__dirname, 'out'),
    minify: true,
    bundle: true,
    target: 'chrome58',
  };
  await esbuild(options);
};

(async () => {
  await build();
  await convert();
})();
