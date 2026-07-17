---
name: deck
description: Biblioteca de Slides do Juan — monta apresentações premium a partir de capas, intros e padrões reutilizáveis, com um compilador. Use quando Juan pedir slides, apresentação, deck, aula, palestra, pitch, "pega aquele padrão/capa", ou pra atualizar o pitch da Hive. Design dark + pontinhos + Poppins + acento verde (padrão da casa).
---

# deck · Biblioteca de Slides do Juan

Sistema reutilizável de slides: um **acervo** de capas, intros e padrões + um **compilador** que monta o deck a partir de um manifesto. Não se faz deck do zero; **monta-se da biblioteca**. Inspiração: o Anderson pedia "pega aquele modelo, aquela sequência de 5 slides do lugar tal" → aqui isso é a biblioteca.

## ⚠️ Regra de ouro: contexto manda na marca
- **Ensino** (aula, treinamento, palestra, entrega sob marca de terceiro tipo FIAP/B3): **SEM marca Hive, SEM auto-promoção, SEM prova social.** Tom elegante, alta consciência. Crédito de autor sutil ("Juan Carlo") no máximo. `mark: "juan"` ou `"none"`. **NUNCA** usar `library/intros/*` (são venda).
- **Venda/pitch** (deck da Hive, proposta): aí sim marca Hive (`mark: "hive"`, quadradinho verde) + `library/intros/juan-credibility` + `juan-proof-founders`.
- Ver memória `feedback-teaching-not-selling`.

## Como montar um deck
1. Escolher as peças da biblioteca (ver `CATALOG.md` pro acervo visual: o que cada padrão é e quando usar).
2. Copiar os fragmentos pra um diretório de trabalho do deck e editar o conteúdo (ou referenciar direto da biblioteca pra slides genéricos).
3. Escrever um manifesto JSON e compilar:
```bash
node compile.mjs <manifesto.json>
```
Manifesto:
```json
{
  "title": "Meu Deck",
  "mark": "juan",
  "assetBase": "assets",
  "out": "/caminho/saida.html",
  "slides": ["library/covers/cover-dots.html", "library/patterns/agenda.html", "..."]
}
```
4. Verificar com screenshot (regra E2E): nunca declarar pronto sem ver o slide renderizado.
```bash
npm exec --yes -- playwright@latest screenshot --viewport-size=1600,900 "file://<saida.html>#N" /tmp/s.png
```

## Estrutura
```
deck/
├── compile.mjs            # compilador: manifesto → deck self-contained
├── CATALOG.md             # acervo visual (cada padrão + screenshot + quando usar)
├── engine/
│   ├── design-md.css      # design system base (tema hive embutido)
│   ├── engine.css         # camada de slides (composição, cards, tipografia premium)
│   ├── engine.js          # navegação (← → · clique · F tela cheia · #hash)
│   └── icons.svg          # sprite de ícones inline (NUNCA CDN)
├── library/
│   ├── covers/            # capas (cover-dots = a favorita: pontinhos + glow)
│   ├── patterns/          # padrões: agenda, cards-3, flow, text-banner, two-banners, code-split, comparison, divider
│   ├── intros/            # ⚠️ VENDA ONLY: juan-credibility, juan-proof-founders
│   └── closings/          # encerramentos
└── assets/                # logos, bandeiras (circle-flags), fotos de prova, avatares
```

## Design system (padrão da casa)
Dark `#0c100e` + grão de pontinhos · acento verde Hive `#A7DC5B` · Poppins (títulos) + Inter (corpo) + JetBrains Mono (eyebrow/código). Layout: bloco coeso centrado, colunas alinhadas pelo topo, card solo centra contra a coluna alta. Ícones = sprite inline (offline-safe, roda em máquina corporativa travada). Auditado por frota de design 3×.

## Navegação do deck
← → (ou PageUp/Down), clique nas bordas, **F** tela cheia, Home/End. Exporta PDF (Ctrl+P, 1 slide por página).

## Regenerar / crescer a biblioteca
Padrão novo → criar fragmento em `library/<cat>/<nome>.html` (só `<section class="slide">`, classes do engine, `{{A}}` pros assets, comentário-cabeçalho com "quando usar"), e adicionar entrada no `CATALOG.md`. Capa/intro nova → mesma lógica.
