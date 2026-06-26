import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuditSummaryCards from "../components/AuditSummaryCards";

describe("AuditSummaryCards", () => {
  const today = new Date().toISOString();

  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const mockLogs = [
    {
      entityType: "USER",
      modifiedDate: today,
    },
    {
      entityType: "USER",
      modifiedDate: today,
    },
    {
      entityType: "PROJECT",
      modifiedDate: yesterday,
    },
    {
      entityType: "TASK",
      modifiedDate: today,
    },
  ];

  it("renders all card titles", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getByText("Total Logs")).toBeInTheDocument();

    expect(screen.getByText("User Logs")).toBeInTheDocument();

    expect(screen.getByText("Project Logs")).toBeInTheDocument();

    expect(screen.getByText("Today Logs")).toBeInTheDocument();
  });

  it("calculates total logs correctly", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("calculates user logs correctly", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("calculates project logs correctly", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("calculates today logs correctly", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getAllByText("3").length).toBeGreaterThan(0);
  });

  it("renders zero values when logs are empty", () => {
    render(<AuditSummaryCards auditLogs={[]} />);

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("renders four summary cards", () => {
    const { container } = render(<AuditSummaryCards auditLogs={mockLogs} />);

    const cards = container.querySelectorAll(".bg-white");

    expect(cards.length).toBe(4);
  });

  it("handles undefined auditLogs", () => {
    render(<AuditSummaryCards />);

    expect(screen.getByText("Total Logs")).toBeInTheDocument();

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("handles only user logs", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "USER",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getAllByText("1")).toHaveLength(3);

    expect(screen.getByText("User Logs")).toBeInTheDocument();
  });

  it("handles only project logs", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "PROJECT",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);

    expect(screen.getByText("Project Logs")).toBeInTheDocument();
  });
  it("handles TASK logs only", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "TASK",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getByText("Total Logs")).toBeInTheDocument();
    expect(screen.getByText("Today Logs")).toBeInTheDocument();

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("handles ACTIVITY logs only", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "ACTIVITY",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getByText("Total Logs")).toBeInTheDocument();

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("does not count yesterday logs as today logs", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "USER",
            modifiedDate: yesterday,
          },
        ]}
      />,
    );

    expect(screen.getByText("Today Logs")).toBeInTheDocument();

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });

  it("counts multiple project logs", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "PROJECT",
            modifiedDate: today,
          },
          {
            entityType: "PROJECT",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("renders exactly four card titles", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(4);
  });

  it("renders four numeric values", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    const headings = screen.getAllByRole("heading");

    expect(headings.length).toBeGreaterThanOrEqual(4);
  });

  it("renders icons for every card", () => {
    const { container } = render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(container.querySelectorAll("svg")).toHaveLength(4);
  });

  it("handles invalid modifiedDate gracefully", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "USER",
            modifiedDate: "invalid-date",
          },
        ]}
      />,
    );

    expect(screen.getByText("Today Logs")).toBeInTheDocument();

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });

  it("handles null modifiedDate", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "USER",
            modifiedDate: null,
          },
        ]}
      />,
    );

    expect(screen.getByText("Today Logs")).toBeInTheDocument();
  });

  it("handles unknown entity type", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "UNKNOWN",
            modifiedDate: today,
          },
        ]}
      />,
    );

    expect(screen.getByText("Total Logs")).toBeInTheDocument();

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("renders card container", () => {
    const { container } = render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders all cards even with no logs", () => {
    render(<AuditSummaryCards auditLogs={[]} />);

    expect(screen.getByText("Total Logs")).toBeInTheDocument();
    expect(screen.getByText("User Logs")).toBeInTheDocument();
    expect(screen.getByText("Project Logs")).toBeInTheDocument();
    expect(screen.getByText("Today Logs")).toBeInTheDocument();
  });
});
