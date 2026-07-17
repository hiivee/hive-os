# Instalar o Hive OS · o "npm install" via Claude

> O cliente não roda terminal na mão. Ele **cola um prompt no Claude Code dele** e o
> Claude faz todo o resto (clona, inicializa, liga as skills). É o `npm install hive-os`,
> só que em linguagem natural. Um prompt por pessoa (o nome muda).

---

## O prompt que o cliente cola no Claude dele

```
Instale o Hive OS, o meu harness de trabalho com IA, neste ambiente. Faça exatamente:

1. git clone https://github.com/hiivee/hive-os ~/hive-os
2. cd ~/hive-os && ./bin/hive init "{{NOME}}"
3. ./bin/hive skills link      (liga as skills no meu Claude, em ~/.claude/skills)
4. ./bin/hive status           (me mostre o resultado)

Depois abra ~/hive-os/CLAUDE.md e passe a operar por ele: brainstorm antes de construir,
prova E2E antes de dizer "pronto", mudanças cirúrgicas, reporte em altitude.

Quando terminar, me confirme que está pronto e me pergunte o que eu quero construir primeiro.
```

Troca `{{NOME}}` pelo nome da pessoa (ex: `Fabio`, `Olavo`). É só isso. O Claude dela
executa os 4 passos, e ela sai com **120 skills + o método + a rede de agentes** ligados.

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
