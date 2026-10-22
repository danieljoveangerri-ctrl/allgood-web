/* =====================================================================
   Allgood · app.js
   Sin dependencias. Todo lo que hay que rellenar está en CONFIG.
   La página en catalán (ca/index.html) usa este mismo archivo: el idioma
   se detecta por el atributo lang del documento.
   ===================================================================== */
'use strict';

/* ---------- 1. DATOS DE CONTACTO Y PRECIO (rellenar aquí) ---------- */
const CONFIG = {
  whatsapp: '',         // Número con prefijo, sin + ni espacios. Ej.: '34600000000'
  telefono: '',         // Cómo quieres que se vea. Ej.: '600 00 00 00'
  email: '',            // Ej.: 'hola@allgood.care'
  precio: '',           // Puesta a punto. Solo el número. Ej.: '390'
  precioAlta: '',       // Alta segura. Ej.: '490'
  cuotaReferente: ''    // Cuota mensual de la referente. Ej.: '69'
};

/* ---------- 2. IDIOMA ---------- */
const LANG = (document.documentElement.lang || 'es').slice(0, 2);
const CA = LANG === 'ca';

/* ---------- 3. CONTENIDO ---------- */
const ROOMS_ES = {
  dormitorio: {
    scene: 'Agosto: 31 ºC en su dormitorio a las dos de la madrugada. Y pastillas sueltas en la mesilla.',
    name: 'Dormitorio', tag: 'Calor · Medicación',
    risks: [
      'En verano la habitación pasa de 30 ºC por la noche y nadie lo nota.',
      'Se levanta de la cama con prisa o mareado.',
      'Pastillas sueltas en la mesilla: dosis olvidadas o repetidas.'
    ],
    fixes: [
      'Termómetro a la vista y un plan para las olas de calor',
      'Lámina o cortina térmica que frena el sol',
      'Apoyo firme para levantarse de la cama',
      'Pastillero semanal y lista de medicación al día'
    ]
  },
  pasillo: {
    scene: 'Se levanta tres veces por la noche y el pasillo está a oscuras.',
    name: 'Pasillo', tag: 'Caídas',
    risks: [
      'El camino al baño, de noche y a oscuras.',
      'Alfombras sueltas y cables por el suelo.',
      'Muebles que estrechan el paso.'
    ],
    fixes: [
      'Luces con sensor de movimiento del dormitorio al baño',
      'Alfombras fijadas o retiradas',
      'Cables recogidos y paso despejado'
    ]
  },
  bano: {
    scene: 'La bañera alta, el suelo mojado y nada firme a lo que agarrarse.',
    name: 'Baño', tag: 'Caídas',
    risks: [
      'Suelo mojado y bañera alta: uno de los sitios con más caídas.',
      'Nada firme a lo que agarrarse al sentarse o levantarse.',
      'El agua de la ducha sale demasiado caliente.'
    ],
    fixes: [
      'Asideros junto al inodoro y en la ducha',
      'Antideslizante dentro y fuera de la ducha',
      'Luz nocturna para ir sin encender nada',
      'Agua de la ducha a temperatura segura, con limitador si hace falta'
    ]
  },
  salon: {
    scene: '«Abuela, soy yo. He cambiado de número y necesito dinero».',
    name: 'Salón', tag: 'Estafas',
    risks: [
      'Llamadas del falso nieto con el móvil roto, o del falso banco pidiendo claves.',
      'Mensajes con enlaces para desbloquear una cuenta.',
      'Sillones muy bajos y alfombras grandes.'
    ],
    fixes: [
      'Palabra clave familiar para comprobar cualquier llamada',
      'Teléfonos de confianza guardados con nombre y a la vista',
      'Sillón a la altura correcta para levantarse sin impulso',
      'Alfombra fijada y paso libre'
    ]
  },
  cocina: {
    scene: '¿El detector de humo? Nunca se llegó a poner.',
    name: 'Cocina', tag: 'Incendios',
    risks: [
      'El fuego encendido y olvidado.',
      'Regletas sobrecargadas y enchufes viejos.',
      'Lo de uso diario guardado demasiado alto.'
    ],
    fixes: [
      'Detector de humo instalado y probado',
      'Revisión de enchufes y regletas',
      'Lo de uso diario a la altura de la mano, sin subirse a sillas'
    ]
  },
  entrada: {
    scene: 'Un felpudo que se mueve, poca luz al llegar y nadie más que pueda entrar si pasa algo.',
    name: 'Entrada', tag: 'Caídas',
    risks: [
      'Un escalón o un felpudo en el que se tropieza.',
      'Poca luz al llegar a casa.',
      'Si pasa algo, nadie más puede entrar.'
    ],
    fixes: [
      'Luz en la entrada',
      'Felpudo antideslizante, o fuera',
      'Caja de llave para emergencias, si la familia quiere'
    ]
  }
};

const ROOMS_CA = {
  dormitorio: {
    scene: 'Agost: 31 ºC al seu dormitori a les dues de la matinada. I pastilles soltes a la tauleta.',
    name: 'Dormitori', tag: 'Calor · Medicació',
    risks: [
      'A l’estiu l’habitació passa dels 30 ºC a la nit i ningú se n’adona.',
      'S’aixeca del llit amb pressa o marejat.',
      'Pastilles soltes a la tauleta: dosis oblidades o repetides.'
    ],
    fixes: [
      'Termòmetre a la vista i un pla per a les onades de calor',
      'Làmina o cortina tèrmica que frena el sol',
      'Suport ferm per aixecar-se del llit',
      'Pastiller setmanal i llista de medicació al dia'
    ]
  },
  pasillo: {
    scene: 'S’aixeca tres cops a la nit i el passadís és a les fosques.',
    name: 'Passadís', tag: 'Caigudes',
    risks: [
      'El camí al bany, de nit i a les fosques.',
      'Catifes soltes i cables per terra.',
      'Mobles que estrenyen el pas.'
    ],
    fixes: [
      'Llums amb sensor de moviment del dormitori al bany',
      'Catifes fixades o retirades',
      'Cables recollits i pas lliure'
    ]
  },
  bano: {
    scene: 'La banyera alta, el terra mullat i res de ferm on agafar-se.',
    name: 'Bany', tag: 'Caigudes',
    risks: [
      'Terra mullat i banyera alta: un dels llocs amb més caigudes.',
      'Res de ferm on agafar-se en seure o aixecar-se.',
      'L’aigua de la dutxa surt massa calenta.'
    ],
    fixes: [
      'Agafadors al costat del vàter i a la dutxa',
      'Antilliscant dins i fora de la dutxa',
      'Llum nocturn per anar-hi sense encendre res',
      'Aigua de la dutxa a temperatura segura, amb limitador si cal'
    ]
  },
  salon: {
    scene: '«Àvia, soc jo. He canviat de número i necessito diners».',
    name: 'Menjador', tag: 'Estafes',
    risks: [
      'Trucades del fals net amb el mòbil trencat, o del fals banc demanant claus.',
      'Missatges amb enllaços per desbloquejar un compte.',
      'Butaques molt baixes i catifes grans.'
    ],
    fixes: [
      'Paraula clau familiar per comprovar qualsevol trucada',
      'Telèfons de confiança desats amb nom i a la vista',
      'Butaca a l’alçada correcta per aixecar-se sense impuls',
      'Catifa fixada i pas lliure'
    ]
  },
  cocina: {
    scene: 'El detector de fum? Mai es va arribar a posar.',
    name: 'Cuina', tag: 'Incendis',
    risks: [
      'El foc encès i oblidat.',
      'Regletes sobrecarregades i endolls vells.',
      'El d’ús diari desat massa amunt.'
    ],
    fixes: [
      'Detector de fum instal·lat i provat',
      'Revisió d’endolls i regletes',
      'El d’ús diari a l’alçada de la mà, sense enfilar-se a cadires'
    ]
  },
  entrada: {
    scene: 'Una estora que es mou, poca llum en arribar i ningú més que pugui entrar si passa res.',
    name: 'Entrada', tag: 'Caigudes',
    risks: [
      'Un esglaó o una estora amb què s’entrebanca.',
      'Poca llum en arribar a casa.',
      'Si passa alguna cosa, ningú més pot entrar.'
    ],
    fixes: [
      'Llum a l’entrada',
      'Estora antilliscant, o fora',
      'Caixa de clau per a emergències, si la família ho vol'
    ]
  }
};

// Peso de cada pregunta y lo primero que revisaríamos si la respuesta es «sí».
const QUESTIONS = [
  { id: 'q1', q: '¿Vive sola o solo, o pasa muchas horas sin nadie en casa?', qCa: 'Viu sola o sol, o passa moltes hores sense ningú a casa?', w: 2, fix: 'Un plan de aviso: quién llama a quién si algo va mal', fixCa: 'Un pla d’avís: qui truca a qui si alguna cosa va malament' },
  { id: 'q2', q: '¿Se ha caído alguna vez en el último año?', qCa: 'Ha caigut alguna vegada en l’últim any?', w: 3, fix: 'Revisión completa del riesgo de caídas, habitación por habitación', fixCa: 'Revisió completa del risc de caigudes, habitació per habitació' },
  { id: 'q9', q: '¿Se siente inestable al andar o se apoya en los muebles para moverse por casa?', qCa: 'Se sent inestable en caminar o s’agafa als mobles per moure’s per casa?', w: 3, fix: 'Medir la marcha y el equilibrio en la visita, y pautar ejercicio de equilibrio', fixCa: 'Mesurar la marxa i l’equilibri a la visita, i pautar exercici d’equilibri' },
  { id: 'q10', q: '¿Tiene miedo a caerse, o ha dejado de hacer cosas por ese miedo?', qCa: 'Té por de caure, o ha deixat de fer coses per aquesta por?', w: 2, fix: 'Apoyos donde le dan miedo las caídas y un plan para recuperar confianza', fixCa: 'Suports on li fan por les caigudes i un pla per recuperar confiança' },
  { id: 'q3', q: '¿Se ducha en bañera, o sin asideros donde apoyarse?', qCa: 'Es dutxa a la banyera, o sense agafadors on recolzar-se?', w: 2, fix: 'Asideros y antideslizante en el baño', fixCa: 'Agafadors i antilliscant al bany' },
  { id: 'q4', q: '¿Se levanta de noche y el camino al baño queda a oscuras?', qCa: 'S’aixeca de nit i el camí al bany queda a les fosques?', w: 2, fix: 'Luces con sensor del dormitorio al baño', fixCa: 'Llums amb sensor del dormitori al bany' },
  { id: 'q5', q: '¿No hay detector de humo, o no sabéis si funciona?', qCa: 'No hi ha detector de fum, o no sabeu si funciona?', w: 2, fix: 'Detector de humo instalado y probado', fixCa: 'Detector de fum instal·lat i provat' },
  { id: 'q6', q: '¿En verano su dormitorio pasa mucho calor y no tiene aire acondicionado?', qCa: 'A l’estiu el seu dormitori passa molta calor i no té aire condicionat?', w: 2, fix: 'Una habitación preparada para las olas de calor', fixCa: 'Una habitació preparada per a les onades de calor' },
  { id: 'q7', q: '¿Toma cinco o más medicamentos al día?', qCa: 'Pren cinc o més medicaments al dia?', w: 2, fix: 'Pastillero semanal y lista de medicación al día', fixCa: 'Pastiller setmanal i llista de medicació al dia' },
  { id: 'q8', q: '¿Ha recibido llamadas o mensajes sospechosos pidiendo dinero o datos?', qCa: 'Ha rebut trucades o missatges sospitosos demanant diners o dades?', w: 1, fix: 'Móvil protegido y palabra clave familiar', fixCa: 'Mòbil protegit i paraula clau familiar' }
];

const TXT_ES = {
  menuOpen: 'Abrir menú', menuClose: 'Cerrar menú',
  levelName: { bajo: 'bajo', medio: 'medio', alto: 'alto' },
  levelText: {
    bajo: 'Buen punto de partida. Una revisión al año confirma que sigue así y se adelanta a los cambios.',
    medio: 'Hay cosas concretas que mejorar antes de que pase algo. Una revisión las deja resueltas.',
    alto: 'Hay varios puntos que conviene arreglar ya. La buena noticia: casi todos se resuelven en una sola visita.'
  },
  routeHigh: 'Riesgo de caída alto. En personas que ya se han caído o se sienten inestables, adaptar la casa con una terapeuta ocupacional reduce las caídas un 38 %. La visita empieza por ahí.',
  routeLow: 'Riesgo de caída no destacado. Revisaríamos sobre todo incendios, calor y estafas, y mediríamos la marcha en la visita por si acaso.',
  share: (level, pct, fixes, url) => `He hecho el test de Allgood (la ITV de la casa de tus padres): riesgo ${level}, ${pct} %.` + (fixes.length ? ` Lo primero que revisarían: ${fixes.slice(0, 3).join('; ')}.` : '') + ` Hazlo tú también: ${url}`,
  sibs: (precio, parte, url) => `He visto esto para la casa de papá y mamá: la ITV de la casa. Una terapeuta ocupacional y un técnico de adaptaciones la revisan y resuelven lo pequeño en una mañana, y nos envían el informe a todos.${precio > 0 ? ` Son ${precio} €; entre tres, ${parte(3)} € cada uno.` : ''} ¿Lo pagamos entre todos? ${url}`,
  split: (p) => `Entre hermanos: ${p(2)} € cada uno si sois dos, ${p(3)} € si sois tres, ${p(4)} € si sois cuatro.`,
  needNamePhone: 'Necesitamos tu nombre y un teléfono para poder llamarte.',
  bookingIntro: (nombre) => `Hola, soy ${nombre}. Quiero reservar una de las primeras revisiones de Allgood.`,
  bookingPhone: 'Teléfono', bookingZone: 'La casa está en', bookingInterest: 'Me interesa', bookingMore: 'Más información',
  openedWhatsapp: 'Se abre WhatsApp con tu mensaje preparado. Envíalo y te contestamos.',
  openedMail: 'Se abre tu correo con el mensaje preparado. Envíalo y te contestamos.',
  mailSubject: 'Reserva · Allgood',
  missingConfig: 'Falta el contacto: rellena whatsapp o email en CONFIG (app.js).',
  waFloat: 'Hola, quiero información sobre la revisión de la casa de mis padres.'
};

const TXT_CA = {
  menuOpen: 'Obre el menú', menuClose: 'Tanca el menú',
  levelName: { bajo: 'baix', medio: 'mitjà', alto: 'alt' },
  levelText: {
    bajo: 'Bon punt de partida. Una revisió l’any confirma que continua així i s’avança als canvis.',
    medio: 'Hi ha coses concretes per millorar abans que passi res. Una revisió les deixa resoltes.',
    alto: 'Hi ha diversos punts que convé arreglar ja. La bona notícia: gairebé tots es resolen en una sola visita.'
  },
  routeHigh: 'Risc de caiguda alt. En persones que ja han caigut o se senten inestables, adaptar la casa amb una terapeuta ocupacional redueix les caigudes un 38 %. La visita comença per aquí.',
  routeLow: 'Risc de caiguda no destacat. Revisaríem sobretot incendis, calor i estafes, i mesuraríem la marxa a la visita per si de cas.',
  share: (level, pct, fixes, url) => `He fet el test d’Allgood (la ITV de la casa dels teus pares): risc ${level}, ${pct} %.` + (fixes.length ? ` El primer que revisarien: ${fixes.slice(0, 3).join('; ')}.` : '') + ` Fes-lo tu també: ${url}`,
  sibs: (precio, parte, url) => `He vist això per a la casa del pare i la mare: la ITV de la casa. Una terapeuta ocupacional i un tècnic d’adaptacions la revisen i resolen el que és petit en un matí, i ens envien l’informe a tots.${precio > 0 ? ` Són ${precio} €; entre tres, ${parte(3)} € cadascú.` : ''} Ho paguem entre tots? ${url}`,
  split: (p) => `Entre germans: ${p(2)} € cadascú si sou dos, ${p(3)} € si sou tres, ${p(4)} € si sou quatre.`,
  needNamePhone: 'Necessitem el teu nom i un telèfon per poder trucar-te.',
  bookingIntro: (nombre) => `Hola, soc ${nombre}. Vull reservar una de les primeres revisions d’Allgood.`,
  bookingPhone: 'Telèfon', bookingZone: 'La casa és a', bookingInterest: 'M’interessa', bookingMore: 'Més informació',
  openedWhatsapp: 'S’obre WhatsApp amb el teu missatge preparat. Envia’l i et contestem.',
  openedMail: 'S’obre el teu correu amb el missatge preparat. Envia’l i et contestem.',
  mailSubject: 'Reserva · Allgood',
  missingConfig: 'Falta el contacte: omple whatsapp o email a CONFIG (app.js).',
  waFloat: 'Hola, vull informació sobre la revisió de la casa dels meus pares.'
};

const TXT = CA ? TXT_CA : TXT_ES;
const ROOMS = CA ? ROOMS_CA : ROOMS_ES;
const fixOf = (q) => (CA ? q.fixCa : q.fix);

/* ---------- 4. UTILIDADES ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.matchMedia('(max-width: 899px)').matches;
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const scrollTo = (el, block = 'start') => el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block });
const pageUrl = () => location.href.split('#')[0];

/* ---------- 5. MENÚ MÓVIL ---------- */
(function nav() {
  const toggle = $('.nav-toggle');
  const nav = $('#nav');
  if (!toggle || !nav) return;
  const set = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? TXT.menuClose : TXT.menuOpen);
  };
  toggle.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();

/* ---------- 6. APARICIÓN AL HACER SCROLL ---------- */
(function reveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  els.forEach((el) => {
    const siblings = Array.from(el.parentElement.children).filter((c) => c.classList.contains('reveal'));
    const i = siblings.indexOf(el);
    if (i > 0) el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
  els.forEach((el) => io.observe(el));
})();

/* ---------- 7. CIFRAS QUE CUENTAN ---------- */
(function counters() {
  const els = $$('[data-count]');
  if (!els.length) return;
  // Separador de miles con punto también en cifras de cuatro dígitos (5.807).
  const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => { el.textContent = fmt(Number(el.dataset.count)); });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const end = Number(el.dataset.count);
      const dur = 1200;
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(end * eased));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  els.forEach((el) => { el.textContent = '0'; io.observe(el); });
})();

/* ---------- 8. PLANO DE LA CASA ---------- */
(function rooms() {
  const plan = $('.plan');
  const panel = $('#room-panel');
  if (!plan || !panel) return;
  const body = $('.room-body', panel);
  const nameEl = $('[data-room-name]', panel);
  const tagEl = $('[data-room-tag]', panel);
  const sceneEl = $('[data-room-scene]', panel);
  const fixesEl = $('[data-room-fixes]', panel);
  const buttons = $$('.room', plan);
  let current = 'bano';
  let timer = null;

  const paint = (room) => {
    nameEl.textContent = room.name;
    tagEl.textContent = room.tag;
    if (sceneEl) sceneEl.textContent = room.scene || '';
    fixesEl.innerHTML = room.fixes.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
  };

  const render = (id) => {
    const room = ROOMS[id];
    if (!room) return;
    current = id;
    buttons.forEach((b) => {
      const sel = b.dataset.room === id;
      b.setAttribute('aria-selected', String(sel));
      b.tabIndex = sel ? 0 : -1;
    });
    if (reduceMotion) { paint(room); return; }
    clearTimeout(timer);
    body.classList.add('is-switching');
    timer = setTimeout(() => { paint(room); body.classList.remove('is-switching'); }, 160);
  };

  const backdrop = $('.sheet-backdrop');
  const openSheet = () => {
    if (!isNarrow()) return;
    panel.classList.add('open');
    if (backdrop) { backdrop.hidden = false; requestAnimationFrame(() => backdrop.classList.add('show')); }
    document.body.classList.add('sheet-open');
  };
  const closeSheet = () => {
    panel.classList.remove('open');
    if (backdrop) { backdrop.classList.remove('show'); setTimeout(() => { backdrop.hidden = true; }, 400); }
    document.body.classList.remove('sheet-open');
  };
  $$('[data-sheet-close]').forEach((el) => el.addEventListener('click', closeSheet));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSheet(); });
  window.addEventListener('resize', () => { if (!isNarrow()) closeSheet(); });

  buttons.forEach((b) => b.addEventListener('click', () => {
    render(b.dataset.room);
    openSheet();
  }));

  plan.addEventListener('keydown', (e) => {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;
    e.preventDefault();
    const i = buttons.findIndex((b) => b.dataset.room === current);
    const next = buttons[(i + (forward ? 1 : -1) + buttons.length) % buttons.length];
    render(next.dataset.room);
    next.focus();
  });

  render(current);
})();

/* ---------- 9. TEST: UNA PREGUNTA CADA VEZ ---------- */
(function quiz() {
  const root = $('#quiz');
  if (!root) return;
  const card = $('[data-quiz-card]', root);
  const result = $('[data-quiz-result]', root);
  const el = {
    index: $('[data-quiz-index]', root), bar: $('[data-quiz-bar]', root), q: $('[data-quiz-q]', root),
    back: $('[data-quiz-back]', root), buttons: $$('[data-quiz-answer]', root),
    level: $('[data-level]', result), score: $('[data-score]', result), pct: $('[data-pct]', result),
    text: $('[data-level-text]', result), route: $('[data-route]', result),
    fixesWrap: $('[data-fixes-wrap]', result), fixes: $('[data-fixes]', result),
    share: $('[data-share]', result), reset: $('[data-quiz-reset]', result)
  };
  const total = QUESTIONS.length;
  const totalW = QUESTIONS.reduce((sum, q) => sum + q.w, 0);
  const answers = {};
  let i = 0;

  const show = (n) => {
    i = Math.max(0, Math.min(n, total - 1));
    const q = QUESTIONS[i];
    el.index.textContent = String(i + 1);
    el.bar.style.width = Math.round(((i + 1) / total) * 100) + '%';
    // Reinicia la animación de entrada de la pregunta.
    el.q.style.animation = 'none';
    void el.q.offsetWidth;
    el.q.style.animation = '';
    el.q.textContent = CA ? q.qCa : q.q;
    el.back.hidden = i === 0;
    el.buttons.forEach((b) => b.classList.toggle('is-pressed', answers[q.id] === b.dataset.quizAnswer));
  };

  const finish = () => {
    let score = 0;
    const fixes = [];
    QUESTIONS.forEach((q) => { if (answers[q.id] === 'si') { score += q.w; fixes.push(fixOf(q)); } });
    const pct = Math.round((score / totalW) * 100);
    const level = pct >= 55 ? 'alto' : pct >= 25 ? 'medio' : 'bajo';
    root.dataset.level = level;
    el.level.textContent = TXT.levelName[level];
    el.score.style.width = Math.max(pct, 4) + '%';
    el.pct.textContent = pct + ' %';
    el.text.textContent = TXT.levelText[level];
    // Enrutar, no rechazar: la promesa de menos caídas solo donde la evidencia la sostiene.
    const fallRisk = ['q2', 'q9', 'q10'].some((id) => answers[id] === 'si');
    el.route.textContent = fallRisk ? TXT.routeHigh : TXT.routeLow;
    el.fixesWrap.hidden = fixes.length === 0;
    el.fixes.innerHTML = fixes.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
    el.share.href = 'https://wa.me/?text=' + encodeURIComponent(TXT.share(TXT.levelName[level], pct, fixes, pageUrl() + '#test'));
    card.hidden = true;
    result.hidden = false;
    if (isNarrow()) scrollTo(root, 'start');
  };

  el.buttons.forEach((b) => b.addEventListener('click', () => {
    answers[QUESTIONS[i].id] = b.dataset.quizAnswer;
    b.classList.add('is-pressed');
    setTimeout(() => {
      if (i === total - 1) finish(); else show(i + 1);
    }, reduceMotion ? 0 : 180);
  }));
  el.back.addEventListener('click', () => show(i - 1));
  el.reset.addEventListener('click', () => {
    Object.keys(answers).forEach((k) => delete answers[k]);
    root.dataset.level = '';
    result.hidden = true;
    card.hidden = false;
    show(0);
  });
  document.addEventListener('keydown', (e) => {
    if (card.hidden || !root.matches(':hover') && !root.contains(document.activeElement)) return;
    const k = e.key.toLowerCase();
    if (k === 's') el.buttons[0].click();
    if (k === 'n') el.buttons[1].click();
    if (e.key === 'ArrowLeft' && i > 0) show(i - 1);
  });

  show(0);
})();

/* ---------- 10. CONTACTO Y PRECIOS DESDE CONFIG ---------- */
(function contact() {
  const fill = (sel, value) => {
    if (!value) return;
    $$(sel).forEach((el) => { el.textContent = value; el.classList.remove('placeholder'); });
  };
  fill('[data-price]', CONFIG.precio);
  fill('[data-price-alta]', CONFIG.precioAlta);
  fill('[data-cuota]', CONFIG.cuotaReferente);
  fill('[data-cuota-inline]', CONFIG.cuotaReferente);

  const phone = $('[data-contact-phone]');
  if (phone && (CONFIG.whatsapp || CONFIG.telefono)) {
    phone.textContent = CONFIG.telefono || '+' + CONFIG.whatsapp;
    phone.href = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}` : `tel:${CONFIG.telefono.replace(/\s+/g, '')}`;
    if (CONFIG.whatsapp) { phone.target = '_blank'; phone.rel = 'noopener'; }
    phone.classList.remove('placeholder');
  }
  const email = $('[data-contact-email]');
  if (email && CONFIG.email) {
    email.textContent = CONFIG.email;
    email.href = `mailto:${CONFIG.email}`;
    email.classList.remove('placeholder');
  }

  // Pago entre hermanos: solo se muestra cuando hay precio.
  const precio = Number(CONFIG.precio);
  const parte = (n) => Math.ceil(precio / n);
  const split = $('[data-split]');
  if (split && precio > 0) {
    split.textContent = TXT.split(parte);
    split.hidden = false;
  }

  // El momento de compra es el grupo de los hermanos: mensaje listo para reenviar.
  const sibs = $('[data-share-sibs]');
  if (sibs) sibs.href = 'https://wa.me/?text=' + encodeURIComponent(TXT.sibs(precio, parte, pageUrl() + '#reserva'));

  // WhatsApp flotante, solo con número configurado.
  const wa = $('[data-wa-float]');
  if (wa && CONFIG.whatsapp) {
    wa.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(TXT.waFloat)}`;
    wa.hidden = false;
  }
})();

/* ---------- 11. FORMULARIO DE RESERVA (sin servidor: abre WhatsApp o el correo) ---------- */
(function booking() {
  const form = $('#booking');
  if (!form) return;
  const note = $('[data-form-note]', form);
  const defaultNote = note.textContent;
  const say = (text, cls) => {
    note.textContent = text;
    note.classList.remove('is-error', 'is-ok');
    if (cls) note.classList.add(cls);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const telefono = form.telefono.value.trim();
    const zona = form.zona.value.trim();
    const nota = form.nota.value.trim();
    const interes = form.interes ? form.interes.value : '';

    form.nombre.classList.toggle('is-invalid', !nombre);
    form.telefono.classList.toggle('is-invalid', !telefono);
    if (!nombre || !telefono) {
      say(TXT.needNamePhone, 'is-error');
      (nombre ? form.telefono : form.nombre).focus();
      return;
    }

    const text = [
      TXT.bookingIntro(nombre),
      `${TXT.bookingPhone}: ${telefono}`,
      zona ? `${TXT.bookingZone}: ${zona}` : '',
      interes ? `${TXT.bookingInterest}: ${interes}` : '',
      nota ? `${TXT.bookingMore}: ${nota}` : ''
    ].filter(Boolean).join('\n');

    if (CONFIG.whatsapp) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      say(TXT.openedWhatsapp, 'is-ok');
    } else if (CONFIG.email) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(TXT.mailSubject)}&body=${encodeURIComponent(text)}`;
      say(TXT.openedMail, 'is-ok');
    } else {
      say(TXT.missingConfig, 'is-error');
    }
  });

  form.addEventListener('input', () => {
    if (note.classList.contains('is-error')) say(defaultNote);
  });
})();

/* ---------- 12. AÑO DE LA PEGATINA Y CABECERA AL HACER SCROLL ---------- */
(function ambiente() {
  const now = new Date().getFullYear();
  $$('[data-year-next]').forEach((el) => { el.textContent = String(now + 1).slice(-2); });
  $$('[data-year-now]').forEach((el) => { el.textContent = String(now).slice(-2); });
  $$('[data-year-next-full]').forEach((el) => { el.textContent = String(now + 1); });

  const header = $('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();

/* ---------- 13. LA CASA SE ENCIENDE AL DESLIZAR ---------- */
(function stage() {
  const stage = $('.stage');
  if (!stage) return;
  if (reduceMotion) { stage.style.setProperty('--p', '1'); return; }
  let ticking = false;
  const update = () => {
    ticking = false;
    const rect = stage.getBoundingClientRect();
    const travel = stage.offsetHeight - window.innerHeight;
    const p = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 1;
    // Ligera curva para que la casa se encienda con decisión en la segunda mitad del recorrido.
    const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    stage.style.setProperty('--p', eased.toFixed(3));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();

/* ---------- 14. RAÍL DE PROGRESO ---------- */
(function rail() {
  const rail = $('.rail');
  if (!rail || !('IntersectionObserver' in window)) return;
  const links = $$('a[data-rail]', rail);
  const ids = links.map((a) => a.dataset.rail);
  const mark = (id) => {
    links.forEach((a) => a.classList.toggle('active', a.dataset.rail === id));
    const sec = document.getElementById(id);
    rail.classList.toggle('on-dark', !!sec && (sec.classList.contains('section-navy') || sec.classList.contains('stage')));
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) mark(en.target.id); });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  ids.forEach((id) => { const sec = document.getElementById(id); if (sec) io.observe(sec); });
  mark(ids[0]);
})();
