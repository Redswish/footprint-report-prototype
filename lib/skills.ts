import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const SKILLS_ROOT = path.join(process.cwd(), "skills")

export const SKILL_NAMES = ["lifestyle-interview", "footprint-report", "myth-check"] as const
export type SkillName = (typeof SKILL_NAMES)[number]

export interface SkillSummary {
  name: string
  description: string
}

function skillDir(name: SkillName): string {
  return path.join(SKILLS_ROOT, name)
}

/** Scans each skill's SKILL.md for its frontmatter. Re-read on every call on
 * purpose — these are a handful of small files, and re-reading is what keeps
 * "edit a SKILL.md, no restart needed" true. */
export function listSkills(): SkillSummary[] {
  return SKILL_NAMES.map((name) => {
    const raw = fs.readFileSync(path.join(skillDir(name), "SKILL.md"), "utf8")
    const { data } = matter(raw)
    return {
      name: typeof data.name === "string" ? data.name : name,
      description: typeof data.description === "string" ? data.description : "",
    }
  })
}

export function readSkillBody(name: SkillName): string {
  const raw = fs.readFileSync(path.join(skillDir(name), "SKILL.md"), "utf8")
  const { content } = matter(raw)
  return content.trim()
}

/** Reads a file inside a skill's directory (e.g. references/factors.md).
 * Sandboxed against path traversal even though `name` is already enum-constrained
 * upstream by the tool schema — the `relativePath` itself is a free string from
 * the model, so it gets resolved and checked against the skill's own directory. */
export function readSkillFile(name: SkillName, relativePath: string): string {
  const base = skillDir(name)
  const resolved = path.resolve(base, relativePath)
  if (resolved !== base && !resolved.startsWith(base + path.sep)) {
    throw new Error(`Refusing to read outside skill directory: ${relativePath}`)
  }
  return fs.readFileSync(resolved, "utf8")
}
