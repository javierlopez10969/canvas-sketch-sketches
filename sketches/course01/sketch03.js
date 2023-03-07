const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const animate = () =>  {
  console.log("animating...");
  requestAnimationFrame(animate);
}
//animate();

const sketch = ({ context, width, height }) => {
  var agents = [];
  const num =  10;
  for (let i = 0; i < num; i++) {
    var x= random.range(0, width);
    var y= random.range(0, height);
    agents.push(new Agent(x,y));
  }
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    
    //Draw lines
    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];
        const dist = agent.position.getDistance(other.position);
        //if (dist > 300) continue;
        context.lineWidth = math.mapRange(dist, 0, 300, 10, 1);
        context.beginPath();
        context.moveTo(agent.position.x, agent.position.y);
        context.lineTo(other.position.x, other.position.y);
        context.strokeStyle = "black";
        context.stroke();
      }
      
    }
    
    //Draw circles
    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      agent.bounce(width, height);
      
    })

  };
};

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
class Agent{
  constructor(x,y) {
    this.position = new Vector(x,y);
    this.velocity = new Vector(random.range(-1,1), random.range(-1,1));
    this.radius = random.range(5, 20);
  }
  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
  bounce(width, height) {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }
  draw(context){
    context.save();
    context.beginPath();
    context.translate(this.position.x, this.position.y)
    context.lineWidth = 5;
    context.arc(0,0,this.radius, 0, Math.PI * 2);    
    context.fill();
    context.stroke();
    context.restore();
  }
}
canvasSketch(sketch, settings);
