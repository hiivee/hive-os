# hive-os

> A distributable agent OS for Claude Code. Clone it, run `hive init`, and you inherit a top-tier harness: curated skills, specialized subagents, a fan-out orchestration layer, a ship/verify loop, and the working discipline that ties it together. All version-controlled. All yours.

This is not a dotfiles dump. It is the **method**, embodied as runnable structure. You get a harness that **multiplies** (one agent becomes 200 scouts when the task earns it) and a **ship discipline** that does not break in production. The agent fans out to read and verify; it stays single-threaded to write. The loop never declares "done" without proof.

---

## Multi-tenant model: one engine, N instances

`hive-os` is the engine and the template. Each person spins their own instance from it. The engine is shared and version-controlled; the instances are private and disposable.

```
                        hive-os  (engine · template · the method)
                            │
          ┌─────────────────┼─────────────────┐
          ▼                 ▼                 ▼
     instance: ana     instance: leo     instance: sam      ...  (N)
     ─────────────     ─────────────     ─────────────
     CLAUDE.md         CLAUDE.md         CLAUDE.md          ← inherits CLAUDE.base.md
     skills/           skills/           skills/            ← curated, extendable
     harness/          harness/          harness/           ← orchestration + verify
     brain/  (private) brain/  (private) brain/  (private)  ← gitignored, per-person

     engine 1, instances N. Pull engine updates, keep your brain private.
```

Scaffold a fresh instance:

```bash
./bin/hive onboard ana
# creates the instance, links the engine, seeds an empty private brain/
```

Engine improves -> every instance pulls the upgrade. Your `brain/` never leaves your machine.

---

## Quick start

```bash
git clone https://github.com/hiivee/hive-os.git
cd hive-os
./bin/hive init      # scans your environment, wires skills + subagents, writes config
./bin/hive status    # engine vs instance vs remote: the "nothing is lost" guardian
```

That is the whole bootstrap. `init` is idempotent, run it again any time the engine changes.

---

## The Spine: the always-on loop

Every non-trivial task runs the same five-beat loop. Skills fire on **trigger**, never all-at-once. The Spine is what keeps the agent from flailing.

```
  brainstorm  ──>  build  ──>  gate  ──>  verify  ──>  wrapup
  ──────────       ─────       ────       ──────       ──────
  intent +         single-     review     E2E proof    learn,
  options          threaded    panel +    on the LIVE  persist,
  before any       writer,     adversarial app: curl   commit,
  code             one diff    verify     200, click,  push,
                   at a time              screenshot   handoff
```

| Beat | What fires | Rule |
|---|---|---|
| **brainstorm** | `brainstorming` skill, intent + requirements + options | No code before the design is stated. |
| **build** | one writer, surgical diff | Single-threaded. Parallel writers = merge hell. |
| **gate** | judge panel + adversarial verify | Dimension-based reviewers (SQL, Auth, Infra, API, Cost), not role tags. |
| **verify** | headless browser dogfooding | curl 200 (not 307/302), click each link, screenshot the LIVE url. |
| **wrapup** | `wrapup` skill | Untested-assumptions list must be 0 before "done". |

Skills are loaded by description match, so the kit can hold hundreds without flooding context. The agent pulls the three it needs for the task, not all of them.

---

## Orchestration: fan out to read, stay single to write

The whole orchestration layer reconciles two truths that look opposed (Cognition's "Don't Build Multi-Agents" vs Anthropic's "Multi-Agent Research System") and they are not:

- **Fan out to READ and VERIFY.** Search, review, research, audit. These are independent and read-heavy, and their conclusions merge cleanly. One coordinator, many scouts.
- **Stay SINGLE-THREADED to WRITE code.** Parallel writers fragment context, make conflicting decisions, and produce merge hell. One writer, period.

Subagents are the primitive. Each runs in its **own fresh context window** with a custom system prompt, an isolated tool allowlist, and independent permissions. A subagent sees none of the parent's history, only a delegation summary, so fan-out never floods the main context. Topology is **one level deep**: a coordinator plus workers, subagents do not spawn subagents.

Subagents ship as **Markdown + YAML frontmatter**, so they are version-controlled and portable:

```yaml
---
name: infra-reviewer
description: Audits infra and deploy changes for blast radius and safety.
model: opus
tools: [Read, Grep, Bash]
permission-mode: read-only
isolation: worktree     # only for parallel FILE EDITS that would conflict
maxTurns: 12
---
You review infra changes. For each finding, try to REFUTE it first...
```

Only `name` and `description` are required. `isolation: worktree` hands the agent its own git worktree branched from the default branch, auto-cleaned if untouched. Use it **only** for parallel file edits that would collide. It is expensive otherwise.

### Patterns that produce better output (not just burn tokens)

| Pattern | When |
|---|---|
| **pipeline** (no barrier, item-level streaming) | The default. Each item flows stage to stage. |
| **parallel** (barrier) | Only when a stage needs ALL prior results: dedup, early-exit, cross-comparison. |
| **adversarial verify** | N independent skeptics per finding, each prompted to refute. Majority refutes -> kill the finding. |
| **judge panel** | 4-6 blind reviewers, distinct lenses, blind during parallel phase, then 1-3 debate rounds, then a "Supreme Judge" adjudicates. Pattern proven by `wan-huiyan/agent-review-panel`. |
| **loop-until-dry** | Keep spawning finders until K consecutive rounds find nothing new. Beats a fixed top-N. |
| **completeness critic** | No silent caps. Log what you dropped. |

The judge panel forces `model: opus` and kills cross-run variance. It is not free: a real run is **~150k to 350k tokens, $3 to $20, 6 to 15 minutes**. Use it on decisions that matter, not on every diff.

For massive swarms (JS workflow scripts that pipeline `agent()` calls up to ~1000 lifetime, ~16 concurrent, in the lineage of `marc0.dev`'s dynamic-workflow / ultracode work), the orchestration layer lives in `harness/orchestration/`. It is opt-in.

---

## Verify and ship loop

The ship discipline is lean and tactical, in the lineage of `garrytan/gstack` and `vercel-labs/agent-browser`:

- **headless-browser dogfooding** (`harness/verify/browse`): navigate, click, screenshot, diff before/after, ~100ms per command. Verify the real running app, not just the tests.
- **auto-review pipeline** (`autoplan`): run CEO / design / eng / DX review skills in sequence, surface every taste decision at **one** approval gate.
- **canary**: post-deploy monitoring.
- **destructive-command guard** (in the spirit of `nazt/destructive_command_guard`): block `rm -rf`, force push, `DROP TABLE` without explicit confirmation.
- **E2E proof-before-done**: never declare "live" or "done" without curl 200 (not 307/302), clicking each internal link, and a screenshot of the LIVE url. The untested-assumptions list must be 0.

---

## What is inside

```
hive-os/
├── CLAUDE.base.md        the method: the loop, the rules, the discipline (inherited)
├── bin/hive              CLI: init · status · onboard · sync
├── harness/
│   ├── orchestration/    fan-out workflow scripts (pipeline · parallel · agent())
│   ├── subagents/        Markdown + frontmatter, dimension-based reviewers
│   ├── verify/           browse · autoplan · canary · destructive-command guard
│   └── sdlc/             OPTIONAL heavy module (PRD -> epics -> stories -> gates)
├── skills/               curated skill kit, loaded on trigger (never all-at-once)
└── brain/                private, gitignored, per-instance (your context, your data)
```

`CLAUDE.base.md` carries the method. Your instance's `CLAUDE.md` extends it; you never fork the base, you inherit and override.

### Optional: heavy SDLC module

`harness/sdlc/` ships a formal PRD -> sharded epics -> stories -> role-squad pipeline (`@dev @qa @architect @pm @po @sm`) with gates and a constitution, in the BMAD-METHOD / AIOX lineage.

- **Use it** for formal greenfield work: a real PRD, multiple stakeholders, a long-lived product, auditable gates.
- **Skip it** for solo tactical work, exploration, quick fixes, flow-state building. Heavy ceremony kills momentum.

It is a plug-in, not the backbone. The default backbone stays lean.

---

## Philosophy

**Fan out to read and verify. Stay single-threaded to write code.**

One writer, many scouts. Skills on trigger, not all-at-once. Proof before "done". That is the whole method, and it is the part that does not break in production.
