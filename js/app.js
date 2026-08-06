/* ═══════════════════════════════════════════
   APP — navegação, hidratação e interações
   Depende de: data/site.js, data/clinicas.js,
   chatbot/*
═══════════════════════════════════════════ */

/* ══════════════════════════════
   1. HIDRATAÇÃO A PARTIR DO SITE
   Evita número de WhatsApp espalhado
   pelo HTML — tudo vem de data/site.js.
══════════════════════════════ */
function hydrate() {
  /* href de WhatsApp: <a data-wa="mensagem"> */
  document.querySelectorAll('[data-wa]').forEach(el => {
    el.setAttribute('href', waLink(el.dataset.wa));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* href do Instagram */
  document.querySelectorAll('[data-href="instagram"]').forEach(el => {
    el.setAttribute('href', igLink());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* href de e-mail (o card some se não houver e-mail definido) */
  document.querySelectorAll('[data-href="email"]').forEach(el => {
    if (!SITE.email) { el.remove(); return; }
    el.setAttribute('href', 'mailto:' + SITE.email);
  });

  /* href da ficha de cadastro de paciente */
  document.querySelectorAll('[data-href="ficha"]').forEach(el => {
    el.setAttribute('href', SITE.fichaUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* Textos: <span data-txt="crp"> */
  const textos = {
    nome:      SITE.nome,
    profissao: SITE.profissao,
    crp:       SITE.crp,
    publico:   SITE.publico,
    cidade:    SITE.cidade,
    instagram: '@' + SITE.instagram,
    email:     SITE.email,
    assistente:SITE.assistente.nome,
  };
  document.querySelectorAll('[data-txt]').forEach(el => {
    const v = textos[el.dataset.txt];
    if (v !== undefined) el.textContent = v;
  });

  document.title = `${SITE.nome} | ${SITE.profissao}`;
}

/* ══════════════════════════════
   2. NAVEGAÇÃO ENTRE PÁGINAS
══════════════════════════════ */
const ROTAS = {
  'page-clinicas': 'clinicas',
  'page-chat':     'duvidas',
};
const POR_SLUG = {};
Object.entries(ROTAS).forEach(([id, slug]) => { POR_SLUG[slug] = id; });

let paginaAtual = null;

function go(id) { location.hash = ROTAS[id] || ''; }
function back() { history.back(); }

function sincronizar() {
  const id = POR_SLUG[location.hash.slice(1)] || null;
  if (id === paginaAtual) return;

  /* o vídeo que sai da tela é pausado pelo IntersectionObserver (bindVideos) */
  if (paginaAtual) document.getElementById(paginaAtual).classList.remove('active');
  paginaAtual = id;

  const home = document.getElementById('home');
  const fabs = document.getElementById('home-fabs');

  if (!id) {
    home.classList.remove('behind');
    fabs.style.cssText = '';
    return;
  }

  const pg = document.getElementById(id);
  pg.classList.add('active');
  pg.scrollTop = 0;
  home.classList.add('behind');
  fabs.style.cssText = 'opacity:0;pointer-events:none';

  if (id === 'page-chat' && !aiStarted) { aiStarted = true; startChat(); }
}

addEventListener('hashchange', sincronizar);

/* ══════════════════════════════
   3. RIPPLE NOS CARDS
══════════════════════════════ */
function bindRipple() {
  document.querySelectorAll('.lcard').forEach(card => {
    card.addEventListener('pointerdown', function (e) {
      const r = this.getBoundingClientRect();
      const size = r.width * 2;
      const d = document.createElement('div');
      d.className = 'ripple';
      d.style.cssText =
        `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px;` +
        `width:${size}px;height:${size}px;margin:-${size / 2}px`;
      this.appendChild(d);
      setTimeout(() => d.remove(), 500);
    });
  });
}

/* ══════════════════════════════
   4. GALERIA — card em tela cheia
══════════════════════════════ */
function abrirMidia(html) {
  const lb = document.getElementById('lb');
  document.getElementById('lb-stage').innerHTML = html;
  lb.classList.add('open');
}

function fecharMidia() {
  const lb = document.getElementById('lb');
  if (!lb.classList.contains('open')) return;
  lb.classList.remove('open');
  document.getElementById('lb-stage').innerHTML = '';
}

/* ══════════════════════════════
   5. TOUR PELO ESPAÇO (Clínicas)
   Vídeos rodam sozinhos, sem som e em
   loop — só enquanto estão na tela.
══════════════════════════════ */
function verMaisEspaco() {
  const extra = document.getElementById('esp-extra');
  extra.hidden = false;
  document.getElementById('esp-more').remove();

  /* só agora o segundo vídeo começa a baixar */
  const v = extra.querySelector('video');
  if (v.dataset.src) { v.src = v.dataset.src; delete v.dataset.src; }
  extra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function bindVideos() {
  const videos = document.querySelectorAll('.esp-media video');

  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(({ target, isIntersecting }) => {
      if (target.dataset.src) return;                  // ainda não revelado
      if (!isIntersecting) { target.pause(); return; }

      /* iOS em modo de baixo consumo bloqueia o autoplay:
         nesse caso mostramos os controles para dar play na mão. */
      const p = target.play();
      if (p) p.catch(() => { target.controls = true; });
    });
  }, { threshold: 0.35 });

  videos.forEach(v => obs.observe(v));
}

function bindGaleria() {
  document.querySelectorAll('.gal-card').forEach(card => {
    card.addEventListener('click', () => {
      abrirMidia(`<img src="${card.dataset.zoom}" alt="">`);
    });
  });

  addEventListener('keydown', e => { if (e.key === 'Escape') fecharMidia(); });
}

/* ══════════════════════════════
   6. BOOT
══════════════════════════════ */
hydrate();
renderClinicas();
bindRipple();
bindGaleria();
bindVideos();
sincronizar();
