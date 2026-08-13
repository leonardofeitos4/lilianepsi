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
/* href de WhatsApp: <a data-wa="mensagem">. Reaproveitada para hidratar
   conteúdo montado depois do boot (ex.: detalhe de clínica). */
function hydrateWaEm(root = document) {
  root.querySelectorAll('[data-wa]').forEach(el => {
    el.setAttribute('href', waLink(el.dataset.wa));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });
}

function hydrate() {
  hydrateWaEm();

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
  'page-clinicas':        'clinicas',
  'page-clinica-detalhe': 'clinica',
  'page-gotas':           'gotas',
  'page-chat':            'duvidas',
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

/* Aceita um root pra poder ser rechamada depois do boot, quando um vídeo
   é montado dinamicamente (ex.: detalhe de clínica). */
function bindVideos(root = document) {
  const videos = root.querySelectorAll('.esp-media video');

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

/* Delegação de evento: funciona pra qualquer foto de carrossel presente
   na página, inclusive as montadas depois do boot (ex.: fotos de clínica). */
function bindGaleria() {
  document.addEventListener('click', e => {
    const card = e.target.closest('.carrossel-slide');
    if (!card) return;
    abrirMidia(`<img src="${card.dataset.zoom}" alt="">`);
  });

  addEventListener('keydown', e => { if (e.key === 'Escape') fecharMidia(); });
}

/* ══════════════════════════════
   6. CARROSSEL AUTOPLAY
   Novidades (home), Gotas de terapia e fotos de
   cada clínica. Passa uma foto por vez enquanto
   está na tela; toque numa foto abre em tela cheia
   (bindGaleria). Para assim que a pessoa interage,
   pra não brigar com o gesto dela.
══════════════════════════════ */
function bindCarrossel(scrollId, dotsId, intervalo = 3000) {
  const trilha = document.getElementById(scrollId);
  const dotsEl = document.getElementById(dotsId);
  if (!trilha || !dotsEl) return;

  const slides = [...trilha.children];
  dotsEl.innerHTML = slides
    .map((_, i) => `<button class="carrossel-dot${i === 0 ? ' active' : ''}" aria-label="Ir para foto ${i + 1}"></button>`)
    .join('');
  const dots = [...dotsEl.children];

  /* índice é a fonte da verdade — não é relido do DOM a cada passo do
     autoplay, senão uma atualização atrasada do observer (troca de foto
     do usuário, imagem lazy que termina de carregar etc.) podia fazer o
     próximo passo pular 2 fotos de uma vez */
  let indiceAtual = 0;

  function mostrarIndice(i) {
    indiceAtual = i;
    dots.forEach(d => d.classList.remove('active'));
    dots[i].classList.add('active');
  }

  /* Animação própria em vez de scrollTo({behavior:'smooth'}): o suave do
     navegador é rápido e sem controle de duração — aqui a foto desliza
     devagar (transicao). O scroll-snap é desligado durante o percurso,
     senão ele "puxa" o scroll no meio da animação e trava. */
  let raf = null;
  function scrollarPara(i, transicao = 900) {
    cancelAnimationFrame(raf);
    const inicio = trilha.scrollLeft;
    const destino = inicio + slides[i].getBoundingClientRect().left - trilha.getBoundingClientRect().left;
    const distancia = destino - inicio;
    if (Math.abs(distancia) < 1) return;

    trilha.style.scrollSnapType = 'none';
    const t0 = performance.now();

    const passo = agora => {
      const p = Math.min(1, (agora - t0) / transicao);
      /* easeInOutCubic: sai devagar, ganha corpo no meio, encosta suave */
      const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      trilha.scrollLeft = inicio + distancia * e;
      if (p < 1) { raf = requestAnimationFrame(passo); return; }
      trilha.style.scrollSnapType = '';
    };
    raf = requestAnimationFrame(passo);
  }

  function irPara(i) {
    pausar();
    mostrarIndice(i);
    scrollarPara(i);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => irPara(i)));

  /* acompanha o swipe manual do usuário, sincronizando a bolinha e o
     índice. Cada disparo do observer só traz quem cruzou um limiar
     NESSA leva — não o estado de todos —, então guarda a última
     proporção conhecida de cada foto e compara todas, não só as do lote
     (senão uma foto sumindo de leve podia "ganhar" por ser a única
     entrada do lote, mesmo com outra bem mais visível no mesmo instante). */
  const proporcoes = new Map();
  const slideObs = new IntersectionObserver(entradas => {
    entradas.forEach(e => proporcoes.set(e.target, e.isIntersecting ? e.intersectionRatio : 0));
    let melhorSlide = null, melhorRatio = -1;
    slides.forEach(s => {
      const r = proporcoes.get(s) || 0;
      if (r > melhorRatio) { melhorRatio = r; melhorSlide = s; }
    });
    if (melhorSlide) mostrarIndice(slides.indexOf(melhorSlide));
  }, { root: trilha, threshold: [0, .25, .5, .75, 1] });

  let timer = null;
  function tocar() {
    if (timer) return;
    timer = setInterval(() => {
      indiceAtual = (indiceAtual + 1) % slides.length;
      mostrarIndice(indiceAtual);
      scrollarPara(indiceAtual);
    }, intervalo);
  }
  function pausar() {
    clearInterval(timer); timer = null;
    cancelAnimationFrame(raf);
    trilha.style.scrollSnapType = '';   /* devolve o snap pro dedo do usuário */
  }

  trilha.addEventListener('pointerdown', pausar);

  /* só roda (e só passa a observar o swipe) enquanto a página estiver na
     tela — mesma lógica dos vídeos. A observação do swipe começa só na
     primeira vez que aparece: começar cedo, com a página ainda fora da
     tela (transform:translateX(100%)), dava leitura errada de qual foto
     estava "visível" e a bolinha nascia already errada. */
  let jaEntrou = false;
  const pageObs = new IntersectionObserver(entradas => {
    entradas.forEach(({ isIntersecting }) => {
      if (!isIntersecting) { pausar(); return; }
      if (!jaEntrou) {
        jaEntrou = true;
        trilha.scrollLeft = 0;
        mostrarIndice(0);
        slides.forEach(s => slideObs.observe(s));
      }
      tocar();
    });
  }, { threshold: 0.1 });
  pageObs.observe(trilha);

  /* pra quando esse carrossel é remontado num conteúdo dinâmico (ex.:
     trocar de clínica) — sem isso, o timer e os observers antigos
     continuavam rodando por baixo, presos a elementos já removidos */
  return {
    destruir() { pausar(); pageObs.disconnect(); slideObs.disconnect(); },
  };
}

/* ══════════════════════════════
   7. BOOT
══════════════════════════════ */
hydrate();
renderClinicas();
bindRipple();
bindGaleria();
bindVideos();
bindCarrossel('novidades-scroll', 'novidades-dots');
bindCarrossel('gotas-scroll', 'gotas-dots');
sincronizar();
