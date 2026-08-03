# Biolink — Liliane Medeiros, Psicóloga

Página de links da Liliane Medeiros, psicóloga (crianças, adolescentes e
adultos). HTML, CSS e JavaScript puros, sem build, sem dependências.

Para rodar, basta abrir `index.html` no navegador (ou servir a pasta:
`python -m http.server 8000`).

## Estrutura

```
index.html              todas as telas (home, clínicas e chat), em uma SPA sem framework
├── css/
│   ├── main.css        tokens de design, reset, sistema de páginas, componentes
│   ├── home.css        capa, pilares, diferenciais, pacotes, galeria, links, rodapé
│   ├── pages.css       cabeçalho padrão das subpáginas + cards de clínica
│   └── chat.css        assistente "Lu"
├── js/
│   └── app.js          hidratação, navegação, ripple
├── data/
│   ├── site.js         ⭐ configuração central: contato e redes
│   └── clinicas.js     locais de atendimento (presencial e online)
├── chatbot/
│   ├── config.js       nome do assistente e velocidade de digitação
│   ├── flows.js        árvore de conversa
│   └── engine.js       motor de renderização do chat
├── assets/img/         vazio por enquanto — ver docs/PENDENCIAS.md
└── docs/
    └── PENDENCIAS.md   ⚠️ o que ainda falta a Liliane informar
```

## Onde mexer

**Trocar WhatsApp, Instagram, e-mail ou CRP:** só em `data/site.js`. Nenhum
número ou @ está escrito no HTML, o `app.js` preenche tudo no carregamento a
partir dos atributos `data-wa`, `data-href` e `data-txt`.

**Editar uma clínica:** cada item é uma entrada no array `clinicas` em
`data/clinicas.js` (`nome`, `bairro`, `endereco`, `online`).

**Mexer no chat:** cada resposta é uma entrada em `flows` (`chatbot/flows.js`),
com `msg` e `chips`. Um chip com `f` navega para outro fluxo; um chip com `wa`
abre o WhatsApp.

## Antes de publicar

Ver `docs/PENDENCIAS.md` — falta foto, endereços das clínicas, valores dos
pacotes e revisão dos diferenciais com a Liliane.
