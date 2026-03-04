---
name: product-discovery-toolkit
description: Product discovery and planning workflows — personas, positioning, PRDs, roadmaps, user stories, journey maps, research synthesis, A/B tests. Use when creating personas, positioning statements, PRDs, roadmaps, user stories, journey maps, synthesizing research, or designing A/B tests.
---

# Product Discovery Toolkit

Eight product management workflows for discovery, planning, and experimentation. Each workflow uses shared context files (`personas.md`, `product.md`, `company.md`, `competitors.md`) for personalized outputs.

## Shared Context Conventions

Before any workflow, check for context files:
- **personas.md** — User/buyer personas, JTBD, pain points
- **product.md** — Roadmap, metrics, known issues
- **company.md** — Strategic priorities, OKRs
- **competitors.md** — Alternatives, win/loss themes

Tell the user what you found. Use context to personalize outputs; ask only what's missing.

---

## Workflow Routing

| User Intent | Workflow | Reference |
|-------------|----------|-----------|
| Persona, user persona, buyer persona | Persona Generator | [persona-generator.md](persona-generator.md) |
| Positioning, positioning statement, obviously awesome | Positioning Statement | [positioning-statement.md](positioning-statement.md) |
| PRD, product requirements, requirements document | PRD Generator | [prd-generator.md](prd-generator.md) |
| Roadmap, build roadmap, quarterly roadmap | Roadmap Builder | [roadmap-builder.md](roadmap-builder.md) |
| User story, acceptance criteria, story points | User Story Writer | [user-story-writer.md](user-story-writer.md) |
| Journey map, customer journey, experience map | Journey Map Creator | [journey-map-creator.md](journey-map-creator.md) |
| Synthesize research, research synthesis, combine interviews | Research Synthesis | [research-synthesis.md](research-synthesis.md) |
| A/B test, experiment, hypothesis testing | A/B Test Designer | [ab-test-designer.md](ab-test-designer.md) |

---

## Quick Reference by Workflow

### Persona Generator
Build behavioral personas with Pragmatic Institute use scenarios, JTBD, and buying process. **Input:** Research (interviews, surveys, analytics). **Output:** Persona profiles with use scenarios, goals, frustrations, anti-personas. See [persona-generator.md](persona-generator.md).

### Positioning Statement Generator
April Dunford's Obviously Awesome framework. **Input:** Product, personas, competitors. **Output:** Positioning statement, taglines, elevator pitch, competitive frame. See [positioning-statement.md](positioning-statement.md).

### PRD Generator
Structured PRDs with problem, evidence, success criteria, risks. **Input:** Problem description, evidence. **Output:** PRD with lagging/leading indicators, dependencies, V/U/F/V risk assessment. See [prd-generator.md](prd-generator.md).

### Roadmap Builder
Now/Next/Later roadmap linked to business objectives and product outcomes. **Input:** Planning horizon, initiatives, strategic context. **Output:** Roadmap with objective→outcome→initiative chain. See [roadmap-builder.md](roadmap-builder.md).

### User Story Writer
INVEST user stories with BDD acceptance criteria. **Input:** Feature description, persona. **Output:** Story + Given/When/Then AC + edge cases. See [user-story-writer.md](user-story-writer.md).

### Journey Map Creator
End-to-end experience maps with pain points and opportunities. **Input:** Persona, scenario, journey boundaries. **Output:** Stage-by-stage map with emotions, touchpoints, moments of truth. See [journey-map-creator.md](journey-map-creator.md).

### Research Synthesis Engine
Combine multiple research sources into themes and recommendations. **Input:** 3+ sources (interviews, surveys, support, etc.). **Output:** Theme analysis, convergence/contradictions, prioritized opportunities. See [research-synthesis.md](research-synthesis.md).

### A/B Test Designer
Statistically sound experiments with hypotheses and sample size. **Input:** Change, baseline metric, MDE. **Output:** Hypothesis, variants, sample size, decision framework, guardrails. See [ab-test-designer.md](ab-test-designer.md).

---

## Process (All Workflows)

1. **Check context** — Read personas.md, product.md, company.md, competitors.md
2. **Report findings** — "I found [X] in your files. I'll use this for [workflow]."
3. **Gather missing inputs** — Ask only what context doesn't provide
4. **Execute workflow** — Follow the reference file for that workflow
5. **Output** — Use the template from the reference file
6. **Flag assumptions** — Mark inferred items as ⚠️ Assumed

---

## Tips

- **Context files compound value** — The more you maintain personas.md, product.md, etc., the better outputs across all workflows
- **Don't invent metrics** — Use `[PLACEHOLDER — need baseline]` when baselines are unknown
- **Evidence over assumptions** — Label what's validated vs. assumed
- **Update context after workflows** — Synthesis should feed back into personas and product docs
