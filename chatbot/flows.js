/* ═══════════════════════════════════════════
   FLUXOS — assistente digital da Liliane Medeiros

   Estrutura de cada fluxo:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Rótulo', f: 'id_do_fluxo' }  → navega
       { l: 'Rótulo', wa: 'mensagem' }    → abre WhatsApp
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
    msg: `O atendimento acontece em três clínicas em João Pessoa (<strong>Bancários</strong>, <strong>Manaíra</strong> e <strong>Altiplano</strong>) e também <strong>online</strong>, para quem preferir.<br><br>Você pode ver os endereços completos na seção "Clínicas" aqui do perfil.`,
    chips: [
      { l: 'Como funciona o atendimento', f: 'atendimento' },
      { l: 'Quero agendar', f: 'agendar' },
    ]
  },

  pacotes: {
    msg: `Os valores variam de acordo com o pacote de sessões escolhido.<br><br>A Liliane passa os valores individualmente no WhatsApp, já explicando as opções disponíveis.`,
    chips: [
      { l: 'Falar sobre valores', wa: 'Olá! Gostaria de saber os valores dos pacotes de atendimento.' },
      { l: 'Como funciona o atendimento', f: 'atendimento' },
    ]
  },

  /* ── FECHAMENTO ── */
  agendar: {
    msg: `Que bom! 🌿<br><br>É só tocar no botão abaixo que a Liliane te responde no WhatsApp para combinar o melhor horário.`,
    chips: [
      { l: '💬 Falar no WhatsApp', wa: 'Olá, Liliane! Vim pelo link do perfil e gostaria de agendar uma consulta.' },
    ]
  },
};
