import esbuild from 'esbuild'; 
import fs from 'fs-extra';
import minifyHtml from 'html-minifier-terser';
import path from 'path';
import shell from 'shelljs';
import { zip } from 'zip-a-folder';

const r = (/** @type{string}*/src) => path.resolve(process.cwd(), src);

async function build() {
	const htmlSrc = r('./index.html');
	const htmlOut = r('./out/index.html');

	const cssSrc = r('./css/game.css');

	const mainSrc = r('./src/main.js');
	const outfile = r('./tmp/game.min.js');

	const outDir = r('./out');
	const distDir = r('./dist');
	const zipFile =  r('dist/game.zip');

	let bundle = '';
	console.log('Bundling file in progress..');

	await esbuild
		.build({
			entryPoints: [mainSrc],
			bundle: true,
			outfile, 
			write: false,
			minify: false,
			target: 'es6'
		})
		.then((result) => {
			bundle = result.outputFiles[0].text;
		})
		.catch(() => process.exit(1));

	fs.mkdir(distDir, { recursive: true }, (err) => {
		if (err) throw err;
	});

	const cssFileRawData = await fs.readFile(cssSrc, 'utf8');
	const htmlFileRawData = await fs.readFile(htmlSrc, 'utf8');

	let injectedHtmlFile = htmlFileRawData.replace(/<!--inject-start-css-->[\s\S]*<!--inject-end-css-->/g, `<style>\n${cssFileRawData}</style>`);
	injectedHtmlFile = injectedHtmlFile.replace(/<!--inject-start-js-->[\s\S]*<!--inject-end-js-->/g, `<script>\n${bundle}</script>`);

	const minifiedHtml = await minifyHtml.minify(injectedHtmlFile, {
		minifyCSS: true,
		minifyJS: true,
		collapseWhitespace: true
	});

	await fs.writeFile(htmlOut, minifiedHtml);
	console.log(`***minified file generated at ${htmlOut}***`);

	await zip(outDir, zipFile);
	console.log('...');
	console.log(`zip file to ${zipFile}`);

	// after this use advzip to further recompress //
	// **must have advzip installed globally to use the following command//
	// execute shell command
	const cmd = `advzip -z -4 ${zipFile}`;
	console.log('...');
	console.log(cmd);
	if (shell.exec(cmd).code !== 0) {
		shell.echo('Error: ' + cmd + ' failed');
		shell.exit(1);
	}
	shell.echo('Task completed!!! \n');
}

build();
