import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MilestoneManagement from "../pages/MilestoneManagement";

import { useProjects } from "../../../context/ProjectContext";
import { useMilestone } from "../hooks/useMilestone";

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

vi.mock("../components/BankSelector", () => ({
  default: ({ banks, selectedBank, setSelectedBank }) => (
    <div>
      <div>Bank Selector</div>

      <button onClick={() => setSelectedBank(banks[1] || "")}>
        Change Bank
      </button>

      <div>{selectedBank}</div>
    </div>
  ),
}));

vi.mock("../components/MilestoneTable", () => ({
  default: ({ milestones, loading, onUpdate, onWeightageChange }) => (
    <div>
      <div>Milestone Table</div>

      <div data-testid="loading">{loading ? "loading" : "idle"}</div>

      <div data-testid="count">{milestones.length}</div>

      {/* Simulate editing the weightage so total becomes 100 */}
      <button
        onClick={() => {
          onWeightageChange(0, 100);
        }}
      >
        Change Weightage
      </button>

      {/* Trigger update */}
      <button onClick={onUpdate}>Update</button>
    </div>
  ),
}));

describe("MilestoneManagement", () => {
  const mockUpdateWeightages = vi.fn();

  const projects = [
    {
      id: "P1",
      bankName: "HDFC",
      projectName: "Project A",
    },
    {
      id: "P2",
      bankName: "ICICI",
      projectName: "Project B",
    },
  ];

  const milestoneData = [
    {
      projectId: "P1",
      phaseName: "Phase 1",
      milestoneName: "Requirement",
      weightage: 100,
      progress: 20,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    useProjects.mockReturnValue({
      projects,
    });

    useMilestone.mockReturnValue({
      loading: false,
      updateWeightages: mockUpdateWeightages,
    });

    vi.spyOn(utils, "getBanks").mockReturnValue(["HDFC", "ICICI"]);

    vi.spyOn(utils, "getMilestoneManagementData").mockReturnValue(
      milestoneData,
    );
  });

  it("renders bank selector", () => {
    render(<MilestoneManagement />);

    expect(screen.getByText("Bank Selector")).toBeInTheDocument();
  });

  it("renders milestone table", () => {
    render(<MilestoneManagement />);

    expect(screen.getByText("Milestone Table")).toBeInTheDocument();
  });

  it("loads banks on mount", () => {
    render(<MilestoneManagement />);

    expect(utils.getBanks).toHaveBeenCalledWith(projects);
  });

  it("loads milestones on mount", async () => {
    render(<MilestoneManagement />);

    await waitFor(() => {
      expect(utils.getMilestoneManagementData).toHaveBeenCalled();
    });
  });

  it("passes loading state", () => {
    useMilestone.mockReturnValue({
      loading: true,
      updateWeightages: mockUpdateWeightages,
    });

    render(<MilestoneManagement />);

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
  });

  it("passes milestone count", () => {
    render(<MilestoneManagement />);

    expect(screen.getByTestId("count")).toHaveTextContent("1");
  });

  it("changes bank", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Bank"));

    await waitFor(() => {
      expect(utils.getMilestoneManagementData).toHaveBeenCalled();
    });
  });

  it("calls updateWeightages on successful update", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages).toHaveBeenCalledTimes(1);
    });

    expect(mockUpdateWeightages).toHaveBeenCalledWith({
      projectId: "P1",
      milestones: [
        {
          phaseName: "Phase 1",
          milestoneName: "Requirement",
          weightage: 100,
        },
      ],
    });
  });

  it("updates weightage locally", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages).toHaveBeenCalledWith({
        projectId: "P1",
        milestones: [
          {
            phaseName: "Phase 1",
            milestoneName: "Requirement",
            weightage: 100,
          },
        ],
      });
    });
  });

  it("does not call update when weightage is invalid", async () => {
    utils.getMilestoneManagementData.mockReturnValue([
      {
        projectId: "P1",
        phaseName: "Phase 1",
        milestoneName: "Requirement",
        weightage: 80,
      },
    ]);

    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages).not.toHaveBeenCalled();
    });
  });

  it("handles update api rejection", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    mockUpdateWeightages.mockRejectedValueOnce(new Error("API Error"));

    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(spy).toHaveBeenCalled();
    });

    spy.mockRestore();
  });

  it("does nothing when no bank is selected", () => {
    utils.getBanks.mockReturnValue([]);

    render(<MilestoneManagement />);

    expect(utils.getMilestoneManagementData).not.toHaveBeenCalled();
  });

  it("renders with empty milestones", () => {
    utils.getMilestoneManagementData.mockReturnValue([]);

    render(<MilestoneManagement />);

    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("calls getMilestoneManagementData after bank change", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Bank"));

    await waitFor(() => {
      expect(utils.getMilestoneManagementData).toHaveBeenCalledTimes(2);
    });
  });

  it("calls updateWeightages only once", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages).toHaveBeenCalledTimes(1);
    });
  });

  it("passes correct projectId in payload", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages.mock.calls[0][0].projectId).toBe("P1");
    });
  });

  it("passes milestone array in payload", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(mockUpdateWeightages.mock.calls[0][0].milestones).toHaveLength(1);
    });
  });

  it("passes numeric weightage", async () => {
    render(<MilestoneManagement />);

    fireEvent.click(screen.getByText("Change Weightage"));
    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(
        mockUpdateWeightages.mock.calls[0][0].milestones[0].weightage,
      ).toBe(100);

      expect(
        typeof mockUpdateWeightages.mock.calls[0][0].milestones[0].weightage,
      ).toBe("number");
    });
  });

  it("re-renders when projects change", () => {
    const { rerender } = render(<MilestoneManagement />);

    useProjects.mockReturnValue({
      projects: [
        ...projects,
        {
          id: "P3",
          bankName: "SBI",
          projectName: "Project C",
        },
      ],
    });

    rerender(<MilestoneManagement />);

    expect(utils.getBanks).toHaveBeenCalled();
  });

  it("renders successfully with single project", () => {
    useProjects.mockReturnValue({
      projects: [projects[0]],
    });

    render(<MilestoneManagement />);

    expect(screen.getByText("Bank Selector")).toBeInTheDocument();
  });

  it("renders successfully with no projects", () => {
    useProjects.mockReturnValue({
      projects: [],
    });

    utils.getBanks.mockReturnValue([]);

    render(<MilestoneManagement />);

    expect(screen.getByText("Milestone Table")).toBeInTheDocument();
  });

  it("matches loading state from hook", () => {
    useMilestone.mockReturnValue({
      loading: true,
      updateWeightages: mockUpdateWeightages,
    });

    render(<MilestoneManagement />);

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
  });

  it("renders without crashing", () => {
    expect(() => render(<MilestoneManagement />)).not.toThrow();
  });
});
