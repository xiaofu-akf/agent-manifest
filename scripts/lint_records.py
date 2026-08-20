"""Validate an Agent catalog record without executing any model or skill."""
from __future__ import annotations
import json
import sys
from pathlib import Path

REQUIRED = {"id", "category", "purpose", "allowed_skills", "accepts", "produces", "evaluation"}

def main() -> int:
    if len(sys.argv) != 2:
        print("Usage: lint_records.py <agent-record.json>")
        return 2
    try:
        record = json.loads(Path(sys.argv[1]).read_text())
    except (OSError, json.JSONDecodeError) as error:
        print(f"Cannot read record: {error}")
        return 1
    missing = REQUIRED - set(record)
    if missing or not record.get("evaluation") or not isinstance(record.get("allowed_skills"), list):
        print("Invalid record: " + (f"missing {', '.join(sorted(missing))}" if missing else "evaluation and allowed_skills are required"))
        return 1
    print(f"Valid Agent record: {record['id']}")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
