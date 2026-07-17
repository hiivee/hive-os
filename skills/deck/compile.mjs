#!/usr/bin/env node
// Compilador da Biblioteca de Slides do Juan.
// Monta um deck self-contained a partir de um MANIFESTO que lista peças da biblioteca.
//
// Uso:  node compile.mjs <manifesto.json>
//
// Manifesto:
// {
//   "title":     "Título do deck",
//   "mark":      "juan" | "hive" | "none",   // crédito de canto (ver regra: aula = sem Hive)
//   "assetBase": "assets",                     // caminho dos assets relativo ao HTML de saída
//   "out":       "/caminho/saida.html",
//   "slides":    ["library/covers/cover-dots.html", "library/patterns/agenda.html", ...]
// }
//
// Cada peça é um fragmento HTML (<section class="slide">...). Placeholders {{A}} viram assetBase.
// Slots de conteúdo {{SLOT}} podem ser preenchidos por "vars" no manifesto (opcional).
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL = dirname(fileURLToPath(import.meta.url));
const manPath = process.argv[2];
if (!manPath) { console.error("uso: node compile.mjs <manifesto.json>"); process.exit(1); }
const man = JSON.parse(readFileSync(resolve(manPath), "utf8"));

const { title = "Apresentação", mark = "juan", assetBase = "assets", out, slides = [], vars = {} } = man;
if (!out) { console.error("manifesto precisa de 'out'"); process.exit(1); }

const rd = (p) => readFileSync(isAbsolute(p) ? p : resolve(SKILL, p), "utf8");

let css = rd("engine/design-md.css");
const engineCss = rd("engine/engine.css");
// Build não-Hive (aula/marca de terceiro): remove logo Hive embutido + renomeia tema. Mantém o verde.
const theme = mark === "hive" ? "hive" : "deckdark";
if (theme !== "hive") {
  css = css
    .replace(/--dm-logo-(hive|juan):url\("[^"]*"\);/g, "")
    .replaceAll("var(--dm-logo-hive)", "none").replaceAll("var(--dm-logo-juan)", "none")
    .replaceAll("--dm-logo-hive", "--dm-logo-x")
    .replaceAll('data-theme="hive"', 'data-theme="deckdark"');
}
const engineJs = rd("engine/engine.js");
const icons = rd("engine/icons.svg");

// concatena os fragmentos da biblioteca na ordem do manifesto
let body = slides.map((s) => rd(s)).join("\n\n");
// preenche slots nomeados, depois o assetBase
for (const [k, v] of Object.entries(vars)) body = body.replaceAll(`{{${k}}}`, v);
body = body.replaceAll("{{A}}", assetBase);

const markHtml =
  mark === "hive" ? `<img class="deck-mark deck-mark-logo" src="${assetBase}/hive-logo.svg" alt="Hive Technology">`
  : mark === "none" ? ""
  : `<div class="deck-mark">Juan Carlo</div>`;

const fonts =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">';

const html = `<!doctype html>
<html lang="pt-BR" data-theme="${theme}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
${fonts}
<style>
${css}
${engineCss}
</style>
</head>
<body class="dm-doc deck-body">
${icons}
${markHtml}
<div class="deck">
${body}
</div>
<div class="deck-bar"><i></i></div>
<div class="deck-hud"></div>
<script>
${engineJs}
</script>
</body>
</html>`;

writeFileSync(resolve(out), html);
console.log(`deck montado: ${out} · ${slides.length} slides · ${(html.length / 1024).toFixed(0)} KB`);
