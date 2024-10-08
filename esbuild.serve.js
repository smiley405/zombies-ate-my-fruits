import esbuild from 'esbuild';
import path from 'path';

const r = (src) => path.resolve(process.cwd(), src);

async function serve() {
	const port = 7000;
	const mainSrc = r('./src/main.js');
	const outfile = r('./game.min.js');

	let ctx = await esbuild.context({
		entryPoints: [mainSrc],
		bundle: true,
		outfile,
		sourcemap: 'inline',
		target: [
			'es2016',
		],
		format: 'esm'
	});

	await ctx.serve({
		port,
		servedir: '.'
	})
		.then(() => {
			console.log('...');
			console.log(`serve running at: http://localhost:${port}`);
		})
		.catch(() => process.exit(1));
}

serve();

