# footprint-report-prototype

Prototype for a personal carbon footprint analyser, used for demo purposes at Hatch 2026.

A conversational carbon footprint calculator. The agent's entire behavior —
interview order, tone, report structure, refusals — comes from the `SKILL.md`
files in [`skills/`](skills/), following the agentskills.io Agent Skills
standard. The app itself is a thin host: it discovers skills, loads them (and
their reference files) as tools on request, and renders a few generative-UI
widgets (sliders, tiles, the report panel). Edit a skill or
`skills/footprint-report/references/factors.md` and the agent's behavior or
numbers change immediately — no code touched.

## Setup

```bash
pnpm install
cp .env.local.example .env.local   # then fill in ANTHROPIC_API_KEY
pnpm dev
```

## Structure

- `skills/` — `lifestyle-interview`, `footprint-report` (+ `references/factors.md`), `myth-check`.
- `lib/skills.ts` — scans and reads skill files at request time.
- `lib/tools.ts` — the tool set: `loadSkill`, `readSkillFile`, `askSlider`, `askTiles`, `showReport`, `showMythCard`.
- `lib/prompt.ts` — the thin orchestrator system prompt (routing mechanics only).
- `app/api/chat/route.ts` — the AI SDK route handler (Anthropic Claude).
- `components/chat/` — chat UI and widget renderers.
- `components/report/` — the persistent report panel.

No auth, no database — state lives in the browser tab for the session.
