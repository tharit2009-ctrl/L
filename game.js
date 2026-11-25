/* NK NINJA STEAM GAME — 2D chibi ninja side-scrolling platformer (Canvas 2D, 960x540 logical) */
(() => {
'use strict';
const W = 960, H = 540, GRAV = 2000, GY = 470;
const cv = document.getElementById('game'), cx = cv.getContext('2d'), ov = document.getElementById('ov');
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const AS = 'assets/';
const COL = { navy: '#081020', mid: '#0B1830', cyan: '#00E5FF', green: '#00FF90', blue: '#4DB8FF', purple: '#8B5CF6', red: '#FF3B5C', gold: '#FFD34E', white: '#fff' };

/* ---------- data ---------- */
const CH = [
  { id: 'ninja01', name: 'SHADOW BLADE', role: 'Balanced melee', spd: 1, jmp: 1, en: 1, dash: 1 },
  { id: 'ninja02', name: 'CYBER SAGE', role: 'Energy regen +50%', spd: .95, jmp: 1, en: 1.5, dash: 1 },
  { id: 'ninja03', name: 'STORM EDGE', role: 'Faster run & dash', spd: 1.12, jmp: 1.05, en: 1, dash: 1.3 }];
const LV = [
  { name: 'NINJA ACADEMY', sub: 'Introduction to STEAM', len: 4200, kind: 'sakura', sky: ['#0B1830', '#2a1a52'], acc: '#ff8fc7', boss: 'GATE GUARDIAN',
    qs: [{ tag: 'SCIENCE', q: 'What force pulls a jumping ninja back to the ground?', a: ['Gravity', 'Color', 'Sound', 'Light'], h: 'Think about the force pulling objects downward.' },
         { tag: 'TECHNOLOGY', q: 'Which part lets a robot sense how far an object is?', a: ['Distance sensor', 'Speaker', 'Paint', 'Label'], h: 'Sensors collect data from the world.' },
         { tag: 'MATHEMATICS', q: 'A ninja runs 3 m/s for 4 seconds. How far?', a: ['12 m', '7 m', '9 m', '1 m'], h: 'Distance = speed × time.' }] },
  { name: 'SCIENCE FOREST', sub: 'Motion · Energy · Physics', len: 4400, kind: 'forest', sky: ['#04201c', '#0a2a3a'], acc: '#00FF90', boss: 'FOREST GOLEM',
    qs: [{ tag: 'SCIENCE', q: 'A shuriken keeps flying straight until a force acts on it. This is…', a: ['Inertia', 'Condensation', 'Magnetism', 'Erosion'], h: 'Objects resist changes in motion.' },
         { tag: 'SCIENCE', q: 'At the top of a cliff, a ninja has the most…', a: ['Potential energy', 'Sound energy', 'Nuclear energy', 'Color energy'], h: 'Height stores energy because of gravity.' },
         { tag: 'ENGINEERING', q: 'Which shape makes a bridge frame rigid and strong?', a: ['Triangles', 'Loose ropes', 'Unbraced squares', 'Circles'], h: 'Engineers brace structures with this shape.' }] },
  { name: 'TECHNOLOGY LAB', sub: 'Coding · Sensors · Data', len: 4600, kind: 'lab', sky: ['#06142c', '#0b2a4a'], acc: '#00E5FF', boss: 'CYBER GUARDIAN',
    qs: [{ tag: 'TECHNOLOGY', q: 'Binary 101 equals which decimal number?', a: ['5', '3', '6', '10'], h: 'Place values: 4 + 0 + 1.' },
         { tag: 'ARTS', q: 'Which pair gives the strongest contrast for a game HUD?', a: ['Cyan on dark navy', 'Navy on dark blue', 'Gray on gray', 'Green on green'], h: 'Contrast = big difference in brightness.' },
         { tag: 'MATHEMATICS', q: 'Ignoring air, which launch angle gives the longest range?', a: ['45°', '0°', '90°', '10°'], h: 'Halfway between flat and straight up.' }] }];

/* ---------- assets ---------- */
const IMG = {};
const load = (k, s) => new Promise(r => { const i = new Image(); i.onload = () => r(IMG[k] = i); i.onerror = () => r(IMG[k] = null); i.src = AS + s; });
const ready = Promise.all([
  ...CH.flatMap(c => [load(c.id, `characters/${c.id}/idle.png`), load(c.id + 'p', `characters/${c.id}/portrait.png`)]),
  ...['basic', 'shield', 'boss'].map(k => load(k, `enemies/${k}.png`)),
  ...['coin', 'heart', 'orb', 'crystal', 'shuriken'].map(k => load(k, `icons/${k}.svg`))]);

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
const KM = { ArrowLeft: 'left', KeyA: 'left', ArrowRight: 'right', KeyD: 'right', Space: 'jump', KeyJ: 'atk', KeyK: 'spec', KeyL: 'dash', KeyE: 'throw' };
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
function build(li) {
  const L = LV[li], r = mulberry(li * 97 + 11), P = [{ x: -300, y: GY, w: 1000, h: 80 }], E = [], C = [], cps = [0];
  let x = 700, seg = 0, qi = 0;
  for (let i = 0; i < 4; i++) C.push({ t: 'coin', x: 300 + i * 40, y: 430 });
  while (x < L.len - 1700) {
    x += 100 + r() * 50; const w = 480 + r() * 240;
    P.push({ x, y: GY, w, h: 80 }); cps.push(x + 40);
    for (let i = 0, n = 1 + (r() > .5); i < n; i++) E.push(mkE(li > 0 && r() > .45 ? 'shield' : 'basic', x + 160 + r() * (w - 340), x + 10, x + w - 10));
    for (let i = 0; i < 5; i++) C.push({ t: 'coin', x: x + 90 + i * 40, y: 430 - Math.sin(i / 4 * Math.PI) * 55 });
    if (qi < 3) { const fx = x + w * .3 + r() * 80; P.push({ x: fx, y: 350, w: 150, h: 16, fl: 1 }); C.push({ t: 'crystal', x: fx + 75, y: 310, q: qi++ }); }
    C.push({ t: seg % 2 ? 'orb' : 'heart', x: x + w * .6, y: 435 });
    seg++; x += w;
  }
  const ar = x + 110; L.len = ar + 900; P.push({ x: ar, y: GY, w: 900, h: 80 }); cps.push(ar + 20);
  while (qi < 3) { const fx = ar + 120 + qi * 220; P.push({ x: fx, y: 350, w: 150, h: 16, fl: 1 }); C.push({ t: 'crystal', x: fx + 75, y: 310, q: qi++ }); }
  const b = mkE('boss', ar + 620, ar + 40, L.len - 90); b.hp = b.mhp = 18 + li * 6; b.arena = ar; E.push(b);
  return { L, P, E, C, cps, len: L.len, ar, boss: b };
}
function begin(li, ci) {
  const w = build(li), ch = CH[ci];
  S = { ...w, state: 'play', li, ci, ch, t: 0, cam: 0, shake: 0, cp: 0, score: S.score || 0, coins: 0, xp: S.xp || 0, got: new Set(), bossDead: false, bossOn: false, pend: null,
    p: { x: 80, y: GY - 72, w: 34, h: 72, vx: 0, vy: 0, face: 1, ground: true, coy: 0, jb: 0, hp: 100, en: 100, atk: 0, acd: 0, spin: 0, dash: 0, dcd: 0, tcd: 0, inv: 0, hurt: 0, land: 0, ko: 0, t: 0, hl: new Set() } };
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
  p.hp -= n; p.inv = 1; p.hurt = .28; p.vx = dir * 240; p.vy = -300; p.ground = false; shake(6); SFX.hit(); burst(p.x + 17, p.y + 30, COL.red, 10);
  if (p.hp <= 0) { p.hp = 0; p.ko = 1; p.vx = 0; }
}
function fire(e, a, sp = 300) { bullets.push({ x: e.x + e.w / 2, y: e.y + e.h * .4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, hostile: 1, life: 3, a: 0 }); }

/* ---------- update ---------- */
S.C = [];
function update(dt) {
  const s = S, p = s.p, ch = s.ch; s.t += dt; p.t += dt;
  if (s.shake > 0) s.shake -= dt;
  for (const k of ['atk', 'acd', 'spin', 'dash', 'dcd', 'tcd', 'inv', 'hurt', 'land']) if (p[k] > 0) p[k] -= dt;
  if (p.ko) { p.ko += dt; p.vy += GRAV * dt; p.y += p.vy * dt; if (p.y > H + 100) p.y = H + 100; if (p.ko > 1.2) over(); return; }
  if (s.won) { p.vx = 0; return; }
  const dir = (down.right ? 1 : 0) - (down.left ? 1 : 0);
  if (hit.dash && p.dcd <= 0 && p.dash <= 0) { p.dash = .18; p.dcd = .6; p.inv = Math.max(p.inv, .22); SFX.dash(); burst(p.x + 17, p.y + 60, COL.cyan, 6, 120); }
  if (p.dash > 0) { p.vx = p.face * 720 * ch.dash; p.vy = 0; }
  else if (p.hurt <= 0) { p.vx = dir * 270 * ch.spd * (p.spin > 0 ? .55 : 1); if (dir) p.face = dir; } else p.vx *= .92;
  p.coy = p.ground ? .1 : p.coy - dt; p.jb -= dt; if (hit.jump) p.jb = .12;
  if (p.jb > 0 && p.coy > 0 && p.hurt <= 0) { p.vy = -790 * ch.jmp; p.coy = 0; p.jb = 0; p.ground = false; SFX.jump(); }
  if (!down.jump && p.vy < -320) p.vy = -320;
  if (p.dash <= 0) p.vy = Math.min(p.vy + GRAV * dt, 1100);
  if (hit.atk && p.acd <= 0 && p.spin <= 0) { p.atk = .22; p.acd = .3; p.hl = new Set(); SFX.slash(); }
  if (hit.spec && p.en >= 40 && p.spin <= 0) { p.en -= 40; p.spin = .5; p.hl = new Set(); SFX.spec(); shake(3); }
  if (hit.throw && p.en >= 12 && p.tcd <= 0) { p.en -= 12; p.tcd = .35; bullets.push({ x: p.x + 17, y: p.y + 30, vx: p.face * 640, vy: 0, life: 1.6, a: 0 }); SFX.slash(); }
  p.en = Math.min(100, p.en + 6 * ch.en * dt);
  // move
  p.x = clamp(p.x + p.vx * dt, 0, s.len - p.w);
  const pb = p.y + p.h; p.y += p.vy * dt; const was = p.ground; p.ground = false;
  if (p.vy >= 0) for (const f of s.P) if (p.x + p.w > f.x + 4 && p.x < f.x + f.w - 4 && pb <= f.y + 6 && p.y + p.h >= f.y) { p.y = f.y - p.h; if (!was && p.vy > 300) { p.land = .12; burst(p.x + 17, p.y + p.h, '#9fb4d9', 5, 90); } p.vy = 0; p.ground = true; break; }
  if (p.y > H + 120) { hurtP(0, 0); p.hp -= 20; if (p.hp <= 0) { p.hp = 0; p.ko = 1; } else { p.x = s.cp; p.y = 280; p.vy = 0; p.inv = 1.5; say('CHECKPOINT', p.x, 250, COL.cyan); } }
  for (const c of s.cps) if (p.x > c) s.cp = Math.max(s.cp, c);
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
  if (s.bossDead && Math.abs(p.x + 17 - (s.len - 110)) < 50 && !s.won) win();
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
function drawBG(L, cam, t) {
  const g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, L.sky[0]); g.addColorStop(1, L.sky[1]); cx.fillStyle = g; cx.fillRect(0, 0, W, H);
  cx.save(); cx.shadowColor = '#9ed8ff'; cx.shadowBlur = 60; cx.fillStyle = '#eaf6ff'; cx.beginPath(); cx.arc(740, 110, 48, 0, 6.3); cx.fill(); cx.restore();
  [[.12, 200, '#0d1a38'], [.25, 140, '#091227']].forEach(([k, hh, c]) => { cx.fillStyle = c; cx.beginPath(); cx.moveTo(0, H);
    for (let x = 0; x <= W + 20; x += 20) { const wx = x + cam * k; cx.lineTo(x, H - hh - 60 * Math.sin(wx / 170 * (k * 6)) - 30 * Math.sin(wx / 60)); } cx.lineTo(W, H); cx.fill(); });
  const sp = 520, off = -((cam * .5) % sp);
  for (let x = off - sp; x < W + sp; x += sp) {
    const n = Math.round((x + cam * .5) / sp); cx.fillStyle = '#070e20';
    if (L.kind === 'sakura') { cx.fillRect(x + 80, 250, 14, 220); cx.fillRect(x + 200, 250, 14, 220); cx.fillRect(x + 60, 245, 174, 14); cx.fillRect(x + 72, 275, 150, 8);
      cx.fillRect(x + 330, 330, 80, 140); [[320, 320, 100], [335, 285, 70], [348, 255, 44]].forEach(([a, b, w]) => { cx.beginPath(); cx.moveTo(x + a - 10, b + 12); cx.lineTo(x + a + w / 2, b - 8); cx.lineTo(x + a + w + 10, b + 12); cx.fill(); });
      cx.fillStyle = '#ffb36b'; cx.globalAlpha = .75; cx.beginPath(); cx.arc(x + 100, 296, 5, 0, 6.3); cx.arc(x + 190, 296, 5, 0, 6.3); cx.fill(); cx.globalAlpha = 1; }
    else if (L.kind === 'forest') { for (let i = 0; i < 2; i++) { const tx = x + 90 + i * 250 + (n % 3) * 20; cx.fillStyle = '#06120f'; cx.fillRect(tx, 190, 26, 290); cx.beginPath(); cx.ellipse(tx + 13, 190, 90, 60, 0, 0, 6.3); cx.fill();
      cx.strokeStyle = 'rgba(0,255,144,.35)'; cx.lineWidth = 2; cx.beginPath(); cx.ellipse(tx + 13, 190, 90, 60, 0, 3.4, 6); cx.stroke(); } }
    else { for (let i = 0; i < 2; i++) { const bx = x + 60 + i * 230, bh = 160 + ((n + i) % 3) * 50; cx.fillStyle = '#071428'; cx.fillRect(bx, 470 - bh, 90, bh);
      cx.fillStyle = 'rgba(0,229,255,.55)'; for (let yy = 470 - bh + 14; yy < 460; yy += 22) for (let xx = bx + 10; xx < bx + 80; xx += 20) if ((xx + yy + n) % 3) cx.fillRect(xx, yy, 8, 8);
      cx.strokeStyle = 'rgba(0,229,255,.5)'; cx.beginPath(); cx.ellipse(bx + 45, 470 - bh - 20, 38, 9, 0, 0, 6.3); cx.stroke(); } }
  }
  if (L.kind === 'sakura' || L.kind === 'forest') { cx.fillStyle = L.kind === 'sakura' ? 'rgba(255,170,210,.85)' : 'rgba(0,255,144,.6)';
    for (const q of petals) { q.y += q.v * .016; q.x -= q.v * .01; if (q.y > H) { q.y = -5; q.x = Math.random() * W; } if (q.x < 0) q.x = W; cx.fillRect(q.x, q.y, q.s * 2, q.s); } }
}
function drawWorld() {
  const s = S, p = s.p, L = s.L;
  for (const f of s.P) { if (f.x + f.w < s.cam - 20 || f.x > s.cam + W + 20) continue;
    if (f.fl) { glass(f.x, f.y, f.w, f.h, 6); } else { const g = cx.createLinearGradient(0, f.y, 0, f.y + f.h); g.addColorStop(0, '#12213f'); g.addColorStop(1, '#070d1c'); cx.fillStyle = g; cx.fillRect(f.x, f.y, f.w, f.h + 100);
      cx.fillStyle = L.acc; cx.globalAlpha = .85; cx.fillRect(f.x, f.y, f.w, 4); cx.globalAlpha = .12; for (let x = f.x + 30; x < f.x + f.w; x += 60) cx.fillRect(x, f.y + 14, 30, 2); cx.globalAlpha = 1; } }
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
  const p = S.p, im = IMG[S.ch.id]; if (!im) return; const t = p.t, run = p.ground && Math.abs(p.vx) > 20;
  let sx = 1, sy = 1, rot = 0, bob = 0;
  if (p.ko) { rot = Math.min(1.4, p.ko * 2.5) * -p.face; }
  else if (p.land > 0) { sx = 1.14; sy = .86; } else if (!p.ground) { const v = clamp(p.vy / 1100, -1, 1); sx = 1 - Math.abs(v) * .1; sy = 1 + Math.abs(v) * .12; rot = .12 * p.face * (v < 0 ? -1 : 1) * .6; }
  else if (run) { bob = Math.abs(Math.sin(t * 14)) * 5; rot = .09 * p.face; sy = 1 + Math.sin(t * 28) * .02; } else { sy = 1 + Math.sin(t * 3) * .015; }
  if (S.won) bob = Math.abs(Math.sin(t * 8)) * 14;
  if (p.atk > 0) rot = .28 * p.face; if (p.spin > 0) rot = (1 - p.spin / .5) * 12.56 * p.face;
  const dh = 112, dw = im.width * dh / im.height, fx = p.x + p.w / 2, fy = p.y + p.h + 3;
  if (p.dash > 0) for (let i = 1; i < 4; i++) { cx.save(); cx.globalAlpha = .22 / i; cx.translate(fx - p.face * i * 26, fy); cx.scale(p.face, 1); cx.filter = 'hue-rotate(60deg) brightness(1.6)'; cx.drawImage(im, -dw / 2, -dh, dw, dh); cx.restore(); }
  cx.save(); if (p.inv > 0 && !p.ko && Math.floor(t * 20) % 2) cx.globalAlpha = .45; cx.translate(fx, fy - bob); cx.scale(p.face * sx, sy); cx.translate(0, p.spin > 0 ? -dh / 2 : 0); cx.rotate(rot); cx.drawImage(im, -dw / 2, p.spin > 0 ? -dh / 2 : -dh, dw, dh); cx.restore();
  if (p.atk > 0) { const k = 1 - p.atk / .22; cx.save(); cx.translate(fx + p.face * 14, p.y + 34); cx.strokeStyle = COL.green; cx.shadowColor = COL.green; cx.shadowBlur = 18; cx.lineWidth = 7; cx.lineCap = 'round';
    cx.beginPath(); const a0 = p.face > 0 ? -1.2 : Math.PI - 1.2 + 2.4 * 0 ; if (p.face > 0) cx.arc(0, 0, 58, -1.1 + k * .6, -1.1 + k * 2.2); else cx.arc(0, 0, 58, Math.PI + 1.1 - k * 2.2, Math.PI + 1.1 - k * .6); cx.stroke(); cx.restore(); }
  if (p.spin > 0) { cx.save(); cx.translate(fx, p.y + 36); cx.strokeStyle = COL.purple; cx.shadowColor = COL.purple; cx.shadowBlur = 20; cx.lineWidth = 6; cx.globalAlpha = .9; const r = 70 + 40 * (1 - p.spin / .5);
    cx.beginPath(); cx.arc(0, 0, r, S.t * 18, S.t * 18 + 4.2); cx.stroke(); cx.strokeStyle = COL.green; cx.beginPath(); cx.arc(0, 0, r - 14, -S.t * 22, -S.t * 22 + 3.4); cx.stroke(); cx.restore(); }
}
function bar(x, y, w, v, c, label) { cx.fillStyle = 'rgba(255,255,255,.12)'; rr(x, y, w, 12, 6); cx.fill(); cx.save(); rr(x, y, w, 12, 6); cx.clip(); cx.fillStyle = c; cx.fillRect(x, y, w * clamp(v, 0, 1), 12); cx.restore(); txt(label, x + w + 8, y + 11, 13, '#E5E7EB'); }
function drawHUD() {
  const s = S, p = s.p; glass(14, 12, 292, 92, 16);
  const pi = IMG[s.ch.id + 'p']; if (pi) { cx.save(); cx.beginPath(); cx.arc(58, 58, 34, 0, 6.3); cx.clip(); cx.drawImage(pi, 24, 24, 68, 68); cx.restore(); cx.strokeStyle = COL.cyan; cx.lineWidth = 2; cx.beginPath(); cx.arc(58, 58, 34, 0, 6.3); cx.stroke(); }
  txt(`${s.ch.name} · Lv.${1 + Math.floor(s.xp / 300)}`, 102, 34, 18); bar(102, 46, 150, p.hp / 100, COL.red, 'HP'); bar(102, 68, 150, p.en / 100, COL.green, 'EN');
  glass(W - 214, 12, 200, 62, 16); if (IMG.coin) cx.drawImage(IMG.coin, W - 202, 20, 26, 26); txt(String(s.coins).padStart(3, '0'), W - 168, 41, 24, COL.gold); txt('SCORE ' + String(s.score).padStart(5, '0'), W - 200, 64, 16, '#E5E7EB');
  const n = s.got.size; glass(W / 2 - 150, 12, 300, 30, 12); txt(`MISSION · Crystals ${n}/3 · ${s.bossDead ? 'Enter the portal' : 'Defeat the guardian'}`, W / 2, 33, 14, n === 3 ? COL.green : '#E5E7EB', 'center');
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
  panel(`<span class="badge">VIRTUAL NINJA</span><h2>CHOOSE YOUR NINJA</h2>
  <div class="cards">${CH.map((c, i) => `<button class="card${i === selC ? ' sel' : ''}" data-c="${i}"><img src="${AS}characters/${c.id}/portrait.png" alt="${c.name}"><b>${c.name}</b><small>${c.role}</small></button>`).join('')}</div>
  <h3>MISSION</h3><div class="mis">${LV.map((l, i) => `<button class="m${i === selL ? ' sel' : ''}" data-l="${i}"><b>0${i + 1}</b> ${l.name}<small>${l.sub}</small></button>`).join('')}</div>
  <button class="btn go" data-go>PLAY NOW ▸</button><p class="hint">Run. Jump. Think. Create.</p>`);
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
  S.won = 1; S.state = 'win'; const p = S.p, st = 1 + (S.got.size === 3) + (p.hp >= 50), xp = 100 * st, last = S.li === LV.length - 1; S.xp += xp; S.coins += 50; S.score += 500;
  setTimeout(() => panel(`<span class="badge g">MISSION 0${S.li + 1} · ${S.L.name}</span><h2>MISSION COMPLETE</h2><div class="stars">${[0, 1, 2].map(i => i < st ? '★' : '☆').join(' ')}</div>
  <table><tr><td>XP</td><td>+${xp}</td></tr><tr><td>COINS</td><td>+50 (${S.coins})</td></tr><tr><td>SCORE</td><td>${S.score}</td></tr></table>
  <h3>STEAM SKILLS</h3><div class="skills">${S.L.qs.map((q, i) => `<span class="${S.got.has(i) ? 'ok' : ''}">${q.tag} ${S.got.has(i) ? '✓' : '–'}</span>`).join('')}</div>
  <button class="btn go" data-next>${last ? 'FINISH ▸' : 'CONTINUE ▸'}</button>`), 900); SFX.win();
}
function over() { if (S.state === 'over') return; S.state = 'over'; panel(`<h2 class="red">MISSION FAILED</h2><p>Small steps. Big future. Try again!</p><button class="btn go" data-retry>TRY AGAIN</button><button class="btn" data-quit>MAIN MENU</button>`); }
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
ready.then(() => { menu(); requestAnimationFrame(frame); });
window.NKGame = { menu, begin };
})();
