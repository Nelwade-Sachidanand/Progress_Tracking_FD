import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeightageSummary from "../components/WeightageSummary";


describe("WeightageSummary", () => {
  it("renders total weightage label", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={[]} />
        </tbody>
      </table>
    );

    expect(
      screen.getByText("Total Weightage")
    ).toBeInTheDocument();
  });

  it("calculates total weightage correctly", () => {
    const milestones = [
      { weightage: 20 },
      { weightage: 30 },
      { weightage: 50 },
    ];

    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>
    );

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("handles string weightage values", () => {
    const milestones = [
      { weightage: "25" },
      { weightage: "35" },
      { weightage: "40" },
    ];

    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>
    );

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("treats missing weightage as zero", () => {
    const milestones = [
      { weightage: 20 },
      {},
      { weightage: null },
      { weightage: undefined },
    ];

    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>
    );

    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("renders 0% when milestones array is empty", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={[]} />
        </tbody>
      </table>
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("renders correct colspan", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[{ weightage: 10 }]}
          />
        </tbody>
      </table>
    );

    const cells = screen.getAllByRole("cell");

    expect(cells[2]).toHaveAttribute("colspan", "2");
  });

  it("renders inside a table row", () => {
    const { container } = render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[{ weightage: 10 }]}
          />
        </tbody>
      </table>
    );

    expect(container.querySelector("tr")).toBeInTheDocument();
  });

  it("renders decimal total weightage", () => {
    const milestones = [
      { weightage: 10.5 },
      { weightage: 20.5 },
    ];

    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>
    );

    expect(screen.getByText("31%")).toBeInTheDocument();
  });
});