
// Particle
class Particle {
  constructor(context, x, y, d = 3, color = '#ccc', lerp = 0.01) {
    this.context = context;

    this.x = x;
    this.y = y;
    this.d = d;
    this.lerp = lerp;
    this.color = color;

  }


  draw() {
    var context = this.context,
      r = this.d / 2;
    context.fillStyle = this.color;
    context.beginPath();

    var x = this.x - r,
        y = this.y - r;
    
    // if (Math.abs(this.targetX - this.currentX) < this.movement * 0.1) {
    //   this.targetX = x + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
    // }
    // if (Math.abs(this.targetY - this.currentY) < this.movement * 0.1) {
    //   this.targetY = y + Math.random() * this.movement * (Math.random() < 0.5 ? -1 : 1);
    // }
    
    // this.currentX += (this.targetX - this.currentX) * this.lerp;
    // this.currentY += (this.targetY - this.currentY) * this.lerp;
    
    context.arc(x, y, r, 0, Math.PI * 2, false);

    context.closePath();
    context.fill();
  }
  
  setTarget(x, y) {
    
  }
}


// Canvas
class Canvas {
  constructor(element, particleSpacing = 20) {
    this.canvas = element;
    this.context = element.getContext('2d');

    this.particleSpacing = particleSpacing;
    
    window.addEventListener('resize', () => this.init());
    this.init();


   

    element.addEventListener('mousemove', (e) => this.moveToMouse(e));
  }

      moveToMouse(e) {
        var mouse = {
          x: 0, 
          y: 0,
          rx:0,
          ry:0,
          speed:45,
          delta:0
      };

      mouse.x = e.clientX || e.pageX; 
      mouse.y = e.clientY || e.pageY;
      // mouse.x-=W/2;
      // mouse.y-=H/2;
      // console.log(mouse.y)
      // this.moveToMouse();
      // console.log(this.particles);
      if (this.particles) {
      for (let i = 0; i < this.particles.length; i++) {
        if( mouse.x - this.particles[i].x <= 10 && mouse.x - this.particles[i].x >= -10){
          this.particles[i].color = '#000';
          this.particles[i].draw();
        }
      }
    }

  }

  init () {
    this.stop();
    this.clear();
    this.resize();
    this.createParticles();
    this.animate();
  }
  
  resize() {
    this.canvas.width = 500;
    this.canvas.height = 400;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createParticles() {
    var cols = Math.floor(this.canvas.width / this.particleSpacing),
      rows = Math.floor(this.canvas.height / this.particleSpacing),
      colGutter = (this.particleSpacing + (this.canvas.width - cols * this.particleSpacing)) / 2,
      rowGutter = (this.particleSpacing + (this.canvas.height - rows * this.particleSpacing)) / 2;

    this.particles = [];
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        let x = col * this.particleSpacing + colGutter, 
            y = row * this.particleSpacing + rowGutter, 
            particle = new Particle(this.context, x, y);
        this.particles.push(particle);
      }
    }
  }

  draw() {
    this.clear();
    if (this.particles) {
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].draw();
      }
    }
  }

  animate() {
    this.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrame);
  }
}


// Init
var cnvs = new Canvas(document.getElementById('canvas'));