import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuthorizationSummaryCards from "../components/AuthorizationSummaryCards";

describe("AuthorizationSummaryCards", () => {
  const auths = [
    { status: "PENDING" },
    { status: "PENDING" },
    { status: "APPROVED" },
    { status: "APPROVED" },
    { status: "APPROVED" },
    { status: "REJECTED" },
    { status: "ROLLED_BACK" },
  ];

  it("renders all summary card titles", () => {
    render(<AuthorizationSummaryCards auths={auths} />);

    expect(screen.getByText("Total Requests")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.getByText("Rolled Back")).toBeInTheDocument();
  });

 it("renders correct counts", () => {
  render(<AuthorizationSummaryCards auths={auths} />);

  expect(screen.getByText("7")).toBeInTheDocument();
  expect(screen.getByText("2")).toBeInTheDocument();
  expect(screen.getByText("3")).toBeInTheDocument();

  // Rejected + Rolled Back
  expect(screen.getAllByText("1")).toHaveLength(2);
});

it("counts only matching statuses", () => {
  const data = [
    { status: "PENDING" },
    { status: "UNKNOWN" },
    { status: "FAILED" },
    { status: "APPROVED" },
  ];

  render(<AuthorizationSummaryCards auths={data} />);

  expect(screen.getByText("4")).toBeInTheDocument();

  // Pending + Approved
  expect(screen.getAllByText("1")).toHaveLength(2);

  expect(screen.getAllByText("0")).toHaveLength(2);
});

it("renders without crashing for large data", () => {
  const data = Array.from({ length: 100 }, () => ({
    status: "PENDING",
  }));

  render(<AuthorizationSummaryCards auths={data} />);

  // Total + Pending
  expect(screen.getAllByText("100")).toHaveLength(2);
});

  it("renders rolled back count", () => {
    render(<AuthorizationSummaryCards auths={auths} />);

    const ones = screen.getAllByText("1");
    expect(ones.length).toBeGreaterThanOrEqual(2); // Rejected & Rolled Back
  });

  it("renders zero counts when auths is empty", () => {
    render(<AuthorizationSummaryCards auths={[]} />);

    expect(screen.getAllByText("0")).toHaveLength(5);

    expect(screen.getByText("Total Requests")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
    expect(screen.getByText("Rejected")).toBeInTheDocument();
    expect(screen.getByText("Rolled Back")).toBeInTheDocument();
  });

  it("renders correctly when auths prop is omitted", () => {
    render(<AuthorizationSummaryCards />);

    expect(screen.getAllByText("0")).toHaveLength(5);
  });

  it("renders exactly five cards", () => {
    const { container } = render(
      <AuthorizationSummaryCards auths={auths} />
    );

    const cards = container.querySelectorAll(
      ".bg-white.rounded-2xl"
    );

    expect(cards).toHaveLength(5);
  });

  it("counts only matching statuses", () => {
    const data = [
      { status: "PENDING" },
      { status: "UNKNOWN" },
      { status: "FAILED" },
      { status: "APPROVED" },
    ];

    render(<AuthorizationSummaryCards auths={data} />);

    expect(screen.getByText("4")).toBeInTheDocument(); // Total
    expect(screen.getAllByText("1")).toHaveLength(2);
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders without crashing for large data", () => {
    const data = Array.from({ length: 100 }, () => ({
      status: "PENDING",
    }));

    render(<AuthorizationSummaryCards auths={data} />);
expect(screen.getAllByText("100")).toHaveLength(2);
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });
});