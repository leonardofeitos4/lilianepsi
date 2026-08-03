/* ═══════════════════════════════════════════
   DADOS — Clínicas de atendimento

   ⚠️ Endereços ainda não informados — ver
   docs/PENDENCIAS.md. Por enquanto só o bairro.
═══════════════════════════════════════════ */

const clinicas = [
  { nome: 'Bancários',      bairro: 'João Pessoa · PB', online: false, endereco: '' },
  { nome: 'Manaíra',        bairro: 'João Pessoa · PB', online: false, endereco: '' },
  { nome: 'Altiplano',      bairro: 'João Pessoa · PB', online: false, endereco: '' },
  { nome: 'Atendimento online', bairro: 'De onde você estiver', online: true,  endereco: '' },
];

function renderClinicas() {
  const el = document.getElementById('clin-list');
  if (!el) return;
  el.innerHTML = clinicas.map(c => `
    <div class="clin-card${c.online ? ' online' : ''}">
      <div class="clin-ico">${c.online ? '💻' : '📍'}</div>
      <div>
        <div class="clin-name">${c.nome}</div>
        <div class="clin-addr">${c.endereco || c.bairro}</div>
      </div>
    </div>`).join('');
}
