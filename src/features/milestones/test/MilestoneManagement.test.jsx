import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MilestoneManagement from "../pages/MilestoneManagement";

import { useProjects } from "../../../context/ProjectContext";
import { useMilestone } from "../hooks/useMilestone";
import { toast } from "react-toastify";
import * as utils from "../utils/milestoneManagementUtils";

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: vi.fn(),
}));

vi.mock("../hooks/useMilestone", () => ({
  useMilestone: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("../components/MilestoneTable", () => ({
  default: ({ milestones, loading, onUpdate, onWeightageChange }) => (
    <>
      <div>Milestone Table</div>

      <div data-testid="loading">
        {loading ? "loading" : "idle"}
      </div>

      <div data-testid="count">{milestones.length}</div>

      <button onClick={() => onWeightageChange(0, 100)}>
        Change Weightage
      </button>

      <button onClick={onUpdate}>
        Update
      </button>
    </>
  ),
}));

describe("MilestoneManagement", () => {
  const mockUpdateWeightages = vi.fn();

  const projects = [
    {
      id: "P1",
      projectName: "Project 1",
    },
  ];

  const milestones = [
    {
      phaseId: "PH1",
      milestoneId: "M1",
      weightage: 100,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem("selectedProjectId", "P1");

    useProjects.mockReturnValue({
      projects,
    });

    useMilestone.mockReturnValue({
      loading: false,
      updateWeightages: mockUpdateWeightages,
    });

    vi.spyOn(utils, "getMilestoneManagementData").mockReturnValue(
      milestones
    );
  });

  it("renders milestone table", () => {
    render(<MilestoneManagement />);

    expect(screen.getByText("Milestone Table")).toBeInTheDocument();
  });

  it("loads milestones on mount", () => {
    render(<MilestoneManagement />);

    expect(utils.getMilestoneManagementData).toHaveBeenCalledWith(
      "P1",
      projects
    );
  });

  it("shows loading state", () => {
    useMilestone.mockReturnValue({
      loading: true,
      updateWeightages: mockUpdateWeightages,
    });

    render(<MilestoneManagement />);

    expect(screen.getByTestId("loading")).toHaveTextContent(
      "loading"
    );
  });

  it("renders milestone count", () => {
    render(<MilestoneManagement />);

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("updates weightage", () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("calls updateWeightages", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages).toHaveBeenCalledTimes(1);
    });

    expect(mockUpdateWeightages).toHaveBeenCalledWith({
      projectId: "P1",
      milestones: [
        {
          phaseId: "PH1",
          milestoneId: "M1",
          weightage: 100,
        },
      ],
    });
  });

  it("shows error when total weightage is not 100", async () => {
    utils.getMilestoneManagementData.mockReturnValue([
      {
        phaseId: "PH1",
        milestoneId: "M1",
        weightage: 80,
      },
    ]);

    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Total weightage must equal 100%"
      );
    });

    expect(mockUpdateWeightages).not.toHaveBeenCalled();
  });

  it("handles update api failure", async () => {
    mockUpdateWeightages.mockRejectedValueOnce(
      new Error("API Error")
    );

    const spy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Failed to update milestone weightages."
    );

    spy.mockRestore();
  });

  it("renders empty milestones when no selected project", () => {
    sessionStorage.removeItem("selectedProjectId");

    render(<MilestoneManagement />);

    expect(utils.getMilestoneManagementData).not.toHaveBeenCalled();

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("renders empty milestone list", () => {
    utils.getMilestoneManagementData.mockReturnValue([]);

    render(<MilestoneManagement />);

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("passes numeric weightage", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(
        mockUpdateWeightages.mock.calls[0][0].milestones[0]
          .weightage
      ).toBe(100);
    });
  });

  it("renders without crashing", () => {
    expect(() =>
      render(<MilestoneManagement />)
    ).not.toThrow();
  });
  });


