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

  assistente: {
    nome:      'EVO',
    monograma: 'E',
    assinatura:'EVO · Assistente digital',
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
