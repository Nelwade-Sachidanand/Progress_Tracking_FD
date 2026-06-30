import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import WeightageSummary from "../components/WeightageSummary";

describe("WeightageSummary", () => {
  const milestones = [
    {
      milestoneName: "Planning",
      weightage: 20,
    },
    {
      milestoneName: "Development",
      weightage: 30,
    },
    {
      milestoneName: "Testing",
      weightage: 50,
    },
  ];

  it("renders total weightage label", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(screen.getByText("Total Weightage")).toBeInTheDocument();
  });

  it("calculates total weightage correctly", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("handles empty milestone list", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={[]} />
        </tbody>
      </table>,
    );

    expect(screen.getByText("0%")).toBeInTheDocument();
  });

  it("handles undefined weightage", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[
              {
                milestoneName: "A",
              },
              {
                milestoneName: "B",
                weightage: 20,
              },
            ]}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("20%")).toBeInTheDocument();
  });

  it("handles null weightage", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[
              {
                weightage: null,
              },
              {
                weightage: 40,
              },
            ]}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("handles string weightage", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[
              {
                weightage: "10",
              },
              {
                weightage: "25",
              },
            ]}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("35%")).toBeInTheDocument();
  });

  it("handles decimal values", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary
            milestones={[
              {
                weightage: 25.5,
              },
              {
                weightage: 24.5,
              },
            ]}
          />
        </tbody>
      </table>,
    );

    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders table row", () => {
    const { container } = render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(container.querySelector("tr")).toBeInTheDocument();
  });

  it("renders three table cells", () => {
    const { container } = render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(container.querySelectorAll("td")).toHaveLength(3);
  });

  it("applies total text", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(screen.getByText("Total Weightage")).toHaveClass("font-bold");
  });

  it("applies blue color class", () => {
    render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(screen.getByText("100%")).toHaveClass("text-[#2563EB]");
  });

  it("matches snapshot", () => {
    const { container } = render(
      <table>
        <tbody>
          <WeightageSummary milestones={milestones} />
        </tbody>
      </table>,
    );

    expect(container).toMatchSnapshot();
  });
});
