---
name: generar-ad-copy
description: |
  Genera variantes de ad copy (Meta Ads / Google Ads) para un cliente específico. Activa cuando
  el usuario dice "generar ad copy para X", "necesito ads UCM", "copy de campaña Werba",
  "variantes de ad", "Meta ad" o variaciones.

tools: Read, Write
layer: clients
client: atomica
---

# Skill: Generar ad copy

Genera 5 variantes de ad copy en la voz del cliente, para Meta Ads (FB+IG) o Google Ads.

## Workflow

### Paso 1 — Validar input

Pedí (si no está claro):
1. **Slug del cliente**
2. **Plataforma** (Meta / Google / ambas)
3. **Objetivo del ad** (leads, traffic, conversion, awareness)
4. **Ángulo central** (si no lo dan, sugerir 3 desde context.md)
5. **CTA** (si no lo dan, default por plataforma)

### Paso 2 — Cargar contexto

Read:
- `clients/<slug>/context.md`
- `clients/<slug>/voice-samples/*.md`
- `brand/voice.md`

### Paso 3 — Generar variantes

#### Meta Ads (FB + IG)

5 variantes con estructura:

```
VARIANTE N
Headline (40 chars max): [...]
Primary text (125 chars recomendado, 2200 max): [...]
Description (30 chars max): [...]
CTA button: [Learn More / Sign Up / Get Quote / Send Message / etc]
Tono testeable: [Painful / Curiosity / Social Proof / Urgency / Authority]
```

#### Google Ads (search)

5 variantes con estructura:

```
VARIANTE N
Headline 1 (30 chars max): [...]
Headline 2 (30 chars max): [...]
Headline 3 (30 chars max): [...]
Description 1 (90 chars max): [...]
Description 2 (90 chars max): [...]
Path 1: /[15-chars]
Path 2: /[15-chars]
```

### Paso 4 — Output

Escribí en: `clients/<slug>/drafts/ads-<plataforma>-YYYY-MM-DD-<objetivo>.md`

Formato:

```markdown
# Ad Copy · <Cliente> · <Plataforma>

**Cliente:** <nombre>
**Slug:** <slug>
**Plataforma:** Meta Ads / Google Ads
**Objetivo:** <objetivo>
**Fecha:** YYYY-MM-DD
**Status:** DRAFT v1

---

## Variantes para testear

### Variante 1 — <ángulo>
[...]

### Variante 2 — <ángulo>
[...]

### Variante 3 — <ángulo>
[...]

### Variante 4 — <ángulo>
[...]

### Variante 5 — <ángulo>
[...]

---

## Plan de testing recomendado

- **Audiencia A** (cold): variantes 1, 2, 3 (con foco pain + curiosity)
- **Audiencia B** (warm/retargeting): variantes 4, 5 (social proof + urgency)
- **Budget split inicial:** equitativo, 14 días, decisión data-driven después
- **KPI primario:** [del context.md — CPL, CTR, etc]

## Pendientes humanos

- Visual creative (imagen/video por variante)
- Setup en Meta/Google Ads Manager
- Audiencias precisas (lookalike, custom, etc — Paid Media team)
- Conversion tracking confirmado
- Aprobación cliente antes de gastar
```

### Paso 5 — Reportar

Mostrá:
1. Path del draft
2. Resumen de las 5 variantes (1 línea cada una)
3. Plan de testing recomendado
4. Reminder: "Falta visual + setup + aprobación cliente"

## Reglas

❌ No generar copy que viole Do's/Don'ts del cliente
❌ No prometer resultados ("garantizamos X CPL")
❌ No usar números/casos no validados
✅ 5 variantes con ángulos distintos (no 5 copias iguales)
✅ Respetar character limits estrictos por plataforma
✅ Cada variante debe ser testeable contra las otras (varios ángulos, no mismo enfoque)
