# Agent Manifest

> The portable contract for traceable multi-agent work.

`@openconductor/agent-manifest` defines small, versioned JSON documents for the four things an orchestrator needs to trust: **agents**, **skills**, **templates**, and **workflows**. It is deliberately independent from any model provider or agent framework.

## Why manifests

An agent prompt alone cannot state which skills it may call, what it accepts and produces, how it hands work off, or how to test it. A template folder alone cannot prove the source, pinned revision, redistribution rights, and asset audit status. These manifests make those requirements explicit and machine-checkable.

## Quick start

```bash
node ./bin/validate.mjs examples/slide-strategist.agent.json
node ./bin/validate.mjs examples/slides-select-template.skill.json
node ./bin/validate.mjs examples/venture-pitch.template.json
```

The validator has no runtime dependencies. It identifies the manifest by its `kind`, checks required fields and rejects unknown capability or template-audit values. It intentionally does not execute model prompts, scripts, or template code.

## Contract surface

| Kind | Purpose | Key safety field |
| --- | --- | --- |
| `Agent` | Declares identity, objective, permitted skill IDs, handoffs and evaluation cases. | `spec.skills.allow` |
| `Skill` | Declares a typed tool contract and risk level. | `spec.permissions` |
| `Template` | Records provenance, license evidence, pin and asset audit state. | `spec.provenance` |
| `Workflow` | Connects agents and explicitly declares dependency edges. | `spec.nodes` / `spec.edges` |

## Supported version

The first experimental API version is `openconductor.dev/v1alpha1`. This project uses semantic versioning; backward-incompatible changes will use a new API version or a major package release.

## Design limits

This repository specifies metadata and validation only. It does not store user API keys, invoke a model, run a skill, redistribute third-party templates, or infer a license from a repository name. Template entries must carry concrete provenance and evidence.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Run `npm test` and validate every changed example. Never add secrets or unverifiable third-party content.

## License

MIT. See [LICENSE](LICENSE).
