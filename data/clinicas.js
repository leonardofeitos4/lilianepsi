/* ═══════════════════════════════════════════
   DADOS — Clínicas de atendimento
═══════════════════════════════════════════ */

const clinicas = [
  {
    nome: 'Bancários',
    bairro: 'Bancários · João Pessoa',
    online: false,
    endereco: 'Empresarial Delta Center',
    espaco: 'Espaço Vida & Cérebro Kids e CASULU Colaborativo',
    fotos: [
      'assets/img/clinica-bancarios-1.jpeg',
      'assets/img/clinica-bancarios-2.jpeg',
      'assets/img/clinica-bancarios-3.jpeg',
      'assets/img/clinica-bancarios-4.jpeg',
    ],
    videos: [
      {
        src: 'assets/video/clinica-entrada.mp4',
        texto: 'Antes da primeira sessão é comum querer saber como é o lugar. Este é o caminho até a sala de atendimento — para você já chegar reconhecendo o espaço.',
      },
      {
        src: 'assets/video/clinica-dentro.mp4',
        texto: 'E aqui é a sala onde acontecem os atendimentos: um ambiente reservado e acolhedor, preparado para receber crianças, adolescentes e adultos.',
      },
    ],
  },
  {
    nome: 'Manaíra',
    bairro: 'Manaíra · João Pessoa',
    online: false,
    endereco: 'Av. Governador Flávio Ribeiro Coutinho, 500 — dentro do Liv Mall',
    espaco: 'CASULU Colaborativo',
    fotos: [
      'assets/img/clinica-manaira-1.jpeg',
      'assets/img/clinica-manaira-2.jpeg',
    ],
    videos: [],
  },
  {
    nome: 'Estados',
    bairro: 'Estados · João Pessoa',
    online: false,
    endereco: 'Av. Epitácio Pessoa, 2055 — Empresarial Bel Center',
    espaco: 'CASULU Colaborativo',
    fotos: [
      'assets/img/clinica-estados-1.jpeg',
      'assets/img/clinica-estados-2.jpeg',
    ],
    videos: [],
  },
  {
    nome: 'Atendimento online',
    bairro: 'De onde você estiver',
    online: true,
    endereco: '',
    espaco: '',
    fotos: [],
    videos: [],
  },
];

function renderClinicas() {
  const el = document.getElementById('clin-list');
  if (!el) return;
  el.innerHTML = clinicas.map((c, i) => `
    <div class="clin-card${c.online ? ' online' : ''}"${c.fotos.length ? ` onclick="abrirClinica(${i})"` : ''}>
      <div class="clin-ico">${c.online ? '💻' : '📍'}</div>
      <div class="clin-txt">
        <div class="clin-name">${c.nome}</div>
        <div class="clin-addr">${c.endereco || c.bairro}</div>
        ${c.espaco ? `<div class="clin-space">${c.espaco}</div>` : ''}
      </div>
      ${c.fotos.length ? '<div class="clin-arr">→</div>' : ''}
    </div>`).join('');
}

/* Carrossel do detalhe de clínica: guarda a instância atual pra desligar
   o autoplay/observers de uma clínica antes de montar o da próxima. */
let cdCarrossel = null;

/* ── Detalhe de uma clínica: fotos + (quando houver) vídeo do tour ── */
function abrirClinica(i) {
  const c = clinicas[i];
  if (!c) return;

  if (cdCarrossel) { cdCarrossel.destruir(); cdCarrossel = null; }

  document.getElementById('cd-title').textContent = c.nome;

  const fotosHtml = `
    <div class="dv"><div class="dl"></div><div class="dt">Fotos do espaço</div><div class="dl"></div></div>
    <div class="carrossel">
      <div class="carrossel-trilha" id="cd-scroll">
        ${c.fotos.map(f => `
          <button class="carrossel-slide" data-zoom="${f}">
            <img src="${f}" alt="Foto do espaço de atendimento — ${c.nome}">
          </button>`).join('')}
      </div>
      <div class="carrossel-dots" id="cd-dots"></div>
      <div class="gal-hint">Toque na foto para ampliar</div>
    </div>`;

  const videosHtml = c.videos.length ? `
    <div class="dv"><div class="dl"></div><div class="dt">Conheça por dentro</div><div class="dl"></div></div>
    <div class="esp">
      <div class="esp-media">
        <video src="${c.videos[0].src}" autoplay muted loop playsinline preload="metadata"></video>
      </div>
      <p class="esp-txt">${c.videos[0].texto}</p>
      ${c.videos[1] ? `
      <button class="esp-more" id="esp-more" onclick="verMaisEspaco()">
        Conhecer o espaço de atendimento <span class="esp-arr">↓</span>
      </button>
      <div class="esp-extra" id="esp-extra" hidden>
        <div class="esp-media">
          <video data-src="${c.videos[1].src}" autoplay muted loop playsinline preload="none"></video>
        </div>
        <p class="esp-txt">${c.videos[1].texto}</p>
      </div>` : ''}
    </div>` : '';

  document.getElementById('cd-body').innerHTML = `
    <div class="clin-detalhe-head">
      <div class="clin-ico">${c.online ? '💻' : '📍'}</div>
      <div class="clin-txt">
        <div class="clin-addr">${c.endereco || c.bairro}</div>
        ${c.espaco ? `<div class="clin-space">${c.espaco}</div>` : ''}
      </div>
    </div>
    <p class="cat-desc">Um espaço preparado para receber crianças, adolescentes e adultos com acolhimento e privacidade, desde a entrada até a sala de atendimento.</p>
    ${fotosHtml}
    ${videosHtml}
    <a class="cta-btn" data-wa="Olá, Liliane! Gostaria de saber mais sobre a clínica ${c.nome}.">
      <span>Falar sobre essa clínica</span>
      <span class="cta-arr">→</span>
    </a>`;

  /* liga WhatsApp, carrossel de fotos e autoplay do vídeo no conteúdo
     recém-inserido (ampliar foto já funciona sozinho: bindGaleria() usa
     delegação de evento) */
  const cdBody = document.getElementById('cd-body');
  hydrateWaEm(cdBody);
  bindVideos(cdBody);
  cdCarrossel = bindCarrossel('cd-scroll', 'cd-dots');

  go('page-clinica-detalhe');
}
