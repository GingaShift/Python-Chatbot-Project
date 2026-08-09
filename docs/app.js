/* ─── 0 · préférences ─────────────────────────────────────────────────── */
const REDUCED_MOTION = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── 1 · tokenisation identique au moteur Python ────────────────────────
   string.punctuation, remplacée par un espace (traitement_questions_reponses.py
   fait .lower() puis nettoyer_texte() puis .split(" ") dans creer_vecteur_tf_idf_question) */
const PUNCTUATION = new Set("!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~".split(""));
function nettoyerTexte(texte) {
  let out = '';
  for (const c of texte) out += PUNCTUATION.has(c) ? ' ' : c;
  return out;
}
function tokenizeQuestion(raw) {
  let q = raw.toLowerCase();
  q = nettoyerTexte(q);
  q = q.replace(/\s+$/, '');
  return q.split(' '); // split(" ") simple, comme le moteur — peut produire des tokens ""
}
function escapeRegExp(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
function motBoundaryRegex(mot) {
  // \b de JS est ASCII-only ; celui de Python (re, str) est Unicode-aware par défaut.
  // On reproduit la frontière Unicode à la main pour que les mots accentués (élection…)
  // soient trouvés comme le moteur les trouve.
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escapeRegExp(mot)}(?![\\p{L}\\p{N}_])`, 'u');
}
function trouverPhraseEntourantMot(texte, mot) {
  const m = motBoundaryRegex(mot).exec(texte);
  if (!m) return '';
  const debutMot = m.index, finMot = m.index + m[0].length;
  const debutPhrase = Math.max(texte.lastIndexOf('.', debutMot - 2), 0);
  const finIdx = texte.indexOf('.', finMot);
  let phrase = finIdx === -1 ? texte.slice(debutPhrase, texte.length - 1) : texte.slice(debutPhrase, finIdx);
  phrase = phrase.trim();
  if (phrase.slice(0, 2) === '.\n') phrase = phrase.slice(2);
  return phrase;
}

/* ─── 2 · état global, rempli après fetch ────────────────────────────────*/
let VOCAB = [], IDF = [], TIDX = new Map(), DOCS = [], N = 0, VOCAB_SIZE = 0, META = null;
const EMB = { lsa: null, mds: null };

const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const nrm = v => { const m = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / m, v[1] / m, v[2] / m]; };
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function l2norm(v) { let s = 0; for (let i = 0; i < v.length; i++) s += v[i] * v[i]; return Math.sqrt(s); }
function densify(sparse, size) { const v = new Float64Array(size); for (const k in sparse) v[+k] = sparse[k]; return v; }

/* ─── 3 · vectorisation de la requête, coté navigateur uniquement ────────*/
function buildQueryVector(tokens) {
  const w = new Float64Array(VOCAB_SIZE);
  for (const tok of tokens) { const idx = TIDX.get(tok); if (idx !== undefined) w[idx] += 1; }
  // pondération idf appliquée une fois PAR OCCURRENCE du mot dans la requête — fidèle à
  // creer_vecteur_tf_idf_question, où un mot répété k fois est donc pondéré par idf^k.
  for (const tok of tokens) { const idx = TIDX.get(tok); if (idx !== undefined) w[idx] *= IDF[idx]; }
  return w;
}
function analyzeQueryTerms(tokens, weighted) {
  const seen = new Set(), kept = [], dropped = [];
  for (const tok of tokens) {
    if (tok === '' || seen.has(tok)) continue;
    seen.add(tok);
    const idx = TIDX.get(tok);
    if (idx === undefined) { dropped.push({ t: tok, reason: "hors vocabulaire" }); continue; }
    if (IDF[idx] === 0) { dropped.push({ t: tok, reason: "idf = 0 (mot vide)" }); continue; }
    kept.push({ t: tok, idx, weight: weighted[idx] });
  }
  kept.sort((a, b) => b.weight - a.weight);
  return { kept, dropped };
}
function cosineScores(weighted) {
  const qn = l2norm(weighted);
  if (qn === 0) return DOCS.map(() => 0);
  return DOCS.map(d => {
    let s = 0;
    for (let i = 0; i < VOCAB_SIZE; i++) s += weighted[i] * d.vector[i];
    return s / qn; // d.vector est déjà unitaire (L2) : dot/qn = cos(q,d)
  });
}
function pivotTerm(weighted) {
  let bestIdx = -1, bestScore = 0;
  for (let i = 0; i < weighted.length; i++) if (weighted[i] > bestScore) { bestScore = weighted[i]; bestIdx = i; }
  return bestIdx === -1 ? '' : VOCAB[bestIdx];
}

/* ─── 4 · placement de la requête sur la sphère ──────────────────────────*/
function slerp(a, b, t) {
  const d = clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1), o = Math.acos(d);
  if (o < 1e-6) return a.slice();
  const s = Math.sin(o);
  return nrm([0, 1, 2].map(k => (Math.sin((1 - t) * o) / s) * a[k] + (Math.sin(t * o) / s) * b[k]));
}
function placeTri(cos, pos) {
  const tgt = cos.map(c => Math.acos(clamp(c, -1, 1)));
  let q = [0, 0, 0]; cos.forEach((c, i) => { const w = Math.max(c, 0); q = q.map((x, k) => x + w * pos[i][k]); });
  if (Math.hypot(q[0], q[1], q[2]) < 1e-9) q = [0, 0, 1];
  q = nrm(q); let lr = .35;
  for (let it = 0; it < 400; it++) {
    let g = [0, 0, 0];
    for (let i = 0; i < N; i++) {
      const u = clamp(q[0] * pos[i][0] + q[1] * pos[i][1] + q[2] * pos[i][2], -.999999, .999999);
      const d = 2 * (Math.acos(u) - tgt[i]) * (-1 / Math.sqrt(1 - u * u));
      for (let k = 0; k < 3; k++) g[k] += d * pos[i][k];
    }
    const rad = g[0] * q[0] + g[1] * q[1] + g[2] * q[2];
    q = nrm(q.map((x, k) => x - lr * (g[k] - rad * q[k]))); lr *= .993;
  }
  let s = 0;
  for (let i = 0; i < N; i++) { const u = clamp(q[0] * pos[i][0] + q[1] * pos[i][1] + q[2] * pos[i][2], -1, 1); s += (Math.acos(u) - tgt[i]) ** 2; }
  return { q, res: Math.sqrt(s / N) * 180 / Math.PI };
}
function placeProj(cos, emb) {
  const comp = [];
  for (let k = 0; k < N; k++) {
    const l = Math.max(emb.values[k], 0);
    if (l < 1e-10) { comp.push(0); continue; }
    let s = 0; for (let i = 0; i < N; i++) s += cos[i] * emb.vectors[k][i];
    comp.push(s / Math.sqrt(l));
  }
  const nAll = Math.hypot(...comp) || 1e-12, n3 = Math.hypot(comp[0], comp[1], comp[2]);
  return { q: nrm([comp[0], comp[1], comp[2]]), sub: nAll, cap: n3 / nAll };
}

/* ─── 5 · état de l'instrument ────────────────────────────────────────── */
const S = { mode: 'lsa', place: 'tri', surf: 'field', thr: 0,
  flow: !REDUCED_MOTION, terms: true, eq: true, ray: true, spin: false,
  yaw: .7, pitch: -.3, zoom: 1,
  q: null, cos: null, qpos: null, qprev: null, qt: 1, best: -1, hover: -1, anim: 0, diag: {}, t: 0,
  stepMode: false, step: 0 };

/* ─── 6 · maillage de la sphère, densité proportionnelle à l'aire du canvas ── */
let MESH = [];
let meshDims = [0, 0]; // [nlat, nlon] courants, pour éviter de reconstruire pour rien
function buildMesh(nlat, nlon) {
  const mesh = [];
  for (let a = 0; a < nlat; a++) for (let b = 0; b < nlon; b++) {
    const la0 = -Math.PI / 2 + a * Math.PI / nlat, la1 = -Math.PI / 2 + (a + 1) * Math.PI / nlat;
    const lo0 = b * 2 * Math.PI / nlon, lo1 = (b + 1) * 2 * Math.PI / nlon;
    const P = (la, lo) => [Math.cos(la) * Math.cos(lo) * .985, Math.sin(la) * .985, Math.cos(la) * Math.sin(lo) * .985];
    const lam = (la0 + la1) / 2, lom = (lo0 + lo1) / 2;
    mesh.push({ c: [Math.cos(lam) * Math.cos(lom), Math.sin(lam), Math.cos(lam) * Math.sin(lom)],
                q: [P(la0, lo0), P(la1, lo0), P(la1, lo1), P(la0, lo1)], doc: 0, cos: 0 });
  }
  MESH = mesh; meshDims = [nlat, nlon];
}
function updateMeshForCanvas() {
  // ~1800 cellules pour un canvas ~820x820 (référence du prototype), proportionnel à l'aire
  // au-delà, plafonné à 3000 ; ratio lat:lon = 1:2 conservé (comme l'original 30x60).
  const area = Math.max(Wd * Hd, 1), refArea = 820 * 820;
  const n = clamp(Math.round(1800 * (area / refArea)), 600, 3000);
  const nlat = Math.max(10, Math.round(Math.sqrt(n / 2))), nlon = nlat * 2;
  if (nlat === meshDims[0] && nlon === meshDims[1]) return;
  buildMesh(nlat, nlon);
  if (EMB[S.mode]) { assignCells(EMB[S.mode].pos); fieldCells(); }
}
// garde-fou FPS : si le rendu reste sous 45 fps ~1.5s, réduit une fois la densité du maillage
// (jusqu'à 2 paliers), plutôt que de laisser l'appareil s'essouffler sur un maillage trop fin.
let lowFpsStreak = 0, meshDowngrades = 0;
function watchFps(curFps) {
  lowFpsStreak = curFps < 45 ? lowFpsStreak + 1 : 0;
  if (lowFpsStreak > 90 && meshDowngrades < 2) {
    meshDowngrades++; lowFpsStreak = 0;
    const [nlat, nlon] = meshDims;
    buildMesh(Math.max(10, Math.round(nlat * .71)), Math.max(20, Math.round(nlon * .71)));
    if (EMB[S.mode]) { assignCells(EMB[S.mode].pos); fieldCells(); }
    console.info('NOVA: fps bas, densité du maillage réduite (palier ' + meshDowngrades + ').');
  }
}
function assignCells(pos) {
  MESH.forEach(m => { let bi = 0, bv = -2;
    for (let i = 0; i < N; i++) { const v = m.c[0] * pos[i][0] + m.c[1] * pos[i][1] + m.c[2] * pos[i][2]; if (v > bv) { bv = v; bi = i; } }
    m.doc = bi; }); }
function fieldCells() { if (!S.qpos) return; MESH.forEach(m => m.cos = m.c[0] * S.qpos[0] + m.c[1] * S.qpos[1] + m.c[2] * S.qpos[2]); }
const RAMP = [[-1, '#0A0C1A'], [-.3, '#101632'], [0, '#16204A'], [.35, '#1E5C7A'], [.7, '#2FB5B0'], [1, '#E5B84B']];
function ramp(v) {
  for (let i = 0; i < RAMP.length - 1; i++) { const [a, ca] = RAMP[i], [b, cb] = RAMP[i + 1];
    if (v <= b) { const t = (v - a) / (b - a || 1);
      const p = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
      const A = p(ca), Bc = p(cb);
      return `rgb(${A.map((x, k) => Math.round(x + (Bc[k] - x) * t)).join(',')})`; } }
  return RAMP[RAMP.length - 1][1];
}

/* ─── 7 · rendu ─────────────────────────────────────────────────────────*/
const cv = document.getElementById('cv'), ctx = cv.getContext('2d');
let Wd = 0, Hd = 0, FONT = '';
// UI = facteur d'échelle des décorations du canvas (polices, traits, rayons de marqueurs,
// particules, décalages d'étiquettes, rayon de survol) — SC (rayon de la sphère) grandit déjà
// avec le canvas via preRot(), mais les constantes en dur ne suivaient jamais.
let UI = 1, uiScale = 1;
function resize() { const r = cv.parentElement.getBoundingClientRect(), dpr = devicePixelRatio || 1;
  Wd = r.width; Hd = r.height; cv.width = Wd * dpr; cv.height = Hd * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  FONT = getComputedStyle(document.body).fontFamily;
  UI = (Math.min(Wd, Hd) / 820) * uiScale;
  updateMeshForCanvas(); }
addEventListener('resize', resize);

let _s = 2807; const rnd = () => (_s = (_s * 1664525 + 1013904223) % 4294967296) / 4294967296;
const STARS = Array.from({ length: 150 }, () => { const r = 2.4 + rnd() * 1.6, u = rnd() * 2 - 1, a = rnd() * Math.PI * 2, s = Math.sqrt(1 - u * u);
  return [r * s * Math.cos(a), r * u, r * s * Math.sin(a), rnd()]; });

const CAM = 3.4;
let cy_ = 1, sy_ = 0, cp_ = 1, sp_ = 0, SC = 200;
function preRot() { cy_ = Math.cos(S.yaw); sy_ = Math.sin(S.yaw); cp_ = Math.cos(S.pitch); sp_ = Math.sin(S.pitch); SC = Math.min(Wd, Hd) * .33 * S.zoom; }
function rot(p) { const x = p[0] * cy_ - p[2] * sy_, z1 = p[0] * sy_ + p[2] * cy_; return [x, p[1] * cp_ - z1 * sp_, p[1] * sp_ + z1 * cp_]; }
function proj(p) { const r = rot(p), k = CAM / (CAM - r[2]); return [Wd / 2 + r[0] * SC * k, Hd / 2 - r[1] * SC * k, r[2], k]; }
function stroke(pts, col, w, al = 1) { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]));
  ctx.strokeStyle = col; ctx.lineWidth = w; ctx.globalAlpha = al; ctx.stroke(); ctx.globalAlpha = 1; }
function circlePerp(n) {
  let e = Math.abs(n[0]) < .9 ? [1, 0, 0] : [0, 1, 0];
  const d = e[0] * n[0] + e[1] * n[1] + e[2] * n[2];
  e = nrm([e[0] - n[0] * d, e[1] - n[1] * d, e[2] - n[2] * d]);
  const f = [n[1] * e[2] - n[2] * e[1], n[2] * e[0] - n[0] * e[2], n[0] * e[1] - n[1] * e[0]];
  const pts = []; for (let i = 0; i <= 110; i++) { const t = i / 110 * Math.PI * 2, c = Math.cos(t), s = Math.sin(t);
    pts.push(proj([c * e[0] + s * f[0], c * e[1] + s * f[1], c * e[2] + s * f[2]])); }
  return pts;
}

let fps = 60, lastT = performance.now();

/* évitement de collision des étiquettes : priorité requête > meilleur match > survolé > reste ;
   place chaque étiquette à sa position naturelle, et si elle chevauche une étiquette déjà posée
   (de priorité égale ou supérieure), la pousse verticalement — trait de rappel fin si déplacée. */
function layoutLabels(items, showScoreLine) {
  const priority = it => it.i === -1 ? 3 : it.i === S.best ? 2 : it.i === S.hover ? 1 : 0;
  const ordered = items.slice().sort((a, b) => priority(b) - priority(a));
  const placed = [];
  const result = new Map();
  for (const it of ordered) {
    const isQ = it.i === -1, best = it.i === S.best;
    const text = isQ ? 'REQUÊTE' : DOCS[it.i].label;
    ctx.font = (isQ || best ? '700 ' : '') + (isQ ? 11 : 10) * UI + 'px ' + FONT;
    let w = ctx.measureText(text).width;
    if (!isQ && showScoreLine && S.cos) w = Math.max(w, ctx.measureText(S.cos[it.i].toFixed(3)).width);
    const lineH = 12 * UI, h = (isQ ? 1 : showScoreLine ? 2 : 1) * lineH;
    const naturalX = it.pr[0] + (isQ ? 15 : 11) * UI, naturalY = it.pr[1] + (isQ ? -5 : 3.5) * UI;
    let x = naturalX, y = naturalY, tries = 0;
    while (tries < 14 && placed.some(b => x < b.x + b.w + 4 * UI && x + w > b.x - 4 * UI && y - 9 * UI < b.y + b.h && y + h - 9 * UI > b.y)) {
      y += h + 4 * UI; tries++;
    }
    placed.push({ x, y: y - 9 * UI, w, h });
    result.set(it.i, { x, y, moved: Math.abs(y - naturalY) > 0.5 });
  }
  return result;
}

function draw() {
  if (!EMB[S.mode]) return;
  const now = performance.now(); fps = fps * .92 + 1000 / Math.max(now - lastT, 1) * .08; lastT = now;
  watchFps(fps);
  S.t += .016; preRot();
  const emb = EMB[S.mode], pos = emb.pos;
  ctx.clearRect(0, 0, Wd, Hd);

  const bg = ctx.createRadialGradient(Wd / 2, Hd / 2, 0, Wd / 2, Hd / 2, SC * 2.6);
  bg.addColorStop(0, '#0A0D1E'); bg.addColorStop(1, '#04050A'); ctx.fillStyle = bg; ctx.fillRect(0, 0, Wd, Hd);

  STARS.forEach(s => { const p = proj(s); if (p[2] > CAM - .2) return;
    ctx.fillStyle = '#fff'; ctx.globalAlpha = (.05 + s[3] * .16) * (p[2] > 0 ? 1 : .4);
    ctx.fillRect(p[0], p[1], 1.2 * UI, 1.2 * UI); ctx.globalAlpha = 1; });

  const showPoint = !S.stepMode || S.step >= 2;
  const showArcs = !S.stepMode || S.step >= 3;

  if (S.surf !== 'none') {
    ctx.lineWidth = 0;
    MESH.forEach(m => { const c = rot(m.c); if (c[2] < 0.05) return;
      const shade = .35 + .65 * clamp(c[2], 0, 1); let col;
      if (S.surf === 'cells') { const h = DOCS[m.doc].hue;
        const r = parseInt(h.slice(1, 3), 16), g = parseInt(h.slice(3, 5), 16), b = parseInt(h.slice(5, 7), 16);
        col = `rgba(${r},${g},${b},${(.10 + shade * .16).toFixed(3)})`;
      } else { col = showPoint ? ramp(m.cos) : ramp(0); }
      const q = m.q.map(proj); ctx.beginPath(); ctx.moveTo(q[0][0], q[0][1]);
      for (let i = 1; i < 4; i++) ctx.lineTo(q[i][0], q[i][1]); ctx.closePath();
      ctx.fillStyle = col; ctx.globalAlpha = S.surf === 'cells' ? 1 : (.30 + shade * .42); ctx.fill(); ctx.globalAlpha = 1; });
  }

  for (const lat of [-.5, 0, .5]) { const r = Math.sqrt(1 - lat * lat), pts = [];
    for (let i = 0; i <= 90; i++) { const t = i / 90 * Math.PI * 2; pts.push(proj([Math.cos(t) * r, lat, Math.sin(t) * r])); }
    stroke(pts, '#232842', 1 * UI, lat === 0 ? .55 : .3); }
  for (let m = 0; m < 6; m++) { const a = m / 6 * Math.PI, pts = [];
    for (let i = 0; i <= 90; i++) { const t = i / 90 * Math.PI * 2; pts.push(proj([Math.cos(t) * Math.cos(a), Math.sin(t), Math.cos(t) * Math.sin(a)])); }
    stroke(pts, '#1D2138', 1 * UI, .28); }

  const R = Math.sqrt(1 - 1 / (CAM * CAM)), zt = 1 / CAM, pts = [];
  for (let i = 0; i <= 120; i++) { const t = i / 120 * Math.PI * 2, k = CAM / (CAM - zt);
    pts.push([Wd / 2 + Math.cos(t) * R * SC * k, Hd / 2 - Math.sin(t) * R * SC * k]); }
  ctx.save(); ctx.shadowColor = 'rgba(123,107,255,.55)'; ctx.shadowBlur = 26 * UI; stroke(pts, 'rgba(123,107,255,.35)', 1.4 * UI, 1); ctx.restore();

  [[[1.3, 0, 0], 'PC1'], [[0, 1.3, 0], 'PC2'], [[0, 0, 1.3], 'PC3']].forEach(([v, lab], i) => {
    const o = proj([0, 0, 0]), p = proj(v); stroke([o, p], '#2C3260', 1 * UI, .8);
    ctx.fillStyle = '#3B416E'; ctx.font = (9 * UI) + 'px ' + FONT;
    const tot = emb.values.reduce((a, b) => a + Math.max(b, 0), 0);
    ctx.fillText(lab + ' ' + (Math.max(emb.values[i], 0) / tot * 100).toFixed(1) + '%', p[0] + 5 * UI, p[1]); });

  if (S.terms) emb.terms.forEach(tm => { if (tm.mag < .05) return; const p = proj(tm.pos), d = clamp((p[2] + 1) / 2, 0, 1);
    ctx.fillStyle = '#4A5080'; ctx.globalAlpha = .25 + d * .5;
    ctx.beginPath(); ctx.arc(p[0], p[1], (1.6 + tm.mag * 3) * UI, 0, 7); ctx.fill();
    if (tm.mag > .16 && p[2] > -.2) { ctx.fillStyle = '#565C8C'; ctx.font = (8.5 * UI) + 'px ' + FONT; ctx.globalAlpha = .35 + d * .45; ctx.fillText(tm.t, p[0] + 5 * UI, p[1] + 3 * UI); }
    ctx.globalAlpha = 1; });

  if (S.eq && S.qpos && showPoint) stroke(circlePerp(S.qpos), '#E5B84B', 1 * UI, .26);

  if (S.qpos && S.cos && showArcs) {
    const ord = S.cos.map((c, i) => [c, i]).sort((a, b) => a[0] - b[0]);
    ord.forEach(([c, i]) => { if (c < S.thr) return; const best = i === S.best, seg = 54, pts = [];
      for (let k = 0; k <= seg; k++) pts.push(proj(slerp(S.qpos, pos[i], k / seg)));
      stroke(pts, best ? '#E5B84B' : '#3DE0D0', (best ? 2 : 1) * UI, (best ? .9 : .14 + clamp(c, 0, 1) * .5) * S.anim);
      if (S.flow && c > Math.max(S.thr, .05)) { const np = Math.round(2 + c * 5);
        for (let k = 0; k < np; k++) { const ph = ((S.t * (.16 + c * .34) + k / np) % 1); const p = proj(slerp(S.qpos, pos[i], ph));
          ctx.fillStyle = best ? '#FFDD8A' : '#8CF5EA'; ctx.globalAlpha = (.25 + c * .7) * Math.sin(ph * Math.PI) * S.anim;
          ctx.beginPath(); ctx.arc(p[0], p[1], (best ? 2.4 : 1.7) * UI, 0, 7); ctx.fill(); ctx.globalAlpha = 1; } } });
    const showRanking = !S.stepMode || S.step >= 4;
    if (S.best >= 0 && showRanking) {
      const w = []; for (let i = 0; i <= 40; i++) w.push(proj(slerp(S.qpos, pos[S.best], i / 40).map(x => x * .42)));
      const o = proj([0, 0, 0]); ctx.beginPath(); ctx.moveTo(o[0], o[1]); w.forEach(p => ctx.lineTo(p[0], p[1])); ctx.closePath();
      ctx.fillStyle = 'rgba(229,184,75,.10)'; ctx.globalAlpha = S.anim; ctx.fill(); ctx.globalAlpha = 1;
      stroke(w, '#E5B84B', 1 * UI, .55 * S.anim);
      const mid = w[20], th = Math.acos(clamp(S.cos[S.best], -1, 1)) * 180 / Math.PI;
      ctx.fillStyle = '#E5B84B'; ctx.font = (10 * UI) + 'px ' + FONT; ctx.globalAlpha = S.anim;
      ctx.fillText('θ ' + th.toFixed(1) + '°  cos ' + S.cos[S.best].toFixed(3), mid[0] + 8 * UI, mid[1]); ctx.globalAlpha = 1;
    }
  }

  const items = pos.map((p, i) => ({ p, i, pr: proj(p) }));
  if (S.qpos && showPoint) items.push({ p: S.qpos, i: -1, pr: proj(S.qpos) });
  items.sort((a, b) => a.pr[2] - b.pr[2]);
  const showScoreLine = !!(S.cos && showArcs);
  const labelPos = showPoint ? layoutLabels(items, showScoreLine) : new Map();
  items.forEach(({ i, pr }) => {
    const isQ = i === -1, best = i === S.best, hov = i === S.hover;
    const d = clamp((pr[2] + 1) / 2, 0, 1);
    if (S.ray) { const o = proj([0, 0, 0]); stroke([o, pr], isQ ? '#3DE0D0' : best ? '#E5B84B' : DOCS[i].hue, (isQ || best ? 1.4 : 1) * UI, isQ ? .7 : best ? .65 : .16 + d * .24); }
    const r = (isQ ? 7 : best ? 7 : 5) * UI * (.72 + d * .5) * (hov ? 1.5 : 1);
    const col = isQ ? '#3DE0D0' : best ? '#E5B84B' : DOCS[i].hue;
    ctx.save(); ctx.shadowColor = col; ctx.shadowBlur = (isQ || best || hov ? 22 : 9) * UI;
    ctx.fillStyle = col; ctx.globalAlpha = isQ ? 1 : .6 + d * .4;
    ctx.beginPath(); ctx.arc(pr[0], pr[1], r, 0, 7); ctx.fill(); ctx.restore();

    const lp = labelPos.get(i);
    if (lp && lp.moved) stroke([[pr[0], pr[1]], [lp.x - 3 * UI, lp.y - 6 * UI]], col, 1 * UI, .32);

    if (isQ) { const pl = REDUCED_MOTION ? 1 : 1 + Math.sin(S.t * 3) * .25;
      ctx.strokeStyle = 'rgba(61,224,208,.5)'; ctx.lineWidth = 1 * UI;
      ctx.beginPath(); ctx.arc(pr[0], pr[1], r * 2.2 * pl, 0, 7); ctx.stroke();
      if (lp) { ctx.fillStyle = '#3DE0D0'; ctx.font = '700 ' + (11 * UI) + 'px ' + FONT; ctx.fillText('REQUÊTE', lp.x, lp.y); }
    } else if (lp) {
      ctx.fillStyle = best ? '#E5B84B' : (hov ? '#C9CCE8' : 'rgba(150,158,200,.75)');
      ctx.font = (best ? '700 ' : '') + (10 * UI) + 'px ' + FONT; ctx.fillText(DOCS[i].label, lp.x, lp.y);
      if (showScoreLine) { ctx.fillStyle = best ? 'rgba(229,184,75,.75)' : 'rgba(106,112,153,.8)'; ctx.font = (9 * UI) + 'px ' + FONT;
        ctx.fillText(S.cos[i].toFixed(3), lp.x, lp.y + 12 * UI); }
    }
  });
}

/* ─── 8 · interaction souris ──────────────────────────────────────────── */
let drag = false, lx = 0, ly = 0;
cv.addEventListener('mousedown', e => { drag = true; lx = e.clientX; ly = e.clientY; cv.classList.add('drag'); });
addEventListener('mouseup', () => { drag = false; cv.classList.remove('drag'); });
addEventListener('mousemove', e => {
  if (drag) { S.yaw += (e.clientX - lx) * .008; S.pitch = clamp(S.pitch + (e.clientY - ly) * .008, -1.45, 1.45); lx = e.clientX; ly = e.clientY; return; }
  if (!EMB[S.mode]) return;
  const r = cv.getBoundingClientRect(), mx = e.clientX - r.left, my = e.clientY - r.top;
  if (mx < 0 || my < 0 || mx > r.width || my > r.height) { hide(); return; }
  let bi = -1, bd = 20 * UI;
  EMB[S.mode].pos.forEach((p, i) => { const q = proj(p), d = Math.hypot(q[0] - mx, q[1] - my); if (d < bd) { bd = d; bi = i; } });
  S.hover = bi; bi >= 0 ? showTip(bi, mx, my) : hide();
});
cv.addEventListener('wheel', e => { e.preventDefault(); S.zoom = clamp(S.zoom * (e.deltaY > 0 ? .92 : 1.08), .5, 3.4); }, { passive: false });

const tip = document.getElementById('tip');
function showTip(i, x, y) {
  const c = S.cos ? S.cos[i] : null, d = DOCS[i];
  tip.innerHTML = `<div class="h" style="color:${d.hue}">${d.name}</div>` +
    (c !== null ? `<div class="s">${c.toFixed(3)}<span style="font-size:0.72rem;color:#434863;letter-spacing:2px"> COS · θ ${(Math.acos(clamp(c, -1, 1)) * 180 / Math.PI).toFixed(1)}°</span></div>` : '') +
    `<div class="k">TERMES DOMINANTS (TF-IDF)</div>` +
    d.top_terms.slice(0, 5).map(([t, w]) => `<div class="tt"><span>${t}</span><span>${w.toFixed(3)}</span></div>`).join('');
  tip.style.display = 'block';
  const tw = tip.offsetWidth, th = tip.offsetHeight; // mesuré : robuste au rem qui varie avec l'échelle
  tip.style.left = Math.max(4, Math.min(x + 18, Wd - tw - 8)) + 'px';
  tip.style.top = Math.max(4, Math.min(y + 14, Hd - th - 8)) + 'px';
}
const hide = () => { tip.style.display = 'none'; S.hover = -1; };

/* ─── 9 · recherche ───────────────────────────────────────────────────── */
function run() {
  if (!EMB[S.mode]) return;
  const raw = document.getElementById('q').value;
  const tokens = tokenizeQuestion(raw);
  const weighted = buildQueryVector(tokens);
  const { kept, dropped } = analyzeQueryTerms(tokens, weighted);

  if (kept.length === 0) {
    S.q = { kept: [], dropped }; S.qpos = null; S.cos = null; S.best = -1;
    if (S.stepMode) S.step = Math.min(S.step, 1);
    render(); draw(); return;
  }

  S.q = { kept: kept.map(k => k.t), dropped, weights: Object.fromEntries(kept.map(k => [k.t, k.weight])) };
  S.cos = cosineScores(weighted);
  const maxCos = Math.max(...S.cos);
  S.best = maxCos > 0 ? S.cos.indexOf(maxCos) : -1;

  const emb = EMB[S.mode], pr = placeProj(S.cos, emb);
  S.diag = { sub: pr.sub, cap: pr.cap };
  let target;
  if (S.place === 'tri') { const t = placeTri(S.cos, emb.pos); target = t.q; S.diag.resRaw = t.res; }
  else { target = pr.q; S.diag.resRaw = null; }

  S.qprev = S.qpos ? S.qpos.slice() : target.slice();
  S.qpos = target; S.qt = REDUCED_MOTION ? 1 : 0; S.anim = 0;
  S.pivot = pivotTerm(weighted);
  S.answer = S.best >= 0 ? trouverPhraseEntourantMot(DOCS[S.best].raw_text, S.pivot) : '';

  if (S.stepMode) S.step = 1;
  assignCells(emb.pos); fieldCells(); render();
}

/* ─── 10 · panneaux ───────────────────────────────────────────────────── */
function render() {
  const emb = EMB[S.mode]; if (!emb) return;
  document.getElementById('ovMode').textContent = S.mode === 'lsa' ? 'LSA / TRUNCATED SVD' : 'MDS ANGULAIRE';
  document.getElementById('ovVar').textContent = (emb.explained * 100).toFixed(1) + ' %';
  document.getElementById('ovDist').textContent = '± ' + emb.dist.toFixed(2) + '°';
  document.getElementById('ovFit').innerHTML = S.diag.resRaw != null
    ? 'résidu de placement <b style="color:var(--am)">± ' + S.diag.resRaw.toFixed(2) + '°</b>' : 'placement par projection';
  document.getElementById('surfNote').textContent = S.surf === 'cells'
    ? "Chaque cellule est colorée par le document qu'une requête posée là renverrait. C'est la carte de décision du moteur."
    : S.surf === 'field' ? "Teinte = cosinus entre la requête et chaque direction de l'espace. Le champ montre où la requête « regarde »." : "";

  const showVector = !S.stepMode || S.step >= 1;
  if (S.q) {
    const termsHtml = S.q.kept.map(t => {
      const w = S.q.weights[t];
      const pct = showVector ? clamp(w / (Math.max(...Object.values(S.q.weights)) || 1) * 100, 0, 100) : 0;
      return `<div class="term"><div class="t">${t}</div><div class="track"><div class="fill" style="width:${pct.toFixed(0)}%"></div></div>
        <div class="v">${showVector ? w.toFixed(3) : '…'}</div></div>`;
    }).join('') + S.q.dropped.map(d => `<div class="term dropped"><div class="t">${d.t}</div><div class="track"></div><div class="v">${d.reason}</div></div>`).join('')
      + `<div class="note">Poids = comptage × IDF, pas un score de similarité. Rayé = écarté (hors vocabulaire ou mot vide).</div>`;
    document.getElementById('qTerms').innerHTML = termsHtml;
    document.getElementById('qDrop').textContent = S.q.dropped.length ? S.q.dropped.length + ' écartés' : '';
  }

  const showRanking = !S.stepMode || S.step >= 4;
  if (S.cos && showRanking) {
    const ord = S.cos.map((c, i) => [c, i]).sort((a, b) => b[0] - a[0]);
    document.getElementById('ranking').innerHTML = ord.map(([c, i], k) =>
      `<div class="rank ${k === 0 && S.best === i ? 'top' : ''}" data-i="${i}"><div class="n">${k + 1}</div>
       <div class="dot" style="background:${DOCS[i].hue}"></div>
       <div class="nm">${DOCS[i].label}</div><div class="sc">${c.toFixed(6)}</div>
       <div class="rbar"><div style="width:${(Math.max(c, 0) * 100).toFixed(1)}%"></div></div></div>`).join('');
    [...document.querySelectorAll('.rank')].forEach(el => { el.onmouseenter = () => S.hover = +el.dataset.i; el.onmouseleave = () => S.hover = -1; });
  } else if (!showRanking) {
    document.getElementById('ranking').innerHTML = '<div class="note">Étape suivante pour voir le classement.</div>';
  }

  const showAnswer = !S.stepMode || S.step >= 5;
  if (S.cos && showAnswer) {
    document.getElementById('dSub').textContent = (S.diag.sub * 100).toFixed(1) + ' %';
    document.getElementById('dCap').textContent = (S.diag.cap * 100).toFixed(1) + ' %';
    document.getElementById('dRes').textContent = S.diag.resRaw != null ? '± ' + S.diag.resRaw.toFixed(2) + '°' : '—';
    document.getElementById('diagNote').textContent = S.place === 'tri'
      ? "La requête est posée sur la sphère en ajustant les vrais cosinus 1680-D. Les angles affichés sont réels ; le résidu mesure ce que la 3D ne peut pas satisfaire."
      : "La requête est projetée dans la base des documents. À quelques termes elle est presque orthogonale à ce sous-espace : les angles surestiment la similarité.";
    if (S.best >= 0 && S.answer) {
      const t1 = S.pivot, t2 = S.q.kept.find(t => t !== t1) || '';
      let html = S.answer.replace(new RegExp(`(${escapeRegExp(t1)}${t2 ? '|' + escapeRegExp(t2) : ''})`, 'giu'), '<mark>$1</mark>');
      document.getElementById('ans').innerHTML = '« ' + html + ' »';
      document.getElementById('ansSrc').innerHTML = `Source : ${DOCS[S.best].name}<br>Terme pivot : ${t1} · IDF ${IDF[TIDX.get(t1)]?.toFixed(3) ?? '—'}`;
    } else if (S.q && S.q.kept.length === 0) {
      document.getElementById('ans').textContent = "Aucun terme significatif dans la requête — impossible de répondre.";
      document.getElementById('ansSrc').textContent = '';
    } else if (S.best < 0) {
      document.getElementById('ans').textContent = "Aucun document n'est assez proche de cette requête pour répondre.";
      document.getElementById('ansSrc').textContent = '';
    } else {
      const idfPivot = IDF[TIDX.get(S.pivot)];
      document.getElementById('ans').textContent =
        `Le mot pivot « ${S.pivot} » (le plus fortement pondéré de la requête, idf ${idfPivot?.toFixed(3) ?? '—'}) n'apparaît pas littéralement dans le document le mieux classé. C'est le cosinus global — donc d'autres mots de la requête — qui explique ce classement, pas ce mot précis.`;
      document.getElementById('ansSrc').textContent = `Meilleur document : ${DOCS[S.best].name}`;
    }
  } else if (!showAnswer) {
    document.getElementById('ans').textContent = '…';
    document.getElementById('ansSrc').textContent = '';
  }

  updateStepUI();
}

function updateStepUI() {
  const bar = document.getElementById('stepLine');
  if (!S.stepMode) { document.getElementById('stepBar').style.display = 'none'; return; }
  document.getElementById('stepBar').style.display = 'block';
  const labels = ['tokens', 'vecteur', 'placement', 'arcs', 'classement', 'phrase'];
  bar.innerHTML = labels.map((l, i) => `<i class="${i < S.step ? 'done' : i === S.step ? 'cur' : ''}" title="${l}"></i>`).join('');
  document.getElementById('stepNext').disabled = S.step >= 5;
  document.getElementById('stepNext').textContent = S.step >= 5 ? 'PIPELINE TERMINÉ' : 'ÉTAPE SUIVANTE →';
}

/* ─── 11 · légende dynamique (chronologique) ─────────────────────────── */
function renderLegend() {
  const el = document.getElementById('ovBL');
  const mid = DOCS[Math.floor(DOCS.length / 2)];
  el.innerHTML = `<div><span class="swatch" style="background:${mid ? mid.hue : '#8790C4'}"></span>document (teinte chronologique)</div>
    <div><span class="swatch" style="background:var(--cy)"></span>requête</div>
    <div><span class="swatch" style="background:var(--am)"></span>meilleur match</div>
    <div><span class="swatch" style="background:#3A4070"></span>terme</div>`;
}

/* ─── 12 · chargement des données réelles ─────────────────────────────── */
async function boot() {
  const res = await fetch('data/vectorspace.json');
  if (!res.ok) throw new Error('impossible de charger data/vectorspace.json (' + res.status + ')');
  const data = await res.json();
  META = data.meta;
  VOCAB = data.vocab; IDF = data.idf; VOCAB_SIZE = VOCAB.length;
  VOCAB.forEach((w, i) => TIDX.set(w, i));

  DOCS = data.documents.map(d => ({
    name: d.name, label: d.label, hue: d.hue, year: d.year,
    top_terms: d.top_terms, raw_text: d.raw_text,
    vector: densify(d.vector_sparse, VOCAB_SIZE),
  }));
  N = DOCS.length;

  for (const mode of ['lsa', 'mds']) {
    const e = data.embeddings[mode];
    EMB[mode] = {
      pos: e.positions, values: e.eigenvalues, vectors: e.eigenvectors,
      explained: e.explained_variance, dist: e.angular_distortion_deg,
      terms: e.term_positions.map(t => ({ t: t.t, mag: t.mag, pos: t.p })),
    };
  }

  document.getElementById('sDocs').textContent = N;
  document.getElementById('sVocab').textContent = VOCAB_SIZE;
  document.getElementById('sSpars').textContent = (data.meta.sparsity * 100).toFixed(1) + ' %';
  document.getElementById('sIdfVariant').textContent = data.meta.idf_variant;

  assignCells(EMB[S.mode].pos);
  renderLegend();
  document.getElementById('loading').classList.add('hidden');
}

/* ─── 13 · branchement UI ─────────────────────────────────────────────── */
document.getElementById('run').onclick = run;
document.getElementById('q').addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); run(); } });
[...document.querySelectorAll('.preset')].forEach(b => b.onclick = () => { document.getElementById('q').value = b.textContent; run(); });

function seg(id, key, after) {
  const el = document.getElementById(id);
  [...el.children].forEach(b => b.onclick = () => { [...el.children].forEach(x => x.classList.remove('on')); b.classList.add('on'); S[key] = b.dataset.v; after ? after() : run(); });
}
seg('segEmbed', 'mode', () => { if (EMB[S.mode]) { assignCells(EMB[S.mode].pos); fieldCells(); } run(); });
seg('segPlace', 'place');
seg('segSurf', 'surf', () => { if (EMB[S.mode]) { assignCells(EMB[S.mode].pos); fieldCells(); } render();
  document.getElementById('legend').style.display = S.surf === 'field' ? 'block' : 'none'; });

document.getElementById('thr').oninput = e => { S.thr = e.target.value / 100; document.getElementById('thrV').textContent = 'cos ≥ ' + S.thr.toFixed(2); };
[['cFlow', 'flow'], ['cTerms', 'terms'], ['cEq', 'eq'], ['cRay', 'ray'], ['cSpin', 'spin']].forEach(([id, k]) => {
  document.getElementById(id).onclick = e => { S[k] = !S[k]; e.currentTarget.classList.toggle('on', S[k]); };
});

document.getElementById('stepToggle').onclick = e => {
  S.stepMode = !S.stepMode; e.currentTarget.classList.toggle('on', S.stepMode);
  S.step = S.stepMode ? (S.q ? 1 : 0) : 5;
  render(); draw();
};
document.getElementById('stepNext').onclick = () => { S.step = Math.min(5, S.step + 1); render(); draw(); };

/* densité d'interface : COMPACT/NORMAL/LARGE — multiplie --ui-scale (CSS) et UI (canvas),
   persisté en localStorage pour survivre à un rechargement. */
const DENSITY = { compact: .85, normal: 1, large: 1.15 };
function applyDensity(key, persist = true) {
  uiScale = DENSITY[key] ?? 1;
  document.documentElement.style.setProperty('--ui-scale', uiScale);
  if (persist) { try { localStorage.setItem('nova-density', key); } catch (e) {} }
  [...document.getElementById('segDensity').children].forEach(b => b.classList.toggle('on', b.dataset.v === key));
  resize();
  if (EMB[S.mode]) { assignCells(EMB[S.mode].pos); fieldCells(); }
}
[...document.getElementById('segDensity').children].forEach(b => b.onclick = () => applyDensity(b.dataset.v));

(() => { const c = document.getElementById('lg'), g = c.getContext('2d'); for (let x = 0; x < 132; x++) { g.fillStyle = ramp(x / 131 * 2 - 1); g.fillRect(x, 0, 1, 8); } })();

/* ─── 14 · boucle ──────────────────────────────────────────────────────── */
let savedDensity = 'normal';
try { savedDensity = localStorage.getItem('nova-density') || 'normal'; } catch (e) {}
applyDensity(savedDensity, false);
boot().then(() => { run(); loop(); }).catch(err => {
  document.getElementById('loading').textContent = 'erreur : ' + err.message;
});

function loop() {
  if (S.spin && !REDUCED_MOTION) S.yaw += .0022;
  if (S.anim < 1) S.anim = Math.min(1, S.anim + .04);
  if (S.qt < 1 && !REDUCED_MOTION) {
    S.qt = Math.min(1, S.qt + .035); const e = 1 - Math.pow(1 - S.qt, 3);
    const cur = slerp(S.qprev, S.qpos, e); const save = S.qpos; S.qpos = cur; fieldCells(); draw(); S.qpos = save;
    document.getElementById('sFps').textContent = Math.round(fps);
    requestAnimationFrame(loop); return;
  }
  draw();
  document.getElementById('sFps').textContent = Math.round(fps);
  requestAnimationFrame(loop);
}
