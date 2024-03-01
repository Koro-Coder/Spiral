const canvas = document.querySelector("canvas");
console.log(canvas);

const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let diff = 0.5;
let dz = 0;
let beg = 6;
let end = 74.78;

z = beg;
x1 = z * Math.sin(z);
y1 =
  Math.sqrt(z * z * Math.cos(z) * Math.cos(z) + (1000 * 1000) / z) *
  Math.sin(0.6 + Math.atan(1000 / Math.sqrt(z) / (z * Math.cos(z))));

z = end;
x2 = z * Math.sin(z);
y2 =
  Math.sqrt(z * z * Math.cos(z) * Math.cos(z) + (1000 * 1000) / z) *
  Math.sin(0.6 + Math.atan(1000 / Math.sqrt(z) / (z * Math.cos(z))));

function animate() {
  requestAnimationFrame(animate);

  c.rect(0, 0, innerWidth, innerHeight);
  c.fillStyle = "black";
  c.fill();
  c.stroke();

  for (let z = beg + dz; z < end; z += diff) {
    x = (innerWidth / (2 * x2)) * (z * Math.sin(z)) + innerWidth / 2;
    y =
      Math.sqrt(z * z * Math.cos(z) * Math.cos(z) + (1000 * 1000) / z) *
      Math.sin(0.6 + Math.atan(1000 / Math.sqrt(z) / (z * Math.cos(z))));
    y = (innerHeight / (y1 - y2)) * (Math.abs(y) - y2);
    rad = 10 + 3 * Math.cos(z);

    c.beginPath();
    c.arc(x, y, rad, 0, Math.PI * 2, false);
    var gradient = c.createRadialGradient(x, y, 0, x, y, 2 * rad);
    gradient.addColorStop(0, "white");
    gradient.addColorStop(0.7, "transparent");
    c.fillStyle = gradient;
    c.fill();
    c.strokeStyle = "transparent";
    c.stroke();
  }
  dz += 0.01;
  if (dz > diff) dz = 0;
}

animate();