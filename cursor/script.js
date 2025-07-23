const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
let segments = [];
const numSegments = 60;
const spacing = 8;

for (let i = 0; i < numSegments; i++) {
  segments.push({ x: mouse.x, y: mouse.y });
}

document.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move segments
  segments[0].x += (mouse.x - segments[0].x) * 0.2;
  segments[0].y += (mouse.y - segments[0].y) * 0.2;

  for (let i = 1; i < segments.length; i++) {
    const dx = segments[i - 1].x - segments[i].x;
    const dy = segments[i - 1].y - segments[i].y;
    const angle = Math.atan2(dy, dx);
    segments[i].x = segments[i - 1].x - Math.cos(angle) * spacing;
    segments[i].y = segments[i - 1].y - Math.sin(angle) * spacing;
  }

  drawReptile();
  requestAnimationFrame(animate);
}

function drawReptile() {
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(segments[0].x, segments[0].y);

  for (let i = 1; i < segments.length; i++) {
    ctx.lineTo(segments[i].x, segments[i].y);
  }
  ctx.stroke();

  // Draw legs
  for (let i = 5; i < segments.length; i += 5) {
    const dx = segments[i - 1].x - segments[i].x;
    const dy = segments[i - 1].y - segments[i].y;
    const angle = Math.atan2(dy, dx);
    const legLength = 15;

    const legAngle1 = angle + Math.PI / 2;
    const legAngle2 = angle - Math.PI / 2;

    const x = segments[i].x;
    const y = segments[i].y;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(legAngle1) * legLength, y + Math.sin(legAngle1) * legLength);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(legAngle2) * legLength, y + Math.sin(legAngle2) * legLength);
    ctx.stroke();

    // optional foot circle
    ctx.beginPath();
    ctx.arc(x + Math.cos(legAngle1) * legLength, y + Math.sin(legAngle1) * legLength, 2, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x + Math.cos(legAngle2) * legLength, y + Math.sin(legAngle2) * legLength, 2, 0, 2 * Math.PI);
    ctx.fill();
  }
}

animate();