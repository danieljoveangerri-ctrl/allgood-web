/* =====================================================================
   Allgood · app.js
   Sin dependencias. Todo lo que hay que rellenar está en CONFIG.
   ===================================================================== */
'use strict';

/* ---------- 1. DATOS DE CONTACTO Y PRECIO (rellenar aquí) ---------- */
const CONFIG = {
  whatsapp: '',   // Número con prefijo, sin + ni espacios. Ej.: '34600000000'
  telefono: '',   // Cómo quieres que se vea. Ej.: '600 00 00 00'
  email: '',      // Ej.: 'hola@casaapunto.es'
  precio: '',           // Puesta a punto. Solo el número. Ej.: '390'
  precioAlta: '',       // Alta segura. Ej.: '490'
  cuotaReferente: ''    // Cuota mensual de la referente. Ej.: '69'
};

/* ---------- 2. CONTENIDO ---------- */
const ROOMS = {
  dormitorio: {
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
    name: 'Baño', tag: 'Caídas',
    risks: [
      'Suelo mojado y bañera alta: uno de los sitios con más caídas.',
      'Nada firme a lo que agarrarse al sentarse o levantarse.',
      'El agua del termo sale demasiado caliente.'
    ],
    fixes: [
      'Asideros junto al inodoro y en la ducha',
      'Antideslizante dentro y fuera de la ducha',
      'Luz nocturna para ir sin encender nada',
      'Termo ajustado a una temperatura segura'
    ]
  },
  salon: {
    name: 'Salón', tag: 'Estafas',
    risks: [
      'Llamadas del falso nieto con el móvil roto, o del falso banco pidiendo claves.',
      'Mensajes con enlaces para desbloquear una cuenta.',
      'Sillones muy bajos y alfombras grandes.'
    ],
    fixes: [
      'Móvil configurado para silenciar números desconocidos',
      'Palabra clave familiar para comprobar cualquier llamada',
      'Teléfonos importantes a la vista',
      'Alfombra fijada y paso libre'
    ]
  },
  cocina: {
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

// Peso de cada pregunta y lo primero que revisaríamos si la respuesta es «sí».
const QUESTIONS = [
  { id: 'q1', w: 2, fix: 'Un plan de aviso: quién llama a quién si algo va mal' },
  { id: 'q2', w: 3, fix: 'Revisión completa del riesgo de caídas, habitación por habitación' },
  { id: 'q9', w: 3, fix: 'Medir la marcha y el equilibrio en la visita, y pautar ejercicio de equilibrio' },
  { id: 'q10', w: 2, fix: 'Apoyos donde le dan miedo las caídas y un plan para recuperar confianza' },
  { id: 'q3', w: 2, fix: 'Asideros y antideslizante en el baño' },
  { id: 'q4', w: 2, fix: 'Luces con sensor del dormitorio al baño' },
  { id: 'q5', w: 2, fix: 'Detector de humo instalado y probado' },
  { id: 'q6', w: 2, fix: 'Una habitación preparada para las olas de calor' },
  { id: 'q7', w: 2, fix: 'Pastillero semanal y lista de medicación al día' },
  { id: 'q8', w: 1, fix: 'Móvil protegido y palabra clave familiar' }
];

const LEVELS = {
  bajo:  'Buen punto de partida. Una revisión al año confirma que sigue así y se adelanta a los cambios.',
  medio: 'Hay cosas concretas que mejorar antes de que pase algo. Una revisión las deja resueltas.',
  alto:  'Hay varios puntos que conviene arreglar ya. La buena noticia: casi todos se resuelven en una sola visita.'
};

/* ---------- 3. UTILIDADES ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrow = () => window.matchMedia('(max-width: 899px)').matches;
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const scrollTo = (el, block = 'start') => el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block });

/* ---------- 4. MENÚ MÓVIL ---------- */
(function nav() {
  const toggle = $('.nav-toggle');
  const nav = $('#nav');
  if (!toggle || !nav) return;
  const set = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  };
  toggle.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
})();

/* ---------- 5. APARICIÓN AL HACER SCROLL ---------- */
(function reveal() {
  const els = $$('.reveal');
  if (!els.length) return;
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-in'));
    return;
  }
  // Escalonado entre hermanos para que las tarjetas entren en cascada.
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

/* ---------- 6. CIFRAS QUE CUENTAN ---------- */
(function counters() {
  const els = $$('[data-count]');
  if (!els.length) return;
  // Separador de miles con punto también en cifras de cuatro dígitos (5.807), que es-ES no pone.
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

/* ---------- 7. PLANO DE LA CASA ---------- */
(function rooms() {
  const plan = $('.plan');
  const panel = $('#room-panel');
  if (!plan || !panel) return;
  const body = $('.room-body', panel);
  const nameEl = $('[data-room-name]', panel);
  const tagEl = $('[data-room-tag]', panel);
  const risksEl = $('[data-room-risks]', panel);
  const fixesEl = $('[data-room-fixes]', panel);
  const buttons = $$('.room', plan);
  let current = 'bano';
  let timer = null;

  const paint = (room) => {
    nameEl.textContent = room.name;
    tagEl.textContent = room.tag;
    risksEl.innerHTML = room.risks.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
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

  buttons.forEach((b) => b.addEventListener('click', () => {
    render(b.dataset.room);
    // En móvil el panel está debajo del plano: si queda fuera de vista, lo acercamos.
    if (isNarrow() && panel.getBoundingClientRect().top > window.innerHeight * 0.7) scrollTo(panel);
  }));

  // Flechas del teclado para moverse entre estancias.
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

/* ---------- 8. TEST DE DOS MINUTOS ---------- */
(function test() {
  const list = $('#questions');
  const result = $('#result');
  if (!list || !result) return;
  const answers = {};
  const total = QUESTIONS.length;
  const totalW = QUESTIONS.reduce((s, q) => s + q.w, 0);
  const el = {
    answered: $('[data-answered]', result),
    progress: $('[data-progress]', result),
    pending: $('[data-pending]', result),
    done: $('[data-done]', result),
    level: $('[data-level]', result),
    score: $('[data-score]', result),
    pct: $('[data-pct]', result),
    text: $('[data-level-text]', result),
    route: $('[data-route]', result),
    fixesWrap: $('[data-fixes-wrap]', result),
    fixes: $('[data-fixes]', result),
    share: $('[data-share]', result),
    reset: $('[data-reset]', result)
  };

  const update = () => {
    const answered = Object.keys(answers).length;
    let score = 0;
    const fixes = [];
    QUESTIONS.forEach((q) => {
      if (answers[q.id] === 'si') { score += q.w; fixes.push(q.fix); }
    });
    const pct = Math.round((score / totalW) * 100);
    const level = pct >= 55 ? 'alto' : pct >= 25 ? 'medio' : 'bajo';
    const done = answered === total;

    el.answered.textContent = String(answered);
    el.progress.style.width = Math.round((answered / total) * 100) + '%';
    el.pending.hidden = done;
    el.done.hidden = !done;
    result.dataset.level = done ? level : '';
    if (!done) return;

    el.level.textContent = level;
    el.score.style.width = Math.max(pct, 4) + '%';
    el.pct.textContent = pct + ' %';
    el.text.textContent = LEVELS[level];
    // Enrutar, no rechazar: la promesa de menos caídas solo donde la evidencia la sostiene.
    const fallRisk = ['q2', 'q9', 'q10'].some((id) => answers[id] === 'si');
    el.route.hidden = false;
    el.route.textContent = fallRisk
      ? 'Riesgo de caída alto. En personas que ya se han caído o se sienten inestables, adaptar la casa con una terapeuta ocupacional reduce las caídas un 38 %. La visita empieza por ahí.'
      : 'Riesgo de caída no destacado. Revisaríamos sobre todo incendios, calor y estafas, y mediríamos la marcha en la visita por si acaso.';
    el.fixesWrap.hidden = fixes.length === 0;
    el.fixes.innerHTML = fixes.map((t) => `<li>${escapeHtml(t)}</li>`).join('');

    const url = location.href.split('#')[0] + '#test';
    const msg = `He hecho el test de Allgood (la ITV de la casa de tus padres): riesgo ${level}, ${pct} %.`
      + (fixes.length ? ` Lo primero que revisarían: ${fixes.slice(0, 3).join('; ')}.` : '')
      + ` Hazlo tú también: ${url}`;
    el.share.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  };

  list.addEventListener('click', (e) => {
    const btn = e.target.closest('.q-btn');
    if (!btn) return;
    const q = btn.closest('.q');
    answers[q.dataset.q] = btn.dataset.answer;
    $$('.q-btn', q).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    q.classList.add('is-answered');
    update();
    if (Object.keys(answers).length === total && isNarrow()) scrollTo(result);
  });

  el.reset.addEventListener('click', () => {
    Object.keys(answers).forEach((k) => delete answers[k]);
    $$('.q-btn', list).forEach((b) => b.setAttribute('aria-pressed', 'false'));
    $$('.q', list).forEach((q) => q.classList.remove('is-answered'));
    update();
    scrollTo(list);
  });

  update();
})();

/* ---------- 9. CONTACTO Y PRECIO DESDE CONFIG ---------- */
(function contact() {
  const price = $('[data-price]');
  if (price && CONFIG.precio) {
    price.textContent = CONFIG.precio;
    price.classList.remove('placeholder');
  }
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
})();

/* ---------- 10. FORMULARIO DE RESERVA (sin servidor: abre WhatsApp o el correo) ---------- */
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
      say('Necesitamos tu nombre y un teléfono para poder llamarte.', 'is-error');
      (nombre ? form.telefono : form.nombre).focus();
      return;
    }

    const text = [
      `Hola, soy ${nombre}. Quiero reservar una de las primeras revisiones de Allgood.`,
      `Teléfono: ${telefono}`,
      zona ? `La casa está en: ${zona}` : '',
      interes ? `Me interesa: ${interes}` : '',
      nota ? `Más información: ${nota}` : ''
    ].filter(Boolean).join('\n');

    if (CONFIG.whatsapp) {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      say('Se abre WhatsApp con tu mensaje preparado. Envíalo y te contestamos.', 'is-ok');
    } else if (CONFIG.email) {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent('Reserva · Allgood')}&body=${encodeURIComponent(text)}`;
      say('Se abre tu correo con el mensaje preparado. Envíalo y te contestamos.', 'is-ok');
    } else {
      say('Falta el contacto: rellena whatsapp o email en CONFIG (app.js).', 'is-error');
    }
  });

  form.addEventListener('input', () => {
    if (note.classList.contains('is-error')) say(defaultNote);
  });
})();

/* ---------- 11. PRECIOS NUEVOS, PAGO ENTRE HERMANOS Y ENVIAR A LOS HERMANOS ---------- */
(function extras() {
  const fill = (sel, value) => {
    if (!value) return;
    $$(sel).forEach((el) => { el.textContent = value; el.classList.remove('placeholder'); });
  };
  fill('[data-price-alta]', CONFIG.precioAlta);
  fill('[data-cuota]', CONFIG.cuotaReferente);
  fill('[data-cuota-inline]', CONFIG.cuotaReferente);

  // Pago entre hermanos: solo se muestra cuando hay precio.
  const precio = Number(CONFIG.precio);
  const parte = (n) => Math.ceil(precio / n);
  const split = $('[data-split]');
  if (split && precio > 0) {
    split.textContent = `Entre hermanos: ${parte(2)} € cada uno si sois dos, ${parte(3)} € si sois tres, ${parte(4)} € si sois cuatro.`;
    split.hidden = false;
  }

  // El momento de compra es el grupo de los hermanos: mensaje listo para reenviar.
  const sibs = $('[data-share-sibs]');
  if (sibs) {
    const url = location.href.split('#')[0] + '#reserva';
    const precioTxt = precio > 0 ? ` Son ${precio} €; entre tres, ${parte(3)} € cada uno.` : '';
    const msg = `He visto esto para la casa de papá y mamá: la ITV de la casa. Una terapeuta ocupacional y un técnico de adaptaciones la revisan y resuelven lo pequeño en una mañana, y nos envían el informe a todos.${precioTxt} ¿Lo pagamos entre todos? ${url}`;
    sibs.href = 'https://wa.me/?text=' + encodeURIComponent(msg);
  }
})();

/* ---------- 12. AÑO DE LA PEGATINA, CABECERA AL HACER SCROLL Y WHATSAPP FLOTANTE ---------- */
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

  const wa = $('[data-wa-float]');
  if (wa && CONFIG.whatsapp) {
    wa.href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent('Hola, quiero información sobre la revisión de la casa de mis padres.')}`;
    wa.hidden = false;
  }
})();
