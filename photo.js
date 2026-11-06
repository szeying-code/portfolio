var c = document.getElementById('c'), x = c.getContext('2d'), img = null, z = 1, ox = 0, oy = 0, drag = null;
var file = document.getElementById('file'), zoom = document.getElementById('zoom'), dl = document.getElementById('dl'), pick = document.getElementById('pick');

function base() { return Math.max(c.width / img.width, c.height / img.height); }
function clamp() {
  var mx = Math.max(0, (img.width * base() * z - c.width) / 2), my = Math.max(0, (img.height * base() * z - c.height) / 2);
  ox = Math.max(-mx, Math.min(mx, ox)); oy = Math.max(-my, Math.min(my, oy));
}
function render(ctx, size) {
  ctx.fillStyle = '#e8f0f5'; ctx.fillRect(0, 0, size, size);
  if (!img) { ctx.fillStyle = '#4d6a7d'; ctx.font = '600 20px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('No photo yet', size / 2, size / 2); return; }
  var k = size / c.width, s = base() * z * k, w = img.width * s, h = img.height * s;
  ctx.drawImage(img, size / 2 - w / 2 + ox * k, size / 2 - h / 2 + oy * k, w, h);
}
function draw() { render(x, c.width); }

function load(f) {
  if (!f || !/^image\//.test(f.type)) return;
  var im = new Image();
  im.onload = function () { img = im; z = 1; ox = 0; oy = 0; zoom.value = 1; dl.disabled = false; draw(); };
  im.src = URL.createObjectURL(f);
}
file.onchange = function () { load(file.files[0]); };
['dragover', 'dragenter'].forEach(function (n) { pick.addEventListener(n, function (e) { e.preventDefault(); pick.classList.add('over'); }); });
['dragleave', 'drop'].forEach(function (n) { pick.addEventListener(n, function () { pick.classList.remove('over'); }); });
pick.addEventListener('drop', function (e) { e.preventDefault(); load(e.dataTransfer.files[0]); });

zoom.oninput = function () { z = +zoom.value; if (img) { clamp(); draw(); } };
c.addEventListener('pointerdown', function (e) { if (!img) return; drag = [e.clientX, e.clientY]; c.setPointerCapture(e.pointerId); });
c.addEventListener('pointermove', function (e) {
  if (!drag) return;
  var f = c.width / c.getBoundingClientRect().width;
  ox += (e.clientX - drag[0]) * f; oy += (e.clientY - drag[1]) * f; drag = [e.clientX, e.clientY];
  clamp(); draw();
});
['pointerup', 'pointercancel'].forEach(function (n) { c.addEventListener(n, function () { drag = null; }); });

dl.onclick = function () {
  var out = document.createElement('canvas'); out.width = out.height = 600;
  render(out.getContext('2d'), 600);
  out.toBlob(function (b) {
    var a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'profile.jpg'; a.click();
  }, 'image/jpeg', 0.9);
};
draw();
