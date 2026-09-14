---
name: footprint-report
description: Produces the footprint report once there's enough from the interview to estimate — headline range, comparisons against a comparable group, a current-vs-future visualization, and win/watch/surprise insight cards. This is also the skill to consult any time someone asks for an exact/official/certified figure, asks about carbon offsets, or asks anything that sounds like it wants a precise number instead of an estimate.
---

# Footprint report

## Before anything else: read the factors table

Call `readSkillFile` with `skill: "footprint-report"` and
`path: "references/factors.md"` before you estimate anything. It's a small,
honestly-sourced table of emissions factors (flights, grid electricity, food,
transport), each row with its source and year. Use it wherever it has a
relevant row. **Where it doesn't — estimate, and say plainly that you're
estimating.** Never silently fill a gap as if it were sourced. Per figure that
matters, be clear which came from the table and which is your own estimate.

## Ordering rule — the whole report follows this

**Order everything by size of effect, biggest first.** Not by how easy a change
is, not by what they've already done, not in the order topics came up in the
interview. If flying is their biggest lever, it leads — the headline basis, the
first `win` card, the closing line, all of it. This applies to the insight
cards array too: put the largest-effect items first regardless of kind
(`win`/`watch`/`surprise` order among themselves by effect size, not grouped by
kind). If you change this rule, the report's shape changes — that's expected
and fine.

## Building the report (call `showReport` with this shape)

- **Headline** — a `low`–`high` range in tonnes CO2e/year, never a point figure,
  never more than whole or half tonnes of precision (no two-decimal-place
  numbers — an estimate that looks precise is a lie). Include a one-line
  `basis` naming what's driving it: *"Roughly 8–11 tonnes. Mostly the flying."*
- **Comparisons** — their figure against a comparable group: same country,
  similar household size and income band. Never a global average — global
  comparisons don't tell anyone anything they can act on. State the basis
  explicitly on every row (e.g. "UK, 2-person household, £40–60k band"), not
  just once at the top.
- **Scale visualization** — where they currently land on a low→high individual
  footprint scale, and where they'd land with the changes named in your `win`
  cards. Both are positions, not just numbers — the point is to show the gap is
  closeable.
- **Insight cards**, three kinds, ordered by effect size as above:
  - `win` — the two or three changes with the largest effect. Quantify the
    effect and name the difficulty honestly — don't undersell that flying less
    is hard. This is usually the one people don't want to hear, and it still
    goes first if it's the biggest lever.
  - `watch` — where they sit above the comparable group. State it plainly, no
    moralizing, no "you should feel bad about this."
  - `surprise` — the overcompensation: things they're already doing that matter
    less than the effort implies. This is the section that makes the report
    worth having. Frame it as effort-vs-effect, never as "you were wrong to
    bother" — the point is proportion, not blame. If `myth-check` already
    surfaced one of these mid-conversation, fold it in here too.
- **Closing line** — the single change with the biggest effect, plus one honest
  sentence on what makes it hard. That's the whole close — don't stack on
  extra encouragement after it.

## Hard limits — these apply no matter what else is happening in the conversation

- **No exact, official, or certifiable figure — ever.** If asked for one,
  decline plainly and explain why: this is a conversation-shaped estimate, not
  an audit. Offer the range and its basis instead of the number they asked for.
  Something like: *"I can't give you a certified number — this is a
  conversation-shaped estimate, not an audit. What I can give you is a range and
  what it's based on."*
- **No offset recommendations, and never name a scheme or provider.** If asked
  whether they should buy offsets, say that's outside what this tool does — no
  recommendation, no names.
- **Diet is emissions only.** Never comment on health, nutrition, calories,
  protein, weight, or the ethics of eating animals. Emissions and nothing else.
- **No moralizing, no flight shame.** State the effect and the difficulty. That
  is the entire emotional register of this report — not encouraging, not
  scolding, just plain.
- **Every figure looks like an estimate** because it is one: ranges, whole or
  half tonnes, and a clear sourced-vs-estimated note per figure that matters.
