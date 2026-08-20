#!/usr/bin/env node
import { readFileSync } from "node:fs";
import { basename } from "node:path";

const required = {
  Agent: ["metadata.id", "metadata.name", "spec.objective", "spec.skills.allow", "spec.handoff.accepts", "spec.handoff.produces", "spec.evaluation.cases"],
  Skill: ["metadata.id", "metadata.name", "spec.description", "spec.input", "spec.output", "spec.permissions.risk", "spec.permissions.externalNetwork", "spec.permissions.filesystem"],
  Template: ["metadata.id", "metadata.name", "spec.category", "spec.tags", "spec.provenance.sourceUrl", "spec.provenance.sourceCommit", "spec.provenance.licenseSpdx", "spec.provenance.licenseEvidenceUrl", "spec.provenance.redistributionMode", "spec.provenance.assetAuditStatus", "spec.provenance.reviewedAt"],
  Workflow: ["metadata.id", "metadata.name", "spec.nodes", "spec.edges"],
};
function get(object, dottedPath) { return dottedPath.split(".").reduce((value, key) => value?.[key], object); }
function errorsFor(manifest) {
  const errors = [];
  if (manifest?.apiVersion !== "openconductor.dev/v1alpha1") errors.push("apiVersion must be openconductor.dev/v1alpha1");
  if (!required[manifest?.kind]) errors.push("kind must be Agent, Skill, Template, or Workflow");
  for (const path of required[manifest?.kind] ?? []) { const value = get(manifest, path); if (value === undefined || value === null || value === "" || (Array.isArray(value) && value.length === 0)) errors.push(`missing ${path}`); }
  const provenance = manifest?.spec?.provenance;
  if (provenance && !["reference-only", "user-fetch", "redistributable"].includes(provenance.redistributionMode)) errors.push("invalid provenance.redistributionMode");
  if (provenance && !["pending", "passed", "blocked"].includes(provenance.assetAuditStatus)) errors.push("invalid provenance.assetAuditStatus");
  const permissions = manifest?.spec?.permissions;
  if (permissions && !["none", "low", "moderate", "high"].includes(permissions.risk)) errors.push("invalid permissions.risk");
  return errors;
}
export { errorsFor };
if (process.argv[1] === new URL(import.meta.url).pathname) {
  const files = process.argv.slice(2); if (!files.length) { console.error("Usage: oc-manifest <manifest.json> [...]"); process.exit(2); }
  let failed = false;
  for (const file of files) { try { const errors = errorsFor(JSON.parse(readFileSync(file, "utf8"))); if (errors.length) { failed = true; console.error(`✗ ${basename(file)}\n  ${errors.join("\n  ")}`); } else console.log(`✓ ${basename(file)}`); } catch (error) { failed = true; console.error(`✗ ${basename(file)}\n  ${error.message}`); } }
  process.exit(failed ? 1 : 0);
}
