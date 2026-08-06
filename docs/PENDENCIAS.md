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

Resolvido: encontrei o cartão de perfil da Liliane (estava salvo por engano
na pasta da bioclara) e usei a foto (`assets/img/liliane.jpeg`) como avatar
do topo. Também guardei `assets/img/cover-fonte.png` (arte de capa para
Instagram) como referência — não é usada diretamente no site, o enquadramento
dela não fica bem como foto de capa do biolink.

Se quiserem uma foto de capa retangular (estilo "hero", como nos outros
perfis), é só me passar uma foto adicional.

## 3. Clínicas — `data/clinicas.js`

Estão listadas **Bancários**, **Manaíra**, **Altiplano** e **atendimento
online**, do esboço, mas sem endereço completo (só o bairro/cidade). Preciso
do endereço de cada clínica para preencher o campo `endereco` — hoje o site
mostra só "João Pessoa · PB" nesses casos.

## 4. Pacotes e valores — `index.html` (botão "Pacotes e valores")

O valor não aparece mais direto na tela — virou um botão (como Clínicas,
Instagram etc.) que já leva pro WhatsApp com a mensagem pronta, pra não expor
preço de cara. Ainda preciso saber:
- Os valores reais (ou se preferem manter só "sob consulta" sem valor nenhum)
- Se existem pacotes diferentes (ex.: 4 sessões, 8 sessões) para listar cada um

## 5. Diferenciais — `index.html` (seção "Diferenciais")

Atualizei os 3 itens para usar o lema do cartão de perfil dela ("Escuta ·
Acolhimento · Desenvolvimento"), em vez do rascunho genérico de antes. Ainda
vale a Liliane confirmar se o texto de cada item reflete bem o que ela quis
dizer com cada palavra do lema.

## 6. Fotos e vídeos

Resolvido. Na home, a seção virou **"Novidades"**, com os 3 cards que a
Liliane mandou (`assets/img/card-*.jpeg`). Tocar em um card abre em tela
cheia, porque o texto da arte não é legível na miniatura.

Os 2 vídeos saíram da home e foram para a página **Clínicas**
(`assets/video/clinica-*.mp4`), logo abaixo da lista de clínicas: aparece o da
entrada, e o botão "Conhecer o espaço de atendimento" revela o segundo. Rodam
sozinhos, **sem som** e em loop, só enquanto estão na tela — e o segundo vídeo
só começa a baixar quando a pessoa toca no botão.

Pendente:
- **Texto dos dois vídeos** — escrevi um rascunho ("caminho até a sala de
  atendimento" / "sala reservada e acolhedora"), mas não vi os vídeos: a
  Liliane precisa confirmar ou reescrever.
- **De qual clínica são os vídeos?** Hoje o bloco não diz. Se for de uma das
  três (Bancários / Manaíra / Altiplano), vale identificar.

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
