import { describe, expect, it } from "vitest";

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

import AuthorizationSummaryCards from "../components/AuthorizationSummaryCards";

describe("AuthorizationSummaryCards", () => {
  const mockAuths = [
    {
      id: 1,
      status: "PENDING",
    },
    {
      id: 2,
      status: "PENDING",
    },
    {
      id: 3,
      status: "APPROVED",
    },
    {
      id: 4,
      status: "REJECTED",
    },
    {
      id: 5,
      status: "APPROVED",
    },
  ];

  it("renders all card titles", () => {
    render(<AuthorizationSummaryCards auths={mockAuths} />);

    expect(screen.getByText("Total Requests")).toBeInTheDocument();

    expect(screen.getByText("Pending")).toBeInTheDocument();

    expect(screen.getByText("Approved")).toBeInTheDocument();

    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("calculates total requests correctly", () => {
    render(<AuthorizationSummaryCards auths={mockAuths} />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("calculates pending requests correctly", () => {
    render(<AuthorizationSummaryCards auths={mockAuths} />);

    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("calculates approved requests correctly", () => {
    render(<AuthorizationSummaryCards auths={mockAuths} />);

    expect(screen.getAllByText("2").length).toBeGreaterThan(0);
  });

  it("calculates rejected requests correctly", () => {
    render(<AuthorizationSummaryCards auths={mockAuths} />);

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("renders zero values when auths is empty", () => {
    render(<AuthorizationSummaryCards auths={[]} />);

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("handles undefined auths", () => {
    render(<AuthorizationSummaryCards />);

    expect(screen.getByText("Total Requests")).toBeInTheDocument();

    expect(screen.getAllByText("0")).toHaveLength(4);
  });

  it("renders four cards", () => {
    const { container } = render(
      <AuthorizationSummaryCards auths={mockAuths} />,
    );

    const cards = container.querySelectorAll(".bg-white");

    expect(cards.length).toBe(4);
  });

  it("handles only pending requests", () => {
    render(
      <AuthorizationSummaryCards
        auths={[
          {
            status: "PENDING",
          },
        ]}
      />,
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();

    expect(screen.getAllByText("1").length).toBeGreaterThan(0);
  });

  it("handles only approved requests", () => {
    render(
      <AuthorizationSummaryCards
        auths={[
          {
            status: "APPROVED",
          },
        ]}
      />,
    );

    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("handles only rejected requests", () => {
    render(
      <AuthorizationSummaryCards
        auths={[
          {
            status: "REJECTED",
          },
        ]}
      />,
    );

    expect(screen.getByText("Rejected")).toBeInTheDocument();
  });

  it("ignores unknown status values", () => {
    render(
      <AuthorizationSummaryCards
        auths={[
          {
            status: "UNKNOWN",
          },
        ]}
      />,
    );

    expect(screen.getByText("Total Requests")).toBeInTheDocument();

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
  });
});
