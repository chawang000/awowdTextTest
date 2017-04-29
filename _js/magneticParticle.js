
// Particle
class Particle {
  constructor(context, x, y, d = 6, color = '#ccc', lerp = 0.01) {
    this.context = context;

    this.originX = x;
    this.originY = y;
    this.x = x;
    this.y = y;
    this.d = d;
    this.lerp = lerp;
    this.color = color;
    this.active = false;
  }


  draw() {
    var context = this.context,
      r = this.d / 2;
    context.fillStyle = this.color;
    context.beginPath();

    if(this.x != this.originX ){
       var x = this.x,
        y = this.y;

        x += (this.originX - this.x) * 0.02;
        this.x = x;

        y += (this.originY - this.y) * 0.02;
        this.y = y;

      // console.log('current X is '+ this.x + ', origin X is ' + this.originX);
    }else{
      var x = this.x,
        y = this.y;
        // console.log('should not move');
    }

    // console.log('drawing');

    context.arc(x, y, r, 0, Math.PI * 2, false);

    context.closePath();
    context.fill();
  }
  
  setTarget(x, y) {
    
  }
}


// Canvas
class Canvas {
  constructor(element, particleSpacing = 25) {
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

    var offset = $('#canvas').offset();
    mouse.x = e.clientX; 
    mouse.x -= offset.left;
    mouse.y = e.clientY;
    mouse.y -= offset.top;
    // mouse.x-=this.canvas.width/2;
    // mouse.y-=this.canvas.height/2;
    // console.log(offset.left);
    // this.moveToMouse();
    // console.log(this.particles);

    if (this.particles) {
      for (let i = 0; i < this.particles.length; i++) {
        var disX = mouse.x - this.particles[i].originX,
            disY = mouse.y - this.particles[i].originY,
            dis = Math.sqrt(disX*disX+disY*disY);
            // console.log(dis);
        if( dis <= 300 ){
          this.particles[i].x += (mouse.x - this.particles[i].x)/dis*1.5;
        this.particles[i].y += (mouse.y - this.particles[i].y)/dis*1.5;
        // this.particles[i].active = true;


        // this.particles[i].color = 'rgba(0, 0, 0,' + (0.3+(150-dis)/150*0.3) +')';

        }else{
          // this.particles[i].color = 'rgba(0, 0, 0, 0.3)';
          // this.particles[i].active = false;
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
    this.canvas.width = 400;
    this.canvas.height = 300;
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
    // if(isNaN(mouse.delta) || mouse.delta <= 0) { return; }  
    this.draw();
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
  }

  stop() {
    window.cancelAnimationFrame(this.animationFrame);
  }
}


// Init
var cnvs = new Canvas(document.getElementById('canvas'));