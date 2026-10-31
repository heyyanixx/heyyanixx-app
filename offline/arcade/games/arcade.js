/* HEYY ARCADE — original mini games for heyyanixx.sites.tab.bot. Vanilla JS + canvas, no libraries. */
const IG = 'https://instagram.com/heyyy.anixx_';
const YT = 'https://youtube.com/@smart_anish69?sub_confirmation=1';
const SHORTS = 'https://youtube.com/@smart_anish69/shorts';
const SITE = 'https://heyyanixx.sites.tab.bot/';
const GOLD = '#e3b65a', GOLD2 = '#f3d9a0', INK = '#060608';
const FONT = '"Anton", Impact, "Arial Black", sans-serif';
const ICON = {
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  yt: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-4.8.5-4.8s0-3.2-.5-4.8z"/><path fill="#ff0033" d="M9.7 15.3V8.7l5.8 3.3z"/></svg>',
  short: '<svg viewBox="0 0 24 24"><path fill="#ff0033" d="M17.8 9.6 16 8.6l1.6-.9a4 4 0 0 0-3.9-7l-8 4.6a4 4 0 0 0 .1 7l1.8 1-1.6.9a4 4 0 0 0 3.9 7l8-4.6a4 4 0 0 0-.1-7z"/><path fill="#fff" d="m10 15 5-3-5-3z"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>'
};

/* ---------- audio: tiny WebAudio synth ---------- */
let AC = null, soundOn = true, noiseBuf = null;
try { soundOn = localStorage.getItem('hxa_snd') !== '0'; } catch (e) {}
function ac() {
  try {
    if (!AC) { const C = window.AudioContext || window.webkitAudioContext; if (!C) return null; AC = new C(); }
    if (AC.state === 'suspended') AC.resume();
  } catch (e) { return null; }
  return AC;
}
function beep(f = 440, d = 0.08, type = 'square', v = 0.05, slide = 0, delay = 0) {
  if (!soundOn) return;
  try {
    const a = ac(); if (!a) return;
    const t = a.currentTime + delay, o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, f + slide), t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(a.destination); o.start(t); o.stop(t + d + 0.03);
  } catch (e) {}
}
function noise(d = 0.35, v = 0.12) {
  if (!soundOn) return;
  try {
    const a = ac(); if (!a) return;
    if (!noiseBuf) { noiseBuf = a.createBuffer(1, Math.floor(a.sampleRate * 0.6), a.sampleRate); const ch = noiseBuf.getChannelData(0); for (let i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length); }
    const s = a.createBufferSource(), g = a.createGain(), f = a.createBiquadFilter();
    f.type = 'lowpass'; f.frequency.value = 900;
    s.buffer = noiseBuf; g.gain.value = v; s.connect(f); f.connect(g); g.connect(a.destination); s.start(); s.stop(a.currentTime + d);
  } catch (e) {}
}
const SFX = {
  coin: () => { beep(988, 0.05, 'square', 0.035); beep(1480, 0.09, 'square', 0.035, 0, 0.05); },
  promo: () => { [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.09, 'triangle', 0.06, 0, i * 0.06)); },
  jump: () => beep(330, 0.16, 'square', 0.04, 420),
  lane: () => beep(620, 0.04, 'triangle', 0.03, -120),
  air: () => beep(440, 0.25, 'sawtooth', 0.035, 600),
  land: () => noise(0.12, 0.06),
  crash: () => { noise(0.5, 0.2); beep(160, 0.4, 'sawtooth', 0.06, -120); },
  shield: () => beep(300, 0.3, 'sine', 0.07, 900),
  pop: () => beep(880, 0.05, 'square', 0.03, 300),
  shot: () => { noise(0.08, 0.09); beep(1200, 0.05, 'square', 0.025, -800); },
  head: () => { beep(1568, 0.07, 'square', 0.045); beep(2093, 0.12, 'square', 0.045, 0, 0.06); },
  miss: () => beep(180, 0.08, 'triangle', 0.04, -60),
  go: () => { beep(523, 0.1, 'square', 0.05); beep(784, 0.18, 'square', 0.05, 0, 0.1); },
  tick: () => beep(1000, 0.03, 'square', 0.02),
  stack: (n) => beep(300 + Math.min(n, 30) * 25, 0.08, 'triangle', 0.06),
  perfect: (n) => { beep(523 * Math.pow(1.06, Math.min(n, 12)), 0.12, 'square', 0.045); beep(1046 * Math.pow(1.06, Math.min(n, 12)), 0.12, 'triangle', 0.04, 0, 0.05); }
};
const vib = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} };

/* ---------- shared drawing helpers ---------- */
function rr(c, x, y, w, h, r) { r = Math.max(0, Math.min(r, w / 2, h / 2)); c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
function drawIG(c, x, y, s) { // simplified camera glyph in an IG-style gradient
  const g = c.createLinearGradient(x - s, y + s, x + s, y - s);
  g.addColorStop(0, '#feda75'); g.addColorStop(0.35, '#fa7e1e'); g.addColorStop(0.6, '#d62976'); g.addColorStop(1, '#4f5bd5');
  c.fillStyle = g; rr(c, x - s, y - s, s * 2, s * 2, s * 0.55); c.fill();
  c.strokeStyle = '#fff'; c.lineWidth = Math.max(1.2, s * 0.16);
  rr(c, x - s * 0.62, y - s * 0.62, s * 1.24, s * 1.24, s * 0.36); c.stroke();
  c.beginPath(); c.arc(x, y, s * 0.3, 0, 6.283); c.stroke();
  c.fillStyle = '#fff'; c.beginPath(); c.arc(x + s * 0.36, y - s * 0.36, s * 0.08, 0, 6.283); c.fill();
}
function drawYT(c, x, y, s) {
  c.fillStyle = '#ff0033'; rr(c, x - s * 1.15, y - s * 0.8, s * 2.3, s * 1.6, s * 0.45); c.fill();
  c.fillStyle = '#fff'; c.beginPath(); c.moveTo(x - s * 0.32, y - s * 0.42); c.lineTo(x + s * 0.48, y); c.lineTo(x - s * 0.32, y + s * 0.42); c.closePath(); c.fill();
}
function drawHX(c, x, y, s) {
  c.save(); c.translate(x, y);
  c.fillStyle = GOLD; c.strokeStyle = '#fff1c9'; c.lineWidth = Math.max(1, s * 0.1);
  c.beginPath(); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3 + Math.PI / 6; c[i ? 'lineTo' : 'moveTo'](Math.cos(a) * s, Math.sin(a) * s); } c.closePath(); c.fill(); c.stroke();
  c.fillStyle = INK; c.font = `${Math.max(6, Math.round(s * 1.15))}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('H', 0, s * 0.06);
  c.restore();
}
function drawCoin(c, x, y, s, t) {
  const w = Math.max(0.18, Math.abs(Math.cos(t))) * s;
  c.fillStyle = '#9a6b1f'; c.beginPath(); c.ellipse(x + s * 0.08, y, w, s, 0, 0, 6.283); c.fill();
  c.fillStyle = GOLD; c.beginPath(); c.ellipse(x, y, w, s, 0, 0, 6.283); c.fill();
  c.fillStyle = '#fff3cf'; c.beginPath(); c.ellipse(x - w * 0.3, y - s * 0.35, w * 0.22, s * 0.25, 0, 0, 6.283); c.fill();
}
function txt(c, text, x, y, size, col, stroke = 5) {
  c.font = `${size}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle';
  c.lineWidth = stroke; c.strokeStyle = 'rgba(0,0,0,.75)'; c.strokeText(text, x, y); c.fillStyle = col; c.fillText(text, x, y);
}
// neon-sunset sky, gold synthwave sun and black skyline; pre-rendered per size
function makeSky(W, H, hor, seed = 7) {
  const cv = document.createElement('canvas'); cv.width = Math.max(1, Math.ceil(W)); cv.height = Math.max(1, Math.ceil(hor + 2));
  const c = cv.getContext('2d');
  const g = c.createLinearGradient(0, 0, 0, hor);
  g.addColorStop(0, '#0b0614'); g.addColorStop(0.45, '#2a0d3d'); g.addColorStop(0.78, '#a1245f'); g.addColorStop(1, '#ff8a3d');
  c.fillStyle = g; c.fillRect(0, 0, W, hor + 2);
  let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
  c.fillStyle = 'rgba(255,255,255,.7)';
  for (let i = 0; i < 40; i++) c.fillRect(rnd() * W, rnd() * hor * 0.5, 1.2, 1.2);
  const sr = Math.min(W, H) * 0.2, sx = W * 0.5, sy = hor - sr * 0.15;
  const sg = c.createLinearGradient(0, sy - sr, 0, sy + sr);
  sg.addColorStop(0, '#fff1bd'); sg.addColorStop(0.5, GOLD); sg.addColorStop(1, '#ff5f6d');
  c.save(); c.shadowColor = 'rgba(255,190,90,.8)'; c.shadowBlur = 40; c.fillStyle = sg; c.beginPath(); c.arc(sx, sy, sr, 0, 6.283); c.fill(); c.restore();
  c.fillStyle = '#7a1d4e';
  for (let i = 0; i < 6; i++) { const yy = sy + sr * (0.05 + i * 0.17); c.fillRect(sx - sr, yy, sr * 2, 2 + i * 1.3); }
  let x = -10; c.fillStyle = '#07050b';
  const wins = [];
  while (x < W + 10) {
    const bw = 18 + rnd() * 34, bh = hor * (0.08 + rnd() * 0.26);
    c.fillRect(x, hor - bh, bw, bh + 2);
    if (rnd() < 0.3) c.fillRect(x + bw * 0.45, hor - bh - 10, 2, 10);
    for (let wy = hor - bh + 6; wy < hor - 6; wy += 7) for (let wx = x + 4; wx < x + bw - 4; wx += 6) if (rnd() < 0.18) wins.push([wx, wy]);
    x += bw + rnd() * 4;
  }
  c.fillStyle = 'rgba(227,182,90,.75)'; wins.forEach(([a, b]) => c.fillRect(a, b, 2, 3));
  return cv;
}

/* =========================================================
   GAME 1 — HEYY SLED RUSH (3-lane downhill rocket-sled runner)
   ========================================================= */
function makeSled(api) {
  const ZP = 2.6, FAR = 72, SEG = 3, HALF = 1.75;
  let W, H, F, HOR, CAMH, sky, snowGrad;
  let d, speed, lane, px, py, vy, objs, nextRow, nextDecor, decor, coins, bonus, promos, t, parts, floats, shield, magnet, alive, deadT, phase, power, airT, bigAir, lean, flash, maxSpeed;
  // slingshot (gulel) launch state
  let sl, boostT, boostMax, launchSpeed, slingZ;
  const SL_PERFECT = 0.9;
  let hintSeen = false; try { hintSeen = localStorage.getItem('hxa_sling_seen') === '1'; } catch (e) {}
  function resize(w, h) {
    W = w; H = h; HOR = Math.round(H * 0.36);
    F = Math.min(W * 0.255, H * 0.13) * ZP;
    CAMH = (H * 0.8 - HOR) / (F / ZP);
    sky = makeSky(W, H, HOR, 11); snowGrad = null;
  }
  function reset() {
    d = 0; speed = 0; lane = 0; px = 0; py = 0; vy = 0; objs = []; decor = []; nextRow = 55; nextDecor = 0; coins = 0; bonus = 0; promos = 0; t = 0;
    parts = []; floats = []; shield = 0; magnet = 0; alive = true; deadT = 0; phase = 'aim'; power = 0; airT = 0; bigAir = false; lean = 0; flash = 0; maxSpeed = 0;
    sl = { drag: false, pull: 0, sx: 0, sy: 0, dx: 0, step: 0, idleT: 0, rel: 0, relPull: 0, snapT: -1, tipT: 0 }; boostT = 0; boostMax = 1; launchSpeed = 0; slingZ = 1.2;
    while (nextDecor < FAR + 10) addDecor();
  }
  function addDecor() {
    const z = nextDecor; nextDecor += 9;
    const k = Math.floor(z / 9);
    decor.push({ z, side: -1, type: k % 3 === 0 ? 'lamp' : 'tree', s: 0.85 + ((k * 37) % 10) / 25 });
    decor.push({ z: z + 4.5, side: 1, type: k % 3 === 1 ? 'lamp' : 'tree', s: 0.85 + ((k * 53) % 10) / 25 });
  }
  const curveAt = (rel) => (Math.sin(d / 170) * 0.0042 + Math.sin(d / 61 + 1) * 0.0016) * rel * rel;
  function proj(x, rel, h) {
    const zs = rel + ZP; if (zs < 0.25) return null;
    const s = F / zs;
    return { x: W / 2 + (x + curveAt(rel)) * s, y: HOR + (CAMH - h) * s, s };
  }
  const score = () => Math.floor(d) + coins * 10 + bonus;
  function spawnRow(z) {
    const k = Math.min(1, d / 2600), r = Math.random();
    const lanes = [-1, 0, 1].sort(() => Math.random() - 0.5);
    const add = (o) => objs.push(o);
    const coinLine = (ln, z0, n = 5) => { for (let i = 0; i < n; i++) add({ type: 'coin', lane: ln, z: z0 + i * 2.4, y: 0.55 }); };
    const tall = () => (Math.random() < 0.5 ? 'block' : 'snowman');
    if (r < 0.1 + k * 0.05 && d > 150) { // ramp with an arc of air coins, walls in the other lanes
      const L = lanes[0];
      add({ type: 'ramp', lane: L, z });
      for (let i = 0; i < 7; i++) { const q = (i + 1) / 8; add({ type: 'coin', lane: L, z: z + 3 + i * 2.6, y: 0.6 + Math.sin(q * Math.PI) * 3.6 }); }
      add({ type: tall(), lane: lanes[1], z: z + 1 }); add({ type: tall(), lane: lanes[2], z: z + 1 });
      if (Math.random() < 0.6) add({ type: ['ig', 'yt', 'hx'][Math.floor(Math.random() * 3)], lane: L, z: z + 12, y: 4 });
      return;
    }
    if (r < 0.22 && d > 400) { lanes.forEach((ln) => add({ type: 'fence', lane: ln, z })); coinLine(lanes[0], z + 4, 3); return; } // full-width fence: jump!
    const two = d > 200 && Math.random() < 0.25 + k * 0.45;
    const obs = () => { const q = Math.random(); return q < 0.42 ? 'fence' : q < 0.72 ? 'block' : 'snowman'; };
    add({ type: obs(), lane: lanes[0], z });
    if (two) add({ type: obs(), lane: lanes[1], z: z + (Math.random() < 0.5 ? 0 : 3) });
    const free = two ? lanes[2] : lanes[1 + Math.floor(Math.random() * 2)];
    if (Math.random() < 0.14) add({ type: ['ig', 'yt', 'ig', 'yt', 'hx'][Math.floor(Math.random() * 5)], lane: free, z: z + 2, y: 0.9 });
    else if (Math.random() < 0.8) coinLine(free, z - 4, 4 + Math.floor(Math.random() * 3));
  }
  function burst(x, y, n, col, sp = 160, sz = 3) {
    for (let i = 0; i < n && parts.length < 240; i++) { const a = Math.random() * 6.283, v = sp * (0.3 + Math.random()); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - sp * 0.3, life: 0.5 + Math.random() * 0.4, max: 0.9, col, sz: sz * (0.5 + Math.random()) }); }
  }
  const float = (text, x, y, col = GOLD2, big = false) => floats.push({ text, x, y, life: 1.1, col, big });
  function crash(o) {
    if (shield > 0) { shield = 0; o.hit = true; o.smash = 0.001; const p = proj(o.lane, o.z - d, 1); if (p) burst(p.x, p.y, 26, '#bfe9ff', 260, 4); api.shake(10); SFX.shield(); float('SHIELD SAVED YOU!', W / 2, H * 0.55, '#7dff4f', true); vib(40); return; }
    alive = false; deadT = 0; api.shake(22); flash = 1; SFX.crash(); vib([60, 40, 120]);
    burst(W / 2, H * 0.78, 40, '#ffffff', 300, 4); burst(W / 2, H * 0.78, 20, GOLD, 260, 4);
  }
  function update(dt) {
    t += dt;
    if (sl.snapT >= 0) sl.snapT += dt;
    if (phase === 'aim') { slingZ = d + 1.2; power = sl.pull; if (!sl.drag) sl.idleT += dt; updParts(dt); return; }
    if (!alive) { deadT += dt; updParts(dt); if (deadT > 0.95 && deadT - dt <= 0.95) api.over(); return; }
    const target = 15 + Math.min(31, d / 85);
    if (boostT > 0) { boostT -= dt; speed = Math.max(speed, launchSpeed); if (parts.length < 230) parts.push({ x: W / 2 + (px * F / ZP) + (Math.random() - 0.5) * 14, y: H * 0.8, vx: (Math.random() - 0.5) * 60, vy: 60 + Math.random() * 80, life: 0.35, max: 0.35, col: Math.random() < 0.5 ? '#ff8a3d' : GOLD, sz: 3 + Math.random() * 3 }); }
    else speed += (target - speed) * Math.min(1, dt * (speed > target ? 0.35 : 1.2));
    maxSpeed = Math.max(maxSpeed, speed);
    d += speed * dt;
    px += (lane - px) * Math.min(1, dt * 15);
    lean += ((lane - px) * 0.9 - lean) * Math.min(1, dt * 12);
    if (py > 0 || vy > 0) {
      vy -= (bigAir ? 24 : 34) * dt; py += vy * dt; airT += dt;
      if (py <= 0) {
        py = 0; vy = 0; SFX.land(); burst(W / 2, H * 0.8, 10, '#e8f4ff', 120, 3);
        if (airT > 0.9) { const b = Math.round(airT * 40) * 5; bonus += b; float('AIR TIME +' + b, W / 2, H * 0.45, '#7dff4f', true); }
        airT = 0; bigAir = false;
      }
    }
    if (shield > 0) shield -= dt;
    if (magnet > 0) magnet -= dt;
    flash = Math.max(0, flash - dt * 3);
    while (nextRow < d + FAR) { spawnRow(nextRow); nextRow += Math.max(13, speed * (0.95 - Math.min(0.3, d / 7000))) + Math.random() * 6; }
    while (nextDecor < d + FAR + 10) addDecor();
    decor = decor.filter((o) => o.z - d > -3);
    for (const o of objs) {
      const rel = o.z - d;
      if (o.hit) { if (o.smash) o.smash += dt; continue; }
      if (magnet > 0 && o.type === 'coin' && rel < 14 && rel > 0) { o.lane += (px - o.lane) * Math.min(1, dt * 8); o.y += (py + 0.6 - o.y) * Math.min(1, dt * 8); }
      if (Math.abs(rel) > 0.7) continue;
      if (Math.abs(o.lane - px) >= 0.55) continue;
      const p = proj(o.lane, rel, o.y || 0), near = Math.abs((o.y || 0) - (py + 0.5));
      switch (o.type) {
        case 'coin': if (near < 1.25) { o.hit = true; coins++; SFX.coin(); if (p) burst(p.x, p.y, 6, GOLD, 120, 2.5); } break;
        case 'ig': case 'yt': if (near < 1.6) { o.hit = true; promos++; bonus += 50; SFX.promo(); vib(25); float(o.type === 'ig' ? '+50  FOLLOW @heyyy.anixx_' : '+50  SUBSCRIBE!', W / 2, H * 0.5, o.type === 'ig' ? '#ff7ac0' : '#ff5a6e', true); if (p) burst(p.x, p.y, 18, o.type === 'ig' ? '#d62976' : '#ff0033', 200, 3); } break;
        case 'hx': if (near < 1.6) { o.hit = true; promos++; bonus += 50; shield = 6; magnet = 6; SFX.shield(); vib(25); float('HX POWER: SHIELD + MAGNET', W / 2, H * 0.5, GOLD2, true); if (p) burst(p.x, p.y, 22, GOLD, 220, 3); } break;
        case 'ramp': if (py < 0.3) { o.hit = true; vy = 16.5; py = 0.01; bigAir = true; airT = 0; SFX.air(); float('AIR TIME!', W / 2, H * 0.42, '#7dff4f', true); api.shake(4); } break;
        case 'fence': if (py < 0.85) crash(o); break;
        case 'block': case 'snowman': if (py < 2.3) crash(o); break;
      }
      if (!alive) break;
    }
    objs = objs.filter((o) => o.z - d > -4 && !(o.hit && !o.smash));
    if (py === 0 && parts.length < 220) { // snow spray from the runners
      const n = speed > 28 ? 3 : 2;
      for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1; parts.push({ x: W / 2 + (px * F / ZP) + side * F / ZP * 0.38, y: H * 0.81, vx: side * (40 + Math.random() * 80), vy: -40 - Math.random() * 90, life: 0.35 + Math.random() * 0.25, max: 0.6, col: '#eef7ff', sz: 2 + Math.random() * 2.5 }); }
    }
    updParts(dt);
  }
  function updParts(dt) {
    for (const p of parts) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 420 * dt; }
    parts = parts.filter((p) => p.life > 0);
    for (const f of floats) { f.life -= dt; f.y -= 50 * dt; }
    floats = floats.filter((f) => f.life > 0);
  }
  function drawTrack(c) {
    if (!snowGrad) { snowGrad = c.createLinearGradient(0, HOR, 0, H); snowGrad.addColorStop(0, '#5a3a66'); snowGrad.addColorStop(0.35, '#b7a9d1'); snowGrad.addColorStop(1, '#eef1fb'); }
    c.fillStyle = snowGrad; c.fillRect(0, HOR, W, H - HOR);
    const start = Math.floor((d + FAR) / SEG) * SEG;
    for (let za = start; za > d - ZP + 0.3; za -= SEG) {
      const zb = Math.max(za - SEG, d - ZP + 0.3);
      const A = proj(0, za - d, 0), B = proj(0, zb - d, 0); if (!A || !B) continue;
      const idx = Math.floor(za / SEG);
      const al = (x) => A.x + x * A.s, bl = (x) => B.x + x * B.s;
      const quad = (x0, x1, lift = 0) => { c.beginPath(); c.moveTo(al(x0), A.y - A.s * lift); c.lineTo(al(x1), A.y - A.s * lift); c.lineTo(bl(x1), B.y - B.s * lift); c.lineTo(bl(x0), B.y - B.s * lift); c.fill(); };
      c.fillStyle = idx % 2 ? '#d9def0' : '#c9cfe6'; quad(-HALF - 0.9, HALF + 0.9);
      c.fillStyle = idx % 2 ? '#122a45' : '#0d2038'; quad(-HALF, HALF);
      c.fillStyle = 'rgba(160,215,255,.07)'; quad(-0.25, 0.15);
      if (idx % 2) { c.fillStyle = 'rgba(243,217,160,.55)'; quad(-0.535, -0.465); quad(0.465, 0.535); }
      c.fillStyle = idx % 4 === 0 ? '#fff1c9' : GOLD; quad(-HALF - 0.14, -HALF, 0.12); quad(HALF, HALF + 0.14, 0.12);
    }
  }
  function drawDecor(c, o) {
    const rel = o.z - d, p = proj(o.side * (HALF + 1.5), rel, 0); if (!p || p.y < HOR) return;
    const s = p.s * o.s;
    c.globalAlpha = Math.max(0, Math.min(1, (FAR - rel) / 18));
    if (o.type === 'tree') {
      c.fillStyle = '#2b1d33'; c.fillRect(p.x - s * 0.08, p.y - s * 0.5, s * 0.16, s * 0.5);
      for (let i = 0; i < 3; i++) {
        const yy = p.y - s * (0.4 + i * 0.55), ww = s * (0.75 - i * 0.18);
        c.fillStyle = '#14361f'; c.beginPath(); c.moveTo(p.x, yy - s * 0.8); c.lineTo(p.x + ww, yy); c.lineTo(p.x - ww, yy); c.fill();
        c.fillStyle = '#f2f5ff'; c.beginPath(); c.moveTo(p.x, yy - s * 0.8); c.lineTo(p.x + ww * 0.35, yy - s * 0.52); c.lineTo(p.x - ww * 0.35, yy - s * 0.52); c.fill();
      }
    } else {
      c.fillStyle = '#16141c'; c.fillRect(p.x - s * 0.05, p.y - s * 2.6, s * 0.1, s * 2.6);
      const hx = p.x - o.side * s * 0.35;
      c.fillRect(Math.min(p.x, hx), p.y - s * 2.6, Math.abs(hx - p.x), s * 0.08);
      c.fillStyle = 'rgba(227,182,90,.25)'; c.beginPath(); c.arc(hx, p.y - s * 2.45, s * 0.45, 0, 6.283); c.fill();
      c.fillStyle = '#fff1c9'; c.beginPath(); c.arc(hx, p.y - s * 2.47, s * 0.12, 0, 6.283); c.fill();
    }
    c.globalAlpha = 1;
  }
  function drawObj(c, o) {
    const rel = o.z - d, p = proj(o.lane, rel, o.y || 0); if (!p) return;
    const s = p.s;
    c.globalAlpha = Math.max(0, Math.min(1, (FAR - rel) / 14));
    if (o.y && o.type !== 'ramp') { const g = proj(o.lane, rel, 0); c.fillStyle = 'rgba(0,0,0,.25)'; c.beginPath(); c.ellipse(g.x, g.y, s * 0.3, s * 0.08, 0, 0, 6.283); c.fill(); }
    const bob = Math.sin(t * 4 + o.z) * s * 0.08;
    switch (o.type) {
      case 'coin': drawCoin(c, p.x, p.y, s * 0.24, t * 6 + o.z); break;
      case 'ig': drawIG(c, p.x, p.y + bob, s * 0.34); break;
      case 'yt': drawYT(c, p.x, p.y + bob, s * 0.32); break;
      case 'hx': drawHX(c, p.x, p.y + bob, s * 0.36); break;
      case 'ramp': {
        const top = proj(o.lane, rel + 1.6, 0.9); if (!top) break; const w = s * 0.45, tw = top.s * 0.45;
        c.fillStyle = '#7a5a1e'; c.beginPath(); c.moveTo(p.x - w, p.y); c.lineTo(p.x + w, p.y); c.lineTo(top.x + tw, top.y); c.lineTo(top.x - tw, top.y); c.fill();
        c.fillStyle = GOLD; c.beginPath(); c.moveTo(p.x - w * 0.9, p.y); c.lineTo(p.x + w * 0.9, p.y); c.lineTo(top.x + tw * 0.9, top.y); c.lineTo(top.x - tw * 0.9, top.y); c.fill();
        c.fillStyle = INK; c.font = `${Math.max(6, Math.round(s * 0.2))}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('▲ ▲', (p.x + top.x) / 2, (p.y + top.y) / 2);
        break;
      }
      case 'fence': {
        const w = s * 0.46, h = s * 0.62, y = p.y;
        c.fillStyle = '#111'; c.fillRect(p.x - w, y - h * 0.15, s * 0.07, h * 0.15); c.fillRect(p.x + w - s * 0.07, y - h * 0.15, s * 0.07, h * 0.15);
        c.fillStyle = GOLD; c.fillRect(p.x - w, y - h, w * 2, h * 0.85);
        c.save(); c.beginPath(); c.rect(p.x - w, y - h, w * 2, h * 0.85); c.clip();
        c.fillStyle = '#0a0a0c'; for (let i = -3; i < 6; i++) { const xx = p.x - w + i * w * 0.42; c.beginPath(); c.moveTo(xx, y - h); c.lineTo(xx + w * 0.2, y - h); c.lineTo(xx + w * 0.2 + h * 0.85, y - h * 0.15); c.lineTo(xx + h * 0.85, y - h * 0.15); c.fill(); }
        c.restore();
        c.strokeStyle = '#fff1c9'; c.lineWidth = Math.max(1, s * 0.02); c.strokeRect(p.x - w, y - h, w * 2, h * 0.85);
        break;
      }
      case 'block': {
        const sm = o.smash ? Math.min(1, o.smash * 3) : 0; if (sm >= 1) break; c.globalAlpha *= 1 - sm;
        const w = s * 0.44, h = s * 1.9, y = p.y;
        const g = c.createLinearGradient(p.x - w, 0, p.x + w, 0); g.addColorStop(0, '#5fb7ff'); g.addColorStop(0.5, '#d9f3ff'); g.addColorStop(1, '#3e8fd6');
        c.fillStyle = g; rr(c, p.x - w, y - h, w * 2, h, s * 0.08); c.fill();
        c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = Math.max(1, s * 0.025);
        c.beginPath(); c.moveTo(p.x - w * 0.5, y - h * 0.8); c.lineTo(p.x - w * 0.1, y - h * 0.55); c.lineTo(p.x - w * 0.4, y - h * 0.3); c.moveTo(p.x + w * 0.4, y - h * 0.9); c.lineTo(p.x + w * 0.1, y - h * 0.65); c.stroke();
        c.fillStyle = '#ff2a3a'; c.fillRect(p.x - w, y - h * 0.18, w * 2, h * 0.07);
        break;
      }
      case 'snowman': {
        const sm = o.smash ? Math.min(1, o.smash * 3) : 0; if (sm >= 1) break; c.globalAlpha *= 1 - sm;
        const y = p.y;
        c.fillStyle = '#f4f7ff'; c.strokeStyle = '#aab3cf'; c.lineWidth = Math.max(1, s * 0.02);
        [[0.42, 0.4], [0.3, 1.05], [0.22, 1.55]].forEach(([r, h]) => { c.beginPath(); c.arc(p.x, y - s * h, s * r, 0, 6.283); c.fill(); c.stroke(); });
        c.fillStyle = GOLD; c.fillRect(p.x - s * 0.28, y - s * 1.36, s * 0.56, s * 0.1); c.fillRect(p.x + s * 0.1, y - s * 1.36, s * 0.1, s * 0.34);
        c.fillStyle = '#0b0b0d'; c.fillRect(p.x - s * 0.2, y - s * 1.82, s * 0.4, s * 0.06); c.fillRect(p.x - s * 0.13, y - s * 2.1, s * 0.26, s * 0.28);
        c.fillStyle = '#ff8a3d'; c.beginPath(); c.moveTo(p.x, y - s * 1.55); c.lineTo(p.x + s * 0.2, y - s * 1.52); c.lineTo(p.x, y - s * 1.49); c.fill();
        c.fillStyle = '#0b0b0d'; c.beginPath(); c.arc(p.x - s * 0.08, y - s * 1.62, s * 0.03, 0, 6.283); c.arc(p.x + s * 0.08, y - s * 1.62, s * 0.03, 0, 6.283); c.fill();
        break;
      }
    }
    c.globalAlpha = 1;
  }
  function slingOff() { // sled's on-screen pull-back offset (and the snap forward after release)
    const maxPx = H * 0.11;
    if (phase === 'aim') return { y: sl.pull * maxPx, x: sl.dx, k: 1 + sl.pull * 0.12 };
    if (sl.snapT >= 0 && sl.snapT < 0.6) {
      const P = sl.relPull * maxPx, q = sl.snapT;
      const y = q < 0.09 ? P * (1 - q / 0.09) : -P * 0.22 * Math.sin((q - 0.09) * 18) * Math.exp(-(q - 0.09) * 7);
      return { y, x: sl.rel * Math.max(0, 1 - q / 0.09), k: 1 + Math.max(0, y) / maxPx * 0.12 };
    }
    return { y: 0, x: 0, k: 1 };
  }
  function drawPlayer(c) {
    const g0 = proj(px, 0, 0), so = slingOff(), g = { x: g0.x + so.x, y: g0.y + so.y, s: g0.s * so.k }, s = g.s, by = g.y - py * s;
    c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(g.x, g.y + s * 0.02, s * 0.5 / (1 + py * 0.25), s * 0.1, 0, 0, 6.283); c.fill();
    c.save(); c.translate(g.x, by);
    let rot = lean * 0.35;
    if (!alive) { rot = deadT * 9; c.translate(0, -Math.sin(Math.min(1, deadT * 1.6) * Math.PI) * s * 1.4); }
    c.rotate(rot);
    if (shield > 0) { c.strokeStyle = `rgba(125,255,79,${0.5 + Math.sin(t * 12) * 0.25})`; c.lineWidth = s * 0.05; c.beginPath(); c.arc(0, -s * 0.6, s * 0.85, 0, 6.283); c.stroke(); }
    if (alive) {
      const fl = 0.8 + Math.random() * 0.4 + (speed > 30 ? 0.3 : 0) + (boostT > 0 ? 0.6 : 0) - (phase === 'aim' ? 0.5 : 0);
      c.fillStyle = 'rgba(255,160,70,.32)'; c.beginPath(); c.ellipse(0, s * 0.1, s * 0.2 * fl, s * 0.15 * fl, 0, 0, 6.283); c.fill();
      c.fillStyle = '#fff1bd'; c.beginPath(); c.ellipse(0, s * 0.08, s * 0.1 * fl, s * 0.09 * fl, 0, 0, 6.283); c.fill();
    }
    c.fillStyle = '#17171c'; rr(c, -s * 0.46, -s * 0.22, s * 0.92, s * 0.28, s * 0.1); c.fill();
    c.fillStyle = GOLD; rr(c, -s * 0.44, -s * 0.26, s * 0.88, s * 0.2, s * 0.09); c.fill();
    c.fillStyle = INK; c.fillRect(-s * 0.44, -s * 0.18, s * 0.88, s * 0.04);
    c.fillStyle = '#2a2a33'; c.beginPath(); c.arc(0, -s * 0.06, s * 0.1, 0, 6.283); c.fill();
    c.fillStyle = '#ff8a3d'; c.beginPath(); c.arc(0, -s * 0.06, s * 0.055, 0, 6.283); c.fill();
    c.fillStyle = '#0f0f13'; c.beginPath(); c.moveTo(-s * 0.3, -s * 0.22); c.quadraticCurveTo(-s * 0.34, -s * 0.78, 0, -s * 0.84); c.quadraticCurveTo(s * 0.34, -s * 0.78, s * 0.3, -s * 0.22); c.closePath(); c.fill();
    c.fillStyle = GOLD; c.font = `${Math.max(6, Math.round(s * 0.22))}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HX', 0, -s * 0.5);
    c.strokeStyle = '#0f0f13'; c.lineWidth = s * 0.1; c.lineCap = 'round';
    c.beginPath(); c.moveTo(-s * 0.26, -s * 0.66); c.lineTo(-s * 0.42, -s * 0.3); c.moveTo(s * 0.26, -s * 0.66); c.lineTo(s * 0.42, -s * 0.3); c.stroke();
    c.fillStyle = '#1a1a20'; c.beginPath(); c.arc(0, -s * 0.98, s * 0.2, 0, 6.283); c.fill();
    c.strokeStyle = GOLD; c.lineWidth = s * 0.05; c.beginPath(); c.arc(0, -s * 0.98, s * 0.22, Math.PI * 1.05, Math.PI * 1.95); c.stroke();
    c.fillStyle = GOLD; rr(c, -s * 0.27, -s * 1.04, s * 0.1, s * 0.16, s * 0.04); c.fill(); rr(c, s * 0.17, -s * 1.04, s * 0.1, s * 0.16, s * 0.04); c.fill();
    c.restore();
  }
  // ---- gulel (rope slingshot) launch: original drawing, two posts + gold elastic bands ----
  function postTops() {
    const rel = slingZ - d, X = HALF + 0.32;
    const L0 = proj(-X, rel, 0), R0 = proj(X, rel, 0), L1 = proj(-X - 0.28, rel, 1.55), R1 = proj(X + 0.28, rel, 1.55);
    return L0 && R0 && L1 && R1 ? { L0, R0, L1, R1 } : null;
  }
  function drawPosts(c) {
    const p = postTops(); if (!p) return;
    const fade = phase === 'aim' ? 1 : Math.max(0, Math.min(1, (slingZ - d + 2.3) / 1.2));
    if (fade <= 0) return;
    c.save(); c.globalAlpha = fade; c.lineCap = 'round';
    for (const [b, tp] of [[p.L0, p.L1], [p.R0, p.R1]]) {
      const w = b.s * 0.13;
      c.fillStyle = 'rgba(0,0,0,.35)'; c.beginPath(); c.ellipse(b.x, b.y, w * 1.6, w * 0.45, 0, 0, 6.283); c.fill();
      c.strokeStyle = '#2b1d10'; c.lineWidth = w * 1.25; c.beginPath(); c.moveTo(b.x, b.y); c.lineTo(tp.x, tp.y); c.stroke();
      c.strokeStyle = '#6b4a24'; c.lineWidth = w * 0.8; c.beginPath(); c.moveTo(b.x, b.y); c.lineTo(tp.x, tp.y); c.stroke();
      c.strokeStyle = GOLD; c.lineWidth = w * 0.95; // gold bindings
      for (const q of [0.25, 0.5]) { const x = b.x + (tp.x - b.x) * q, y = b.y + (tp.y - b.y) * q; c.beginPath(); c.moveTo(x - w * 0.5, y); c.lineTo(x + w * 0.5, y); c.stroke(); }
      c.fillStyle = GOLD; c.beginPath(); c.arc(tp.x, tp.y, w * 0.75, 0, 6.283); c.fill();
      c.fillStyle = '#fff1c9'; c.beginPath(); c.arc(tp.x - w * 0.22, tp.y - w * 0.22, w * 0.22, 0, 6.283); c.fill();
    }
    c.restore();
  }
  function band(c, ax, ay, bx, by, cx, cy, wdt) {
    c.strokeStyle = 'rgba(0,0,0,.55)'; c.lineWidth = wdt + 3; c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo(cx, cy, bx, by); c.stroke();
    const g = c.createLinearGradient(ax, ay, bx, by); g.addColorStop(0, '#f3d9a0'); g.addColorStop(1, GOLD);
    c.strokeStyle = g; c.lineWidth = wdt; c.beginPath(); c.moveTo(ax, ay); c.quadraticCurveTo(cx, cy, bx, by); c.stroke();
  }
  function drawBands(c) {
    const p = postTops(); if (!p) return;
    c.save(); c.lineCap = 'round';
    if (phase === 'aim' || (sl.snapT >= 0 && sl.snapT < 0.09)) {
      const g0 = proj(px, 0, 0), so = slingOff(), s = g0.s * so.k, gx = g0.x + so.x, gy = g0.y + so.y;
      const pull = phase === 'aim' ? sl.pull : sl.relPull * (1 - sl.snapT / 0.09);
      const wdt = Math.max(2.5, s * (0.085 - pull * 0.045));
      const lx = gx - s * 0.47, rx = gx + s * 0.47, ay = gy - s * 0.12, py2 = gy + s * 0.1;
      const sag = (1 - pull) * s * 0.18;
      band(c, p.L1.x, p.L1.y, lx, ay, (p.L1.x + lx) / 2, (p.L1.y + ay) / 2 + sag, wdt);
      band(c, p.R1.x, p.R1.y, rx, ay, (p.R1.x + rx) / 2, (p.R1.y + ay) / 2 + sag, wdt);
      // pouch strap wrapped behind the sled
      c.strokeStyle = 'rgba(0,0,0,.6)'; c.lineWidth = wdt * 1.7 + 3; c.beginPath(); c.moveTo(lx, ay); c.quadraticCurveTo(gx, py2 + s * 0.12 + pull * s * 0.08, rx, ay); c.stroke();
      c.strokeStyle = '#c99a3e'; c.lineWidth = wdt * 1.7; c.beginPath(); c.moveTo(lx, ay); c.quadraticCurveTo(gx, py2 + s * 0.12 + pull * s * 0.08, rx, ay); c.stroke();
      c.strokeStyle = GOLD2; c.lineWidth = Math.max(1, wdt * 0.35); c.beginPath(); c.moveTo(lx, ay - wdt * 0.3); c.quadraticCurveTo(gx, py2 + s * 0.08 + pull * s * 0.08, rx, ay - wdt * 0.3); c.stroke();
    } else if (sl.snapT >= 0 && sl.snapT < 1.2) { // bands twang back between the posts after release
      const q = sl.snapT, mx = (p.L1.x + p.R1.x) / 2, my = (p.L1.y + p.R1.y) / 2;
      const wob = Math.sin(q * 38) * Math.exp(-q * 4.5) * p.L1.s * 0.5;
      c.globalAlpha = Math.max(0, Math.min(1, (slingZ - d + 2.3) / 1.2));
      const wdt = Math.max(2, p.L1.s * 0.07);
      band(c, p.L1.x, p.L1.y, mx, my + wob, (p.L1.x + mx) / 2, (p.L1.y + my) / 2 + wob * 0.6, wdt);
      band(c, p.R1.x, p.R1.y, mx, my + wob, (p.R1.x + mx) / 2, (p.R1.y + my) / 2 + wob * 0.6, wdt);
    }
    c.restore();
  }
  function drawAim(c) { // power arc + hints while the gulel is loaded
    const cx = W / 2, cy = H * 0.3, R = Math.min(W * 0.26, 104);
    c.save();
    c.fillStyle = 'rgba(6,6,8,.66)'; rr(c, cx - R - 26, cy - R - 40, (R + 26) * 2, R + 92, 20); c.fill();
    c.lineCap = 'round';
    const A0 = Math.PI, A1 = Math.PI * 2, ap = A0 + (A1 - A0) * SL_PERFECT;
    c.lineWidth = 16; c.strokeStyle = '#2a2a33'; c.beginPath(); c.arc(cx, cy, R, A0, A1); c.stroke();
    c.strokeStyle = 'rgba(125,255,79,.35)'; c.beginPath(); c.arc(cx, cy, R, ap, A1); c.stroke();
    if (sl.pull > 0.005) {
      const perfect = sl.pull >= SL_PERFECT;
      const g = c.createLinearGradient(cx - R, 0, cx + R, 0); g.addColorStop(0, '#a07a32'); g.addColorStop(0.6, GOLD); g.addColorStop(1, '#fff1bd');
      c.strokeStyle = perfect ? '#7dff4f' : g; c.lineWidth = 12; c.beginPath(); c.arc(cx, cy, R, A0, A0 + (A1 - A0) * sl.pull); c.stroke();
      const na = A0 + (A1 - A0) * sl.pull; c.fillStyle = '#fff'; c.beginPath(); c.arc(cx + Math.cos(na) * R, cy + Math.sin(na) * R, 8, 0, 6.283); c.fill();
      txt(c, `${Math.round(sl.pull * 100)}%`, cx, cy - R * 0.32, Math.min(34, R * 0.38), perfect ? '#7dff4f' : '#fff', 5);
      txt(c, perfect ? 'PERFECT! CHHODO!' : sl.pull > 0.6 ? 'AUR KHICHO…' : 'POWER', cx, cy + 4, perfect ? 17 + Math.sin(t * 18) * 1.5 : 14, perfect ? '#7dff4f' : GOLD2, 4);
    } else {
      txt(c, 'PEECHE KHICHO', cx, cy - R * 0.42, Math.min(28, W / 13), '#fff', 5);
      txt(c, 'AUR CHHODO!', cx, cy - R * 0.42 + 30, Math.min(24, W / 15), GOLD, 5);
    }
    txt(c, 'Pull back & release · zyada khicho = zyada speed', cx, cy + 34, 12, GOLD2, 3);
    c.restore();
    // animated hand + arrow hint: first play, or when the player waits
    if (!sl.drag && sl.pull < 0.02 && (!hintSeen || sl.idleT > 2.5)) {
      const g = proj(px, 0, 0), k = (t * 0.8) % 1, e = k < 0.65 ? k / 0.65 : 1, fade = k < 0.65 ? 1 : 1 - (k - 0.65) / 0.35;
      const hx = g.x + g.s * 0.55, hy = g.y - g.s * 0.55 + e * H * 0.13;
      c.save(); c.globalAlpha = fade;
      c.strokeStyle = 'rgba(243,217,160,.85)'; c.lineWidth = 3; c.setLineDash([6, 6]); c.beginPath(); c.moveTo(hx, g.y - g.s * 0.6); c.lineTo(hx, hy); c.stroke(); c.setLineDash([]);
      c.fillStyle = 'rgba(243,217,160,.9)'; c.beginPath(); c.moveTo(hx, hy + 14); c.lineTo(hx - 9, hy + 2); c.lineTo(hx + 9, hy + 2); c.fill();
      c.font = `${Math.round(Math.min(46, W / 9))}px sans-serif`; c.textAlign = 'center'; c.textBaseline = 'top';
      c.fillText('👆', hx + 18, hy + 4);
      c.restore();
    }
  }
  function draw(c) {
    c.drawImage(sky, -curveAt(30) * 8 - 20, 0, W + 40, HOR + 2);
    drawTrack(c);
    const items = decor.concat(objs).filter((o) => o.z - d < FAR && o.z - d > -1.4).sort((a, b) => b.z - a.z);
    let drawn = false;
    const sr = slingZ - d;
    if (sr > -2.3 && sr < FAR) items.push({ sling: true, z: slingZ }), items.sort((a, b) => b.z - a.z);
    for (const o of items) { if (!drawn && o.z - d < 0) { drawPlayer(c); drawBands(c); drawn = true; } o.sling ? drawPosts(c) : o.side ? drawDecor(c, o) : drawObj(c, o); }
    if (!drawn) { drawPlayer(c); drawBands(c); }
    for (const p of parts) { c.globalAlpha = Math.max(0, p.life / p.max); c.fillStyle = p.col; c.fillRect(p.x, p.y, p.sz, p.sz); }
    c.globalAlpha = 1;
    if (speed > 27 && alive && phase === 'go') {
      c.strokeStyle = 'rgba(255,255,255,.35)'; c.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) { const a = (i / 6) * 6.283 + t * 0.7, r0 = Math.max(W, H) * 0.42, r1 = r0 + 40 + (speed - 27) * 3, cx = W / 2, cy = H * 0.55; c.beginPath(); c.moveTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); c.lineTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); c.stroke(); }
    }
    for (const f of floats) { c.globalAlpha = Math.min(1, f.life * 2); txt(c, f.text, f.x, f.y, f.big ? Math.min(26, W / 14) : 18, f.col); }
    c.globalAlpha = 1;
    if (shield > 0 || magnet > 0) txt(c, `SHIELD + MAGNET  ${Math.ceil(Math.max(shield, magnet))}s`, W / 2, H - 28, 15, '#7dff4f', 4);
    if (boostT > 0 && phase === 'go' && alive) { const bw = Math.min(W * 0.5, 200), x = (W - bw) / 2, y = H - 54; c.fillStyle = 'rgba(6,6,8,.6)'; rr(c, x - 4, y - 4, bw + 8, 14, 7); c.fill(); c.fillStyle = '#ff8a3d'; rr(c, x, y, bw * Math.max(0, boostT / boostMax), 6, 3); c.fill(); txt(c, '🚀 LAUNCH BOOST', W / 2, y - 14, 14, GOLD2, 4); }
    if (phase === 'aim' && api.playing()) drawAim(c);
    if (flash > 0) { c.fillStyle = `rgba(255,255,255,${flash * 0.6})`; c.fillRect(0, 0, W, H); }
  }
  function launch(pw, tapOnly) {
    phase = 'go';
    power = Math.max(0.1, Math.min(1, pw));               // tiny tap = minimum power; pull is capped at 100 %
    const perfect = power >= SL_PERFECT;
    launchSpeed = speed = 14 + power * 18 + (perfect ? 8 : 0);
    boostMax = boostT = Math.min(3.4, 0.5 + power * 2.2 + (perfect ? 0.7 : 0)); // more pull = longer LAUNCH boost
    sl.rel = sl.dx; sl.relPull = sl.pull; sl.snapT = 0; slingZ = d + 1.2; sl.drag = false; sl.pull = 0;
    if (perfect) { bonus += 100; float('PERFECT LAUNCH! +100', W / 2, H * 0.45, '#7dff4f', true); api.shake(8); vib([20, 30, 40]); burst(W / 2, H * 0.8, 46, '#7dff4f', 320, 5); }
    else float(power > 0.6 ? 'GOOD LAUNCH!' : 'GO!', W / 2, H * 0.45, GOLD2, true);
    if (tapOnly) float('Tip: peeche khicho aur chhodo!', W / 2, H * 0.52, GOLD2, false);
    else if (power >= 0.25 && !hintSeen) { hintSeen = true; try { localStorage.setItem('hxa_sling_seen', '1'); } catch (e) {} }
    SFX.go(); beep(220 + power * 500, 0.22, 'sawtooth', 0.045, 700); vib(perfect ? 0 : 15);
    burst(W / 2, H * 0.8, 30, '#ff8a3d', 260, 4);
  }
  // touch / mouse drag for the gulel; returns true when it consumed the pointer event
  function ptr(type, x, y) {
    if (!alive || phase !== 'aim' || !api.playing()) return false;
    if (type === 'down') { Object.assign(sl, { drag: true, sx: x, sy: y, pull: 0, dx: 0, step: 0, idleT: 0 }); beep(500, 0.04, 'triangle', 0.03); return true; }
    if (!sl.drag) return type !== 'up';
    if (type === 'move') {
      const pull = Math.max(0, Math.min(1, (y - sl.sy) / (H * 0.26)));
      sl.pull = pull; sl.dx = Math.max(-W * 0.06, Math.min(W * 0.06, (x - sl.sx) * 0.25));
      const step = pull >= SL_PERFECT ? 5 : Math.floor(pull * 5);
      if (step !== sl.step) { // stretchy rope ticks: rising pitch, tiny buzz, perfect zone gets a stronger one
        if (step > sl.step) { beep(260 + step * 110, 0.05, 'triangle', 0.035); vib(step === 5 ? 25 : 6); if (step === 5) { const g = proj(px, 0, 0); burst(g.x, g.y + H * 0.1, 10, '#7dff4f', 120, 3); } }
        sl.step = step;
      }
      return true;
    }
    if (type === 'up') { const p = sl.pull; launch(p, p < 0.06); return true; }
    if (type === 'cancel') { sl.drag = false; sl.pull = 0; sl.dx = 0; sl.step = 0; return true; }
    return true;
  }
  function input(type, x) {
    if (!alive || type === 'move') return;
    if (phase === 'aim') { // keyboard: ↓ pulls the gulel back, any other key releases it
      if (type === 'down') { sl.pull = Math.min(1, sl.pull + 0.25); sl.step = sl.pull >= SL_PERFECT ? 5 : Math.floor(sl.pull * 5); beep(260 + sl.step * 110, 0.05, 'triangle', 0.035); return; }
      launch(sl.pull, sl.pull < 0.06); return;
    }
    if (type === 'tap') type = x < W * 0.34 ? 'left' : x > W * 0.66 ? 'right' : 'up';
    if (type === 'left' && lane > -1) { lane--; SFX.lane(); }
    else if (type === 'right' && lane < 1) { lane++; SFX.lane(); }
    else if (type === 'up' && py === 0) { vy = 11.5; py = 0.01; SFX.jump(); }
    else if (type === 'down' && py > 0) vy = -22;
  }
  function revive() {
    alive = true; deadT = 0; shield = 3; py = 0; vy = 0; flash = 0;
    objs = objs.filter((o) => o.z - d > 30); nextRow = Math.max(nextRow, d + 30);
    speed = Math.max(15, speed * 0.8);
    float('BACK IN! ❤', W / 2, H * 0.45, '#7dff4f', true);
  }
  function idle(dt) { t += dt; if (phase === 'aim') slingZ = d + 1.2; if (alive) { d += 6 * dt; while (nextDecor < d + FAR + 10) addDecor(); decor = decor.filter((o) => o.z - d > -3); } updParts(dt); }
  return {
    resize, reset, update, draw, input, ptr, revive, idle,
    dbg: () => ({ phase, lane, py, speed, launchSpeed, power, boostT, d, pull: sl.pull }),
    hud: () => ({ big: score().toLocaleString('en-IN'), small: phase === 'aim' ? 'PULL BACK & RELEASE' : `${Math.floor(d)} M  ·  ${coins} COINS` }),
    result: () => ({ score: score(), line: `${Math.floor(d)} m slid · ${coins} coins · ${promos} logo pickups · top speed ${Math.round(maxSpeed * 3.6)} km/h` })
  };
}

/* =========================================================
   GAME 2 — HEYY JUMP (tap-to-fly through neon towers)
   ========================================================= */
function makeJump(api) {
  let W, H, sky, groundY, bird, pipes, items, t, sc, started, alive, deadT, parts, floats, dist, nextX, promos;
  let towerCv = null;
  function makeTower() {
    const pw = Math.max(58, W * 0.16), cvT = document.createElement('canvas'); cvT.width = Math.ceil(pw); cvT.height = Math.ceil(H);
    const c = cvT.getContext('2d'); c.fillStyle = '#0b0b0f'; c.fillRect(0, 0, pw, H);
    c.fillStyle = 'rgba(227,182,90,.16)'; let r = 3; for (let yy = 8; yy < H - 8; yy += 14) for (let xx = 8; xx < pw - 8; xx += 12) { r = (r * 9301 + 49297) % 233280; if (r / 233280 < 0.22) c.fillRect(xx, yy, 4, 5); }
    towerCv = cvT;
  }
  function resize(w, h) { W = w; H = h; groundY = H - Math.max(70, H * 0.1); sky = makeSky(W, H, groundY, 23); makeTower(); if (bird) { bird.x = W * 0.3; bird.r = Math.max(16, Math.min(W, H) * 0.045); } }
  function reset() { bird = { x: W * 0.3, y: H * 0.45, vy: 0, r: Math.max(16, Math.min(W, H) * 0.045) }; pipes = []; items = []; t = 0; sc = 0; started = false; alive = true; deadT = 0; parts = []; floats = []; dist = 0; nextX = W + 60; promos = 0; }
  function addPipe() {
    const gap = Math.max(H * 0.2, H * 0.29 - sc * H * 0.0025);
    const pw = Math.max(58, W * 0.16), minY = H * 0.16, maxY = groundY - gap - H * 0.08;
    const gy = minY + Math.random() * Math.max(10, maxY - minY);
    pipes.push({ x: nextX, w: pw, gy, gap, passed: false });
    if (Math.random() < 0.35) items.push({ x: nextX + pw / 2, y: gy + gap / 2, type: ['ig', 'yt', 'hx'][Math.floor(Math.random() * 3)], got: false });
    nextX += Math.max(W * 0.58, 230);
  }
  const burst = (x, y, n, col, sp = 180) => { for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = sp * (0.3 + Math.random()); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.6, max: 0.6, col, sz: 3 }); } };
  const float = (text, x, y, col, big) => floats.push({ text, x, y, life: 1.1, col, big });
  function upd(dt) { for (const p of parts) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 300 * dt; } parts = parts.filter((p) => p.life > 0); for (const f of floats) { f.life -= dt; f.y -= 40 * dt; } floats = floats.filter((f) => f.life > 0); }
  function die() { if (!alive) return; alive = false; deadT = 0; bird.vy = -H * 0.4; api.shake(16); SFX.crash(); vib([50, 30, 90]); burst(bird.x, bird.y, 30, GOLD, 260); }
  function update(dt) {
    t += dt;
    if (!alive) { deadT += dt; bird.vy += H * 2.4 * dt; bird.y = Math.min(groundY - bird.r, bird.y + bird.vy * dt); upd(dt); if (deadT > 0.8 && deadT - dt <= 0.8) api.over(); return; }
    if (!started) { bird.y = H * 0.45 + Math.sin(t * 3) * 10; upd(dt); return; }
    const spd = H * 0.3 + Math.min(H * 0.16, sc * H * 0.006);
    bird.vy += H * 2.0 * dt; bird.y += bird.vy * dt;
    const dx = spd * dt; dist += dx; nextX -= dx;
    while (nextX < W + 80) addPipe();
    for (const p of pipes) {
      p.x -= dx;
      if (!p.passed && p.x + p.w < bird.x - bird.r) { p.passed = true; sc++; SFX.tick(); if (sc % 10 === 0) { float(sc + '!  🔥', W / 2, H * 0.3, '#7dff4f', true); SFX.promo(); } }
      if (bird.x + bird.r * 0.8 > p.x && bird.x - bird.r * 0.8 < p.x + p.w && (bird.y - bird.r * 0.8 < p.gy || bird.y + bird.r * 0.8 > p.gy + p.gap)) die();
    }
    for (const it of items) {
      it.x -= dx;
      if (!it.got && Math.hypot(it.x - bird.x, it.y - bird.y) < bird.r * 1.8) { it.got = true; promos++; sc += 3; SFX.promo(); vib(20); float(it.type === 'ig' ? '+3 FOLLOW @heyyy.anixx_' : it.type === 'yt' ? '+3 SUBSCRIBE!' : '+3 HEYY!', W / 2, H * 0.36, it.type === 'ig' ? '#ff7ac0' : it.type === 'yt' ? '#ff5a6e' : GOLD2, true); burst(it.x, it.y, 16, GOLD); }
    }
    pipes = pipes.filter((p) => p.x + p.w > -10); items = items.filter((i) => i.x > -40 && !i.got);
    if (bird.y + bird.r > groundY || bird.y < -bird.r * 2) die();
    if (Math.random() < 0.5) parts.push({ x: bird.x - bird.r, y: bird.y + (Math.random() - 0.5) * 6, vx: -spd * 0.6, vy: 0, life: 0.3, max: 0.3, col: GOLD, sz: 3 });
    upd(dt);
  }
  function draw(c) {
    const par = (dist * 0.15) % W;
    c.drawImage(sky, -par, 0, W, groundY); c.drawImage(sky, W - par, 0, W, groundY);
    for (const p of pipes) {
      for (const [y0, y1] of [[0, p.gy], [p.gy + p.gap, groundY]]) {
        const hh = Math.max(1, Math.min(H, y1 - y0)); c.drawImage(towerCv, 0, 0, towerCv.width, hh, p.x, y0, p.w, hh);
        c.strokeStyle = GOLD; c.lineWidth = 3; c.strokeRect(p.x + 1.5, y0 - 2, p.w - 3, y1 - y0 + 4);
      }
      c.fillStyle = GOLD; c.fillRect(p.x - 6, p.gy - 14, p.w + 12, 14); c.fillRect(p.x - 6, p.gy + p.gap, p.w + 12, 14);
    }
    for (const it of items) { const b = Math.sin(t * 4 + it.x * 0.02) * 4; it.type === 'ig' ? drawIG(c, it.x, it.y + b, 15) : it.type === 'yt' ? drawYT(c, it.x, it.y + b, 14) : drawHX(c, it.x, it.y + b, 16); }
    c.fillStyle = '#0a0a0d'; c.fillRect(0, groundY, W, H - groundY);
    c.fillStyle = GOLD; c.fillRect(0, groundY, W, 3);
    c.fillStyle = 'rgba(227,182,90,.35)'; const go = dist % 40; for (let x = -go; x < W; x += 40) c.fillRect(x, groundY + 14, 20, 3);
    c.fillStyle = 'rgba(243,217,160,.55)'; c.font = `13px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('IG @heyyy.anixx_   ·   YT @smart_anish69', W / 2, groundY + Math.min(40, (H - groundY) / 2 + 8));
    for (const p of parts) { c.globalAlpha = Math.max(0, p.life / p.max); c.fillStyle = p.col; c.fillRect(p.x, p.y, p.sz, p.sz); }
    c.globalAlpha = 1;
    const r = bird.r, rot = alive ? Math.max(-0.5, Math.min(1.1, bird.vy / (H * 1.2))) : deadT * 8;
    c.save(); c.translate(bird.x, bird.y); c.rotate(rot);
    const flap = Math.sin(t * (started ? 22 : 8));
    c.fillStyle = '#fff1c9'; c.beginPath(); c.ellipse(-r * 0.3, -r * 0.1 - flap * r * 0.35, r * 0.75, r * 0.32, -0.5 - flap * 0.4, 0, 6.283); c.fill();
    drawHX(c, 0, 0, r * 1.05);
    c.fillStyle = '#fff'; c.beginPath(); c.arc(r * 0.45, -r * 0.35, r * 0.2, 0, 6.283); c.fill(); c.fillStyle = INK; c.beginPath(); c.arc(r * 0.52, -r * 0.35, r * 0.09, 0, 6.283); c.fill();
    c.restore();
    for (const f of floats) { c.globalAlpha = Math.min(1, f.life * 2); txt(c, f.text, f.x, f.y, f.big ? Math.min(24, W / 15) : 18, f.col); }
    c.globalAlpha = 1;
    if (!started && api.playing()) txt(c, 'TAP TO FLY', W / 2, H * 0.62, 30, '#fff', 6);
  }
  function input(type) { if (!alive || type === 'move') return; if (!started) started = true; bird.vy = -H * 0.62; SFX.jump(); }
  function revive() { alive = true; started = false; bird.y = H * 0.45; bird.vy = 0; pipes = pipes.filter((p) => p.x > W * 0.75); items = []; nextX = Math.max(nextX, W + 60); }
  return {
    resize, reset, update, draw, input, revive, tapOnDown: true,
    idle: (dt) => { t += dt; if (alive && !started) bird.y = H * 0.45 + Math.sin(t * 3) * 10; dist += 40 * dt; upd(dt); },
    hud: () => ({ big: String(sc), small: started ? `${promos} LOGOS` : 'GET READY' }),
    result: () => ({ score: sc, line: `${sc} points · ${promos} logo pickups` })
  };
}

/* =========================================================
   GAME 3 — HEYY STACK (tap-timing tower builder)
   ========================================================= */
function makeStack(api) {
  const PAL = ['#e3b65a', '#f0c46d', '#f7d58a', '#ffb347', '#ff8a3d', '#ff5f6d', '#d62976', '#a33ad1', '#5b5bd6', '#3e8fd6', '#22d3c5', '#7dff4f'];
  let W, H, sky, bh, tower, cur, dir, spd, camY, camT, debris, floats, parts, sc, perfects, streak, alive, deadT, t, started, baseY;
  function resize(w, h) { W = w; H = h; bh = Math.max(26, Math.round(H * 0.042)); baseY = H * 0.78; sky = makeSky(W, H, H * 0.62, 41); }
  function reset() {
    const w0 = Math.min(W * 0.62, 300);
    tower = [{ x: (W - w0) / 2, w: w0, col: PAL[0] }];
    debris = []; floats = []; parts = []; sc = 0; perfects = 0; streak = 0; alive = true; deadT = 0; t = 0; camY = 0; camT = 0; started = false; spd = W * 0.55;
    newBlock();
  }
  function newBlock() {
    const top = tower[tower.length - 1];
    dir = tower.length % 2 ? 1 : -1;
    cur = { x: dir > 0 ? Math.max(-top.w * 0.6, top.x - W * 0.42) : Math.min(W - top.w * 0.4, top.x + W * 0.42), w: top.w, col: PAL[tower.length % PAL.length] };
    spd = Math.min(W * 1.25, W * 0.55 + tower.length * W * 0.018);
  }
  const yOf = (i) => baseY - (i + 1) * bh + camY;
  const float = (text, x, y, col, big) => floats.push({ text, x, y, life: 1.1, col, big });
  function drop() {
    const top = tower[tower.length - 1];
    const l = Math.max(cur.x, top.x), r = Math.min(cur.x + cur.w, top.x + top.w);
    const ov = r - l;
    if (ov <= 0) { // missed entirely
      debris.push({ x: cur.x, y: yOf(tower.length), w: cur.w, vy: 0, vr: (Math.random() - 0.5) * 3, rot: 0, col: cur.col });
      alive = false; deadT = 0; cur = null; SFX.crash(); api.shake(14); vib([60, 40, 100]); return;
    }
    const y = yOf(tower.length);
    if (Math.abs(cur.x - top.x) < Math.max(4, W * 0.012)) { // perfect
      streak++; perfects++;
      const grow = streak >= 3 ? Math.min(W * 0.04, W * 0.7 - top.w) : 0;
      const nw = top.w + Math.max(0, grow);
      tower.push({ x: top.x - Math.max(0, grow) / 2, w: nw, col: cur.col });
      sc += 2; SFX.perfect(streak); vib(15);
      float(streak >= 3 ? `PERFECT x${streak}  +GROW` : `PERFECT x${streak}`, W / 2, y - 30, '#7dff4f', true);
      for (let i = 0; i < 18; i++) parts.push({ x: top.x + Math.random() * nw, y: y + bh / 2, vx: (Math.random() - 0.5) * 200, vy: -Math.random() * 220, life: 0.6, max: 0.6, col: '#fff1c9', sz: 3 });
    } else {
      streak = 0;
      const cutX = cur.x < top.x ? cur.x : r, cutW = cur.w - ov;
      debris.push({ x: cutX, y, w: cutW, vy: 0, vr: (cur.x < top.x ? -1 : 1) * (1 + Math.random() * 2), rot: 0, col: cur.col });
      tower.push({ x: l, w: ov, col: cur.col });
      sc += 1; SFX.stack(tower.length);
    }
    const n = tower.length - 1;
    if (n % 10 === 0) { float(n % 20 === 0 ? 'SUBSCRIBE @smart_anish69 🔥' : 'FOLLOW @heyyy.anixx_ 🔥', W / 2, y - 60, GOLD2, true); SFX.promo(); }
    camT = Math.max(0, (tower.length - 7) * bh);
    newBlock();
  }
  function update(dt) {
    t += dt;
    camY += (camT - camY) * Math.min(1, dt * 6);
    for (const b of debris) { b.vy += 1400 * dt; b.y += b.vy * dt; b.rot += b.vr * dt; }
    debris = debris.filter((b) => b.y < H + 200);
    for (const p of parts) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; } parts = parts.filter((p) => p.life > 0);
    for (const f of floats) { f.life -= dt; f.y -= 40 * dt; } floats = floats.filter((f) => f.life > 0);
    if (!alive) { deadT += dt; if (deadT > 0.9 && deadT - dt <= 0.9) api.over(); return; }
    if (!started || !cur) return;
    cur.x += dir * spd * dt;
    if (cur.x > W - cur.w * 0.15 && dir > 0) dir = -1; else if (cur.x < -cur.w * 0.85 && dir < 0) dir = 1;
  }
  function slab(c, x, y, w, col, label) {
    const d = Math.min(12, bh * 0.4);
    c.fillStyle = col; c.fillRect(x, y, w, bh);
    c.fillStyle = 'rgba(255,255,255,.35)'; c.beginPath(); c.moveTo(x, y); c.lineTo(x + d, y - d * 0.6); c.lineTo(x + w + d, y - d * 0.6); c.lineTo(x + w, y); c.fill();
    c.fillStyle = 'rgba(0,0,0,.28)'; c.beginPath(); c.moveTo(x + w, y); c.lineTo(x + w + d, y - d * 0.6); c.lineTo(x + w + d, y + bh - d * 0.6); c.lineTo(x + w, y + bh); c.fill();
    c.fillStyle = 'rgba(0,0,0,.18)'; c.fillRect(x, y + bh - 3, w, 3);
    if (label && w > 90) { c.fillStyle = 'rgba(6,6,8,.75)'; c.font = `${Math.round(bh * 0.5)}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(label, x + w / 2, y + bh / 2 + 1); }
  }
  function draw(c) {
    c.fillStyle = '#060608'; c.fillRect(0, 0, W, H);
    const skyShift = Math.min(H * 0.5, camY * 0.25);
    c.drawImage(sky, 0, skyShift, W, H * 0.62);
    c.fillStyle = '#07050b'; c.fillRect(0, H * 0.62 + skyShift - 1, W, H);
    const stars = Math.min(1, camY / (H * 2));
    if (stars > 0) { c.fillStyle = `rgba(6,6,8,${stars * 0.7})`; c.fillRect(0, 0, W, H * 0.62 + skyShift); }
    // ground plinth
    const gy = baseY + camY;
    if (gy < H) { c.fillStyle = '#121218'; c.fillRect(0, gy, W, H - gy); c.fillStyle = GOLD; c.fillRect(0, gy, W, 3); }
    const first = Math.max(0, Math.floor((camY - (H - baseY)) / bh) - 2);
    for (let i = first; i < tower.length; i++) { const b = tower[i], y = yOf(i); if (y > H + bh) continue; if (y < -bh * 2) break; slab(c, b.x, y, b.w, b.col, i && i % 10 === 0 ? (i % 20 === 0 ? 'YT @smart_anish69' : 'IG @heyyy.anixx_') : i === 0 ? 'HEYYANIXX' : ''); }
    if (cur && alive) slab(c, cur.x, yOf(tower.length), cur.w, cur.col);
    for (const b of debris) { c.save(); c.translate(b.x + b.w / 2, b.y + bh / 2); c.rotate(b.rot); c.fillStyle = b.col; c.fillRect(-b.w / 2, -bh / 2, b.w, bh); c.restore(); }
    for (const p of parts) { c.globalAlpha = Math.max(0, p.life / p.max); c.fillStyle = p.col; c.fillRect(p.x, p.y, p.sz, p.sz); }
    c.globalAlpha = 1;
    for (const f of floats) { c.globalAlpha = Math.min(1, f.life * 2); txt(c, f.text, f.x, f.y, f.big ? Math.min(24, W / 16) : 18, f.col); }
    c.globalAlpha = 1;
    if (!started && api.playing()) txt(c, 'TAP TO DROP THE BLOCK', W / 2, H * 0.3, 26, '#fff', 6);
  }
  function input(type) { if (!alive || type === 'move') return; if (!started) { started = true; return; } drop(); }
  return {
    resize, reset, update, draw, input, tapOnDown: true,
    idle: (dt) => { t += dt; if (cur && !started) { cur.x += dir * spd * 0.5 * dt; if (cur.x > W - cur.w * 0.15) dir = -1; else if (cur.x < -cur.w * 0.85) dir = 1; } },
    hud: () => ({ big: String(sc), small: started ? `${tower.length - 1} BLOCKS · ${perfects} PERFECT` : 'GET READY' }),
    result: () => ({ score: sc, line: `${tower.length - 1} blocks high · ${perfects} perfect drops` })
  };
}

/* =========================================================
   GAME 4 — AIM RUSH 30s (Free Fire-style reaction trainer)
   ========================================================= */
function makeAim(api) {
  const DUR = 30;
  let W, H, targets, t, left, sc, hits, shots, heads, combo, bestC, cx, cy, spread, spawnT, parts, floats, started, ended, bg;
  function resize(w, h) { W = w; H = h; bg = null; if (cx == null) { cx = W / 2; cy = H * 0.55; } }
  function reset() { targets = []; t = 0; left = DUR; sc = 0; hits = 0; shots = 0; heads = 0; combo = 0; bestC = 0; spread = 0; spawnT = 0.3; parts = []; floats = []; started = false; ended = false; cx = W / 2; cy = H * 0.55; }
  function spawn() {
    const prog = 1 - left / DUR, promo = Math.random() < 0.09;
    const r = promo ? Math.min(W, H) * 0.075 : Math.min(W, H) * (0.11 - prog * 0.035) * (0.85 + Math.random() * 0.3);
    const top = 100, bot = H - 40;
    for (let k = 0; k < 8; k++) {
      const x = r + 10 + Math.random() * (W - 2 * r - 20), y = top + r * 1.2 + Math.random() * Math.max(10, bot - top - 2.4 * r);
      if (targets.every((o) => Math.hypot(o.x - x, o.y - y) > o.r + r + 12)) { targets.push({ x, y, r, age: 0, life: promo ? 1.7 : 1.55 - prog * 0.7, type: promo ? (Math.random() < 0.5 ? 'ig' : 'yt') : 'dummy', vx: prog > 0.4 ? (Math.random() - 0.5) * W * 0.25 : 0 }); return; }
    }
  }
  function update(dt, real) {
    t += dt;
    for (const p of parts) { p.life -= dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 500 * dt; } parts = parts.filter((p) => p.life > 0);
    for (const f of floats) { f.life -= dt; f.y -= 45 * dt; } floats = floats.filter((f) => f.life > 0);
    spread = Math.max(0, spread - dt * 60);
    if (!started || ended) return;
    const pl = left; left -= (real || dt);
    if (left <= 0) { left = 0; ended = true; targets = []; SFX.go(); setTimeout(() => api.over(), 450); return; }
    if (left < 5 && Math.ceil(left) !== Math.ceil(pl)) SFX.tick();
    spawnT -= dt;
    const prog = 1 - left / DUR;
    if (spawnT <= 0) { spawn(); if (prog > 0.5 && Math.random() < 0.35) spawn(); spawnT = 0.62 - prog * 0.3; }
    for (const o of targets) { o.age += dt; o.x += o.vx * dt; if (o.x < o.r || o.x > W - o.r) o.vx *= -1; }
    const n = targets.length; targets = targets.filter((o) => o.age < o.life); if (targets.length < n) combo = 0;
  }
  function shoot(x, y) {
    cx = x; cy = y; shots++; spread = 14; SFX.shot();
    let hit = null, dmin = 1e9;
    for (const o of targets) { const m = Math.min(Math.hypot(o.x - x, o.y - y), o.type === 'dummy' ? Math.hypot(o.x - x, o.y - o.r * 0.55 - y) : 1e9); if (m < o.r * 1.15 && m < dmin) { dmin = m; hit = o; } }
    if (!hit) { combo = 0; SFX.miss(); floats.push({ text: 'MISS', x, y: y - 22, life: 0.6, col: '#ff6a76' }); return; }
    targets.splice(targets.indexOf(hit), 1);
    hits++; combo++; bestC = Math.max(bestC, combo);
    const mult = 1 + Math.floor(combo / 5);
    let pts, label, col;
    if (hit.type !== 'dummy') { pts = 5 * mult; label = hit.type === 'ig' ? `+${pts} FOLLOW!` : `+${pts} SUB!`; col = hit.type === 'ig' ? '#ff7ac0' : '#ff5a6e'; SFX.promo(); }
    else if (Math.hypot(hit.x - x, hit.y - hit.r * 0.55 - y) < hit.r * 0.42) { heads++; pts = 3 * mult; label = `HEADSHOT +${pts}`; col = '#ffd84d'; SFX.head(); vib(15); api.shake(4); }
    else { pts = mult; label = `+${pts}`; col = '#fff'; SFX.pop(); }
    sc += pts;
    floats.push({ text: label + (mult > 1 ? `  x${mult}` : ''), x: hit.x, y: hit.y - hit.r, life: 0.9, col, big: true });
    for (let i = 0; i < 14; i++) { const a = Math.random() * 6.283, v = 120 + Math.random() * 200; parts.push({ x: hit.x, y: hit.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.5, max: 0.5, col: hit.type === 'dummy' ? GOLD : '#fff', sz: 3 }); }
  }
  function drawTarget(c, o) {
    const pop = Math.min(1, o.age * 8), fade = o.age > o.life - 0.2 ? (o.life - o.age) / 0.2 : 1, r = o.r * pop;
    if (r <= 0.5) return;
    c.globalAlpha = Math.max(0, fade);
    if (o.type === 'ig') drawIG(c, o.x, o.y, r * 0.8);
    else if (o.type === 'yt') drawYT(c, o.x, o.y, r * 0.75);
    else {
      c.fillStyle = '#1b1b22'; rr(c, o.x - r * 0.62, o.y - r * 0.15, r * 1.24, r * 1.15, r * 0.3); c.fill();
      c.strokeStyle = GOLD; c.lineWidth = Math.max(2, r * 0.07); c.stroke();
      c.fillStyle = GOLD; c.font = `${Math.max(6, Math.round(r * 0.42))}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HX', o.x, o.y + r * 0.42);
      const hy = o.y - r * 0.55;
      [[0.42, '#f3f3f6'], [0.28, '#ff2a3a'], [0.15, '#f3f3f6'], [0.06, '#ff2a3a']].forEach(([k, col]) => { c.fillStyle = col; c.beginPath(); c.arc(o.x, hy, r * k, 0, 6.283); c.fill(); });
      c.strokeStyle = 'rgba(227,182,90,.85)'; c.lineWidth = 3; c.beginPath(); c.arc(o.x, o.y + r * 0.1, r * 1.05, -Math.PI / 2, -Math.PI / 2 + 6.283 * Math.max(0, 1 - o.age / o.life)); c.stroke();
    }
    c.globalAlpha = 1;
  }
  function draw(c) {
    if (!bg) { bg = c.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0b0710'); bg.addColorStop(0.55, '#1a0e24'); bg.addColorStop(1, '#060608'); }
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    const hor = H * 0.42; c.strokeStyle = 'rgba(227,182,90,.22)'; c.lineWidth = 1;
    for (let i = -10; i <= 10; i++) { c.beginPath(); c.moveTo(W / 2 + i * 12, hor); c.lineTo(W / 2 + i * W * 0.22, H); c.stroke(); }
    for (let k = 0; k < 10; k++) { const q = (k + (t * 0.6) % 1) / 10, y = hor + (H - hor) * q * q; c.beginPath(); c.moveTo(0, y); c.lineTo(W, y); c.stroke(); }
    c.fillStyle = 'rgba(227,182,90,.08)'; c.font = `${Math.round(W * 0.2)}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('HEYY', W / 2, hor - W * 0.08);
    for (const o of targets) drawTarget(c, o);
    for (const p of parts) { c.globalAlpha = Math.max(0, p.life / p.max); c.fillStyle = p.col; c.fillRect(p.x, p.y, p.sz, p.sz); }
    c.globalAlpha = 1;
    for (const f of floats) { c.globalAlpha = Math.min(1, f.life * 2.5); txt(c, f.text, f.x, f.y, f.big ? 22 : 16, f.col); }
    c.globalAlpha = 1;
    if (started) { c.fillStyle = 'rgba(255,255,255,.12)'; c.fillRect(0, H - 6, W, 6); c.fillStyle = left < 5 ? '#ff2a3a' : GOLD; c.fillRect(0, H - 6, W * left / DUR, 6); }
    const gp = 7 + spread, L = 12;
    c.strokeStyle = '#7dff4f'; c.lineWidth = 2.5; c.lineCap = 'butt';
    c.beginPath(); c.moveTo(cx - gp - L, cy); c.lineTo(cx - gp, cy); c.moveTo(cx + gp, cy); c.lineTo(cx + gp + L, cy); c.moveTo(cx, cy - gp - L); c.lineTo(cx, cy - gp); c.moveTo(cx, cy + gp); c.lineTo(cx, cy + gp + L); c.stroke();
    c.fillStyle = '#7dff4f'; c.fillRect(cx - 1.5, cy - 1.5, 3, 3);
    if (!started && api.playing()) txt(c, 'TAP ANYWHERE TO START', W / 2, H * 0.72, Math.min(26, W / 15), '#fff', 6);
  }
  function input(type, x, y) {
    if (type === 'move') { if (x != null) { cx = x; cy = y; } return; }
    if (ended) return;
    if (!started) { started = true; SFX.go(); spawn(); return; }
    if (type === 'tap' && x != null) shoot(x, y); else shoot(cx, cy);
  }
  return {
    resize, reset, update, draw, input, tapOnDown: true,
    idle: (dt) => { t += dt; },
    hud: () => ({ big: String(sc), small: started ? `${Math.ceil(left)}s  ·  COMBO x${combo}` : '30 SECONDS' }),
    result: () => ({ score: sc, line: `${hits}/${shots} hits · ${shots ? Math.round(hits / shots * 100) : 0}% accuracy · ${heads} headshots · best combo ${bestC}` })
  };
}

const GAMES = {
  sled: { title: 'HEYY SLED RUSH', icon: '🛷', eyebrow: 'Endless rocket-sled runner', sub: 'Launch your rocket sled, dodge ice blocks & snowmen, grab coins and IG / YT logos for bonus points.', how: ['👇 Start: sled ko peeche khicho & chhodo', '👆 Swipe ← → lanes', '⬆ Swipe up = jump', '📱 Or tap left / middle / right'], make: makeSled, tag: 'MOST PLAYED' },
  stack: { title: 'HEYY STACK', icon: '🧱', eyebrow: 'One-tap tower builder', sub: 'Drop each block right on top. Perfect drops chain combos and grow the tower back. How high can you go?', how: ['👆 Tap to drop', '🎯 3 perfects = block grows'], make: makeStack, tag: 'ADDICTIVE' },
  jump: { title: 'HEYY JUMP', icon: '🪽', eyebrow: 'Tap-to-fly challenge', sub: 'Tap to fly the golden H through the neon towers. Logos = +3. One mistake and it’s over.', how: ['👆 Tap / Space to flap', '🏆 +1 per tower'], make: makeJump, tag: 'RAGE GAME' },
  aim: { title: 'AIM RUSH 30s', icon: '🎯', eyebrow: 'Free Fire-style aim trainer', sub: '30 seconds. Tap the dummies before they vanish. Headshots = x3, every 5-hit combo adds a multiplier.', how: ['🎯 Tap targets', '💥 Head = HEADSHOT', '⏱ 30 sec'], make: makeAim, tag: 'PRO AIM' }
};

/* ---------- shell ---------- */
let root, cv, ctx, hud, hudBig, hudSmall, scr, toast, sndBtn;
let W = 0, H = 0, DPR = 1, mode = 'closed', gid = null, game = null, raf = 0, last = 0, shakeT = 0, shakeMag = 0, revivedRun = false, pushed = false, lastHud = '';
const best = (id) => { try { return +localStorage.getItem('hxa_best_' + id) || 0; } catch (e) { return 0; } };
const setBest = (id, v) => { try { localStorage.setItem('hxa_best_' + id, String(v)); } catch (e) {} };
const esc = (s) => String(s).replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const fmt = (n) => Number(n).toLocaleString('en-IN');
const api = { shake: (m) => { shakeMag = Math.max(shakeMag, m); shakeT = 0.35; }, over: () => gameOver(), playing: () => mode === 'play' };

function build() {
  root = document.createElement('div');
  root.className = 'hxa'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', 'HEYY Arcade mini games');
  root.innerHTML = `<canvas class="hxa__cv" aria-label="Game screen"></canvas>
  <div class="hxa__bar"><button class="hxa__ib" data-a="close" aria-label="Close games">✕</button><div class="hxa__hud"><b>0</b><small></small></div><button class="hxa__ib" data-a="pause" aria-label="Pause">❚❚</button><button class="hxa__ib" data-a="sound" aria-label="Sound on or off"></button></div>
  <div class="hxa__scr"></div><div class="hxa__toast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(root);
  cv = root.querySelector('canvas'); ctx = cv.getContext('2d', { alpha: false });
  hud = root.querySelector('.hxa__hud'); hudBig = hud.querySelector('b'); hudSmall = hud.querySelector('small');
  scr = root.querySelector('.hxa__scr'); toast = root.querySelector('.hxa__toast'); sndBtn = root.querySelector('[data-a=sound]');
  setSnd();
  root.addEventListener('click', onClick);
  ['wheel', 'touchmove', 'touchstart', 'pointerdown', 'mousemove'].forEach((ev) => root.addEventListener(ev, (e) => e.stopPropagation(), { passive: true }));
  cv.addEventListener('touchstart', (e) => { if (mode === 'play') e.preventDefault(); }, { passive: false }); // no double-tap zoom mid-game
  let pd = null;
  cv.addEventListener('pointerdown', (e) => {
    ac();
    pd = { x: e.clientX, y: e.clientY, t: performance.now(), sw: false };
    if (mode === 'play' && game && game.ptr && game.ptr('down', e.clientX, e.clientY)) { pd.sw = pd.sl = true; try { cv.setPointerCapture(e.pointerId); } catch (er) {} return; }
    if (mode === 'play' && game) { game.input('move', e.clientX, e.clientY); if (game.tapOnDown) { game.input('tap', e.clientX, e.clientY); pd.sw = true; } }
  });
  cv.addEventListener('pointermove', (e) => {
    if (mode !== 'play' || !game) return;
    if (pd && pd.sl) { game.ptr('move', e.clientX, e.clientY); return; }
    game.input('move', e.clientX, e.clientY);
    if (!pd || pd.sw) return;
    const dx = e.clientX - pd.x, dy = e.clientY - pd.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) > 24) { pd.sw = true; game.input(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'), e.clientX, e.clientY); }
  });
  cv.addEventListener('pointerup', (e) => { if (pd && pd.sl) { if (game && game.ptr) game.ptr('up', e.clientX, e.clientY); pd = null; return; } if (pd && !pd.sw && mode === 'play' && game && performance.now() - pd.t < 500) game.input('tap', e.clientX, e.clientY); pd = null; });
  cv.addEventListener('pointercancel', () => { if (pd && pd.sl && game && game.ptr) game.ptr('cancel', 0, 0); pd = null; });
  window.addEventListener('keydown', onKey, true);
  window.addEventListener('resize', resize);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', resize);
  window.addEventListener('blur', pause);
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  window.addEventListener('popstate', () => { if (mode !== 'closed') { pushed = false; close(true); } });
}
function setSnd() { sndBtn.textContent = soundOn ? '🔊' : '🔇'; sndBtn.setAttribute('aria-pressed', String(soundOn)); }
function showToast(m) { toast.textContent = m; toast.classList.add('on'); clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove('on'), 2000); }
function resize() {
  if (!root || root.hidden) return;
  const vv = window.visualViewport;
  const nw = Math.round(vv ? vv.width : innerWidth), nh = Math.round(vv ? vv.height : innerHeight);
  if (nw === W && nh === H && cv.width) return;
  W = nw; H = nh;
  DPR = Math.min(window.devicePixelRatio || 1, W * H > 600000 ? 1.25 : 1.75);
  cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (game) game.resize(W, H);
}
function screen(html) { scr.innerHTML = html; scr.hidden = false; scr.scrollTop = 0; const f = scr.querySelector('[data-focus]'); if (f) setTimeout(() => { try { f.focus({ preventScroll: true }); } catch (e) {} }, 40); }
function hideScreen() { scr.hidden = true; scr.innerHTML = ''; }
const chips = () => `<div class="hxa__chips"><a class="hxa__chip hxa__chip--ig" href="${IG}" target="_blank" rel="noopener">${ICON.ig} Follow @heyyy.anixx_</a><a class="hxa__chip hxa__chip--yt" href="${YT}" target="_blank" rel="noopener">${ICON.yt} Subscribe</a></div>`;
function setGame(id) { gid = id; game = GAMES[id].make(api); game.resize(W, H); game.reset(); lastHud = ''; if (root) root._dbg = () => game && game.dbg && game.dbg(); }
function showMenu() {
  setGame('sled'); mode = 'menu'; hud.style.visibility = 'hidden';
  screen(`<div class="hxa__card"><p class="hxa__eyebrow">HEYYANIXX presents</p><h2 class="hxa__title">HEYY ARCADE</h2><p class="hxa__sub">Free mini games. Beat your best and flex it on your story.</p>
  <div class="hxa__menu">${Object.entries(GAMES).map(([id, g], i) => `<button class="hxa__game" type="button" data-a="pick" data-g="${id}" ${i ? '' : 'data-focus'}><i aria-hidden="true">${g.icon}</i><span><b>${esc(g.title)}</b><small>${esc(g.eyebrow)}</small><em>${g.tag} · BEST ${fmt(best(id))}</em></span></button>`).join('')}</div>
  <a class="hxa__game" href="https://heyyanixx-learn.sites.tab.bot/" target="_blank" rel="noopener"><i aria-hidden="true">🎓</i><span><b>LEARN ARCADE</b><small>Learn coding, AI, typing & FF by playing</small><em>NEW · OPENS IN NEW TAB</em></span></a>
  <div style="height:14px"></div>${chips()}</div>`);
}
function showStart(id) {
  setGame(id); mode = 'start'; hud.style.visibility = 'hidden'; revivedRun = false;
  const g = GAMES[id], b = best(id);
  screen(`<div class="hxa__card"><p class="hxa__eyebrow">${esc(g.eyebrow)}</p><h2 class="hxa__title">${esc(g.title)}</h2><p class="hxa__sub">${esc(g.sub)}</p>
  <ul class="hxa__how">${g.how.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
  <button class="hxa__btn hxa__btn--play" type="button" data-a="play" data-focus>▶ PLAY</button>
  ${b ? `<p class="hxa__stats">Your best: <b style="color:${GOLD}">${fmt(b)}</b></p>` : ''}
  ${chips()}<div style="height:12px"></div><button class="hxa__btn hxa__btn--ghost" type="button" data-a="menu" style="min-height:44px;font-size:14px">🎮 All games</button></div>`);
}
function play() { if (!game) return; ac(); hideScreen(); hud.style.visibility = 'visible'; mode = 'play'; last = performance.now(); }
function pause() {
  if (mode !== 'play') return;
  mode = 'pause';
  screen(`<div class="hxa__card"><p class="hxa__pause">PAUSED</p><button class="hxa__btn hxa__btn--play" type="button" data-a="resume" data-focus>▶ RESUME</button><div class="hxa__row"><button class="hxa__btn hxa__btn--ghost" type="button" data-a="restart">↻ Restart</button><button class="hxa__btn hxa__btn--ghost" type="button" data-a="menu">🎮 All games</button></div>${chips()}</div>`);
}
function gameOver() {
  if (mode !== 'play') return;
  mode = 'over';
  const r = game.result(), b0 = best(gid), isNew = r.score > b0;
  if (isNew) setBest(gid, r.score);
  const g = GAMES[gid], canCont = !!game.revive && !revivedRun;
  scr.classList.add('hxa__scr--lock'); setTimeout(() => scr.classList.remove('hxa__scr--lock'), 750); // stray taps from frantic play don't hit buttons
  screen(`<div class="hxa__card"><p class="hxa__eyebrow">${esc(g.title)} · Game over</p>
  <div class="hxa__score"><div><span>Score</span><b>${fmt(r.score)}</b>${isNew && r.score > 0 ? '<span class="hxa__new">NEW BEST!</span>' : ''}</div><div><span>Best</span><b>${fmt(Math.max(b0, r.score))}</b></div></div>
  <p class="hxa__stats">${esc(r.line)}</p>
  <button class="hxa__btn hxa__btn--play" type="button" data-a="restart" data-focus>↻ PLAY AGAIN</button>
  ${canCont ? `<button class="hxa__btn hxa__btn--cont" type="button" data-a="cont">❤ I follow @heyyy.anixx_ · Continue once</button>` : ''}
  <div class="hxa__promo"><p>Enjoyed it? <b>Follow for Free Fire edits, AI & gaming content</b> 🔥</p>
  <a class="hxa__btn hxa__btn--ig" href="${IG}" target="_blank" rel="noopener">${ICON.ig} Follow on Instagram</a>
  <a class="hxa__btn hxa__btn--yt" href="${YT}" target="_blank" rel="noopener">${ICON.yt} Subscribe on YouTube</a>
  <a class="hxa__btn hxa__btn--short" href="${SHORTS}" target="_blank" rel="noopener">${ICON.short} Watch latest Short</a></div>
  <div class="hxa__row"><button class="hxa__btn hxa__btn--ghost" type="button" data-a="share">${ICON.share} Share score</button><button class="hxa__btn hxa__btn--ghost" type="button" data-a="menu">🎮 More games</button></div></div>`);
}
async function share() {
  const r = game ? game.result() : { score: 0 }, g = GAMES[gid] || GAMES.sled;
  const url = SITE + '#play-' + gid;
  const text = `I scored ${fmt(r.score)} in ${g.title} 🎮🔥 Can you beat me? Play free on HEYYANIXX:`;
  try { if (navigator.share) { await navigator.share({ title: g.title + ' · HEYYANIXX', text, url }); return; } } catch (e) { if (e && e.name === 'AbortError') return; }
  const full = text + ' ' + url;
  try { await navigator.clipboard.writeText(full); showToast('Score + link copied! Paste it in your story 🔥'); }
  catch (e) { const ta = document.createElement('textarea'); ta.value = full; ta.style.cssText = 'position:fixed;opacity:0;top:0'; root.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (_) {} ta.remove(); showToast(ok ? 'Link copied! 🔥' : url); }
}
function onClick(e) {
  const b = e.target.closest('[data-a]'); if (!b) return;
  const a = b.dataset.a;
  if (a === 'close') close();
  else if (a === 'sound') { soundOn = !soundOn; try { localStorage.setItem('hxa_snd', soundOn ? '1' : '0'); } catch (_) {} setSnd(); if (soundOn) SFX.coin(); }
  else if (a === 'pause') { if (mode === 'play') pause(); else if (mode === 'pause') play(); }
  else if (a === 'pick') showStart(b.dataset.g);
  else if (a === 'play' || a === 'resume') play();
  else if (a === 'restart') { setGame(gid); revivedRun = false; play(); }
  else if (a === 'menu') showMenu();
  else if (a === 'share') share();
  else if (a === 'cont') { revivedRun = true; game.revive(); play(); try { window.open(IG, '_blank', 'noopener'); } catch (_) {} }
}
function onKey(e) {
  if (mode === 'closed') return;
  const k = e.key;
  e.stopPropagation();
  if (k === 'Escape') { e.preventDefault(); if (mode === 'play') pause(); else close(); return; }
  if (mode === 'play' && game) {
    const map = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ArrowUp: 'up', w: 'up', W: 'up', ' ': 'up', ArrowDown: 'down', s: 'down', S: 'down', Enter: 'up' };
    if (k === 'p' || k === 'P') { pause(); return; }
    if (map[k]) { e.preventDefault(); game.input(map[k], W / 2, H / 2); }
  }
}
function loop(now) {
  raf = requestAnimationFrame(loop);
  const prevNow = loop.prev; loop.prev = now;
  const dt = Math.min(0.05, Math.max(0, (now - last) / 1000)); last = now;
  if (!game) return;
  if (mode === 'play') game.update(dt, Math.min(0.25, Math.max(0, (now - (prevNow || now)) / 1000))); else if (mode === 'menu' || mode === 'start') game.idle(dt);
  ctx.save();
  if (shakeT > 0) { shakeT -= dt; const m = shakeMag * Math.max(0, shakeT / 0.35); ctx.translate((Math.random() - 0.5) * m, (Math.random() - 0.5) * m); } else shakeMag = 0;
  game.draw(ctx);
  ctx.restore();
  if (mode === 'play' || mode === 'over') { const h = game.hud(), key = h.big + '|' + h.small; if (key !== lastHud) { lastHud = key; hudBig.textContent = h.big; hudSmall.textContent = h.small; } }
}
export function openArcade(id) {
  if (!root) build();
  if (mode === 'closed') root._ret = document.activeElement;
  if (mode === 'closed') root._y = window.scrollY;
  root.hidden = false; document.documentElement.classList.add('hxa-lock');
  try { if (window.lenis && window.lenis.stop) window.lenis.stop(); } catch (e) {}
  if (!pushed && mode === 'closed') { try { history.pushState({ hxa: 1 }, '', location.pathname + location.search + '#play' + (id ? '-' + id : '')); pushed = true; } catch (e) {} }
  W = 0; resize();
  if (id && GAMES[id]) showStart(id); else showMenu();
  cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(loop);
}
export function close(fromPop) {
  if (!root || mode === 'closed') return;
  mode = 'closed'; root.hidden = true; cancelAnimationFrame(raf); game = null; hideScreen();
  document.documentElement.classList.remove('hxa-lock');
  const y = root._y || 0;
  try { window.scrollTo(0, y); if (window.lenis && window.lenis.scrollTo) window.lenis.scrollTo(y, { immediate: true, force: true }); } catch (e) {}
  try { if (window.lenis && window.lenis.start) window.lenis.start(); } catch (e) {}
  requestAnimationFrame(() => { try { if (Math.abs(window.scrollY - y) > 4) window.scrollTo(0, y); } catch (e) {} });
  if (!fromPop && pushed) { pushed = false; try { history.back(); } catch (e) {} }
  else if (/^#play/.test(location.hash)) { try { history.replaceState(null, '', location.pathname + location.search + '#gaming'); } catch (e) {} }
  const r = root._ret; if (r && r.focus) try { r.focus({ preventScroll: true }); } catch (e) {}
}
export const games = Object.keys(GAMES);
