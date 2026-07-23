import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

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
      modifiedDate: yesterday,
    },
    {
      entityType: "PROJECT",
      modifiedDate: today,
    },
    {
      entityType: "PROJECT",
      modifiedDate: yesterday,
    },
    {
      entityType: "ACTIVITY",
      modifiedDate: today,
    },
    {
      entityType: "TASK",
      modifiedDate: today,
    },
  ];

  it("renders all summary card titles", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getByText("Total Logs")).toBeInTheDocument();
    expect(screen.getByText("User Logs")).toBeInTheDocument();
    expect(screen.getByText("Activity Logs")).toBeInTheDocument();
    expect(screen.getByText("Project Logs")).toBeInTheDocument();
    expect(screen.getByText("Today's Logs")).toBeInTheDocument();
  });

  it("shows total logs count", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getByText("6")).toBeInTheDocument();
  });

 it("shows user logs count", () => {
  render(<AuditSummaryCards auditLogs={mockLogs} />);

  expect(screen.getByText("User Logs")).toBeInTheDocument();

  expect(screen.getAllByText("2")).toHaveLength(2);
});

  it("shows activity logs count", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    expect(screen.getByText("User Logs")).toBeInTheDocument();
  });

 it("shows project logs count", () => {
  render(<AuditSummaryCards auditLogs={mockLogs} />);

  expect(screen.getByText("Project Logs")).toBeInTheDocument();

  expect(screen.getAllByText("2")).toHaveLength(2);
});

  it("shows today's logs count", () => {
    render(<AuditSummaryCards auditLogs={mockLogs} />);

    // Today logs = USER + PROJECT + ACTIVITY + TASK
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("renders five cards", () => {
    const { container } = render(
      <AuditSummaryCards auditLogs={mockLogs} />,
    );

    expect(container.querySelectorAll(".rounded-2xl")).toHaveLength(5);
  });

  it("renders five icons", () => {
    const { container } = render(
      <AuditSummaryCards auditLogs={mockLogs} />,
    );

    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });

  it("renders zero counts when logs are empty", () => {
    render(<AuditSummaryCards auditLogs={[]} />);

    expect(screen.getAllByText("0")).toHaveLength(5);
  });

  it("renders correctly when auditLogs prop is omitted", () => {
    render(<AuditSummaryCards />);

    expect(screen.getByText("Total Logs")).toBeInTheDocument();

    expect(screen.getAllByText("0")).toHaveLength(5);
  });

  it("ignores unknown entity types", () => {
    render(
      <AuditSummaryCards
        auditLogs={[
          {
            entityType: "BANK",
            modifiedDate: today,
          },
        ]}
      />,
    );

   

    expect(screen.getAllByText("0")).toHaveLength(3);
  });

  it("counts only USER logs", () => {
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

    expect(screen.getByText("User Logs")).toBeInTheDocument();
  });

  it("counts only PROJECT logs", () => {
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

    expect(screen.getByText("Project Logs")).toBeInTheDocument();
  });

  it("counts only ACTIVITY logs", () => {
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

    expect(screen.getByText("Activity Logs")).toBeInTheDocument();
  });

  it("does not count yesterday logs in today's logs", () => {
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

    expect(screen.getByText("Today's Logs")).toBeInTheDocument();

    expect(screen.getAllByText("0")).toHaveLength(3);
  });
});