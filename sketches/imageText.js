const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
	dimensions: [ 1080, 1080 ],
  //animate : true  
};

let manager,img;
let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
	const cell = 5;
	const cols = Math.floor(width  / cell);
	const rows = Math.floor(height / cell);
	const numCells = cols * rows;

	typeCanvas.width  = cols;
	typeCanvas.height = rows;

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'white';
		typeContext.fillRect(0, 0, cols, rows);
    typeContext.drawImage(img, 0, 0, cols, rows);
    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

		fontSize = cols * 1.3;
    

		context.fillStyle = 'black';
		context.fillRect(0, 0, width, height);
		
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		
		//Little letter
		//context.drawImage(typeCanvas, 0, 0);

		for (let i = 0; i < numCells; i++) {
			const col = i%cols;
			const row = Math.floor(i/cols);

			const x = col * cell;
			const y = row * cell;
			
			//RGBA Value
			const r = typeData[i*4+0];
			const g = typeData[i*4+1];
			const b = typeData[i*4+2];
			const a = typeData[i*4+3];	
      const num = r+g+b;
			const glyph = getGlyph(num);
			context.font = `${15 }px ${fontFamily}`;
			//if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

			//context.fillStyle = `rgba(${r},${g},${b}`;
			context.fillStyle = 'white';

			context.save();
			context.translate(x,y);
			context.translate(cell*0.5, cell*0.5);
			//context.fillRect(0,0,cell,cell);
			
			//circle
			/*
			context.beginPath();
			context.arc(cell*0.5, cell*0.5, cell*0.5, 0, Math.PI*2);
			context.fill();
			*/


			context.fillText(glyph,0,0)
			context.restore();
		
		}

	};
};

const getGlyph = (v) => {
  const glyphs = '_= /'.split('');
	if (v < 50) return random.pick(glyphs);;
	return '';
};


const onKeyUp = (e) => {
	text = e.key.toUpperCase();
	manager.render();
};

document.addEventListener('keyup', onKeyUp);

//const url = './compu.gif';
const url = './github.png';

const loadMeSomeImage = (url) => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject();
		img.src = url;
	});
};

const start = async () => {
  img = await loadMeSomeImage(url);
	console.log('image width', img.width);
	console.log('this line');
	manager = await canvasSketch(sketch, settings);
};

start();


