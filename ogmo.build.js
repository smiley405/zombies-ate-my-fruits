/**
 * Extract only the essential json's data from ogmo's exported json file.
 * See media/ogmo/level*.json & media/level*.js to compare the difference.
 */

import fs from 'fs-extra';
import { glob } from 'glob';

const dir = './media/';
const files = await glob('./ogmo/*.json');

console.log(files);

const discard = [
	'ogmoVersion',
	'offsetX',
	'offsetY',
	'_eid',
	'gridCellsX',
	'gridCellsY',
	'gridCellWidth',
	'gridCellHeight',
	'exportMode',
	'arrayMode',
	'originX',
	'originY',
];

/**
 * @param {{}[]} fromArr
 * @param {{}[]} toArr
 */
const mergeSelectiveArrayObjects = (fromArr, toArr) => {
	fromArr.forEach((obj, i) => {
		const toObj = toArr[i] = {};

		for (let okey in obj) {
			if (discard.includes(okey)) {
				continue;
			}

			const objData = obj[okey];
			// prevent mutation
			toObj[okey] = JSON.parse(JSON.stringify(objData)); 
		}
	});
};

// trim only the required data from json file
for (let i = 0; i < files.length; i++) {
	const file = files[i];
	const fileName = file.replace(/^.*[\\/]/, '')
		.replace('.json', 'Data')
		.concat('.js');

	const fileNameId = fileName.split('.')[0];

	console.log('file-json:', file);

	/**
	 * @type {object}
	 */
	let jsonObj = await fs.readJson(file);
	/**
	 * @type {{}[]}
	 */
	let layers = jsonObj.layers;

	layers = jsonObj.layers.filter((/** @type {{}} */val) => {
		// disard layer with an empty entities
		if (val['entities']) {
			return val['entities'].length;
		}
		return val;
	});

	/**
	 * @type {{}[]}
	 */
	const outLayers = [];

	mergeSelectiveArrayObjects(layers, outLayers);

	// if (layers.length) {
	// 	outObj['gridCellsX'] = layers[0]['gridCellsX'];
	// 	outObj['gridCellsY'] = layers[0]['gridCellsY'];
	// }

	layers.forEach((layer, i) => {
		// entities
		const ekey = 'entities';
		if (layer[ekey]) {
			/**
			 * @type {{}[]}
			 */
			const entities = layer[ekey];

			/**
			 * @type {{}[]}
			 */
			const outEntities = outLayers[i][ekey] = [];

			mergeSelectiveArrayObjects(entities, outEntities);

		}
	});

	const outText = `export const ${fileNameId.toUpperCase()} = ${JSON.stringify(outLayers, null, 4)};`; 
	const outFile = `${dir}${fileName}`;

	fs.writeFile(outFile, outText, function (err) {
		if (err) return console.log(err);
		console.log('file-js:', outFile);
		console.log('Successfully converted Ogmo\'s JSON data to trimmed js version');
	});
}

