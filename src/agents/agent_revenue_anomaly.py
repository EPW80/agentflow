"""Revenue Anomaly Detection Agent — Identifies revenue outliers."""


def run(event: dict, context: dict) -> dict:
    region = event.get("region", "APAC")
    actual = event.get("actual_revenue", 847000)
    forecast = event.get("forecast_revenue", 1283000)

    drop_pct = round((1 - actual / forecast) * 100) if forecast > 0 else 0

    return {
        "status": "complete",
        "output": (
            f"Anomaly detected in {region}: Revenue ${actual:,.0f} vs forecast ${forecast:,.0f} "
            f"(down {drop_pct}%). "
            f"Root cause: Missing avails data from 3 partners. "
            f"Pattern: Data ingestion failure (not market decline). Confidence: 87%"
        ),
        "next_action": "alert_finance",
    }
