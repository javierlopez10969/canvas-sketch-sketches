const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 600, 600 ]
  /*
  Variables dimensions
  dimensions : 'A4',
  pixelPerInch : 300,
  orientation : 'landscape'
  */
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    let c = context;
    c.lineWidth = width*0.01;
    const W = width *0.1;
    const H = height * 0.1;
    const gap = width * 0.03;
    //Initial x and y
    const ix = width *0.17;
    const iy = height * 0.17;

    const off = width * 0.02;
    let x,y;
    for(let i = 0; i < 5 ; i++){
        for (let j = 0; j < 5; j++) {

            x=  ix + i * (W + gap);
            y = iy + j * (H + gap);
            c.beginPath();
            c.rect(x,y,W,H);
            c.strokeStyle = 'black';
            c.stroke();

            //Square inside
            if (Math.random() > 0.5) {
                c.beginPath();
                c.rect(x+ off/2,y+ off/2,W-off,H-off);
                c.strokeStyle = 'black';
                c.stroke();
            }
        }

    }
  };
};

canvasSketch(sketch, settings);
