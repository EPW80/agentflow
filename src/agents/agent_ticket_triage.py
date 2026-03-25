"""Ticket Triage Agent — Classifies and routes support tickets."""


def run(event: dict, context: dict) -> dict:
    ticket = event.get("ticket", {})
    subject = ticket.get("subject", "Unknown issue")
    body = ticket.get("body", "")

    # Simulated classification logic
    priority = "P1" if any(
        kw in body.lower() for kw in ["revenue", "outage", "down", "critical"]
    ) else "P2"

    category = "Distribution" if "distribution" in body.lower() else "General Support"

    return {
        "status": "complete",
        "output": (
            f"Classification: {priority} — {category}. "
            f"Subject: '{subject}'. "
            f"Recommended routing: {'Distribution Ops' if priority == 'P1' else 'Support Tier 2'}. "
            f"Confidence: 91%"
        ),
        "next_action": "route_to_team",
    }
