/* NK NINJA STEAM GAME — 2D chibi ninja platformer (Canvas 2D, 960x540 logical) */
(() => {
'use strict';
const W = 960, H = 540, GY = 470;
const cv = document.getElementById('game'), cx = cv.getContext('2d'), ov = document.getElementById('ov');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const AS = 'assets/';
const COL = { navy: '#081020', mid: '#0B1830', cyan: '#00E5FF', green: '#00FF90', blue: '#4DB8FF', purple: '#8B5CF6', red: '#FF3B5C', gold: '#FFD34E', white: '#fff' };

/* ---------- data ---------- */
const CH = [
  { id: 'ninja01', name: 'SHADOW BLADE', role: 'Balanced melee', spd: 1, jmp: 1, en: 1, dash: 1, trim: '#00FF90' },
  { id: 'ninja02', name: 'CYBER SAGE', role: 'Energy regen +50%', spd: .95, jmp: 1, en: 1.5, dash: 1, trim: '#00E5FF' },
  { id: 'ninja03', name: 'STORM EDGE', role: 'Faster run & dash', spd: 1.12, jmp: 1.05, en: 1, dash: 1.3, trim: '#B99BFF' }];
const LV = [
  { name: 'NINJA ACADEMY', sub: 'Introduction to STEAM', len: 4200, kind: 'moon', sky: ['#02030a', '#11152b'], acc: '#ffb7d5', gnd: ['#4a505e', '#1c1f27'], grav: 1250, gtxt: 'Sakura village: learn the basics', obs: ['rock'], boss: 'TRAINING GOLEM',
    qs: [{ tag: 'SCIENCE', q: 'What force pulls a jumping ninja back to the ground?', a: ['Gravity', 'Color', 'Sound', 'Light'], h: 'Think about the force pulling objects downward.' },
         { tag: 'TECHNOLOGY', q: 'Which part lets a robot sense how far an object is?', a: ['Distance sensor', 'Speaker', 'Paint', 'Label'], h: 'Sensors collect data from the world.' },
         { tag: 'MATHEMATICS', q: 'A ninja runs 3 m/s for 4 seconds. How far?', a: ['12 m', '7 m', '9 m', '1 m'], h: 'Distance = speed × time.' }] },
  { name: 'SCIENCE FOREST', sub: 'Motion · Energy · Physics', len: 4400, kind: 'mars', sky: ['#04140f', '#0d3b2a'], acc: '#00FF90', gnd: ['#2a4a2a', '#0b1a0e'], grav: 1350, gtxt: 'Misty forest: watch your timing', obs: ['rock', 'spike'], boss: 'FOREST SPIRIT',
    qs: [{ tag: 'SCIENCE', q: 'A thrown shuriken keeps flying straight until a force acts on it. This is…', a: ['Inertia', 'Condensation', 'Magnetism', 'Erosion'], h: 'Objects resist changes in motion.' },
         { tag: 'SCIENCE', q: 'At the top of a cliff, a ninja has the most…', a: ['Potential energy', 'Sound energy', 'Nuclear energy', 'Color energy'], h: 'Height stores energy because of gravity.' },
         { tag: 'ENGINEERING', q: 'Which shape makes a bridge frame rigid and strong?', a: ['Triangles', 'Loose ropes', 'Unbraced squares', 'Circles'], h: 'Engineers brace structures with this shape.' }] },
  { name: 'TECHNOLOGY LAB', sub: 'Coding · Sensors · Data', len: 4600, kind: 'station', sky: ['#03081a', '#0b2a4a'], acc: '#00E5FF', gnd: ['#2a3448', '#0c1222'], grav: 1450, gtxt: 'Neon lab: short, fast jumps', obs: ['spike', 'rock'], boss: 'ROGUE ROBOT',
    qs: [{ tag: 'TECHNOLOGY', q: 'Binary 101 equals which decimal number?', a: ['5', '3', '6', '10'], h: 'Place values: 4 + 0 + 1.' },
         { tag: 'ARTS', q: 'Which pair gives the strongest contrast for a game HUD?', a: ['Cyan on dark navy', 'Navy on dark blue', 'Gray on gray', 'Green on green'], h: 'Contrast = big difference in brightness.' },
         { tag: 'MATHEMATICS', q: 'Ignoring air, which launch angle gives the longest range?', a: ['45°', '0°', '90°', '10°'], h: 'Halfway between flat and straight up.' }] },
  { name: 'ENGINEERING CITY', sub: 'Structures · Systems · Optimization', len: 5200, kind: 'engineering', sky: ['#07101c', '#18384a'], acc: '#FFBF55', gnd: ['#566b78', '#172636'], grav: 1450, gtxt: 'Smart city: brace every structure', obs: ['gear', 'spike'], boss: 'TITAN CONSTRUCTOR',
    qs: [{ tag: 'ENGINEERING', q: 'What keeps a rectangular bridge frame from twisting?', a: ['A triangular cross-brace', 'A wider paint stripe', 'A longer road sign', 'A round lamp'], h: 'A triangle keeps its shape when forces push on it.' },
         { tag: 'ENGINEERING', q: 'A stronger beam costs more material. What is optimization?', a: ['Balance strength with material use', 'Always use the largest beam', 'Remove every support', 'Choose the cheapest paint'], h: 'A good design meets the load using resources wisely.' },
         { tag: 'TECHNOLOGY', q: 'Two pumps can each keep a water system running. This design adds…', a: ['Redundancy', 'Friction', 'Magnification', 'Decoration'], h: 'A backup system keeps working if one part fails.' }] },
  { name: 'MATHEMATICS SKY', sub: 'Geometry · Trajectory · Calculation', len: 5600, kind: 'math', sky: ['#100d2b', '#214b75'], acc: '#B99BFF', gnd: ['#45547b', '#151b3b'], grav: 1400, gtxt: 'Sky observatory: read each trajectory', obs: ['ring', 'spike'], boss: 'ORBITAL ORACLE',
    qs: [{ tag: 'MATHEMATICS', q: 'A right triangle has sides 3 and 4. What is its hypotenuse?', a: ['5', '6', '7', '8'], h: 'Use a² + b² = c².' },
         { tag: 'MATHEMATICS', q: 'A platform rises 120 units in 6 seconds. What is its average rate?', a: ['20 units/s', '12 units/s', '60 units/s', '720 units/s'], h: 'Divide the change in height by the time.' },
         { tag: 'MATHEMATICS', q: 'Using π ≈ 22/7, what is the circumference of a circle with radius 7?', a: ['44', '22', '49', '154'], h: 'Circumference = 2 × π × radius.' }] },
  { name: 'STEAM FUTURE CITY', sub: 'Science · Technology · Engineering · Arts · Mathematics', len: 6600, kind: 'final', sky: ['#070b20', '#29204d'], acc: '#6DF5E6', gnd: ['#426276', '#111a36'], grav: 1450, gtxt: 'Future city: combine every STEAM skill', obs: ['gear', 'ring', 'spike'], boss: 'STEAM CORE GUARDIAN',
    qs: [{ tag: 'SCIENCE', q: 'Which energy is stored in a charged battery?', a: ['Chemical energy', 'Sound energy', 'Kinetic energy', 'Light energy'], h: 'A battery stores energy in chemical reactions.' },
         { tag: 'TECHNOLOGY', q: 'A gate opens when a sensor reading is greater than 8. Which rule does that use?', a: ['IF reading > 8 THEN open', 'Open before reading', 'IF reading < 0 THEN close', 'Repeat without checking'], h: 'A condition checks sensor data before taking an action.' },
         { tag: 'ENGINEERING', q: 'Which support is most effective for a lightweight tower?', a: ['Triangular bracing', 'A single flat sheet', 'Unconnected posts', 'A loose cable'], h: 'Triangles distribute forces through a rigid frame.' },
         { tag: 'ARTS', q: 'Which pair makes a clear, energetic city display?', a: ['Cyan and warm orange', 'Gray on gray', 'Navy on black', 'Green on green'], h: 'Strong contrast helps important signals stand out.' },
         { tag: 'MATHEMATICS', q: 'What number completes the doubling pattern 2, 4, 8, 16, …?', a: ['32', '24', '18', '30'], h: 'Multiply the last number by 2.' }] }];

/* ---------- assets ---------- */
const IMG = {};
const load = (k, s) => new Promise(r => { const i = new Image(); i.onload = () => r(IMG[k] = i); i.onerror = () => r(IMG[k] = null); i.src = AS + s; });
const ready = Promise.all([
  ...CH.flatMap(c => [load(c.id, `characters/${c.id}/idle.png`), load(c.id + 'p', `characters/${c.id}/portrait.png`)]),
  ...['basic', 'shield', 'boss'].map(k => load(k, `enemies/${k}.png`)),
  ...['coin', 'heart', 'orb', 'crystal', 'shuriken'].map(k => load(k, `icons/${k}.svg`))]);

/* ---------- frame animation ---------- */
const pose = (armBack = 0, elbowBack = 0, armFront = 0, elbowFront = 0, legBack = 0, kneeBack = 0, legFront = 0, kneeFront = 0, bob = 0, lean = 0, blade = -58, weapon = false, tilt = 0) =>
  ({ armBack, elbowBack, armFront, elbowFront, legBack, kneeBack, legFront, kneeFront, bob, lean, blade, weapon, tilt });
const ANIM = {
  idle: { fps: 4, loop: true, frames: [pose(-46, 38, 46, -38, -8, 12, 8, -12), pose(-52, 44, 52, -44, -9, 14, 9, -14, -1), pose(-44, 36, 44, -36, -6, 10, 6, -10), pose(-50, 42, 50, -42, -8, 12, 8, -12, -1)] },
  walk: { fps: 9, loop: true, frames: [pose(-46, 32, 42, -30, -28, 22, 28, -22), pose(-32, 20, 30, -20, -16, 14, 16, -14, -1), pose(42, -30, -46, 32, 28, -22, -28, 22), pose(30, -20, -32, 20, 16, -14, -16, 14, -1), pose(-46, 32, 42, -30, -28, 22, 28, -22), pose(-32, 20, 30, -20, -16, 14, 16, -14, -1)] },
  run: { fps: 12, loop: true, frames: [pose(-54, 46, 58, -48, -48, 24, 52, -28, -1, 6), pose(-40, 34, 44, -36, -26, 16, 32, -20, 0, 5), pose(54, -46, -58, 48, 48, -24, -52, 28, -1, 6), pose(40, -34, -44, 36, 26, -16, -32, 20, 0, 5), pose(-54, 46, 58, -48, -48, 24, 52, -28, -1, 6), pose(-40, 34, 44, -36, -26, 16, 32, -20, 0, 5), pose(54, -46, -58, 48, 48, -24, -52, 28, -1, 6), pose(40, -34, -44, 36, 26, -16, -32, 20, 0, 5)] },
  jump: { fps: 9, loop: false, frames: [pose(-28, 16, 28, -16, -28, 18, 28, -18, -1), pose(-34, 18, 34, -18, -24, 24, 24, -24, -2), pose(-18, 10, 18, -10, -12, 22, 12, -22, -1)] },
  fall: { fps: 6, loop: true, frames: [pose(-34, 18, 36, -14, -32, 14, 32, -10, 1), pose(-25, 16, 28, -18, -24, 18, 24, -14), pose(-38, 12, 38, -12, -36, 12, 36, -8, -1)] },
  land: { fps: 12, loop: false, frames: [pose(-18, 22, 18, -22, -28, 44, 28, -44, 3), pose(-8, 12, 8, -12, -12, 26, 12, -26, 1), pose(0, 8, 0, -8, 0, 8, 0, -8)] },
  dash: { fps: 12, loop: false, frames: [pose(-8, 8, 28, -20, -45, 22, 48, -18, 0, 12, -18, true), pose(-10, 10, 30, -22, -40, 20, 44, -20, 0, 14, -8, true), pose(-12, 12, 32, -24, -35, 18, 40, -18, 0, 12, 4, true), pose(-8, 8, 24, -18, -30, 16, 34, -16, 0, 8, 12, true)] },
  attack: { fps: 12, loop: false, frames: [pose(-12, 12, 20, -8, -10, 12, 10, -12, 0, 0, -78, true), pose(-16, 18, 32, -18, -8, 10, 8, -10, 0, 1, -32, true), pose(-10, 14, 40, -24, -4, 8, 4, -8, 0, 2, 18, true), pose(-4, 8, 18, -10, -3, 6, 3, -6, 0, 0, 46, true)] },
  combo: { fps: 12, loop: false, frames: [pose(-10, 12, 28, -14, -8, 10, 8, -10, 0, 0, -80, true), pose(-8, 10, 36, -20, -8, 10, 8, -10, 0, 1, -20, true), pose(-18, 18, 34, -20, -22, 12, 18, -12, 0, -2, 48, true), pose(-6, 10, 40, -26, -6, 8, 6, -8, 0, 2, -58, true), pose(-16, 16, 32, -18, -18, 12, 16, -12, 0, -1, 26, true), pose(-4, 8, 16, -8, -2, 6, 2, -6, 0, 0, 52, true)] },
  special: { fps: 12, loop: false, frames: [pose(-28, 12, 28, -12, -10, 14, 10, -14, -1, 0, -82, true), pose(-44, 18, 44, -18, -18, 18, 18, -18, -1, 0, -30, true), pose(-52, 20, 52, -20, -26, 20, 26, -20, 0, 0, 18, true), pose(-44, 18, 44, -18, -20, 18, 20, -18, 1, 0, 62, true), pose(-30, 12, 30, -12, -10, 12, 10, -12, 0, 0, 112, true), pose(-12, 8, 12, -8, 0, 8, 0, -8, 0, 0, 170, true)] },
  projectile: { fps: 12, loop: false, frames: [pose(-12, 12, 20, -12, -6, 8, 6, -8), pose(-16, 12, 42, -18, -8, 8, 8, -8, 0, 0, -58, true), pose(-12, 12, 46, -20, -4, 6, 4, -6, 0, 2, -38, true), pose(-8, 8, 18, -8, -2, 6, 2, -6)] },
  hurt: { fps: 10, loop: false, frames: [pose(-48, 18, 18, -8, -18, 8, 8, -12, 0, -8, -58, false, -.18), pose(-56, 18, 26, -12, -22, 8, 12, -10, 0, -12, -58, false, -.28), pose(-36, 12, 16, -8, -16, 8, 8, -10, 0, -6, -58, false, -.14)] },
  ko: { fps: 6, loop: false, frames: [pose(-48, 24, 48, -24, -34, 20, 34, -20, 0, -4, -58, false, .12), pose(-58, 26, 58, -26, -42, 22, 42, -22, 0, -8, -58, false, .28), pose(-64, 28, 64, -28, -52, 24, 52, -24, 0, -12, -58, false, .5), pose(-60, 26, 60, -26, -58, 20, 58, -20, 0, -14, -58, false, .8), pose(-56, 24, 56, -24, -56, 18, 56, -18, 0, -14, -58, false, 1.1)] },
  win: { fps: 7, loop: true, frames: [pose(-42, -24, 42, 24, -5, 8, 5, -8, -1), pose(-48, -28, 48, 28, -4, 8, 4, -8, -3), pose(-42, -24, 42, 24, -1), pose(-48, -28, 48, 28, -3)] }
};
const SPRITES = {};
function limbFrame(g, x, y, len, angle, width, trim, back = false) {
  const r = angle * Math.PI / 180, end = { x: x + Math.sin(r) * len, y: y + Math.cos(r) * len };
  g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(end.x, end.y);
  g.strokeStyle = '#050811'; g.lineWidth = width + 4; g.stroke();
  g.beginPath(); g.moveTo(x, y); g.lineTo(end.x, end.y); g.strokeStyle = back ? '#252c38' : '#151e2a'; g.lineWidth = width; g.stroke();
  g.beginPath(); g.moveTo(x + 1, y); g.lineTo(end.x + 1, end.y); g.strokeStyle = 'rgba(174,205,220,.48)'; g.lineWidth = Math.max(1.8, width * .22); g.stroke();
  const cuff = { x: x + (end.x - x) * .76, y: y + (end.y - y) * .76 };
  g.fillStyle = trim; g.beginPath(); g.arc(cuff.x, cuff.y, Math.max(2, width * .17), 0, Math.PI * 2); g.fill();
  return end;
}
function bakeNinjaFrame(ch, src, q) {
  const canvas = document.createElement('canvas'); canvas.width = 96; canvas.height = 128;
  const g = canvas.getContext('2d'), trim = ch.trim;
  g.save(); g.translate(q.lean, q.bob);
  if (q.tilt) { g.translate(48, 72); g.rotate(q.tilt); g.translate(-48, -72); }
  g.lineCap = 'round'; g.strokeStyle = '#090d17'; g.lineWidth = 7; g.beginPath(); g.moveTo(66, 72); g.lineTo(80, 39); g.stroke();
  g.strokeStyle = '#697887'; g.lineWidth = 2; g.beginPath(); g.moveTo(67, 70); g.lineTo(79, 42); g.stroke();
  g.fillStyle = '#c43c50'; g.beginPath(); g.moveTo(43, 48); g.quadraticCurveTo(28, 39, 27, 28); g.quadraticCurveTo(40, 39, 46, 38); g.fill();
  let a = limbFrame(g, 39, 91, 21, q.legBack, 15, trim, true);
  let f = limbFrame(g, a.x, a.y, 19, q.legBack + q.kneeBack, 13, trim, true);
  g.fillStyle = '#080c14'; g.beginPath(); g.ellipse(f.x - 5, f.y + 5, 10, 6, -.12, 0, Math.PI * 2); g.fill();
  a = limbFrame(g, 57, 91, 21, q.legFront, 15, trim, false);
  f = limbFrame(g, a.x, a.y, 19, q.legFront + q.kneeFront, 13, trim, false);
  g.fillStyle = '#080c14'; g.beginPath(); g.ellipse(f.x + 5, f.y + 5, 10, 6, .12, 0, Math.PI * 2); g.fill();
  const elbowBack = limbFrame(g, 30, 55, 19, q.armBack, 13, trim, true);
  limbFrame(g, elbowBack.x, elbowBack.y, 17, q.armBack + q.elbowBack, 11, trim, true);
  const body = g.createLinearGradient(34, 48, 65, 96); body.addColorStop(0, '#273241'); body.addColorStop(.48, '#111a27'); body.addColorStop(1, '#080c15');
  g.beginPath(); g.moveTo(35, 47); g.lineTo(61, 47); g.lineTo(70, 58); g.lineTo(66, 92); g.lineTo(59, 99); g.lineTo(35, 96); g.lineTo(26, 59); g.closePath();
  g.fillStyle = body; g.fill(); g.strokeStyle = '#526073'; g.lineWidth = 2; g.stroke();
  g.strokeStyle = 'rgba(188,206,220,.6)'; g.lineWidth = 2; g.beginPath(); g.moveTo(35, 54); g.lineTo(51, 66); g.lineTo(63, 55); g.stroke();
  g.fillStyle = trim; g.globalAlpha = .95; g.fillRect(31, 78, 36, 5); g.globalAlpha = 1;
  g.fillStyle = '#0a0e17'; g.fillRect(34, 85, 31, 7); g.fillStyle = '#d8b86e'; g.fillRect(47, 84, 8, 9);
  const elbowFront = limbFrame(g, 66, 55, 19, q.armFront, 14, trim, false);
  const hand = limbFrame(g, elbowFront.x, elbowFront.y, 17, q.armFront + q.elbowFront, 11, trim, false);
  g.fillStyle = '#111723'; g.beginPath(); g.arc(hand.x, hand.y, 5.5, 0, Math.PI * 2); g.fill();
  if (src) { g.save(); g.beginPath(); g.ellipse(48, 29, 23, 25, 0, 0, Math.PI * 2); g.clip(); g.drawImage(src, 38, 0, 132, 132, 25, 2, 46, 50); g.restore(); }
  if (q.weapon) {
    const ang = q.blade * Math.PI / 180, tip = { x: hand.x + Math.cos(ang) * 43, y: hand.y + Math.sin(ang) * 43 };
    g.save(); g.lineCap = 'round'; g.shadowColor = trim; g.shadowBlur = 10; g.strokeStyle = trim; g.lineWidth = 5; g.beginPath(); g.moveTo(hand.x, hand.y); g.lineTo(tip.x, tip.y); g.stroke();
    g.shadowBlur = 0; g.strokeStyle = '#d9f4ff'; g.lineWidth = 2; g.beginPath(); g.moveTo(hand.x + 3, hand.y - 2); g.lineTo(tip.x, tip.y); g.stroke(); g.restore();
  }
  g.restore(); return canvas;
}
function buildAnimationFrames() {
  for (const ch of CH) {
    SPRITES[ch.id] = {};
    for (const name of Object.keys(ANIM)) SPRITES[ch.id][name] = ANIM[name].frames.map(q => bakeNinjaFrame(ch, IMG[ch.id], q));
  }
}
function playerAnimation(p) {
  if (p.ko) return 'ko';
  if (S.won) return 'win';
  if (p.animEvent) return p.animEvent;
  if (!p.ground) return p.vy < 0 ? 'jump' : 'fall';
  if (p.land > 0) return 'land';
  if (Math.abs(p.vx) > 20) return down.walk ? 'walk' : 'run';
  return 'idle';
}
function playAnim(name) { if (!S.p) return; S.p.animEvent = name; S.p.animAge = 0; }

/* ---------- audio (simple synth SFX) ---------- */
let ac, muted = false;
function tone(f, d = .1, type = 'square', v = .04, s = 0) {
  if (muted) return;
  try { ac = ac || new AudioContext(); const t = ac.currentTime, o = ac.createOscillator(), g = ac.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (s) o.frequency.exponentialRampToValueAtTime(Math.max(40, f + s), t + d);
    g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(ac.destination); o.start(); o.stop(t + d); } catch (e) {}
}
const SFX = { jump: () => tone(300, .16, 'square', .04, 400), slash: () => tone(800, .1, 'sawtooth', .04, -500), coin: () => tone(900, .1, 'square', .035, 500),
  hit: () => tone(160, .12, 'sawtooth', .06, -90), dash: () => tone(200, .12, 'triangle', .06, 500), spec: () => tone(400, .35, 'sawtooth', .05, 700),
  star: () => tone(700, .09, 'square', .04, -200), pick: () => tone(600, .15, 'triangle', .06, 600), boss: () => { tone(110, .5, 'sawtooth', .07, -30); },
  win: () => [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, .2, 'triangle', .06), i * 120)) };

/* ---------- input ---------- */
const down = {}, hit = {};
const KM = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', KeyJ: 'atk', KeyK: 'spec', KeyL: 'dash', KeyE: 'throw', ShiftLeft: 'walk', ShiftRight: 'walk' };
addEventListener('keydown', e => {
  if (S.state === 'quiz' && /^Digit[1-4]$/.test(e.code)) { answer(+e.code[5] - 1); return; }
  if (e.code === 'Escape' || e.code === 'KeyP') { togglePause(); return; }
  const a = KM[e.code]; if (!a) return;
  if (S.state === 'play') e.preventDefault();
  if (!down[a]) hit[a] = 1; down[a] = 1;
});
addEventListener('keyup', e => { const a = KM[e.code]; if (a) down[a] = 0; });
addEventListener('blur', () => { for (const k in down) down[k] = 0; if (S.state === 'play') togglePause(); });
document.querySelectorAll('[data-a]').forEach(b => {
  const a = b.dataset.a;
  b.addEventListener('pointerdown', e => { e.preventDefault(); down[a] = 1; hit[a] = 1; b.classList.add('on'); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => b.addEventListener(ev, () => { down[a] = 0; b.classList.remove('on'); }));
});
cv.addEventListener('pointerdown', e => { if (S.state !== 'play') return; e.preventDefault(); if (!down.jump) hit.jump = 1; down.jump = 1; });
['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => cv.addEventListener(ev, () => { down.jump = 0; }));

/* ---------- high score ---------- */
const BEST_KEY = 'nkNinjaBest';
let best = 0;
try { best = +localStorage.getItem(BEST_KEY) || 0; } catch (e) {}
function saveBest() { if (S.score > best) best = S.score; try { localStorage.setItem(BEST_KEY, best); } catch (e) {} }

/* ---------- helpers ---------- */
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ovl = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
function rr(x, y, w, h, r) { cx.beginPath(); cx.roundRect(x, y, w, h, r); }
function glass(x, y, w, h, r = 12, c = COL.cyan) { rr(x, y, w, h, r); cx.fillStyle = 'rgba(8,16,32,.74)'; cx.fill(); cx.strokeStyle = c; cx.globalAlpha = .75; cx.lineWidth = 2; cx.stroke(); cx.globalAlpha = 1; }
function txt(s, x, y, size = 16, c = '#fff', al = 'left', font = 'Rajdhani') { cx.font = `700 ${size}px ${font}, Inter, sans-serif`; cx.fillStyle = c; cx.textAlign = al; cx.fillText(s, x, y); }

/* ---------- world ---------- */
let S = { state: 'menu', selC: 0, selL: 0, t: 0 }, selC = 0, selL = 0;
const parts = [], floats = [], bullets = [];
function mkE(t, x, l, r) {
  const o = { t, x, l, r, dir: -1, vx: 0, cd: 1 + Math.random(), flash: 0, inv: 0 };
  if (t === 'boss') Object.assign(o, { w: 84, h: 124, hp: 0, m: 0, tm: 1.2, shot: 0 });
  else Object.assign(o, t === 'shield' ? { w: 40, h: 64, hp: 3, mhp: 3 } : { w: 36, h: 60, hp: 2, mhp: 2 });
  o.y = GY - o.h; return o;
}
function mkO(t, x) { const o = t === 'spike' ? { t, x, w: 56, h: 30 } : t === 'gear' ? { t, x, w: 50, h: 42 } : t === 'ring' ? { t, x, w: 58, h: 40 } : { t, x, w: 46, h: 36 }; o.y = GY - o.h; return o; }
function build(li) {
  const L = LV[li], targetLen = L.len, r = mulberry(li * 97 + 11), P = [{ x: -300, y: GY, w: 1000, h: 80 }], E = [], C = [], O = [], cps = [0];
  let x = 700, seg = 0, qi = 0;
  for (let i = 0; i < 4; i++) C.push({ t: 'coin', x: 300 + i * 40, y: 430 });
  while (x < targetLen - 1700) {
    x += 100 + r() * 50; const w = 480 + r() * 240;
    P.push({ x, y: GY, w, h: 80 }); cps.push(x + 40);
    for (let i = 0, n = 1 + (r() > .5); i < n; i++) E.push(mkE(li > 0 && r() > .45 ? 'shield' : 'basic', x + 160 + r() * (w - 340), x + 10, x + w - 10));
    for (let i = 0; i < 5; i++) C.push({ t: 'coin', x: x + 90 + i * 40, y: 430 - Math.sin(i / 4 * Math.PI) * 55 });
    if (qi < L.qs.length) { const fx = x + w * .3 + r() * 80; P.push({ x: fx, y: 350, w: 150, h: 16, fl: 1 }); C.push({ t: 'crystal', x: fx + 75, y: 310, q: qi++ }); }
    if (L.kind === 'engineering') P.push({ x: x + w * .52, y: 372, w: 136, h: 14, fl: 3 });
    if (L.kind === 'math' || L.kind === 'final') { const py = 340 - (seg % 3) * 18; P.push({ x: x + w * .6, y: py, w: 126, h: 14, fl: 2, move: 1, baseY: py, amp: L.kind === 'math' ? 22 : 14, phase: r() * 6.28 }); }
    C.push({ t: seg % 2 ? 'orb' : 'heart', x: x + w * .6, y: 435 });
    O.push(mkO(L.obs[seg % L.obs.length], x + 290));
    if (w > 680 && L.grav > 1000) O.push(mkO(L.obs[(seg + 1) % L.obs.length], x + w - 160));
    seg++; x += w;
  }
  const ar = x + 110, worldLen = ar + 900; P.push({ x: ar, y: GY, w: 900, h: 80 }); cps.push(ar + 20);
  while (qi < L.qs.length) { const fx = ar + 110 + qi * 130; P.push({ x: fx, y: 350, w: 118, h: 16, fl: 1 }); C.push({ t: 'crystal', x: fx + 59, y: 310, q: qi++ }); }
  const b = mkE('boss', ar + 620, ar + 40, worldLen - 90); b.hp = b.mhp = 18 + li * 6; b.arena = ar; E.push(b);
  return { L, P, E, C, O, cps, len: worldLen, ar, boss: b };
}
function begin(li, ci) {
  const w = build(li), ch = CH[ci];
  S = { ...w, state: 'play', li, ci, ch, t: 0, cam: 0, shake: 0, cp: 0, dm: 0, score: S.score || 0, coins: 0, xp: S.xp || 0, got: new Set(), bossDead: false, bossOn: false, pend: null,
    p: { x: 80, y: GY - 72, w: 34, h: 72, vx: 0, vy: 0, face: 1, ground: true, coy: 0, jb: 0, hp: 100, en: 100, atk: 0, acd: 0, spin: 0, dash: 0, dcd: 0, tcd: 0, inv: 0, hurt: 0, land: 0, ko: 0, t: 0, hl: new Set(), animEvent: null, animAge: 0, comboWindow: 0 } };
  if (li === 0 && ci === S.ci && !S.keepScore) { S.score = 0; S.xp = 0; }
  parts.length = floats.length = bullets.length = 0; hide();
}
S.score = 0; S.xp = 0;

/* ---------- fx ---------- */
function burst(x, y, c, n = 10, sp = 220) { if (RM) n = Math.ceil(n / 3); for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = sp * (.3 + Math.random() * .7); parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, life: .5, max: .5, c, r: 2 + Math.random() * 3 }); } }
const say = (s, x, y, c = COL.white) => floats.push({ s, x, y, c, life: 1 });
function shake(v) { if (!RM) S.shake = Math.max(S.shake, v); }

/* ---------- combat ---------- */
function hurtE(e, d) {
  if (e.dead || e.inv > 0) return; e.hp -= d; e.flash = .12; e.inv = .1; e.x += S.p.face * 8;
  burst(e.x + e.w / 2, e.y + e.h / 2, COL.green, 8); SFX.hit();
  if (e.hp <= 0) { e.dead = true; burst(e.x + e.w / 2, e.y + e.h / 2, COL.red, 24, 320); shake(5); S.score += e.t === 'boss' ? 1000 : 100; say(e.t === 'boss' ? '+1000' : '+100', e.x, e.y, COL.gold);
    if (e.t === 'boss') { S.bossDead = true; SFX.win(); } else if (Math.random() < .4) S.C.push({ t: 'orb', x: e.x + 10, y: e.y + 20 }); }
}
function hurtP(n, dir) {
  const p = S.p; if (p.inv > 0 || p.dash > 0 || p.ko) return;
  p.hp -= n; p.inv = 1; p.hurt = .28; playAnim('hurt'); p.vx = dir * 240; p.vy = -300; p.ground = false; shake(6); SFX.hit(); burst(p.x + 17, p.y + 30, COL.red, 10);
  if (p.hp <= 0) { p.hp = 0; p.ko = 1; p.animEvent = 'ko'; p.animAge = 0; p.vx = 0; }
}
function fire(e, a, sp = 300) { bullets.push({ x: e.x + e.w / 2, y: e.y + e.h * .4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, hostile: 1, life: 3, a: 0 }); }

/* ---------- update ---------- */
S.C = [];
function update(dt) {
  const s = S, p = s.p, ch = s.ch; s.t += dt; p.t += dt;
  if (s.shake > 0) s.shake -= dt;
  for (const k of ['atk', 'acd', 'spin', 'dash', 'dcd', 'tcd', 'inv', 'hurt', 'land']) if (p[k] > 0) p[k] -= dt;
  if (p.animEvent) { p.animAge += dt; const a = ANIM[p.animEvent]; if (!a || p.animAge >= a.frames.length / a.fps) { p.animEvent = null; p.animAge = 0; } }
  if (p.comboWindow > 0) p.comboWindow -= dt;
  for (const f of s.P) if (f.move) f.y = f.baseY + Math.sin(s.t * 1.7 + f.phase) * f.amp;
  if (p.ko) { p.ko += dt; p.vy += s.L.grav * dt; p.y += p.vy * dt; if (p.y > H + 100) p.y = H + 100; if (p.ko > 1.2) over(); return; }
  if (s.won) { p.vx = 0; return; }
  const dir = (down.right ? 1 : 0) - (down.left ? 1 : 0);
  if (hit.dash && p.dcd <= 0 && p.dash <= 0) { p.dash = .18; p.dcd = .6; p.inv = Math.max(p.inv, .22); playAnim('dash'); SFX.dash(); burst(p.x + 17, p.y + 60, COL.cyan, 6, 120); }
  if (p.dash > 0) { p.vx = p.face * 720 * ch.dash; p.vy = 0; }
  else if (p.hurt <= 0) { p.vx = dir * 270 * ch.spd * (p.spin > 0 ? .55 : 1) * (down.walk ? .48 : 1); if (dir) p.face = dir; } else p.vx *= .92;
  p.coy = p.ground ? .1 : p.coy - dt; p.jb -= dt; if (hit.jump) p.jb = .12;
  if (p.jb > 0 && p.coy > 0 && p.hurt <= 0) { p.vy = -790 * ch.jmp; p.coy = 0; p.jb = 0; p.ground = false; SFX.jump(); }
  if (!down.jump && p.vy < -320) p.vy = -320;
  if (p.dash <= 0) p.vy = Math.min(p.vy + s.L.grav * dt, 1100);
  if (hit.atk && p.acd <= 0 && p.spin <= 0) { const chain = p.comboWindow > 0; p.atk = .22; p.acd = .3; p.comboWindow = .55; p.hl = new Set(); playAnim(chain ? 'combo' : 'attack'); SFX.slash(); }
  if (hit.spec && p.en >= 40 && p.spin <= 0) { p.en -= 40; p.spin = .5; p.hl = new Set(); playAnim('special'); SFX.spec(); shake(3); }
  if (hit.throw && p.en >= 12 && p.tcd <= 0) { p.en -= 12; p.tcd = .35; playAnim('projectile'); bullets.push({ x: p.x + 17, y: p.y + 30, vx: p.face * 640, vy: 0, life: 1.6, a: 0 }); SFX.slash(); }
  p.en = Math.min(100, p.en + 6 * ch.en * dt);
  // move
  p.x = clamp(p.x + p.vx * dt, 0, s.len - p.w);
  const pb = p.y + p.h; p.y += p.vy * dt; const was = p.ground; p.ground = false;
  if (p.vy >= 0) for (const f of s.P) if (p.x + p.w > f.x + 4 && p.x < f.x + f.w - 4 && pb <= f.y + 6 && p.y + p.h >= f.y) { p.y = f.y - p.h; if (!was && p.vy > 300) { p.land = .12; playAnim('land'); burst(p.x + 17, p.y + p.h, '#9fb4d9', 5, 90); } p.vy = 0; p.ground = true; break; }
  if (p.y > H + 120) { hurtP(0, 0); p.hp -= 20; if (p.hp <= 0) { p.hp = 0; p.ko = 1; } else { p.x = s.cp; p.y = 280; p.vy = 0; p.inv = 1.5; say('CHECKPOINT', s.cam + W / 2, 250, COL.cyan); } }
  for (const c of s.cps) if (p.x > c) s.cp = Math.max(s.cp, c);
  const dm = Math.floor(p.x / 10); if (dm > s.dm) { s.score += dm - s.dm; s.dm = dm; }
  const pbox = { x: p.x + 6, y: p.y + 8, w: p.w - 12, h: p.h - 8 };
  for (const o of s.O) if (ovl(pbox, { x: o.x + 5, y: o.y + 6, w: o.w - 10, h: o.h - 6 })) { hurtP(o.t === 'spike' ? 15 : 12, -1); break; }
  if (p.x > s.ar - 200 && !s.bossOn) { s.bossOn = true; SFX.boss(); say('BOSS ALERT', p.x, 200, COL.red); }
  // melee hitboxes
  const box = p.atk > 0 ? { x: p.face > 0 ? p.x + p.w : p.x - 74, y: p.y - 6, w: 74, h: p.h + 12 } : null;
  for (const e of s.E) {
    if (e.dead) continue; e.flash -= dt; e.inv -= dt;
    if (box && !p.hl.has(e) && ovl(box, e)) { p.hl.add(e); hurtE(e, 1); }
    if (p.spin > 0 && !p.hl.has(e) && Math.hypot(e.x + e.w / 2 - p.x - 17, e.y + e.h / 2 - p.y - 36) < 120) { p.hl.add(e); hurtE(e, 3); }
    if (e.t === 'boss' && !s.bossOn) continue;
    const near = Math.abs(p.x - e.x) < 560, toP = Math.sign(p.x - e.x) || 1; e.cd -= dt;
    if (e.t === 'basic') { const chase = Math.abs(p.x - e.x) < 230 && Math.abs(p.y - e.y) < 100; e.vx = chase ? toP * 125 : e.dir * 65; e.dir = chase ? toP : (e.x < e.l ? 1 : e.x > e.r - e.w ? -1 : e.dir); }
    else if (e.t === 'shield') { e.vx = 0; e.dir = toP; if (near && e.cd <= 0) { e.cd = 2.2; fire(e, toP > 0 ? 0 : Math.PI, 280); } }
    else { // boss
      e.tm -= dt; e.dir = toP; const rage = e.hp < e.mhp / 2 ? 1.35 : 1;
      if (e.tm <= 0) { e.m = (e.m + 1) % 3; e.tm = [1.4, 1, .7][e.m] / rage; e.shot = 0; }
      if (e.m === 0) e.vx = toP * 90 * rage;
      else if (e.m === 1) { e.vx = 0; if (!e.shot) { e.shot = 1; for (let k = -1; k <= 1; k++) fire(e, (toP > 0 ? 0 : Math.PI) + k * .3, 320); SFX.boss(); } }
      else e.vx = toP * 400 * rage;
    }
    e.x = clamp(e.x + e.vx * dt, e.t === 'boss' ? e.l : e.l - 20, e.t === 'boss' ? e.r : e.r + 20);
    if (ovl(p, e)) hurtP(e.t === 'boss' ? 22 : 14, Math.sign(p.x - e.x) || 1);
  }
  // projectiles
  for (const b of bullets) {
    b.x += b.vx * dt; b.y += b.vy * dt; b.life -= dt; b.a += dt * 14;
    if (b.hostile) { if (p.spin > 0 && Math.hypot(b.x - p.x - 17, b.y - p.y - 36) < 110) { b.life = 0; burst(b.x, b.y, COL.green, 5); } else if (Math.abs(b.x - p.x - 17) < 20 && Math.abs(b.y - p.y - 36) < 38) { hurtP(10, Math.sign(b.vx)); b.life = 0; } }
    else for (const e of s.E) if (!e.dead && Math.abs(b.x - e.x - e.w / 2) < e.w / 2 + 8 && Math.abs(b.y - e.y - e.h / 2) < e.h / 2 + 8 && (e.t !== 'boss' || s.bossOn)) { hurtE(e, 1); b.life = 0; break; }
  }
  for (let i = bullets.length - 1; i >= 0; i--) if (bullets[i].life <= 0) bullets.splice(i, 1);
  // collectibles
  for (const c of s.C) {
    if (c.got) continue; if (Math.hypot(c.x - p.x - 17, c.y - p.y - 36) > 34) continue;
    if (c.t === 'crystal') { if (s.got.has(c.q)) continue; c.got = 1; s.pend = c; openQuiz(c.q); return; }
    c.got = 1; burst(c.x, c.y, c.t === 'coin' ? COL.gold : COL.green, 8, 140);
    if (c.t === 'coin') { s.coins++; s.score += 10; SFX.coin(); say('+10', c.x, c.y - 10, COL.gold); }
    else if (c.t === 'heart') { p.hp = Math.min(100, p.hp + 25); SFX.pick(); say('+25 HP', c.x, c.y - 10, COL.red); }
    else { p.en = Math.min(100, p.en + 40); SFX.pick(); say('+ENERGY', c.x, c.y - 10, COL.green); }
  }
  if (s.bossDead && p.x + 17 > s.len - 160 && !s.won) win();
  s.cam = clamp(p.x - 360, 0, s.len - W);
}
function tickFx(dt) {
  for (const q of parts) { q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 500 * dt; q.life -= dt; }
  for (let i = parts.length - 1; i >= 0; i--) if (parts[i].life <= 0) parts.splice(i, 1);
  for (const f of floats) { f.y -= 30 * dt; f.life -= dt; }
  for (let i = floats.length - 1; i >= 0; i--) if (floats[i].life <= 0) floats.splice(i, 1);
}

/* ---------- drawing ---------- */
const petals = Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H, s: 1 + Math.random() * 2, v: 20 + Math.random() * 30 }));
function drawFutureBackdrop(L, cam, t) {
  const step = 520, off = -((cam * .43) % step);
  for (let x = off - step; x < W + step; x += step) {
    const n = Math.floor((x + cam * .43) / step); cx.save();
    if (L.kind === 'engineering') {
      for (let i = 0; i < 3; i++) {
        const bx = x + 28 + i * 155, bh = 138 + ((n + i + 8) % 4) * 34, by = 470 - bh;
        const grad = cx.createLinearGradient(bx, by, bx + 90, 470); grad.addColorStop(0, '#23394a'); grad.addColorStop(1, '#0c1c2b');
        cx.fillStyle = grad; cx.fillRect(bx, by, 94, bh); cx.strokeStyle = 'rgba(255,191,85,.45)'; cx.lineWidth = 2; cx.strokeRect(bx, by, 94, bh);
        cx.fillStyle = 'rgba(255,191,85,.7)'; for (let yy = by + 16; yy < 455; yy += 26) for (let xx = bx + 12; xx < bx + 88; xx += 22) cx.fillRect(xx, yy, 8, 11);
        cx.fillStyle = '#172a38'; cx.fillRect(bx + 8, by - 10, 78, 10);
      }
      cx.strokeStyle = '#d69642'; cx.lineWidth = 5; cx.beginPath(); cx.moveTo(x + 390, 470); cx.lineTo(x + 390, 220); cx.lineTo(x + 475, 220); cx.moveTo(x + 408, 232); cx.lineTo(x + 408, 274); cx.stroke();
      cx.strokeStyle = 'rgba(255,191,85,.4)'; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(x + 68, 390); cx.lineTo(x + 180, 426); cx.lineTo(x + 292, 390); cx.lineTo(x + 404, 426); cx.stroke();
      cx.fillStyle = '#ffbf55'; for (let i = 0; i < 5; i++) { cx.beginPath(); cx.arc(x + 68 + i * 84, 420 + (i % 2) * 6, 3, 0, 6.3); cx.fill(); }
    } else if (L.kind === 'math') {
      cx.strokeStyle = 'rgba(185,155,255,.3)'; cx.lineWidth = 1;
      for (let gx = 0; gx < step; gx += 52) { cx.beginPath(); cx.moveTo(x + gx, 190); cx.lineTo(x + gx, 470); cx.stroke(); }
      for (let gy = 210; gy < 470; gy += 44) { cx.beginPath(); cx.moveTo(x, gy); cx.lineTo(x + step, gy); cx.stroke(); }
      const mx = x + 260, my = 300 + Math.sin(t + n) * 9;
      cx.shadowColor = '#c0a4ff'; cx.shadowBlur = 22; cx.strokeStyle = '#c6a7ff'; cx.lineWidth = 3;
      cx.beginPath(); cx.arc(mx, my, 75, 0, 6.3); cx.ellipse(mx, my, 113, 32, -.35, 0, 6.3); cx.stroke(); cx.shadowBlur = 0;
      cx.fillStyle = '#f1dcff'; [[mx - 120, my - 48], [mx + 148, my - 62], [mx + 110, my + 74], [x + 86, 244]].forEach(([sx, sy], i) => { cx.beginPath(); cx.arc(sx, sy, 2 + i % 2, 0, 6.3); cx.fill(); });
      txt('π', x + 80, 330, 24, '#d8c5ff', 'center'); txt('45°', x + 450, 262, 17, '#ffd889', 'center');
      cx.strokeStyle = 'rgba(255,216,137,.75)'; cx.beginPath(); cx.moveTo(x + 120, 414); cx.lineTo(x + 210, 342); cx.lineTo(x + 302, 414); cx.closePath(); cx.stroke();
    } else {
      for (let i = 0; i < 4; i++) {
        const bx = x + 16 + i * 127, bh = 150 + ((n + i + 12) % 4) * 34, by = 470 - bh;
        cx.fillStyle = i % 2 ? '#142b48' : '#172444'; cx.fillRect(bx, by, 104, bh);
        cx.strokeStyle = i % 2 ? 'rgba(0,229,255,.65)' : 'rgba(139,92,246,.7)'; cx.lineWidth = 2; cx.strokeRect(bx, by, 104, bh);
        cx.fillStyle = 'rgba(111,245,230,.6)'; for (let yy = by + 14; yy < 452; yy += 25) for (let xx = bx + 13; xx < bx + 93; xx += 24) cx.fillRect(xx, yy, 8, 10);
      }
      cx.strokeStyle = 'rgba(0,229,255,.55)'; cx.lineWidth = 3; cx.beginPath(); cx.moveTo(x + 25, 395); cx.lineTo(x + 110, 360); cx.lineTo(x + 195, 395); cx.lineTo(x + 280, 360); cx.lineTo(x + 365, 395); cx.stroke();
      cx.strokeStyle = '#8b5cf6'; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(x + 265, 220, 95, 28, -.35, 0, 6.3); cx.ellipse(x + 265, 220, 42, 86, .4, 0, 6.3); cx.stroke();
      cx.fillStyle = '#6df5e6'; for (let i = 0; i < 6; i++) { cx.beginPath(); cx.arc(x + 80 + i * 72, 180 + (i % 3) * 34, 3, 0, 6.3); cx.fill(); }
    }
    cx.restore();
  }
}
function drawBG(L, cam, t) {
  const g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, L.sky[0]); g.addColorStop(1, L.sky[1]); cx.fillStyle = g; cx.fillRect(0, 0, W, H);
  cx.fillStyle = '#ffffff'; for (const q of petals) { cx.globalAlpha = L.kind === 'mars' ? .25 : .3 + .7 * Math.abs(Math.sin(t * 1.5 + q.v)); const sx = ((q.x - cam * .02) % W + W) % W; cx.fillRect(sx, q.y * .65, q.s, q.s); } cx.globalAlpha = 1;
  cx.save();
  if (L.kind === 'moon') { cx.shadowColor = '#fff3c4'; cx.shadowBlur = 60; cx.fillStyle = '#fff6d8'; cx.beginPath(); cx.arc(760, 105, 46, 0, 6.3); cx.fill(); }
  else if (L.kind === 'mars') { cx.shadowColor = '#7dffc0'; cx.shadowBlur = 50; cx.fillStyle = '#d9fff0'; cx.beginPath(); cx.arc(780, 90, 30, 0, 6.3); cx.fill(); }
  else { cx.fillStyle = '#0b6e8a'; cx.beginPath(); cx.arc(780, 100, 34, 0, 6.3); cx.fill(); cx.strokeStyle = 'rgba(0,229,255,.7)'; cx.lineWidth = 4; cx.beginPath(); cx.ellipse(780, 100, 62, 14, -.3, 0, 6.3); cx.stroke(); }
  cx.restore();
  const hills = L.kind === 'moon' ? ['#2a1d4a', '#1a1233'] : L.kind === 'mars' ? ['#0f3a2a', '#082a1c'] : ['#0d1a38', '#091227'];
  [[.12, 200, hills[0]], [.25, 140, hills[1]]].forEach(([k, hh, c]) => { cx.fillStyle = c; cx.beginPath(); cx.moveTo(0, H);
    for (let x = 0; x <= W + 20; x += 20) { const wx = x + cam * k; cx.lineTo(x, H - hh - 60 * Math.sin(wx / 170 * (k * 6)) - 30 * Math.sin(wx / 60)); } cx.lineTo(W, H); cx.fill(); });
  const sp = 520, off = -((cam * .5) % sp);
  for (let x = off - sp; x < W + sp; x += sp) {
    const n = Math.round((x + cam * .5) / sp); cx.fillStyle = '#070e20';
    if (L.kind === 'moon') { cx.fillStyle = '#c4283c'; cx.fillRect(x + 90, 340, 10, 130); cx.fillRect(x + 210, 340, 10, 130); cx.fillRect(x + 70, 328, 170, 12); cx.fillRect(x + 82, 352, 146, 7);
      cx.fillStyle = '#120a22'; cx.beginPath(); cx.moveTo(x + 330, 420); cx.lineTo(x + 395, 376); cx.lineTo(x + 460, 420); cx.fill(); cx.fillRect(x + 345, 420, 100, 50);
      cx.save(); cx.shadowColor = '#ffb347'; cx.shadowBlur = 16; cx.fillStyle = '#ffb347'; cx.beginPath(); cx.arc(x + 300, 410, 8, 0, 6.3); cx.arc(x + 480, 410, 8, 0, 6.3); cx.fill(); cx.restore(); }
    else if (L.kind === 'mars') { for (let i = 0; i < 2; i++) { const mx = x + 70 + i * 260 + (n % 3) * 25, mh = 110 + ((n + i) % 3) * 40; cx.fillStyle = '#0a2a1c';
      cx.beginPath(); cx.moveTo(mx, 470); cx.lineTo(mx + 20, 470 - mh); cx.lineTo(mx + 120, 470 - mh); cx.lineTo(mx + 150, 470); cx.fill(); cx.fillStyle = 'rgba(0,255,144,.25)'; cx.fillRect(mx + 20, 470 - mh, 100, 5); } }
    else if (L.kind === 'station') { cx.strokeStyle = '#1e3a5c'; cx.lineWidth = 6; cx.beginPath(); cx.moveTo(x, 200); cx.lineTo(x + sp, 200); cx.moveTo(x, 260); cx.lineTo(x + sp, 260); cx.stroke();
      cx.lineWidth = 3; cx.beginPath(); for (let k = 0; k < sp; k += 52) { cx.moveTo(x + k, 200); cx.lineTo(x + k + 52, 260); cx.moveTo(x + k + 52, 200); cx.lineTo(x + k, 260); } cx.stroke();
      cx.fillStyle = '#10223d'; cx.fillRect(x + 120, 260, 16, 210); cx.fillRect(x + 380, 260, 16, 210);
      for (let k = 0; k < 4; k++) { const on = Math.sin(t * 4 + k * 1.7 + n) > 0; cx.fillStyle = on ? (k % 2 ? '#ff4d6d' : '#00E5FF') : '#22324a'; cx.save(); if (on) { cx.shadowColor = cx.fillStyle; cx.shadowBlur = 14; } cx.beginPath(); cx.arc(x + 40 + k * 130, 230, 5, 0, 6.3); cx.fill(); cx.restore(); } }
    else { for (let i = 0; i < 2; i++) { const bx = x + 60 + i * 230, bh = 160 + ((n + i) % 3) * 50; cx.fillStyle = '#071428'; cx.fillRect(bx, 470 - bh, 90, bh);
      cx.fillStyle = 'rgba(0,229,255,.55)'; for (let yy = 470 - bh + 14; yy < 460; yy += 22) for (let xx = bx + 10; xx < bx + 80; xx += 20) if ((xx + yy + n) % 3) cx.fillRect(xx, yy, 8, 8);
      cx.strokeStyle = 'rgba(0,229,255,.5)'; cx.beginPath(); cx.ellipse(bx + 45, 470 - bh - 20, 38, 9, 0, 0, 6.3); cx.stroke(); } }
  }
  if (L.kind === 'engineering' || L.kind === 'math' || L.kind === 'final') drawFutureBackdrop(L, cam, t);
  if (L.kind === 'mars') { cx.fillStyle = 'rgba(160,255,200,.45)';
    for (const q of dust) { q.x -= q.v * .016; q.y += Math.sin(t + q.v) * .3; if (q.x < 0) { q.x = W; q.y = 200 + Math.random() * 300; } cx.fillRect(q.x, q.y, q.s * 2, q.s); } }
}
const dust = Array.from({ length: 50 }, () => ({ x: Math.random() * W, y: 200 + Math.random() * 300, s: 1 + Math.random() * 2, v: 40 + Math.random() * 60 }));
function drawObstacle(o, L) {
  cx.save();
  if (o.t === 'gear') { cx.translate(o.x + o.w / 2, o.y + o.h / 2); cx.rotate(S.t * 1.8); cx.shadowColor = L.acc; cx.shadowBlur = 12; cx.fillStyle = '#354858'; cx.strokeStyle = L.acc; cx.lineWidth = 3; for (let i = 0; i < 10; i++) { cx.save(); cx.rotate(i * Math.PI / 5); cx.fillRect(-5, -24, 10, 14); cx.restore(); } cx.beginPath(); cx.arc(0, 0, 17, 0, 6.3); cx.fill(); cx.stroke(); cx.fillStyle = L.acc; cx.beginPath(); cx.arc(0, 0, 6, 0, 6.3); cx.fill(); }
  else if (o.t === 'ring') { cx.shadowColor = L.acc; cx.shadowBlur = 14; cx.strokeStyle = L.acc; cx.lineWidth = 7; cx.beginPath(); cx.ellipse(o.x + o.w / 2, o.y + o.h / 2, 22, 15, S.t * .5, 0, 6.3); cx.stroke(); cx.lineWidth = 2; cx.beginPath(); cx.ellipse(o.x + o.w / 2, o.y + o.h / 2, 11, 7, -S.t, 0, 6.3); cx.stroke(); }
  else if (o.t === 'spike') { cx.shadowColor = L.acc; cx.shadowBlur = 12; const g = cx.createLinearGradient(0, o.y, 0, o.y + o.h); g.addColorStop(0, '#b8f6ff'); g.addColorStop(1, '#00a6c7'); cx.fillStyle = g;
    for (let i = 0; i < 3; i++) { const bx = o.x + i * (o.w / 3); cx.beginPath(); cx.moveTo(bx, o.y + o.h); cx.lineTo(bx + o.w / 6, o.y + (i === 1 ? 0 : 8)); cx.lineTo(bx + o.w / 3, o.y + o.h); cx.fill(); } }
  else { const c = L.kind === 'mars' ? ['#4a6b3a', '#243a1c'] : ['#8a909c', '#4a4f5a']; cx.fillStyle = c[0]; cx.beginPath(); cx.moveTo(o.x, o.y + o.h); cx.lineTo(o.x + 4, o.y + 12); cx.lineTo(o.x + 16, o.y); cx.lineTo(o.x + 34, o.y + 4); cx.lineTo(o.x + o.w, o.y + 18); cx.lineTo(o.x + o.w, o.y + o.h); cx.fill();
    cx.fillStyle = c[1]; cx.beginPath(); cx.arc(o.x + 18, o.y + 16, 5, 0, 6.3); cx.arc(o.x + 32, o.y + 24, 3, 0, 6.3); cx.fill(); }
  cx.restore();
}
function drawWorld() {
  const s = S, p = s.p, L = s.L;
  for (const f of s.P) { if (f.x + f.w < s.cam - 20 || f.x > s.cam + W + 20) continue;
    if (f.fl) { glass(f.x, f.y, f.w, f.h, 6, f.fl === 3 ? '#FFBF55' : f.fl === 2 ? '#B99BFF' : COL.cyan); if (f.fl === 3) { cx.strokeStyle = 'rgba(255,191,85,.7)'; cx.beginPath(); cx.moveTo(f.x, f.y + f.h); cx.lineTo(f.x + f.w / 2, f.y); cx.lineTo(f.x + f.w, f.y + f.h); cx.stroke(); } else if (f.fl === 2) { cx.strokeStyle = 'rgba(185,155,255,.75)'; cx.beginPath(); cx.moveTo(f.x + 12, f.y + 7); cx.lineTo(f.x + f.w - 12, f.y + 7); cx.stroke(); } } else { const g = cx.createLinearGradient(0, f.y, 0, f.y + f.h); g.addColorStop(0, L.gnd[0]); g.addColorStop(1, L.gnd[1]); cx.fillStyle = g; cx.fillRect(f.x, f.y, f.w, f.h + 100);
      cx.fillStyle = L.acc; cx.globalAlpha = .85; cx.fillRect(f.x, f.y, f.w, 4); cx.globalAlpha = .12; for (let x = f.x + 30; x < f.x + f.w; x += 60) cx.fillRect(x, f.y + 14, 30, 2); cx.globalAlpha = 1;
      if (L.kind === 'moon') { cx.fillStyle = 'rgba(0,0,0,.28)'; for (let x = f.x + 50; x < f.x + f.w - 40; x += 130) { cx.beginPath(); cx.ellipse(x, f.y + 32 + (x % 3) * 8, 18 + (x % 5) * 3, 5, 0, 0, 6.3); cx.fill(); } } } }
  if (L.kind === 'engineering') for (const f of s.P) if (!f.fl && f.x + f.w > s.cam - 20 && f.x < s.cam + W + 20) { cx.strokeStyle = 'rgba(255,191,85,.45)'; cx.lineWidth = 2; cx.beginPath(); cx.moveTo(f.x + 8, f.y + 8); cx.lineTo(f.x + 72, f.y + 43); cx.lineTo(f.x + 136, f.y + 8); cx.lineTo(f.x + 202, f.y + 43); cx.lineTo(f.x + 268, f.y + 8); cx.stroke(); }
  if (L.kind === 'final') for (const f of s.P) if (!f.fl && f.x + f.w > s.cam - 20 && f.x < s.cam + W + 20) { cx.fillStyle = 'rgba(0,229,255,.3)'; for (let xx = f.x + 22; xx < f.x + f.w - 12; xx += 88) { cx.beginPath(); cx.arc(xx, f.y + 20, 3, 0, 6.3); cx.fill(); } }
  for (const o of s.O) { if (o.x + o.w < s.cam - 20 || o.x > s.cam + W + 20) continue; drawObstacle(o, L); }
  for (const c of s.C) { if (c.got && c.t !== 'crystal') continue; if (c.t === 'crystal' && s.got.has(c.q)) continue;
    const bob = Math.sin(s.t * 3 + c.x) * 4, im = IMG[c.t]; if (!im) continue; const sz = c.t === 'crystal' ? 38 : 26;
    cx.save(); cx.translate(c.x, c.y + bob); if (c.t === 'coin') cx.scale(Math.abs(Math.cos(s.t * 3 + c.x)) * .8 + .2, 1);
    if (c.t === 'crystal') { cx.shadowColor = COL.cyan; cx.shadowBlur = 16; } cx.drawImage(im, -sz / 2, -sz / 2, sz, sz); cx.restore(); }
  // portal
  const px = s.len - 110, on = s.bossDead; cx.save(); cx.translate(px, GY - 60); cx.strokeStyle = on ? COL.green : '#33405e'; cx.lineWidth = 6; cx.shadowColor = on ? COL.green : 'transparent'; cx.shadowBlur = on ? 24 : 0;
  cx.beginPath(); cx.ellipse(0, 0, 36, 60, 0, 0, 6.3); cx.stroke(); if (on) { cx.globalAlpha = .3 + .2 * Math.sin(s.t * 5); cx.fillStyle = COL.green; cx.fill(); } cx.restore();
  for (const e of s.E) { if (e.dead || (e.t === 'boss' && !s.bossOn && false)) continue; const im = IMG[e.t]; if (!im) continue;
    const dh = e.t === 'boss' ? 190 : e.t === 'shield' ? 92 : 86, dw = im.width * dh / im.height;
    cx.save(); cx.translate(e.x + e.w / 2, e.y + e.h + 4); cx.scale(e.dir > 0 ? 1 : -1, 1); if (e.flash > 0) cx.filter = 'brightness(3)';
    cx.drawImage(im, -dw / 2, -dh + (Math.abs(Math.sin(s.t * 8 + e.x)) * 3), dw, dh); cx.restore();
    if (e.t !== 'boss' && e.hp < e.mhp) { cx.fillStyle = '#000'; cx.fillRect(e.x, e.y - 12, e.w, 4); cx.fillStyle = COL.red; cx.fillRect(e.x, e.y - 12, e.w * e.hp / e.mhp, 4); } }
  for (const b of bullets) { cx.save(); cx.translate(b.x, b.y); cx.rotate(b.a); if (b.hostile) { cx.fillStyle = COL.red; cx.shadowColor = COL.red; cx.shadowBlur = 12; cx.fillRect(-7, -7, 14, 14); cx.rotate(.78); cx.fillRect(-7, -7, 14, 14); }
    else if (IMG.shuriken) { cx.shadowColor = COL.green; cx.shadowBlur = 12; cx.drawImage(IMG.shuriken, -14, -14, 28, 28); } cx.restore(); }
  drawPlayer(); 
  for (const q of parts) { cx.globalAlpha = Math.max(0, q.life / q.max); cx.fillStyle = q.c; cx.fillRect(q.x, q.y, q.r, q.r); } cx.globalAlpha = 1;
  for (const f of floats) { cx.globalAlpha = Math.min(1, f.life * 2); txt(f.s, f.x, f.y, 20, f.c, 'center'); } cx.globalAlpha = 1;
}
function drawPlayer() {
  const p = S.p, state = playerAnimation(p), cfg = ANIM[state], frames = SPRITES[S.ch.id] && SPRITES[S.ch.id][state];
  if (!frames || !frames.length) return;
  const elapsed = p.animEvent === state ? p.animAge : p.t;
  const idx = cfg.loop ? Math.floor(elapsed * cfg.fps) % frames.length : Math.min(frames.length - 1, Math.floor(elapsed * cfg.fps));
  const frame = frames[idx], fx = p.x + p.w / 2, fy = p.y + p.h + 3;
  if (p.dash > 0) for (let i = 1; i < 4; i++) { cx.save(); cx.globalAlpha = .2 / i; cx.translate(fx - p.face * i * 24, fy); cx.scale(p.face, 1); cx.filter = 'hue-rotate(60deg) brightness(1.6)'; cx.drawImage(frame, -48, -122, 96, 120); cx.restore(); }
  cx.save(); if (p.inv > 0 && !p.ko && Math.floor(p.t * 20) % 2) cx.globalAlpha = .45;
  cx.translate(fx, fy); cx.scale(p.face, 1); cx.drawImage(frame, -48, -122, 96, 120); cx.restore();
  if (p.atk > 0) { const k = 1 - p.atk / .22; cx.save(); cx.translate(fx + p.face * 14, p.y + 34); cx.strokeStyle = COL.green; cx.shadowColor = COL.green; cx.shadowBlur = 18; cx.lineWidth = 7; cx.lineCap = 'round'; cx.beginPath();
    if (p.face > 0) cx.arc(0, 0, 58, -1.1 + k * .6, -1.1 + k * 2.2); else cx.arc(0, 0, 58, Math.PI + 1.1 - k * 2.2, Math.PI + 1.1 - k * .6); cx.stroke(); cx.restore(); }
  if (p.spin > 0) { cx.save(); cx.translate(fx, p.y + 36); cx.strokeStyle = COL.purple; cx.shadowColor = COL.purple; cx.shadowBlur = 20; cx.lineWidth = 6; cx.globalAlpha = .9; const r = 70 + 40 * (1 - p.spin / .5);
    cx.beginPath(); cx.arc(0, 0, r, S.t * 18, S.t * 18 + 4.2); cx.stroke(); cx.strokeStyle = COL.green; cx.beginPath(); cx.arc(0, 0, r - 14, -S.t * 22, -S.t * 22 + 3.4); cx.stroke(); cx.restore(); }
}
function bar(x, y, w, v, c, label) { cx.fillStyle = 'rgba(255,255,255,.12)'; rr(x, y, w, 12, 6); cx.fill(); cx.save(); rr(x, y, w, 12, 6); cx.clip(); cx.fillStyle = c; cx.fillRect(x, y, w * clamp(v, 0, 1), 12); cx.restore(); txt(label, x + w + 8, y + 11, 13, '#E5E7EB'); }
function drawHUD() {
  const s = S, p = s.p; glass(14, 12, 292, 92, 16);
  const pi = IMG[s.ch.id + 'p']; if (pi) { cx.save(); cx.beginPath(); cx.arc(58, 58, 34, 0, 6.3); cx.clip(); cx.drawImage(pi, 24, 24, 68, 68); cx.restore(); cx.strokeStyle = COL.cyan; cx.lineWidth = 2; cx.beginPath(); cx.arc(58, 58, 34, 0, 6.3); cx.stroke(); }
  txt(`${s.ch.name} · Lv.${1 + Math.floor(s.xp / 300)}`, 102, 34, 18); bar(102, 46, 150, p.hp / 100, COL.red, 'HP'); bar(102, 68, 150, p.en / 100, COL.green, 'EN');
  const hi = Math.max(best, s.score);
  glass(W - 214, 12, 200, 84, 16); if (IMG.coin) cx.drawImage(IMG.coin, W - 202, 20, 26, 26); txt(String(s.coins).padStart(3, '0'), W - 168, 41, 24, COL.gold); txt(`${Math.floor(p.x / 50)} m`, W - 28, 41, 18, COL.cyan, 'right');
  txt('SCORE ' + String(s.score).padStart(5, '0'), W - 200, 64, 16, '#E5E7EB'); txt('BEST  ' + String(hi).padStart(5, '0'), W - 200, 86, 16, s.score >= best && s.score > 0 ? COL.green : '#9CA3AF');
  const n = s.got.size; glass(W / 2 - 150, 12, 300, 30, 12); txt(`MISSION · Crystals ${n}/${s.L.qs.length} · ${s.bossDead ? 'Enter the portal' : 'Defeat the boss'}`, W / 2, 33, 14, n === s.L.qs.length ? COL.green : '#E5E7EB', 'center');
  txt(s.L.name, W / 2, 60, 13, COL.cyan, 'center');
  if (s.t < 3.5) { cx.globalAlpha = clamp(3.5 - s.t, 0, 1); glass(W / 2 - 220, 150, 440, 116, 18); txt(`MISSION 0${s.li + 1}`, W / 2, 182, 14, COL.cyan, 'center');
    txt(s.L.name, W / 2, 220, 38, COL.white, 'center', 'Bebas Neue'); txt(s.L.gtxt, W / 2, 250, 16, COL.green, 'center'); cx.globalAlpha = 1; }
  if (s.bossOn && !s.bossDead) { const b = s.boss; glass(W / 2 - 180, H - 46, 360, 32, 12, COL.red); txt(s.L.boss, W / 2 - 168, H - 24, 15, COL.red); cx.fillStyle = COL.red; rr(W / 2 - 40, H - 36, 210 * b.hp / b.mhp, 10, 5); cx.fill(); }
  if (p.dcd > 0) { cx.fillStyle = COL.cyan; cx.globalAlpha = .6; cx.fillRect(14, 108, 60 * (1 - p.dcd / .6), 3); cx.globalAlpha = 1; }
}
function render() {
  cx.save(); const sh = S.shake > 0 ? (Math.random() - .5) * 6 : 0; cx.translate(sh, sh);
  const L = S.L || LV[0]; drawBG(L, S.cam || 0, S.t);
  if (S.p) { cx.save(); cx.translate(-S.cam, 0); drawWorld(); cx.restore(); drawHUD(); } cx.restore();
}

/* ---------- UI overlay ---------- */
function panel(h) { ov.innerHTML = `<div class="panel">${h}</div>`; ov.classList.add('on'); }
function hide() { ov.innerHTML = ''; ov.classList.remove('on'); }
function menu() {
  S.state = 'menu'; S.p = null; S.L = null; S.keepScore = false;
  panel(`<span class="badge">NK NINJA STEAM GAME</span><h2>CHOOSE YOUR NINJA</h2>
  <div class="cards">${CH.map((c, i) => `<button class="card${i === selC ? ' sel' : ''}" data-c="${i}"><img src="${AS}characters/${c.id}/portrait.png" alt="${c.name}"><b>${c.name}</b><small>${c.role}</small></button>`).join('')}</div>
  <h3>MISSION</h3><div class="mis">${LV.map((l, i) => `<button class="m${i === selL ? ' sel' : ''}" data-l="${i}"><b>0${i + 1}</b> ${l.name}<small>${l.sub}</small></button>`).join('')}</div>
  <button class="btn go" data-go>PLAY NOW ▸</button><p class="hint">A/D move · SPACE jump · J slash. Best score: ${best}</p>`);
}
function togglePause() {
  if (S.state === 'play') { S.state = 'pause'; panel(`<h2>PAUSED</h2><button class="btn go" data-resume>RESUME</button><button class="btn" data-quit>MAIN MENU</button>`); }
  else if (S.state === 'pause') { S.state = 'play'; hide(); }
}
function openQuiz(i) {
  S.state = 'quiz'; const q = S.L.qs[i], idx = q.a.map((_, k) => k).sort(() => Math.random() - .5); S.qi = i; S.qmap = idx;
  panel(`<span class="badge g">${q.tag} · KNOWLEDGE CRYSTAL</span><h2 class="q">${q.q}</h2><div class="ans">${idx.map((k, n) => `<button data-ans="${n}"><b>${'ABCD'[n]}</b> ${q.a[k]}</button>`).join('')}</div><p class="fb" id="fb">Press 1–4 or tap an answer.</p>`);
}
function answer(n) {
  if (S.state !== 'quiz') return; const q = S.L.qs[S.qi], fb = document.getElementById('fb'); if (!fb) return;
  if (S.qmap[n] === 0) { S.got.add(S.qi); S.xp += 100; S.score += 100; SFX.win(); fb.className = 'fb ok'; fb.innerHTML = `✓ CORRECT — ${q.tag} +100 XP`;
    ov.querySelectorAll('button').forEach(b => b.disabled = true); setTimeout(() => { if (S.state === 'quiz') { S.state = 'play'; hide(); } }, 1100); }
  else { fb.className = 'fb bad'; fb.innerHTML = `TRY AGAIN — HINT: ${q.h}`; tone(140, .2, 'sawtooth', .05, -60); ov.querySelectorAll('[data-ans]')[n].disabled = true; }
}
function win() {
  S.won = 1; S.state = 'win'; playAnim('win'); const p = S.p, st = 1 + (S.got.size === S.L.qs.length) + (p.hp >= 50), xp = 100 * st, last = S.li === LV.length - 1; S.xp += xp; S.coins += 50; S.score += 500; saveBest();
  setTimeout(() => panel(`<span class="badge g">MISSION 0${S.li + 1} · ${S.L.name}</span><h2>MISSION COMPLETE</h2><div class="stars">${[0, 1, 2].map(i => i < st ? '★' : '☆').join(' ')}</div>
  <table><tr><td>XP</td><td>+${xp}</td></tr><tr><td>COINS</td><td>+50 (${S.coins})</td></tr><tr><td>SCORE</td><td>${S.score}</td></tr></table>
  <h3>STEAM SKILLS</h3><div class="skills">${S.L.qs.map((q, i) => `<span class="${S.got.has(i) ? 'ok' : ''}">${q.tag} ${S.got.has(i) ? '✓' : '–'}</span>`).join('')}</div>
  <button class="btn go" data-next>${last ? 'FINISH ▸' : 'CONTINUE ▸'}</button>`), 900); SFX.win();
}
function over() { if (S.state === 'over') return; S.state = 'over'; saveBest(); panel(`<h2 class="red">MISSION FAILED</h2><p>Score ${S.score} · Best ${best}</p><p>Small steps. Big future. Try again!</p><button class="btn go" data-retry>TRY AGAIN</button><button class="btn" data-quit>MAIN MENU</button>`); }
ov.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return; const d = b.dataset;
  if (d.c) { selC = +d.c; menu(); } else if (d.l) { selL = +d.l; menu(); }
  else if (d.go !== undefined) { S.score = S.xp = 0; begin(selL, selC); }
  else if (d.resume !== undefined) togglePause();
  else if (d.quit !== undefined) menu();
  else if (d.retry !== undefined) { const sc = S.score, xp = S.xp; begin(S.li, S.ci); S.score = sc; S.xp = xp; }
  else if (d.next !== undefined) { if (S.li + 1 < LV.length) { const sc = S.score, xp = S.xp, ci = S.ci, li = S.li + 1; selL = li; begin(li, ci); S.score = sc; S.xp = xp; } else menu(); }
  else if (d.ans !== undefined) answer(+d.ans);
});
const pb = document.getElementById('btn-pause'), mb = document.getElementById('btn-mute');
if (pb) pb.onclick = togglePause; if (mb) mb.onclick = () => { muted = !muted; mb.textContent = muted ? 'SOUND OFF' : 'SOUND ON'; mb.setAttribute('aria-pressed', muted); };

/* ---------- loop ---------- */
let last = performance.now();
function frame(now) {
  const dt = Math.min(.033, (now - last) / 1000); last = now;
  if (S.state === 'play') { update(dt); for (const k in hit) hit[k] = 0; } else { for (const k in hit) hit[k] = 0; if (S.state === 'win' || S.state === 'over') update(dt); S.t += dt; }
  tickFx(dt); render(); requestAnimationFrame(frame);
}
ready.then(() => { buildAnimationFrames(); menu(); requestAnimationFrame(frame); });
window.NKGame = { menu, begin };
})();
