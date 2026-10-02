/* ═══════════════════════════════════════════
   CONFIGURAÇÃO CENTRAL DO SITE
   Único lugar para alterar contato e redes.
   Todo o resto lê daqui.

   ⚠️ Itens marcados com AJUSTAR ainda estão
   com valor provisório — ver docs/PENDENCIAS.md
═══════════════════════════════════════════ */

const SITE = {
  nome:      'Liliane Medeiros',
  profissao: 'Psicóloga',
  crp:       'CRP-PB 13/14130',
  publico:   'Crianças · Adolescentes · Adultos',

  whatsapp:  '558499836270',           // +55 84 9983-6270 — confirmado pela Liliane
  instagram: 'psicolilianemedeiros',
  email:     'medeiros.liliane@gmail.com',   // deixe '' para ocultar o card

  cidade:    'João Pessoa · PB',       // AJUSTAR

  fichaUrl:  'https://forms.gle/dgEXZfTjodpxRC9e7',   // Ficha de cadastro de paciente

  /* Agenda de horários disponíveis (planilha no Drive da Liliane).
     Termina em /preview: abre só para leitura, sem risco de o paciente
     editar. Precisa estar compartilhada como "qualquer pessoa com o link
     pode ver" — ver docs/PENDENCIAS.md. Deixe '' para esconder o botão. */
  agendaUrl: 'https://docs.google.com/spreadsheets/d/1hpCfRma-IPkzvdlxccZm8t6DoDe0SYsh/preview',

  assistente: {
    nome:      'EVO',
    monograma: 'E',
    assinatura:'EVO · Assistente digital',

    /* Data (AAAA-MM-DD) a partir da qual o assistente some sozinho do site
       (card "Tire suas dúvidas", botão flutuante e a própria página de
       chat). Deixe '' para nunca desativar automaticamente. */
    desativarEm: '2026-10-16',
  },
};

/* Monta um link de WhatsApp já com a mensagem codificada */
function waLink(msg) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
}

/* Link do Instagram */
function igLink() {
  return `https://instagram.com/${SITE.instagram}`;
}
