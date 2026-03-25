"""Licensing Compliance Agent — Validates rights across territories."""


def run(event: dict, context: dict) -> dict:
    titles_scanned = event.get("titles_scanned", 2847)
    territories = event.get("territories", 45)

    # Simulated compliance check
    violations = [
        {"title": "Ocean Blue", "territory": "FR", "issue": "License expired 2 days ago"},
        {"title": "Night Watch", "territory": "JP", "issue": "Window starts next week, already listed"},
    ]

    violation_summary = "; ".join(
        f"'{v['title']}' in {v['territory']}: {v['issue']}" for v in violations
    )

    return {
        "status": "complete",
        "output": (
            f"Scanned {titles_scanned} titles across {territories} territories. "
            f"{len(violations)} violations found: {violation_summary}. "
            f"Recommend immediate review by legal team."
        ),
        "next_action": "escalate_to_legal",
    }
