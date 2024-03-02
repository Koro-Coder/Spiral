const canvas = document.querySelector("canvas");
console.log(canvas);

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const diff = 0.5;
const beg = 6;
const end = 105;
const angle = 0.78;
const speed = 0.01;

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

let dz = 0;
function animate() {
  requestAnimationFrame(animate);

  c.rect(0, 0, innerWidth, innerHeight);
  c.fillStyle = "black";
  c.fill();
  c.stroke();

  for (let z = beg + dz; z < end; z += diff) {
    x = (innerWidth / (2 * x2)) * calcX(z) + innerWidth / 2;
    y = calcY(z);
    y = (innerHeight / (y1 - y2)) * (y - y2) + innerHeight/10;
    rad = (7 - 4 * Math.cos(z)) * ((end-z)/(end-beg));

    var gradient = c.createRadialGradient(x, y, 0, x, y, rad);
    gradient.addColorStop(0, "white");
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
}

animate();