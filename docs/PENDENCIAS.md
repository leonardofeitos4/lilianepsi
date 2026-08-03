# Pendências — informações que faltam da Liliane

Site montado a partir do esboço em papel (foto). Tudo abaixo está com **valor
provisório** no código. Assim que a Liliane passar os dados reais, é só
editar `data/site.js` (itens marcados com `AJUSTAR`).

## 1. Contato — `data/site.js`

| Campo | Valor atual | O que preciso |
|---|---|---|
| `whatsapp` | `5583999999999` | Número real, só dígitos, com `55` + DDD |
| `instagram` | `psicolilianemedeiros` | Confirmar se é esse mesmo o @ |
| `email` | vazio | E-mail profissional. Se ficar vazio, o card de e-mail some sozinho |
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

A seção "Fotos e vídeos" está com 3 blocos de placeholder ("Foto em breve" /
"Vídeo em breve"), sem imagem real ainda. Assim que tiver as fotos/vídeos,
troco os blocos por conteúdo de verdade.

No esboço também aparecem anotações de **"Vídeo da semana"** e **"Conteúdo da
semana"** — entendi como lembretes de planejamento de conteúdo para o
Instagram, não como uma seção fixa do site. Se for diferente (por exemplo, um
vídeo em destaque atualizado toda semana), me avisa que eu monto essa seção.

## 7. Assistente digital

Criei o assistente com o nome "Lu" (abreviação de Liliane) só como
placeholder. Se quiserem outro nome, é rápido de trocar em `data/site.js` →
`assistente`.
