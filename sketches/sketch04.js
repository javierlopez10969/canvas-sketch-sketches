const canvasSketch = require('canvas-sketch');
const random  = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate : true
};

const params = {
  cols: 20,
  rows: 10,
  scaleMin: 1,
  scaleMax: 30,
}

const sketch = () => {
  return ({ context, width, height,frame }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
    const numCells = cols * rows;

    //Ancho y alto del canvas
    const gridw = width * 0.8;
    const gridh = height * 0.8;

    //Ancho y alto de cada celda
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    
    //margin de la cuadricula
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let index = 0; index < numCells; index++) {
      //en que fila y columna estoy
      const col = index % cols;
      const row = Math.floor(index / cols);
      //posicion de la celda
      const x = col * cellw + margx + cellw * 0.5;
      const y = row * cellh + margy + cellh * 0.5;
      //Alto y ancho de la celda
      const w = cellw * 0.8;
      const h = cellh * 0.8;
      //Random angle
      const n = random.noise2D(x+frame*30,y,0.001);
      const angle = n * Math.PI * 0.2;
      //Scale o line
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);
      context.save();
      context.translate(x , y );
      context.rotate(angle);
      context.lineWidth = scale;
      context.beginPath();
      context.moveTo(w*-0.5, 0);
      context.lineTo(w*0.5, 0);
      context.stroke();
      context.restore();
    }
  };
};

const createPane = () => {
  const pane = new tweakpane.Pane();
  let folder = pane.addFolder({ title : 'Grid' });
  folder.addInput(params, 'cols', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'rows', { min: 1, max: 100, step: 1 });
  folder.addInput(params, 'scaleMin', { min: 1, max: 100});
  folder.addInput(params, 'scaleMax', { min: 1, max: 100});
}
createPane();
canvasSketch(sketch, settings);
