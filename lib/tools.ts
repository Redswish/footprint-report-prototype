import { tool } from "ai"
import { z } from "zod"
import { SKILL_NAMES, readSkillBody, readSkillFile } from "./skills"
import {
  askSliderInputSchema,
  askSliderOutputSchema,
  askTilesInputSchema,
  askTilesOutputSchema,
  showMythCardInputSchema,
  showReportInputSchema,
} from "./report-types"

export const tools = {
  loadSkill: tool({
    description:
      "Load the full instructions for one of the available skills. Call this before acting on a topic that skill owns — the short description alone isn't enough to act on.",
    inputSchema: z.object({
      name: z.enum(SKILL_NAMES),
    }),
    execute: async ({ name }) => readSkillBody(name),
  }),

  readSkillFile: tool({
    description:
      "Read a reference file bundled with a skill, e.g. footprint-report's references/factors.md.",
    inputSchema: z.object({
      skill: z.enum(SKILL_NAMES),
      path: z
        .string()
        .describe('Path relative to the skill\'s own directory, e.g. "references/factors.md"'),
    }),
    execute: async ({ skill, path }) => readSkillFile(skill, path),
  }),

  askSlider: tool({
    description:
      "Ask the user to pick a number on a range with a slider widget. Pauses until the user answers.",
    inputSchema: askSliderInputSchema,
    outputSchema: askSliderOutputSchema,
  }),

  askTiles: tool({
    description:
      "Ask the user to pick from a small set of options as selectable tiles. Pauses until the user answers.",
    inputSchema: askTilesInputSchema,
    outputSchema: askTilesOutputSchema,
  }),

  showReport: tool({
    description:
      "Render the footprint report as a persistent on-screen artifact. Call once there is enough to estimate.",
    inputSchema: showReportInputSchema,
    execute: async (input) => input,
  }),

  showMythCard: tool({
    description:
      "Render a short inline card answering whether a specific habit actually matters.",
    inputSchema: showMythCardInputSchema,
    execute: async (input) => input,
  }),
}
