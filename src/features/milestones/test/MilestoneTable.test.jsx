import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MilestoneTable from "../components/MilestoneTable";

describe("MilestoneTable", () => {
  const onWeightageChange = vi.fn();
  const onUpdate = vi.fn();

  const milestones = [
    {
      id: "1",
      projectId: "P1",
      milestoneName: "Requirement Gathering",
      weightage: 40,
      progress: 0,
    },
    {
      id: "2",
      projectId: "P1",
      milestoneName: "Development",
      weightage: 30,
      progress: 50,
    },
    {
      id: "3",
      projectId: "P1",
      milestoneName: "Testing",
      weightage: 30,
      progress: 100,
    },
  ];

  const invalidMilestones = [
    {
      id: "1",
      projectId: "P1",
      milestoneName: "Requirement Gathering",
      weightage: 40,
      progress: 0,
    },
    {
      id: "2",
      projectId: "P1",
      milestoneName: "Development",
      weightage: 30,
      progress: 50,
    },
    {
      id: "3",
      projectId: "P1",
      milestoneName: "Testing",
      weightage: 20,
      progress: 100,
    },
  ];

  const defaultProps = {
    milestones,
    loading: false,
    onWeightageChange,
    onUpdate,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.clear();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );
  });

  it("renders heading", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.getByText("Milestone Weightage Management"),
    ).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.getByText("Update milestone weightages for the selected bank"),
    ).toBeInTheDocument();
  });

  it("renders milestone names", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Requirement Gathering")).toBeInTheDocument();

    expect(screen.getByText("Development")).toBeInTheDocument();

    expect(screen.getByText("Testing")).toBeInTheDocument();
  });

  it("renders total weightage", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders update button", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /update weightage/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders three inputs", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getAllByRole("spinbutton")).toHaveLength(3);
  });

  it("renders table headers", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Milestone Name")).toBeInTheDocument();

    expect(screen.getByText("Weightage (%)")).toBeInTheDocument();

    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("shows not started status", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("shows in progress status", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("In Progress")).toBeInTheDocument();
  });

  it("shows completed status", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("calls onWeightageChange", () => {
    render(<MilestoneTable {...defaultProps} />);

    fireEvent.change(screen.getAllByRole("spinbutton")[0], {
      target: {
        value: "50",
      },
    });

    expect(onWeightageChange).toHaveBeenCalledTimes(1);

    expect(onWeightageChange).toHaveBeenCalledWith(0, "50");
  });

  it("calls update handler", () => {
    render(<MilestoneTable {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /update weightage/i,
      }),
    );

    expect(onUpdate).toHaveBeenCalledTimes(1);
  });

  it("shows loading text", () => {
    render(<MilestoneTable {...defaultProps} loading={true} />);

    expect(
      screen.getByRole("button", {
        name: /updating/i,
      }),
    ).toBeInTheDocument();
  });

  it("disables update button while loading", () => {
    render(<MilestoneTable {...defaultProps} loading={true} />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("disables update button when total weightage is not 100", () => {
    render(
      <MilestoneTable
        milestones={invalidMilestones}
        onWeightageChange={vi.fn()}
        onUpdate={vi.fn()}
        loading={false}
      />,
    );

    const updateButton = screen.getByRole("button", {
      name: /update weightage/i,
    });

    expect(updateButton).toBeDisabled();
  });

  it("button enabled when total weightage is exactly 100", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("renders weightage values", () => {
    render(<MilestoneTable {...defaultProps} />);

    const inputs = screen.getAllByRole("spinbutton");

    expect(inputs[0]).toHaveValue(40);
    expect(inputs[1]).toHaveValue(30);
    expect(inputs[2]).toHaveValue(30);
  });

  it("renders milestone title attribute", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByTitle("Requirement Gathering")).toBeInTheDocument();
  });

  it("renders footer note", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.getByText("* Total weightage must equal 100%"),
    ).toBeInTheDocument();
  });

  it("renders three status badges", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Completed")).toBeInTheDocument();

    expect(screen.getByText("In Progress")).toBeInTheDocument();

    expect(screen.getByText("Not Started")).toBeInTheDocument();
  });

  it("renders table rows", () => {
    const { container } = render(<MilestoneTable {...defaultProps} />);

    expect(container.querySelectorAll("tbody tr")).toHaveLength(3);
  });

  it("renders one update button", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("renders correct total when weightages change", () => {
    render(
      <MilestoneTable
        {...defaultProps}
        milestones={[
          {
            ...milestones[0],
            weightage: 50,
          },
          {
            ...milestones[1],
            weightage: 25,
          },
          {
            ...milestones[2],
            weightage: 25,
          },
        ]}
      />,
    );

    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("accepts empty input value", () => {
    render(<MilestoneTable {...defaultProps} />);

    fireEvent.change(screen.getAllByRole("spinbutton")[0], {
      target: {
        value: "",
      },
    });

    expect(onWeightageChange).toHaveBeenCalledWith(0, "");
  });

  it("accepts zero value", () => {
    render(<MilestoneTable {...defaultProps} />);

    fireEvent.change(screen.getAllByRole("spinbutton")[1], {
      target: {
        value: "0",
      },
    });

    expect(onWeightageChange).toHaveBeenCalledWith(1, "0");
  });

  it("does not render update button for MANAGEMENT USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "MANAGEMENT USER",
      }),
    );

    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.queryByRole("button", {
        name: /update weightage/i,
      }),
    ).not.toBeInTheDocument();
  });

  it("renders update button for ADMIN", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      }),
    );

    render(<MilestoneTable {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /update weightage/i,
      }),
    ).toBeInTheDocument();
  });

  it("handles empty milestones", () => {
    render(<MilestoneTable {...defaultProps} milestones={[]} />);

    expect(screen.getByText("0%")).toBeInTheDocument();

    expect(screen.queryAllByRole("spinbutton")).toHaveLength(0);
  });

  it("renders milestone names with title attribute", () => {
    render(<MilestoneTable {...defaultProps} />);

    milestones.forEach((item) => {
      expect(screen.getByTitle(item.milestoneName)).toBeInTheDocument();
    });
  });

  it("input has min and max values", () => {
    render(<MilestoneTable {...defaultProps} />);

    const input = screen.getAllByRole("spinbutton")[0];

    expect(input).toHaveAttribute("min", "0");

    expect(input).toHaveAttribute("max", "100");
  });

  it("renders exactly one table", () => {
    const { container } = render(<MilestoneTable {...defaultProps} />);

    expect(container.querySelectorAll("table")).toHaveLength(1);
  });

  it("renders correct number of rows", () => {
    const { container } = render(<MilestoneTable {...defaultProps} />);

    expect(container.querySelectorAll("tbody tr")).toHaveLength(
      milestones.length,
    );
  });

  it("completed badge has green class", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Completed")).toHaveClass("bg-green-100");
  });

  it("in progress badge has blue class", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("In Progress")).toHaveClass("bg-blue-100");
  });

  it("not started badge has slate class", () => {
    render(<MilestoneTable {...defaultProps} />);

    expect(screen.getByText("Not Started")).toHaveClass("bg-slate-100");
  });

  it("matches snapshot", () => {
    const { container } = render(<MilestoneTable {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });
});
