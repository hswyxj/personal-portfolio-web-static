---
name: agent-customization
preamble-tier: 4
version: 1.0.0
description: |
  Guides the user and the agent through creating or refining Claude skill definitions
  in this repository. Extracts reusable workflows from conversation history, clarifies
  required outcomes, drafts the skill metadata and documentation, and saves the new
  `SKILL.md` file to the workspace.
allowed-tools:
  - Read
  - Write
  - Edit
  - AskUserQuestion
  - Bash
---

## Purpose

Use this skill when the user asks to create or update a Claude `SKILL.md` file. This
skill helps turn a multi-step workflow or repeated methodology from the conversation
into a reusable skill definition with clear metadata, workflow guidance, and example
prompts.

## When to use

- Creating a new skill file for the workspace
- Updating or refining an existing skill definition
- Extracting a step-by-step workflow from the conversation
- Clarifying ambiguous skill requirements before authoring

## Workflow

1. Read the user request and the surrounding conversation.
2. Identify the workflow, decision points, quality criteria, and completion checks.
3. If the workflow is unclear, ask the user one or two targeted clarification questions.
4. Draft the skill metadata, description, allowed tools, and usage guidance.
5. Save or update the `SKILL.md` file in `.claude/skills/<skill-name>/SKILL.md`.
6. Summarize the new skill and provide example prompts for the user.

## Quality checklist

- The skill has a clear, single-purpose description.
- The allowed tools list is minimal and appropriate.
- The workflow is explicit and actionable.
- The file is saved in `.claude/skills/<skill-name>/SKILL.md`.
- The summary includes how to invoke the skill and example prompts.

## Example prompts

- "Create a new skill for reviewing Next.js portfolio pages."
- "Draft a CLAUDE skill to guide admin dashboard implementation."
- "Help me author a SKILL.md for this repository's design review process."
