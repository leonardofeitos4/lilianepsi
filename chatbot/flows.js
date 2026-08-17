/* ═══════════════════════════════════════════
   FLUXOS — assistente digital da Liliane Medeiros

   Estrutura de cada fluxo:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Rótulo', f: 'id_do_fluxo' }  → navega
       { l: 'Rótulo', wa: 'mensagem' }    → abre WhatsApp
       { l: 'Rótulo', url: 'https://…' }  → abre link externo
     ]
   }

   Para criar um novo fluxo: adicione a entrada
   aqui e referencie com { f: 'novo_fluxo' }.

   ⚠️ Rascunho inicial — revisar com a Liliane
   (ver docs/PENDENCIAS.md).
═══════════════════════════════════════════ */

const flows = {

  /* ── MENU PRINCIPAL ── */
  inicio: {
    msg: `Sobre o que você quer saber? 🌿`,
    chips: [
      { l: '🧑‍⚕️ Como funciona o atendimento', f: 'atendimento' },
      { l: '📍 Clínicas e locais', f: 'clinicas' },
      { l: '💳 Pacotes e valores', f: 'pacotes' },
      { l: '📅 Quero agendar', f: 'agendar' },
    ]
  },

  atendimento: {
    msg: `A Liliane atende <strong>crianças, adolescentes e adultos</strong>, com uma abordagem individualizada para cada fase da vida.<br><br>O primeiro passo é uma consulta inicial para entender o que te trouxe até aqui.`,
    chips: [
      { l: 'Clínicas e locais', f: 'clinicas' },
      { l: 'Pacotes e valores', f: 'pacotes' },
      { l: 'Quero agendar', f: 'agendar' },
    ]
  },

  clinicas: {
    msg: `O atendimento acontece em três clínicas em João Pessoa (<strong>Bancários</strong>, <strong>Manaíra</strong> e <strong>Estados</strong>) e também <strong>online</strong>, para quem preferir.<br><br>Você pode ver os endereços completos na seção "Clínicas" aqui do perfil.`,
    chips: [
      { l: 'Como funciona o atendimento', f: 'atendimento' },
      { l: 'Quero agendar', f: 'agendar' },
    ]
  },

  pacotes: {
    msg: `A Liliane oferece possibilidade de <strong>parcelamento no cartão</strong> com desconto no valor final das sessões na opção do pacote <strong>MÊS ANTECIPADO</strong>.<br><br>Fale pelo WhatsApp para maiores informações.`,
    chips: [
      { l: 'Falar sobre valores', wa: 'Olá! Gostaria de saber os valores dos pacotes de atendimento.' },
      { l: 'Como funciona o atendimento', f: 'atendimento' },
    ]
  },

  /* ── FECHAMENTO ── */
  agendar: {
    msg: `Que bom! 🌿<br><br>Você pode ver os dias e horários disponíveis na agenda da Liliane, ou falar direto com ela no WhatsApp para combinar o melhor horário.`,
    chips: [
      { l: '📅 Ver horários disponíveis', url: SITE.agendaUrl },
      { l: '💬 Falar no WhatsApp', wa: 'Olá, Liliane! Vim pelo link do perfil e gostaria de agendar uma consulta.' },
    ]
  },
};
