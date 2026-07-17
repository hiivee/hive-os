# Distribution & Recurrence — como o hive-os vira produto

> hive-os é o **engine canônico**. Uma pessoa não compra "um zip de skills";
> ela ganha uma **instância viva** que puxa upgrades do engine para sempre.
> A recorrência não é o download, é o **estar sempre atualizado + a comunidade**.

## O ecossistema (engine + insumos)

```
  hive-os  ── ENGINE canônico (público). Clone + `hive init` = herda o harness.
     ▲
     │ alimentado por:
     ├── claude-code-clients-kit  · curadoria histórica por perfil (insumo)
     ├── hive-skills              · catálogo de 190 skills p/ browse & install (insumo)
     └── ~/.claude/skills         · harness vivo do mantenedor → bin/curate-from-harness.sh
                                     (resolve symlinks, BARRA vazamento de alma, só limpo entra)
```

Regra de ouro: **nada de "alma"** (dados pessoais, infra, credenciais, paths de
máquina) entra no engine. `bin/curate-from-harness.sh` roda um varredor de
vazamento (paths locais, IPs de VPS, tokens, CPF, telefone) e recusa qualquer
skill suja. `hive doctor` é a segunda trava: barra `.env`/keys/tokens staged.

## Multi-tenant: 1 engine, N instâncias

```
  hive-os (engine, versionado)
     │  hive onboard <nome>   →  cria a instância (só o commitado, brain/ME.md fica de fora)
     ▼
  instância do cliente
     ├── skills/       herda as 120 (curadas, on-trigger)
     ├── harness/      orquestração + verify
     ├── CLAUDE.md     gerado do CLAUDE.base.md com o nome/brand dele
     └── brain/ME.md   PRIVADO, gitignored, nunca sai da máquina/dock dele
```

Engine melhora → cliente roda `hive sync` (git pull) → herda o upgrade. O
`brain/` dele nunca entra no engine. É a recorrência com substância: valor novo
todo mês sem o cliente perder o que é dele.

## Ponte com o Horus (a assinatura por cima do engine)

O Horus é a **camada de recorrência**: a casa onde o cliente cria conta, conecta
o GitHub dele, e recebe a instância já ligada. O engine roda no **dock isolado**
do cliente (container próprio, credenciais no vault dele); a comunidade
compartilha o **catálogo** (skills, templates), nunca a **infra** de ninguém.

```
  cliente cria conta no Horus
     → conecta o GitHub dele
        → Horus provisiona a instância (hive onboard) no dock dele
           → engine melhora → Horus empurra o upgrade (hive sync)
              → comunidade: catálogo compartilhado, infra isolada por dock
```

### Faseamento (menor peça provada primeiro)

1. **Piloto manual** (agora): `hive onboard <parceiro>` na mão + acesso ao repo.
   Prova a recorrência em semanas. Primeiro piloto: Portaria.IA (steve-portaria).
2. **Trilho Horus** (depois): auto-cadastro + provisionamento no dock + billing
   recorrente (Stripe). É o mesmo trilho da "Chave de Ouro" (US$20k hands-off).
   Nasce já sabendo o que automatizar, porque o piloto ensinou.

O engine não muda entre as duas fases. Só muda quem aperta o botão do onboard:
primeiro eu, depois o Horus.
