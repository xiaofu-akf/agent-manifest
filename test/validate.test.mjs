import test from "node:test";
import assert from "node:assert/strict";
import { errorsFor } from "../bin/validate.mjs";

test("accepts a minimal agent manifest", () => {
  const manifest = { apiVersion: "openconductor.dev/v1alpha1", kind: "Agent", metadata: { id: "planner", name: "Planner" }, spec: { objective: "Create a bounded execution plan for a user request.", skills: { allow: ["notes.create"] }, handoff: { accepts: ["brief"], produces: ["plan"] }, evaluation: { cases: ["basic"] } } };
  assert.deepEqual(errorsFor(manifest), []);
});
test("rejects a template with unrecognized redistribution mode", () => {
  const manifest = { apiVersion: "openconductor.dev/v1alpha1", kind: "Template", metadata: { id: "demo", name: "Demo" }, spec: { category: "slides", tags: ["demo"], provenance: { sourceUrl: "https://example.com", sourceCommit: "1234567", licenseSpdx: "MIT", licenseEvidenceUrl: "https://example.com/license", redistributionMode: "everything-goes", assetAuditStatus: "passed", reviewedAt: "2026-08-20" } } };
  assert.match(errorsFor(manifest).join("\n"), /redistributionMode/);
});
