# hive-os · design (2026-06-09)

## What it is
Open-source, distributable agent OS for Claude Code. Clone, run `hive init`, inherit a top-tier
harness: curated skills + specialized subagents + a fan-out orchestration layer + a ship/verify
loop + the working discipline (the "method"). Not a dotfiles dump, the method embodied as runnable
structure.

## Multi-tenant model (the product shape)
```
hive-os = the engine/template (this repo, open source)
   ├─ instance (you)        → hive init, your CLAUDE.md + private brain/ME.md
   ├─ instance (teammate)   → hive onboard <name>, fresh copy
   └─ instance (client)     → N instances, 1 engine
```

## Confirmed decisions
1. **Secret strip is mandatory.** Public repo = zero `.env`, zero client data, zero IPs/tokens.
   Built clean from scratch, not copied from a private `~/.claude`. Personal identity lives in
   `brain/ME.md` (gitignored).
2. **New clean repo** at `~/code/hive/hive-os`, not a publish of any private config.
3. **Generic brand.** `{{NAME}}` / `{{BRAND}}` placeholders, filled on init. Not hardcoded to one person.

## Research verdict (SOTA 2026, fed into the harness docs)
- **Fan out to read/verify, single-thread to write.** Reconciles Cognition "Don't Build Multi-Agents"
  (parallel writers = merge hell) with Anthropic "Multi-Agent Research System" (parallel readers = force
  multiplier). The one rule the whole orchestration layer applies.
- Subagents: own context, one level deep, Markdown+YAML frontmatter, worktree isolation only for parallel edits.
- Patterns: pipeline-by-default, adversarial verify (majority-refute kills), judge panel (blind reviewers ->
  debate -> adjudicate, ~150k-350k tokens/run), loop-until-dry, completeness critic.
- Heavy SDLC (BMAD-METHOD / AIOX lineage) = optional plug-in, not the default backbone.
- Anchor repos cited in the docs: wan-huiyan/agent-review-panel, garrytan/gstack, vercel-labs/agent-browser,
  nazt/destructive_command_guard, anthropic/multi-agent-research-system, bmad-code-org/BMAD-METHOD.

## v0 scope (this commit)
- `CLAUDE.base.md` (the method, de-personalized) · `bin/hive` CLI (init/status/doctor/onboard/sync/skills/wrapup)
- `harness/` orchestration · subagents (+3 shippable templates) · verify · sdlc
- `skills/MANIFEST.md` (curated set) · `brain/TEMPLATE.md` · `whiteboard.md` · `AGENTS.md`
- `docs/ARCHITECTURE.md` · MIT LICENSE · `.gitignore` (secrets never)

## Next phases
- **P1:** populate `skills/` with the actual shippable skill folders (currently manifest-only).
- **P2:** `install.sh` (clone -> symlink skills into ~/.claude -> init), GitHub repo, public README polish.
- **P3:** wire AIOX as the optional SDLC plug-in module under `harness/sdlc/`.
- **P4:** the two flavors: `hive-os` (this) + a personal instance as patient zero. Dogfood it, then onboard the first external user.
```
```
