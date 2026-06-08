/* ============================================================================
   StudyPOP — app.js
   SPA con rutas hash. Estado en memoria de sesión (sin localStorage/backend).
   Mapa de prerrequisitos con D3.js. Mini-test con banco local (fallback).
   ============================================================================ */

/* ---------------------------------------------------------------------------
   ESTADO GLOBAL (en memoria — se reinicia al recargar, como pide el MVP)
   --------------------------------------------------------------------------- */
const STATE = {
  points: 0,
  nick: randomNick(),
  nodeStatus: {},     // { nodeId: 'done' | 'pending' }
  sessionStatus: {},  // { sessionId: 'done' | 'pending' }
  masteredNodes: 0,
  diagnostics: 0,
  streak: 1,
  firstOfDayDone: false
};

function randomNick() {
  const a = ["Juakinot", "Chris", "Fabrii", "Loly", "Harold", "Joaquin", "Tofaith"];
  const b = ["77","pro","Ing","super","tcg","bts","xd","super","96","001"];
  return a[Math.floor(Math.random()*a.length)] + "." + b[Math.floor(Math.random()*b.length)];
}

/* ---------------------------------------------------------------------------
   API KEY (opcional). Si se define, las preguntas se generan con IA.
   Si está vacía, se usa el banco local (fallback) — ideal para la demo.
   --------------------------------------------------------------------------- */
const OPENAI_API_KEY = ""; // ← pega tu key aquí si quieres preguntas dinámicas

/* ---------------------------------------------------------------------------
   ICONOS SVG inline
   --------------------------------------------------------------------------- */
const ICONS = {
  function: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 19c2 0 3-1.5 3-4V8c0-2.5 1-4 3-4"/><path d="M5 12h6"/><path d="M14 9l5 6M19 9l-5 6"/></svg>',
  atom: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="10" ry="4.5"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)"/></svg>',
  pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h7v8l10-12h-7z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M9 18l6-6-6-6"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>'
};

/* ---------------------------------------------------------------------------
   HELPERS
   --------------------------------------------------------------------------- */
const $  = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const app = $("#app");

function getCourse(id) { return COURSES.find(c => c.id === id); }
function getSession(course, sid) { return course.sessions.find(s => s.id === sid); }
function leagueFor(pts) {
  let lg = LEAGUES[0];
  for (const l of LEAGUES) if (pts >= l.min) lg = l;
  return lg;
}
function nextLeague(pts) {
  return LEAGUES.find(l => l.min > pts) || null;
}

function addPoints(n, msg) {
  STATE.points += n;
  updateNav();
  if (msg) toast(`+${n} pts · ${msg}`);
}

/* ---------------------------------------------------------------------------
   ROUTER (hash)
   --------------------------------------------------------------------------- */
function router() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  window.scrollTo(0, 0);
  if (parts.length === 0)                renderLanding();
  else if (parts[0] === "curso" && parts[2]) renderSession(parts[1], parts[2]);
  else if (parts[0] === "curso")         renderCourse(parts[1]);
  else if (parts[0] === "ranking")       renderRanking();
  else                                   renderLanding();
}
window.addEventListener("hashchange", router);

/* ---------------------------------------------------------------------------
   NAV (puntos + liga)
   --------------------------------------------------------------------------- */
function updateNav() {
  const lg = leagueFor(STATE.points);
  $("#navPts").textContent = STATE.points + " pts";
  const dot = $("#navLeagueDot");
  dot.style.color = lg.color;
  dot.style.background = lg.color;
  $("#navLeagueName").textContent = lg.name;
}

/* ===========================================================================
   VISTA 1 — LANDING
   =========================================================================== */
function renderLanding() {
  app.innerHTML = `
    <div class="wrap">
      <section class="hero">
        <span class="eyebrow">${ICONS.bolt} Exclusivo para cachimbos UCSUR</span>
        <h1>Llega preparado. <span class="grad">Avanza con propósito.</span></h1>
        <p class="tagline">Deja de volar a ciegas. StudyPOP te muestra exactamente qué dominar antes de cada clase, lo valida con mini-diagnósticos y te mantiene motivado con rangos y tu PopToken.</p>
        <div class="cta-row">
          <button class="btn-primary" onclick="location.hash='#/'; scrollToCourses()">Empieza ahora</button>
          <button class="btn-ghost" onclick="openProfile()">Ver mi PopToken</button>
        </div>
      </section>

      <section class="steps">
        <div class="step"><div class="n">1</div><h3>Elige tu curso</h3><p>Matemática 1, Física 1 o Lengua y Comunicación — con el sílabo real de UCSUR.</p></div>
        <div class="step"><div class="n">2</div><h3>Conoce qué debes saber</h3><p>Un mapa interactivo te muestra los prerrequisitos de cada clase, conectados entre sí.</p></div>
        <div class="step"><div class="n">3</div><h3>Demuéstralo</h3><p>Un mini-diagnóstico valida si dominas el tema. Ganas puntos y subes de liga.</p></div>
      </section>

      <section id="courses">
        <div class="section-head">
          <h2>Tus 3 cursos</h2>
          <p>Contenido construido a partir de los sílabos oficiales 2025 de la Universidad Científica del Sur.</p>
        </div>
        <div class="course-grid">${COURSES.map(courseCard).join("")}</div>
      </section>
    </div>`;
  updateNav();
}
function scrollToCourses() { setTimeout(()=> $("#courses")?.scrollIntoView({behavior:"smooth"}), 60); }

function courseCard(c) {
  const prog = courseProgress(c);
  return `
    <div class="course-card" style="--card-accent:${c.accent}" onclick="location.hash='#/curso/${c.id}'">
      <div class="ic" style="background:${hexA(c.accent,.16)};color:${c.accent}">${ICONS[c.icon]}</div>
      <div class="code">${c.code}</div>
      <h3>${c.name}</h3>
      <div class="ctag" style="color:${c.accent}">${c.tagline}</div>
      <p>${c.desc}</p>
      <div class="meta"><span><b>${c.sessions.length}</b> sesiones</span><span><b>${c.credits}</b> créditos</span><span><b>${prog}%</b> dominado</span></div>
    </div>`;
}

function courseProgress(c) {
  const total = c.sessions.length;
  const done = c.sessions.filter(s => STATE.sessionStatus[s.id] === "done").length;
  return total ? Math.round(done / total * 100) : 0;
}

/* ===========================================================================
   VISTA 2 — CURSO (lista de sesiones)
   =========================================================================== */
function renderCourse(courseId) {
  const c = getCourse(courseId);
  if (!c) return renderLanding();
  const prog = courseProgress(c);
  app.innerHTML = `
    <div class="wrap">
      <div class="crumb"><a href="#/">Inicio</a> ${ICONS.arrow} <span>${c.name}</span></div>
      <div class="course-hero">
        <div class="ic" style="background:${hexA(c.accent,.16)};color:${c.accent}">${ICONS[c.icon]}</div>
        <div>
          <div class="code" style="color:var(--text-mute);font-size:13px;font-weight:600">${c.code}</div>
          <h1>${c.name}</h1>
          <div class="sub">${c.desc}</div>
        </div>
      </div>

      <div class="progress-wrap">
        <div class="progress-row"><span class="label">Progreso del curso</span><span class="val" style="color:${c.accent}">${prog}%</span></div>
        <div class="bar"><span style="width:${prog}%;background:linear-gradient(90deg,${c.accent},${hexA(c.accent,.6)})"></span></div>
      </div>

      <div class="session-list">
        ${c.sessions.map(s => sessionCard(c, s)).join("")}
      </div>
    </div>`;
  updateNav();
}

function sessionCard(c, s) {
  const st = STATE.sessionStatus[s.id] || "locked";
  const map = { locked:{icon:"🔒", tag:"Sin empezar"}, done:{icon:"✅", tag:"Dominado"}, pending:{icon:"⚠️", tag:"Pendiente"} };
  const m = map[st];
  return `
    <div class="session-card" onclick="location.hash='#/curso/${c.id}/${s.id}'">
      <div class="state ${st}">${m.icon}</div>
      <div class="body">
        <div class="wk">${s.week} · ${s.module}</div>
        <h3>${s.title}</h3>
      </div>
      <span class="tag ${st}">${m.tag}</span>
      <span class="arrow">${ICONS.arrow}</span>
    </div>`;
}

/* ===========================================================================
   VISTA 3 — SESIÓN (mapa de prerrequisitos con D3)
   =========================================================================== */
let CURRENT = { course:null, session:null };

function renderSession(courseId, sessionId) {
  const c = getCourse(courseId);
  if (!c) return renderLanding();
  const s = getSession(c, sessionId);
  if (!s) return renderCourse(courseId);
  CURRENT = { course:c, session:s };

  app.innerHTML = `
    <div class="wrap">
      <div class="crumb"><a href="#/">Inicio</a> ${ICONS.arrow} <a href="#/curso/${c.id}">${c.name}</a> ${ICONS.arrow} <span>${s.week}</span></div>
      <div class="session-head">
        <div class="wk">Antes de la clase · ${s.week}</div>
        <h1>${s.title}</h1>
        <p class="intro">${s.intro}</p>
      </div>

      <div class="map-toolbar">
        <button class="btn-primary" onclick="startSessionTest()">${ICONS.bolt} Diagnóstico completo de la sesión</button>
        <div class="legend">
          <span><i class="swatch" style="background:${c.accent}"></i> Por dominar</span>
          <span><i class="swatch" style="background:var(--green)"></i> Dominado</span>
          <span><i class="swatch" style="background:var(--gold)"></i> Pendiente</span>
        </div>
      </div>

      <div class="map-shell">
        <svg id="map"></svg>
        <div class="map-hint">Haz clic en un nodo para ver el concepto y diagnosticarlo</div>
        <div class="node-panel" id="nodePanel"></div>
      </div>
    </div>`;
  updateNav();
  drawMap(c, s);
}

/* ----- Mapa con D3 force layout ----- */
function drawMap(course, session) {
  const svg = d3.select("#map");
  svg.selectAll("*").remove();
  const shell = $(".map-shell");
  const W = shell.clientWidth;
  const H = 440;
  svg.attr("viewBox", `0 0 ${W} ${H}`);

  const nodes = session.nodes.map(n => ({ ...n }));
  const links = session.edges.map(([s,t]) => ({ source:s, target:t }));

  // defs: glow
  const defs = svg.append("defs");
  const f = defs.append("filter").attr("id","glow").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%");
  f.append("feGaussianBlur").attr("stdDeviation","4").attr("result","b");
  const merge = f.append("feMerge");
  merge.append("feMergeNode").attr("in","b");
  merge.append("feMergeNode").attr("in","SourceGraphic");

  const sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d=>d.id).distance(135))
    .force("charge", d3.forceManyBody().strength(-520))
    .force("center", d3.forceCenter(W/2, H/2))
    .force("collide", d3.forceCollide().radius(64));

  const link = svg.append("g").selectAll("line").data(links).join("line")
    .attr("stroke", "var(--border)").attr("stroke-width", 2).attr("stroke-opacity",.7);

  const node = svg.append("g").selectAll("g").data(nodes).join("g")
    .style("cursor","pointer")
    .call(d3.drag()
      .on("start", (e,d)=>{ if(!e.active) sim.alphaTarget(.3).restart(); d.fx=d.x; d.fy=d.y; })
      .on("drag",  (e,d)=>{ d.fx=e.x; d.fy=e.y; })
      .on("end",   (e,d)=>{ if(!e.active) sim.alphaTarget(0); d.fx=null; d.fy=null; }))
    .on("click", (e,d)=> openNodePanel(d, course));

  node.append("circle")
    .attr("r", 40)
    .attr("fill", "var(--surface-2)")
    .attr("stroke", d => nodeColor(d, course))
    .attr("stroke-width", 3)
    .attr("filter","url(#glow)")
    .attr("class","node-circle")
    .attr("data-node", d=>d.id);

  // status emoji badge
  node.append("text")
    .attr("text-anchor","middle").attr("dy","-46")
    .attr("font-size","16")
    .attr("class","node-badge").attr("data-badge", d=>d.id)
    .text(d => statusEmoji(d.id));

  // wrapped label
  node.each(function(d){
    const g = d3.select(this);
    const words = d.label.split(" ");
    let lines = [], cur = "";
    words.forEach(w => {
      if ((cur + " " + w).trim().length > 13) { lines.push(cur.trim()); cur = w; }
      else cur += " " + w;
    });
    if (cur.trim()) lines.push(cur.trim());
    lines = lines.slice(0,3);
    const start = -(lines.length-1)*7;
    lines.forEach((ln,i)=>{
      g.append("text").attr("text-anchor","middle").attr("dy", start + i*14)
        .attr("fill","var(--text)").attr("font-size","12.5").attr("font-weight","600")
        .attr("pointer-events","none").text(ln);
    });
  });

  sim.on("tick", () => {
    nodes.forEach(d => { d.x = Math.max(46, Math.min(W-46, d.x)); d.y = Math.max(50, Math.min(H-30, d.y)); });
    link.attr("x1",d=>d.source.x).attr("y1",d=>d.source.y).attr("x2",d=>d.target.x).attr("y2",d=>d.target.y);
    node.attr("transform", d=>`translate(${d.x},${d.y})`);
  });
}

function nodeColor(node, course) {
  const st = STATE.nodeStatus[node.id];
  if (st === "done") return getComputedStyle(document.documentElement).getPropertyValue("--green").trim();
  if (st === "pending") return getComputedStyle(document.documentElement).getPropertyValue("--gold").trim();
  return course.accent;
}
function statusEmoji(id) {
  const st = STATE.nodeStatus[id];
  return st === "done" ? "✅" : st === "pending" ? "⚠️" : "";
}
function refreshMapColors() {
  if (!CURRENT.course) return;
  $$(".node-circle").forEach(c => {
    const id = c.getAttribute("data-node");
    c.setAttribute("stroke", nodeColor({id}, CURRENT.course));
  });
  $$(".node-badge").forEach(t => {
    const id = t.getAttribute("data-badge");
    t.textContent = statusEmoji(id);
  });
}

/* ----- Panel lateral del nodo ----- */
function openNodePanel(node, course) {
  const panel = $("#nodePanel");
  const st = STATE.nodeStatus[node.id];
  const stMap = { done:{t:"✅ Dominado", c:"var(--green)", bg:"rgba(34,197,94,.16)"}, pending:{t:"⚠️ Pendiente", c:"var(--gold)", bg:"rgba(245,158,11,.16)"} };
  const badge = stMap[st] || {t:"Por dominar", c:course.accent, bg:hexA(course.accent,.16)};
  panel.innerHTML = `
    <button class="close" onclick="closeNodePanel()">✕</button>
    <span class="np-status" style="color:${badge.c};background:${badge.bg}">${badge.t}</span>
    <h3>${node.label}</h3>
    <p class="np-desc">${node.desc}</p>
    <div class="np-label">Recursos sugeridos</div>
    ${node.resources.map(r => `
      <a class="res-link" href="${r.url}" target="_blank" rel="noopener">
        ${ICONS[r.type] || ICONS.doc}<span>${r.label}</span>
      </a>`).join("")}
    <div class="diag-row">
      <button class="btn-primary" onclick="startNodeTest('${node.id}')">${ICONS.bolt} Diagnosticar este concepto</button>
    </div>`;
  panel.classList.add("open");
}
function closeNodePanel() { $("#nodePanel")?.classList.remove("open"); }

/* ===========================================================================
   VISTA 4 — MINI-TEST (diagnóstico)
   =========================================================================== */
const TEST = { questions:[], idx:0, correct:0, answered:false, mode:"node", nodeId:null, timer:null, time:0, perQ:25 };

function startNodeTest(nodeId) {
  const node = CURRENT.session.nodes.find(n => n.id === nodeId);
  closeNodePanel();
  // 5 preguntas para nodo individual
  const qs = pickQuestions(CURRENT.session.bank, 5);
  launchTest(qs, { mode:"node", nodeId, title:node.label });
}
function startSessionTest() {
  // 8 preguntas para sesión completa
  const qs = pickQuestions(CURRENT.session.bank, 8);
  launchTest(qs, { mode:"session", nodeId:null, title:CURRENT.session.title });
}

function pickQuestions(bank, n) {
  const shuffled = [...bank].sort(()=>Math.random()-.5);
  // si el banco tiene menos, repetimos rotando
  const out = [];
  for (let i=0; i<n; i++) out.push(shuffled[i % shuffled.length]);
  return out.slice(0, Math.min(n, Math.max(bank.length, n)));
}

async function launchTest(questions, opts) {
  // Intento opcional con IA si hay key
  if (OPENAI_API_KEY) {
    const ai = await tryGenerateAI(opts.title, questions.length);
    if (ai && ai.length) questions = ai;
  }
  TEST.questions = questions;
  TEST.idx = 0; TEST.correct = 0; TEST.answered = false;
  TEST.mode = opts.mode; TEST.nodeId = opts.nodeId;
  $("#testModal").classList.add("open");
  renderQuestion();
}

async function tryGenerateAI(topic, n) {
  try {
    const prompt = `Genera ${n} preguntas de opción múltiple (4 alternativas, 1 correcta) sobre el tema "${topic}" para un universitario de primer ciclo de ingeniería en Perú. Nivel básico-intermedio. Responde SOLO en JSON: [{"q":"...","a":["a","b","c","d"],"correct":0,"expl":"..."}]`;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method:"POST",
      headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${OPENAI_API_KEY}` },
      body: JSON.stringify({ model:"gpt-4o-mini", messages:[{role:"user",content:prompt}], temperature:.6 })
    });
    const data = await res.json();
    const txt = data.choices[0].message.content.replace(/```json|```/g,"").trim();
    return JSON.parse(txt);
  } catch(e) { console.warn("IA no disponible, usando banco local", e); return null; }
}

function renderQuestion() {
  const q = TEST.questions[TEST.idx];
  const total = TEST.questions.length;
  TEST.answered = false;
  const modal = $("#testBody");
  modal.innerHTML = `
    <div class="test-top">
      <span class="qnum">Pregunta ${TEST.idx+1} de ${total}</span>
      <div class="timer">
        <svg class="ring" viewBox="0 0 42 42"><circle class="track" cx="21" cy="21" r="18"/><circle class="fill" id="timerRing" cx="21" cy="21" r="18" stroke-dasharray="113" stroke-dashoffset="0"/></svg>
        <span class="tnum" id="tnum">${TEST.perQ}</span>
      </div>
    </div>
    <div class="test-progress"><span style="width:${(TEST.idx)/total*100}%"></span></div>
    <div class="question">${q.q}</div>
    <div class="answers">
      ${q.a.map((opt,i)=>`<button class="answer" data-i="${i}" onclick="answer(${i})"><span class="key">${"ABCD"[i]}</span><span>${opt}</span></button>`).join("")}
    </div>
    <div id="explBox"></div>
    <div class="test-foot" id="testFoot"></div>`;
  startTimer();
}

function startTimer() {
  clearInterval(TEST.timer);
  TEST.time = TEST.perQ;
  const ring = $("#timerRing"), tnum = $("#tnum");
  const C = 113;
  TEST.timer = setInterval(()=>{
    TEST.time--;
    if (tnum) tnum.textContent = TEST.time;
    if (ring) ring.setAttribute("stroke-dashoffset", C * (1 - TEST.time/TEST.perQ));
    if (TEST.time <= 0) { clearInterval(TEST.timer); if(!TEST.answered) answer(-1); }
  }, 1000);
}

function answer(i) {
  if (TEST.answered) return;
  TEST.answered = true;
  clearInterval(TEST.timer);
  const q = TEST.questions[TEST.idx];
  const btns = $$(".answer");
  btns.forEach(b => {
    b.classList.add("locked");
    const bi = +b.dataset.i;
    if (bi === q.correct) b.classList.add("correct");
    if (bi === i && i !== q.correct) b.classList.add("wrong");
  });
  if (i === q.correct) TEST.correct++;
  $("#explBox").innerHTML = `<div class="expl"><b>${i===q.correct?"¡Correcto! ":"Repasa: "}</b>${q.expl}</div>`;
  const last = TEST.idx === TEST.questions.length - 1;
  $("#testFoot").innerHTML = `<button class="btn-primary" onclick="nextQuestion()">${last?"Ver resultado":"Siguiente"} ${ICONS.arrow}</button>`;
}

function nextQuestion() {
  if (TEST.idx < TEST.questions.length - 1) { TEST.idx++; renderQuestion(); }
  else finishTest();
}

function finishTest() {
  clearInterval(TEST.timer);
  const total = TEST.questions.length;
  const score = Math.round(TEST.correct / total * 100);
  const passed = score >= 70;

  // ---- Puntos ----
  let earned = 0; const bits = [];
  STATE.diagnostics++;
  if (!STATE.firstOfDayDone) { STATE.firstOfDayDone = true; earned += 5; bits.push("racha +5"); }
  if (TEST.mode === "node") {
    earned += 10; bits.push("diagnóstico +10");
    if (passed) {
      earned += 25; bits.push("aprobado +25");
      if (STATE.nodeStatus[TEST.nodeId] !== "done") STATE.masteredNodes++;
      STATE.nodeStatus[TEST.nodeId] = "done";
    } else {
      STATE.nodeStatus[TEST.nodeId] = "pending";
    }
  } else { // session
    earned += 10; bits.push("diagnóstico +10");
    if (passed) {
      earned += 100; bits.push("sesión aprobada +100");
      CURRENT.session.nodes.forEach(n => {
        if (STATE.nodeStatus[n.id] !== "done") STATE.masteredNodes++;
        STATE.nodeStatus[n.id] = "done";
      });
      STATE.sessionStatus[CURRENT.session.id] = "done";
    } else {
      STATE.sessionStatus[CURRENT.session.id] = "pending";
    }
  }
  STATE.points += earned;
  updateNav();

  const acc = CURRENT.course.accent;
  const color = passed ? "var(--green)" : "var(--gold)";
  const C = 339; // 2πr (r=54)
  $("#testBody").innerHTML = `
    <div class="result">
      <svg class="ring-big" viewBox="0 0 130 130">
        <circle class="track" cx="65" cy="65" r="54"/>
        <circle class="fill" cx="65" cy="65" r="54" stroke="${color}" stroke-dasharray="${C}" stroke-dashoffset="${C}" id="bigRing"/>
      </svg>
      <div class="score-num" style="color:${color};margin-top:-92px;margin-bottom:60px">${score}%</div>
      <h2>${passed ? "¡Muy bien! 🎉" : "Hay que repasar esto 💪"}</h2>
      <p class="sub">${TEST.correct} de ${total} correctas. ${passed ? "Concepto dominado." : "Revisa los recursos sugeridos y vuelve a intentarlo."}</p>
      <div class="pts-earned">${ICONS.bolt} +${earned} pts · ${bits.join(" · ")}</div>
      <div style="margin-top:22px;display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-ghost" onclick="closeTest()">Cerrar</button>
        <button class="btn-primary" onclick="closeTest();openProfile()">Ver mi PopToken</button>
      </div>
    </div>`;
  setTimeout(()=>{ const r=$("#bigRing"); if(r) r.setAttribute("stroke-dashoffset", C*(1-score/100)); }, 120);
  if (passed) confetti();
  refreshMapColors();
  // refresca tarjetas de progreso si volvemos al curso
}

function closeTest() {
  $("#testModal").classList.remove("open");
  // re-render para reflejar estados si estamos en sesión
  if (CURRENT.session) refreshMapColors();
}

/* ===========================================================================
   PERFIL / POPTOKEN (drawer)
   =========================================================================== */
function openProfile() {
  const pts = STATE.points;
  const lg = leagueFor(pts);
  const next = nextLeague(pts);
  const root = document.documentElement;
  root.style.setProperty("--league-color", lg.color);
  root.style.setProperty("--league-glow", lg.glow);

  // LEDs en círculo
  const ledCount = lg.dots;
  let leds = "";
  for (let i=0; i<ledCount; i++) {
    const ang = (i/ledCount) * Math.PI * 2;
    const rad = 80;
    const x = Math.cos(ang)*rad, y = Math.sin(ang)*rad;
    leds += `<div class="led" style="transform:translate(${x}px,${y}px);animation-delay:${i*0.12}s"></div>`;
  }

  const nextTxt = next ? `${next.min - pts} pts para ${next.name}` : "¡Liga máxima alcanzada! 🌈";
  const span = next ? Math.min(100, Math.round((pts - lg.min)/(next.min - lg.min)*100)) : 100;

  $("#profileDrawer").innerHTML = `
    <button class="dclose" onclick="closeProfile()">✕</button>
    <h2>Tu perfil</h2>
    <div class="nick">@${STATE.nick} · invitado</div>

    <div class="poptoken-stage">
      <div class="poptoken">
        <div class="ring-leds">${leds}</div>
        <div class="screen">
          <div>
            <div class="league-name">${lg.name}</div>
            <div class="league-pts">${pts} pts</div>
          </div>
        </div>
      </div>
    </div>
    <div class="next-league">${nextTxt}
      <div class="mini-bar"><span style="width:${span}%"></span></div>
    </div>

    <div class="stats-grid">
      <div class="stat-box"><div class="num">${STATE.masteredNodes}</div><div class="lbl">Temas dominados</div></div>
      <div class="stat-box"><div class="num">${STATE.diagnostics}</div><div class="lbl">Diagnósticos</div></div>
      <div class="stat-box"><div class="num">${STATE.streak}</div><div class="lbl">Días de racha</div></div>
    </div>

    <div class="league-ladder">
      <div class="np-label">Ligas PopToken</div>
      ${LEAGUES.map(l => `
        <div class="ladder-item ${l.name===lg.name?'current':''}">
          <span class="dot" style="color:${l.color};background:${l.color}"></span>
          <span class="lname">${l.emoji} ${l.name}</span>
          <span class="lpts">${l.min}+ pts</span>
        </div>`).join("")}
    </div>

    <div style="margin-top:22px">
      <button class="btn-ghost" style="width:100%" onclick="closeProfile();location.hash='#/ranking'">Ver ranking completo</button>
    </div>`;
  $("#profileDrawer").classList.add("open");
  $("#drawerBackdrop").classList.add("open");
}
function closeProfile() {
  $("#profileDrawer").classList.remove("open");
  $("#drawerBackdrop").classList.remove("open");
}

/* ===========================================================================
   VISTA 5 — RANKING
   =========================================================================== */
function renderRanking() {
  const me = { name: STATE.nick, pts: STATE.points, me:true };
  const all = [...FAKE_USERS.map(u=>({...u})), me].sort((a,b)=>b.pts-a.pts);
  const lg = leagueFor(STATE.points);
  document.documentElement.style.setProperty("--league-color", lg.color);
  document.documentElement.style.setProperty("--league-glow", lg.glow);

  app.innerHTML = `
    <div class="wrap">
      <div class="crumb"><a href="#/">Inicio</a> ${ICONS.arrow} <span>Ranking</span></div>
      <div class="section-head" style="margin-top:0">
        <h2>Ranking de cachimbos</h2>
        <p>Los que llegan más preparados suben más rápido. Tú apareces resaltado.</p>
      </div>
      <div class="rank-list">
        ${all.map((u,i)=>{
          const ulg = leagueFor(u.pts);
          const initials = u.name.replace(/[^a-zA-Z]/g,"").slice(0,2).toUpperCase();
          return `<div class="rank-row ${u.me?'me':''} ${i<3?'top'+(i+1):''}">
            <span class="pos">${i+1}</span>
            <span class="av" style="${u.me?`background:${hexA(ulg.color,.22)};color:${ulg.color}`:''}">${initials}</span>
            <span class="rname">${u.me?'Tú · ':''}@${u.name}</span>
            <span class="rleague" style="color:${ulg.color};background:${hexA(ulg.color,.16)}">${ulg.name}</span>
            <span class="rpts">${u.pts}</span>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  updateNav();
}

/* ===========================================================================
   TOAST + CONFETTI
   =========================================================================== */
let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.querySelector(".tmsg").textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("show"), 2600);
}

function confetti() {
  const canvas = $("#confetti");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth; canvas.height = innerHeight;
  const colors = ["#f97316","#3b82f6","#f59e0b","#22c55e","#a855f7"];
  const parts = Array.from({length:140}, () => ({
    x: innerWidth/2 + (Math.random()-.5)*200,
    y: innerHeight/2,
    vx: (Math.random()-.5)*12,
    vy: Math.random()*-14 - 4,
    s: Math.random()*7+4,
    c: colors[Math.floor(Math.random()*colors.length)],
    rot: Math.random()*360, vr:(Math.random()-.5)*20,
    life: 1
  }));
  let frame = 0;
  (function anim(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    parts.forEach(p=>{
      p.vy += .4; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life -= .009;
      ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.rot*Math.PI/180);
      ctx.globalAlpha = Math.max(0,p.life); ctx.fillStyle = p.c;
      ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*.6); ctx.restore();
    });
    frame++;
    if (frame < 130) requestAnimationFrame(anim);
    else ctx.clearRect(0,0,canvas.width,canvas.height);
  })();
}

/* ===========================================================================
   UTILIDADES
   =========================================================================== */
function hexA(hex, a) {
  const h = hex.replace("#","");
  const r = parseInt(h.substring(0,2),16), g = parseInt(h.substring(2,4),16), b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

// redraw map on resize
let rT;
addEventListener("resize", ()=>{ clearTimeout(rT); rT=setTimeout(()=>{ if(CURRENT.session && location.hash.split("/").length>3) drawMap(CURRENT.course, CURRENT.session); }, 250); });

/* ===========================================================================
   INIT
   =========================================================================== */
function init() {
  $("#openProfileBtn").addEventListener("click", openProfile);
  $("#rankBtn").addEventListener("click", ()=> location.hash="#/ranking");
  $("#brandHome").addEventListener("click", ()=> location.hash="#/");
  $("#drawerBackdrop").addEventListener("click", closeProfile);
  $("#testBackdrop").addEventListener("click", (e)=>{ if(e.target.id==="testBackdrop") {} });
  router();
}
document.addEventListener("DOMContentLoaded", init);
