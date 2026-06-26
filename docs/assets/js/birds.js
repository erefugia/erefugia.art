// JS is for dynamically creating and moving the birds across the screen.
// The actual bird flapping and flight wave is CSS animation.
// https://codepen.io/lemmin/pen/QWpWMNV

// Adjust these options here to customize the scene.
let options = {
  delay: 500,
  speedRange: [2, 5],
  angleRange: [-30, 30],
  sizeRange: [8, 30]
};

let bird = document.createElement('span');
bird.className = 'bird';
let particles = [];
setInterval(() => {
  let newBird = bird.cloneNode();
  const size = rand(options.sizeRange[0], options.sizeRange[1]);
  newBird.style.width = size + 'px';
  newBird.style.height = (size/5) + 'px';

  document.body.appendChild(newBird);
  
  particles.push(new Particle(newBird, {
    speed: rand(
      options.speedRange[0],
      options.speedRange[1]
    ),
    angle: rand(
      options.angleRange[0],
      options.angleRange[1]
    ),
    pos: [-100, rand(0, window.innerHeight)]
  }));
}, options.delay);


window.requestAnimationFrame(draw);
function draw () {
  particles.forEach((particle, i, arr) => {
    if (particle.pos[0] > window.innerWidth ||
        particle.pos[1] > window.innerHeight ||
        particle.pos[0] < 0-window.innerWidth ||
        particle.pos[1] < 0-window.innerHeight) {
      particle.element.parentNode.removeChild(particle.element);
      arr.splice(i, 1);
    }
    particle.move();
  });
  
  window.requestAnimationFrame(draw);
}



function Particle (element, options) {
  this.size = 1;
  this.speed = 1;
  this.angle = 90;
  this.pos = [0,0];
  this.element = element;
  
  this.constructor = function (options) {
    for (let i in options) {
      this[i] = options[i];
    }
  }
  
  this.move = function () {
    var radians = this.angle*Math.PI/180;
    this.pos[0] += Math.cos(radians)*this.speed,
    this.pos[1] += Math.sin(radians)*this.speed;
    this.draw();
  }
  
  this.draw = function () {
    this.element.style.left = this.pos[0] + 'px';
    this.element.style.top = this.pos[1] + 'px';
  }
  
  this.constructor(options);
}

function rand(min, max) {
  return Math.random()*(max-min)+min;
}