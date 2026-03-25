"""Content Distribution Agent — Plans distribution for new titles."""


def run(event: dict, context: dict) -> dict:
    title = event.get("title", "Unknown Title")
    genre = event.get("genre", "Drama")
    origin = event.get("origin", "US")

    # Simulated market analysis
    territories = ["UK", "DE", "JP", "FR", "AU"]
    windows = {t: f"Day+{i * 7}" for i, t in enumerate(territories)}

    return {
        "status": "complete",
        "output": (
            f"Distribution plan for '{title}' ({genre}, {origin}): "
            f"{len(territories)} territories identified. "
            f"Windows: {', '.join(f'{t} ({w})' for t, w in windows.items())}. "
            f"Estimated revenue: $1.8M"
        ),
        "next_action": "notify_partners",
    }
