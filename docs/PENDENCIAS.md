# Pendências — informações que faltam da Liliane

Site montado a partir do esboço em papel (foto). Tudo abaixo está com **valor
provisório** no código. Assim que a Liliane passar os dados reais, é só
editar `data/site.js` (itens marcados com `AJUSTAR`).

## 1. Contato — `data/site.js`

| Campo | Valor atual | O que preciso |
|---|---|---|
| `whatsapp` | `558499836270` | Resolvido — `+55 84 9983-6270`, confirmado pela Liliane. Sem o nono dígito, é assim mesmo. Se algum dia o botão parar de abrir a conversa, o primeiro teste é acrescentar o `9`: `5584999836270` |
| `instagram` | `psicolilianemedeiros` | Confirmar se é esse mesmo o @ |
| `email` | `medeiros.liliane@gmail.com` | Resolvido — passado pela Liliane (04/08) |
| `crp` | `CRP-PB 13/14130` | Resolvido — veio do cartão de perfil (`liliane.jpeg`) |
| `cidade` | `João Pessoa · PB` | Confirmar cidade/estado |

## 2. Foto e logo

Resolvido: a foto de perfil (`assets/img/liliane.jpeg`) segue como avatar,
agora sobreposta a uma capa retangular no topo da home — `assets/img/
cover-fonte.png`, a arte colorida com os ícones (avião, coração, estrela
etc.) e o nome dela, que já estava guardada no projeto desde o início (era só
referência de Instagram até a Liliane pedir pra usar como capa mesmo). Layout
inspirado no biolink que o Leonardo mandou de referência (Instituto Danielle
Azevedo): capa larga + avatar circular por cima, encostando na borda de
baixo.

## 3. Clínicas — `data/clinicas.js`

Resolvido. Endereços, fotos do espaço e o nome do coworking confirmados pela
Liliane (12/08):

- **Bancários** — Empresarial Delta Center. Espaço Vida & Cérebro Kids e
  CASULU Colaborativo. 4 fotos.
- **Manaíra** — Av. Governador Flávio Ribeiro Coutinho, 500, dentro do Liv
  Mall. CASULU Colaborativo. 2 fotos.
- **Estados** — Av. Epitácio Pessoa, 2055, Empresarial Bel Center. CASULU
  Colaborativo. 2 fotos. Essa clínica substituiu a **Altiplano** do esboço
  original.

Cada clínica agora é um card clicável na página **Clínicas**: a pessoa toca,
entra numa página de detalhe só daquela clínica com as fotos do espaço (toca
pra ampliar). O vídeo do tour (item 6) é confirmado como sendo da
**Bancários** — por isso ele só aparece no detalhe dela, não mais como um
bloco genérico solto embaixo da lista.

## 4. Gotas de terapia — `index.html` / `data/clinicas.js`

O botão "Pacotes e valores" saiu da lista de links (a Liliane preferiu não
ter um ponto de entrada fixo pra preço — quem perguntar, é respondido no
WhatsApp ou pelo assistente). No lugar entrou **"Gotas de terapia"**, um
espaço para troca de conhecimento e reflexões, com um carrossel de 4 artes
que a Liliane mandou (`assets/img/gotas-carrossel-*.jpeg`).

Pendente: a própria Liliane comentou que a ideia principal é esse conteúdo
ser em **vídeo**, e o carrossel é só o conteúdo provisório enquanto isso não
existe. Assim que tiver o vídeo, troco o carrossel pelo player (mesmo padrão
dos vídeos de clínica, item 6).

## 5. Diferenciais — `index.html` (seção "Diferenciais")

Atualizei os 3 itens para usar o lema do cartão de perfil dela ("Escuta ·
Acolhimento · Desenvolvimento"), em vez do rascunho genérico de antes. Ainda
vale a Liliane confirmar se o texto de cada item reflete bem o que ela quis
dizer com cada palavra do lema.

## 6. Fotos e vídeos

Resolvido. Na home, a seção virou **"Novidades"**, com os 3 cards que a
Liliane mandou (`assets/img/card-*.jpeg`). Tocar em um card abre em tela
cheia, porque o texto da arte não é legível na miniatura.

Os 2 vídeos saíram da home e foram para o detalhe da clínica **Bancários**
(`assets/video/clinica-*.mp4`, ver item 3): aparece o da entrada, e o botão
"Conhecer o espaço de atendimento" revela o segundo. Rodam sozinhos, **sem
som** e em loop, só enquanto estão na tela — e o segundo vídeo só começa a
baixar quando a pessoa toca no botão.

Pendente:
- **Texto dos dois vídeos** — escrevi um rascunho ("caminho até a sala de
  atendimento" / "sala reservada e acolhedora"), mas não vi os vídeos: a
  Liliane precisa confirmar ou reescrever.

No esboço também aparecem anotações de **"Vídeo da semana"** e **"Conteúdo da
semana"** — entendi como lembretes de planejamento de conteúdo para o
Instagram, não como uma seção fixa do site. Se for diferente (por exemplo, um
vídeo em destaque atualizado toda semana), me avisa que eu monto essa seção.

## 7. Assistente digital

Resolvido: o assistente se chama **EVO** (substituiu o placeholder "Lu").
Nome, monograma e assinatura ficam em `data/site.js` → `assistente`, e o resto
do site lê daí — inclusive o título da página de chat.

A apresentação dele agora é "Eu sou EVO", sem artigo, para não dar gênero ao
nome. Se a Liliane preferir tratar como "o EVO" ou "a EVO", é só ajustar em
`chatbot/engine.js` → `startChat()`.
