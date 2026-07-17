#!/usr/bin/env bash
# curate-from-harness.sh — enche o engine (skills/) a partir do harness vivo,
# resolvendo symlinks e barrando qualquer vazamento de "alma" (dados pessoais,
# infra, credenciais). Idempotente: nunca sobrescreve uma skill que ja existe
# no engine sem que a versao nova seja comprovadamente limpa.
#
# Uso:  bin/curate-from-harness.sh            # aplica a curadoria
#       DRY=1 bin/curate-from-harness.sh      # so mostra o que faria
#
# Fonte das skills: ~/.claude/skills/<nome> (symlinks p/ o reports-hub).
# A lista curada de "produto" mora em bin/curated-skills.txt (uma por linha).

set -euo pipefail
ENGINE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SRC_ROOT="$HOME/.claude/skills"
LIST="$ENGINE_DIR/bin/curated-skills.txt"
DRY="${DRY:-0}"

# Padrao de VAZAMENTO: se qualquer arquivo da skill bater nisso, a skill NAO entra.
LEAK='(/Users/juan|2\.25\.132\.214|195\.200\.2\.16|sk-ant-|sk-or-v1|AIza[0-9A-Za-z_-]{20}|[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}|5541[0-9]{7}|/opt/steve|/var/www|/etc/steve|/var/lib/steve|CLAUDE_CODE_OAUTH|OPENROUTER_API_KEY)'

is_clean() { ! grep -rIlE "$LEAK" "$1" >/dev/null 2>&1; }

[ -f "$LIST" ] || { echo "lista nao encontrada: $LIST"; exit 1; }

added=0; updated=0; skipped=""; missing=""
while IFS= read -r s; do
  s="$(echo "$s" | tr -d '[:space:]')"
  [ -z "$s" ] && continue
  case "$s" in \#*) continue;; esac

  real="$(readlink -f "$SRC_ROOT/$s" 2>/dev/null || true)"
  if [ -z "$real" ] || [ ! -d "$real" ]; then missing="$missing $s"; continue; fi

  stg="$(mktemp -d)"
  cp -RL "$real"/. "$stg"/ 2>/dev/null || true
  rm -rf "$stg/.git" "$stg/node_modules" 2>/dev/null || true

  if is_clean "$stg"; then
    if [ -d "$ENGINE_DIR/skills/$s" ]; then
      # ja existe: so atualiza se a versao limpa for diferente
      if ! diff -rq "$ENGINE_DIR/skills/$s" "$stg" >/dev/null 2>&1; then
        [ "$DRY" = "1" ] || { cp -R "$stg"/. "$ENGINE_DIR/skills/$s"/; }
        updated=$((updated+1))
      fi
    else
      [ "$DRY" = "1" ] || cp -R "$stg" "$ENGINE_DIR/skills/$s"
      added=$((added+1)); echo "  + $s"
    fi
  else
    skipped="$skipped $s"
  fi
  rm -rf "$stg"
done < "$LIST"

echo ""
echo "adicionadas: $added | atualizadas: $updated"
[ -n "$skipped" ] && echo "PULADAS (alma detectada):$skipped"
[ -n "$missing" ] && echo "ausentes no harness:$missing"
echo "total no engine: $(find "$ENGINE_DIR/skills" -maxdepth 1 -mindepth 1 -type d | wc -l | tr -d ' ')"
