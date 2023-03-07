const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const settings = {
  dimensions: [ 1080, 1080 ]
};

//Fucntion degrees to radians
const degToRad = (degrees) => {
  return degrees/180*Math.PI;
}

//Function random range
const randomRange = (min,max) => {
  return min + Math.random()*(max-min);
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    
    context.fillStyle = 'black';

    //Center of the circles
    const cx = width *0.5;
    const cy = height * 0.5;

    const w = width *0.01;
    const h = height * 0.1;
    
    let x,y;
    //numbers of copys
    const num = 80;
    const radius = width * 0.3;
    //Loop
    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;

			context.save();
			context.translate(x, y);
			context.rotate(-angle);
			context.scale(random.range(0.1, 2), random.range(0.2, 0.5));

			context.beginPath();
			context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
			context.fill();
			context.restore();

			context.save();
			context.translate(cx, cy);
			context.rotate(-angle);

			context.lineWidth = random.range(5, 15);

			context.beginPath();
			context.arc(0, 0, radius * random.range(0.1, 3), slice * random.range(1, -8), slice * random.range(1, 10));
			context.stroke();

			context.restore();
    }

  };
};

canvasSketch(sketch, settings);
