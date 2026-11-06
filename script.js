document.getElementById('y').textContent = new Date().getFullYear();

/* Header: solid background after scrolling, mobile menu */
var hd = document.querySelector('header'), menu = document.getElementById('menu'), nav = document.getElementById('nav');
function onScroll() { hd.classList.toggle('scrolled', scrollY > 40); }
addEventListener('scroll', onScroll, { passive: true }); onScroll();
menu.addEventListener('click', function () {
  var o = hd.classList.toggle('open'); menu.setAttribute('aria-expanded', o);
});
nav.addEventListener('click', function (e) {
  if (e.target.tagName === 'A') { hd.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
});

/* Highlight the nav link of the section being read */
var links = [].slice.call(nav.querySelectorAll('a'));
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) io.observe(s); });
}

/* Long bullet lists: show 3, expand on click */
[].forEach.call(document.querySelectorAll('ul.collapsible'), function (ul) {
  var li = ul.children, n = 3, open = false;
  if (li.length <= n) return;
  var b = document.createElement('button'); b.type = 'button'; b.className = 'more';
  function set() {
    for (var i = n; i < li.length; i++) li[i].hidden = !open;
    b.textContent = open ? 'Show fewer' : 'Show all ' + li.length + ' highlights';
    b.setAttribute('aria-expanded', open);
  }
  b.onclick = function () { open = !open; set(); };
  set(); ul.after(b);
});

/* Copy email */
var cp = document.getElementById('copy');
if (cp) cp.onclick = function () {
  var t = 'choongszeying@gmail.com';
  function done() { cp.textContent = 'Copied'; setTimeout(function () { cp.textContent = 'Copy email'; }, 1800); }
  if (navigator.clipboard) navigator.clipboard.writeText(t).then(done, function () { location.href = 'mailto:' + t; });
  else location.href = 'mailto:' + t;
};

/* Globe: dots on a sphere, amber = higher "uncertainty". Drag to rotate. */
(function () {
  var c = document.getElementById('globe'), x = c.getContext('2d'), S, pts = [], rot = 0.6, tilt = -0.35;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches, dragging = false, lastX = 0;
  var N = 1100, ga = Math.PI * (3 - Math.sqrt(5));
  for (var i = 0; i < N; i++) {
    var y = 1 - 2 * (i + .5) / N, r = Math.sqrt(1 - y * y), t = ga * i;
    var px = Math.cos(t) * r, pz = Math.sin(t) * r, py = y;
    var u = .5 + .5 * Math.sin(3 * px + 1.2) * Math.cos(2.4 * py - .5) + .35 * Math.sin(4 * pz + 2 * px);
    pts.push([px, py, pz, Math.max(0, Math.min(1, u))]);
  }
  function size() { var d = devicePixelRatio || 1, w = c.clientWidth; S = w; c.width = w * d; c.height = w * d; x.setTransform(d, 0, 0, d, 0, 0); }
  function draw() {
    x.clearRect(0, 0, S, S); var R = S * .42, cx = S / 2, cy = S / 2;
    var g = x.createRadialGradient(cx - R * .3, cy - R * .3, R * .1, cx, cy, R);
    g.addColorStop(0, '#2d5d7a'); g.addColorStop(1, '#092f44');
    x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill();
    var cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
    for (var i = 0; i < N; i++) {
      var p = pts[i], X = p[0] * cr + p[2] * sr, Z = -p[0] * sr + p[2] * cr, Y = p[1];
      var Y2 = Y * ct - Z * st, Z2 = Y * st + Z * ct;
      if (Z2 < 0) continue;
      var u = p[3], rad = 1 + Z2 * 1.5 + u * 1.6;
      x.fillStyle = u > .62 ? 'rgba(217,176,158,' + (.35 + u * .6) + ')' : 'rgba(142,177,201,' + (.25 + Z2 * .5) + ')';
      x.beginPath(); x.arc(cx + X * R, cy - Y2 * R, rad * S / 470, 0, 7); x.fill();
    }
    x.strokeStyle = 'rgba(160,200,220,.25)'; x.lineWidth = 1; x.beginPath(); x.arc(cx, cy, R, 0, 7); x.stroke();
  }
  c.addEventListener('pointerdown', function (e) { dragging = true; lastX = e.clientX; c.setPointerCapture(e.pointerId); });
  c.addEventListener('pointermove', function (e) { if (!dragging) return; rot += (e.clientX - lastX) * .01; lastX = e.clientX; if (reduce) draw(); });
  ['pointerup', 'pointercancel'].forEach(function (n) { c.addEventListener(n, function () { dragging = false; }); });
  function loop() { if (!dragging) rot += .004; draw(); requestAnimationFrame(loop); }
  size(); addEventListener('resize', function () { size(); draw(); });
  if (reduce) draw(); else loop();
})();
