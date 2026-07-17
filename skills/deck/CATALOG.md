# Catálogo da Biblioteca de Slides

> Acervo de peças prontas. Pra montar um deck, escolha peças daqui, liste no manifesto e rode `node compile.mjs`. Navegue visualmente em `CATALOG.html`. Cada fragmento já vem com conteúdo de exemplo genérico (template pra copiar) e um comentário-cabeçalho com "quando usar".

## Capas · `library/covers/`
| Peça | Quando usar | Shot |
|---|---|---|
| **cover-dots** | Capa de deck/abertura. Fundo de pontinhos + glow verde + Poppins grande. A favorita do Juan. | `catalog-shots/cover-dots.png` |

## Padrões · `library/patterns/`
| Peça | Quando usar | Shot |
|---|---|---|
| **divider** | Divisória entre seções/partes. Número + título grande + lead. | `divider.png` |
| **agenda** | Agenda ou índice de 4 a 8 itens numerados (2 colunas). | `agenda.png` |
| **cards-3** | Apresentar/comparar 3 conceitos lado a lado; o card `.accent` destaca o preferido. | `cards-3.png` |
| **flow** | Processo ou passo-a-passo de 4 a 7 etapas numeradas. | `flow.png` |
| **text-banner** | Um argumento (texto) + um destaque/régua (banner) ao lado. | `text-banner.png` |
| **two-banners** | Texto + par de destaques: benefício (verde `.ok`) e custo/alerta (âmbar `.warn`). | `two-banners.png` |
| **code-split** | Mostrar um trecho de código + explicação ao lado. | `code-split.png` |
| **comparison** | Tabela comparativa A vs B em várias dimensões. | `comparison.png` |

## Encerramentos · `library/closings/`
| Peça | Quando usar | Shot |
|---|---|---|
| **closing** | Slide de fechamento de seção/deck (capa de encerramento). | `closing.png` |

## Intros do Juan · `library/intros/` · ⚠️ VENDA/PITCH ONLY
> Credibilidade/prova social. **NUNCA em material de ensino** (aula = sem auto-promoção, ver `feedback-teaching-not-selling`). Só em pitch/proposta da Hive (`mark: "hive"`).

| Peça | Quando usar | Shot |
|---|---|---|
| **juan-credibility** | Abertura de pitch: bandeiras (países), Shark Tank, Vale do Silício, montagem de fotos. | `intro-juan-credibility.png` |
| **juan-proof-founders** | Prova social: founders reais (avatar IG + @handle + bandeira + linha de prova). | `intro-juan-proof-founders.png` |

## Exemplo de manifesto
```json
{
  "title": "Meu Deck",
  "mark": "juan",
  "assetBase": "assets",
  "out": "/caminho/deck.html",
  "slides": [
    "library/covers/cover-dots.html",
    "library/patterns/divider.html",
    "library/patterns/agenda.html",
    "library/patterns/cards-3.html",
    "library/closings/closing.html"
  ]
}
```
`mark`: `juan` (autoria sutil, padrão) · `hive` (pitch, com logo + libera intros) · `none`.
