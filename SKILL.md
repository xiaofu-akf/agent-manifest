---
name: openconductor-manifest-author
description: Create, review and evaluate structured Agent roles, skills, workflows and template records for OpenConductor-style multi-agent systems. Use when authoring a new agent persona, defining agent permissions and handoffs, creating a team workflow, or validating a catalog contribution.
---

# OpenConductor Manifest Author

Use this skill to turn a vague “make an agent for X” request into a bounded, testable catalog record. It complements the `openconductor` all-in-one Skill; it does not run models or execute tools.

## Author a record

1. Define one narrow role outcome. Reject “does everything” personas.
2. Specify accepted inputs and produced outputs in names that another role can consume.
3. Allow only concrete skills needed for that outcome. Use an empty list for analysis-only roles.
4. Add at least one observable evaluation case.
5. Check for overlap with existing roles. Merge duplicates or describe the distinct decision boundary.
6. Use `templates/agent-record.json`, then run `scripts/lint_records.py`.

## Required review questions

| Area | Question |
| --- | --- |
| Scope | Can a reviewer tell when this role is done? |
| Handoff | Does the output provide the exact artifact the next role needs? |
| Permission | Does the role have fewer skills than or equal to what it truly needs? |
| Model | Can any configured model perform the role, or does it need a documented capability? |
| Evaluation | Does a test case detect a bad or duplicate role, not just a fluent answer? |

## Workflow records

Build a workflow from named nodes and dependency edges. Keep the Lead responsible for routing, approval and final synthesis. A workflow must not create an unbounded loop, silently publish anything, or grant a role a skill it did not explicitly allow.

## Safety

Do not store tokens, private prompts, customer data or raw private model outputs in a catalog. A model’s role description cannot authorize network calls, browser actions, purchases, posts, uploads or code execution. Put such actions behind host-level approval.
