# Instalar o Hive OS · o "npm install" via Claude

> O cliente não roda terminal na mão. Ele **cola um prompt no Claude Code dele** e o
> Claude faz todo o resto (clona, inicializa, liga as skills). É o `npm install hive-os`,
> só que em linguagem natural. Um prompt por pessoa (o nome muda).

---

## O prompt que o cliente cola no Claude dele

```
Instale o Hive OS neste ambiente. Faça exatamente:

1. git clone https://github.com/hiivee/hive-os ~/hive-os
2. cd ~/hive-os
3. Abra o arquivo START.md e execute ele: você vira o meu guia de onboarding e me
   conduz passo a passo, conversando, até tudo estar ligado (identidade, o método,
   a camada de memória e as ferramentas que eu uso).

Fale comigo na minha língua, um passo de cada vez, sem jargão. Comece agora.
```

É só isso, um prompt único, sem trocar nada. O Claude da pessoa **lê o `START.md` e
conversa com ela**: pergunta quem ela é, liga as 120 skills e o método, instala os quatro
cérebros de memória, conecta as ferramentas dela, e prova que tudo está vivo. No fim,
pergunta o que ela quer construir primeiro. O harness se instala falando.

---

## Atualizar (o "npm update")

Quando o engine melhora, o cliente cola:

```
Atualize o meu Hive OS: cd ~/hive-os && ./bin/hive sync    (git pull do engine)
```

O `brain/` dele (o que é dele: nome, marca, memória) nunca é tocado. Só o engine sobe.

---

## Fork vs clone

- **Clone** (o de cima) = a pessoa baixa a cópia e puxa updates do `hiivee/hive-os`. **Recomendado pro piloto.**
- **Fork** = a pessoa tem a cópia no GitHub dela (`fabio/hive-os`), customiza, e ainda puxa
  do upstream com `git pull upstream main`. É pra quando ela quiser versionar as
  customizações dela no próprio GitHub. Fase 2.

---

## Onde o login entra

O `platform.steve-aios.com` (Horus) é a **casa com o login**. Depois de logar, a pessoa vê
uma página "Instale seu Hive OS" com **este prompt já personalizado com o nome dela** e o
botão de copiar. O login controla quem pega o prompt; a instalação acontece no Claude dela.
