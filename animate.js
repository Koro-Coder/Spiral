const canvas = document.querySelector("canvas");
console.log(canvas);

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', (event)=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const diff = 0.6;
const beg = 6;
const end = 105;
const angle = 0.78;

function calcX(z){
  return z * Math.sin(z);
}

function calcY(z){
  return Math.abs(Math.sqrt(z * z * Math.cos(z) * Math.cos(z) + (1000 * 1000) / z) *
  Math.sin(angle + Math.atan(1000 / Math.sqrt(z) / (z * Math.cos(z)))));
}

x1 = calcX(beg);
y1 = calcY(beg);

x2 = calcX(end);
y2 = calcY(end);

var speed = 0.01;
var dz = 0;
var startX;
var startY;
function animate() {
  requestAnimationFrame(animate);

  c.rect(0, 0, innerWidth, innerHeight);
  c.fillStyle = "black";
  c.fill();
  c.stroke();

  for (let z = end + dz; z >= beg; z -= diff) {
    x = (innerWidth / (2 * x2)) * calcX(z) + innerWidth / 2;
    y = calcY(z);
    y = (innerHeight / (y1 - y2)) * (y - y2) + innerHeight/10;
    rad = (7 - 4 * Math.cos(z)) * ((end+diff-z)/(end-beg));

    var gradient = c.createRadialGradient(x, y, 0, x, y, rad);
    gradient.addColorStop(0.7, "white");
    gradient.addColorStop(1, "transparent");

    c.beginPath();
    c.arc(x, y, rad, 0, Math.PI * 2, false);
    c.fillStyle = gradient;
    c.fill();
    c.strokeStyle = "transparent";
    c.stroke();
  }
  dz += speed;
  if (dz > diff) dz = 0;
  if(dz<0) dz = diff; 
}

animate();


canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('touchstart', handleTouchStart);
canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);

function handleMouseDown(event) {
  isMouseDown = true;
  startX = event.clientX;
  startY = event.clientY;
}

function handleMouseMove(event) {
  if (!isMouseDown) return;

  var deltaX = event.clientX - startX;
  var deltaY = event.clientY - startY;

  rotateObject1(deltaX);

  startX = event.clientX;
  startY = event.clientY;
}

function handleMouseUp() {
  isMouseDown = false;
}

function handleTouchStart(event) {
  event.preventDefault();
  var touch = event.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchMove(event) {
  event.preventDefault();
  var touch = event.touches[0];
  var deltaX = touch.clientX - startX;
  var deltaY = touch.clientY - startY;

  rotateObject2(deltaX);

  startX = touch.clientX;
  startY = touch.clientY;
}

function handleTouchEnd(event) {
  event.preventDefault();
}

function rotateObject1(dx){
  speed = dx*(0.001);
  if(speed>0.3)
    speed=0.3;
  else if(speed<-0.3)
    speed=-0.3;
}

function rotateObject2(dx){
  speed = dx*(0.01);
  if(speed>0.3)
    speed=0.3;
  else if(speed<-0.3)
    speed=-0.3;
}