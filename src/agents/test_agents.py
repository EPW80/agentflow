"""Tests for AgentFlow Python agents."""

import pytest
from agent_ticket_triage import run as triage_run
from agent_content_distribution import run as dist_run
from agent_licensing_check import run as license_run
from agent_revenue_anomaly import run as revenue_run


class TestTicketTriage:
    def test_returns_complete_status(self):
        result = triage_run({}, {})
        assert result["status"] == "complete"

    def test_classifies_critical_as_p1(self):
        result = triage_run({"ticket": {"subject": "Test", "body": "Revenue is down"}}, {})
        assert "P1" in result["output"]

    def test_classifies_normal_as_p2(self):
        result = triage_run({"ticket": {"subject": "Test", "body": "Minor UI issue"}}, {})
        assert "P2" in result["output"]

    def test_has_next_action(self):
        result = triage_run({}, {})
        assert result["next_action"] == "route_to_team"


class TestContentDistribution:
    def test_returns_complete_status(self):
        result = dist_run({}, {})
        assert result["status"] == "complete"

    def test_includes_territory_count(self):
        result = dist_run({"title": "Test Movie"}, {})
        assert "territories" in result["output"].lower()

    def test_has_next_action(self):
        result = dist_run({}, {})
        assert result["next_action"] == "notify_partners"


class TestLicensingCheck:
    def test_returns_complete_status(self):
        result = license_run({}, {})
        assert result["status"] == "complete"

    def test_detects_violations(self):
        result = license_run({}, {})
        assert "violations" in result["output"].lower()

    def test_has_next_action(self):
        result = license_run({}, {})
        assert result["next_action"] == "escalate_to_legal"


class TestRevenueAnomaly:
    def test_returns_complete_status(self):
        result = revenue_run({}, {})
        assert result["status"] == "complete"

    def test_calculates_drop_percentage(self):
        result = revenue_run({"actual_revenue": 500000, "forecast_revenue": 1000000}, {})
        assert "50%" in result["output"]

    def test_has_next_action(self):
        result = revenue_run({}, {})
        assert result["next_action"] == "alert_finance"
