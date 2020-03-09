const USER = 0;
const FOURIER = 1;


let x = [];
let y = [];

let fourierX;
let fourierY;

let time = 0;
let path = [];

let drawing = [];
let state = -1;

function mousePressed(){

  state = USER;

  drawing = [];

  x = [];
  y = [];

  time = 0;
  path = [];
  
}

function mouseReleased(){

  state = FOURIER;

    let skip = 1;

    for(let i = 0; i < drawing.length; i+=skip){

      
      x.push(drawing[i].x);
      y.push(drawing[i].y);

    }

    
    fourierX = dft(x);
    fourierY = dft(y);

    fourierX.sort((a,b) => b.amp - a.amp);
    fourierY.sort((a,b) => b.amp - a.amp);

}

function setup() {
  
  let canvas = createCanvas(1000,600);

  canvas.position(50,100);

  state = -1;

}

function epicycles(x,y,rotation,fourier){

  for(let i = 0; i < fourier.length; i++){

    let prevx = x;
    let prevy = y;

    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;

    x += radius * Math.cos(freq * time + phase + rotation);
    y += radius * Math.sin(freq * time + phase + rotation);

  

    stroke(255,100);
    noFill();
    ellipse(prevx,prevy,radius*2);

    fill(255);
    stroke(255);
    line(prevx,prevy,x,y);
    //ellipse(x,y,8);

    noFill();


    

  }

  return createVector(x,y);

}

function draw() {

  background(0);

  if(state == USER){

    let point = createVector(mouseX - width / 2,mouseY - height / 2);

    drawing.push(point);

    stroke(255);
    noFill();
    beginShape();
    for(let v of drawing){

      vertex(v.x + width / 2 ,v.y + height / 2);

    }
    endShape();


  } else if(state == FOURIER){


      let x = 0;
      let y = 0;

      
      let vx = epicycles(width / 2,50,0,fourierX);
      let vy = epicycles(150,height / 2,HALF_PI,fourierY);

      let v = createVector(vx.x,vy.y);

      path.unshift(v);

      line(vx.x,vx.y,v.x,v.y);
      line(vy.x,vy.y,v.x,v.y);

      beginShape();
      for(let i = 0; i < path.length; i++){

        vertex(path[i].x,path[i].y);

      }
      endShape();
      
      
      const dt = (2 * Math.PI)/ fourierY.length;

      time += dt;

      if(time > TWO_PI){
      
        time = 0;
        path = [];
      
      }


  }


}