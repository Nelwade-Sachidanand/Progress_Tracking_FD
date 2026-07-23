import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import ProjectsPage from "../pages/ProjectsPage";

const toolbarProps = vi.fn();
const tableProps = vi.fn();

const mockProjects = [
  {
    id: "1",
    projectName: "Core Banking",
    bankName: "State Bank of India (SBI)",
    projectManager: "Sachin",
  },
  {
    id: "2",
    projectName: "Mobile Banking",
    bankName: "ICICI Bank",
    projectManager: "Rahul",
  },
];

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: vi.fn(),
}));

vi.mock("../../dashboard/utils/projectMetrics", () => ({
  getProjectMetrics: vi.fn((project) => ({
    status:
      project.projectName === "Core Banking"
        ? "Completed"
        : "On Track",
  })),
}));

vi.mock("../components/ProjectToolbar", () => ({
  default: (props) => {
    toolbarProps(props);

    return (
      <div data-testid="toolbar">
        Toolbar
      </div>
    );
  },
}));

vi.mock("../components/ProjectTable", () => ({
  default: (props) => {
    tableProps(props);

    return (
      <div data-testid="table">
        Table
      </div>
    );
  },
}));

import { useProjects } from "../../../context/ProjectContext";

describe("ProjectsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useProjects.mockReturnValue({
      loading: false,
      projects: mockProjects,
    });
  });

  it("renders toolbar", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByTestId("toolbar")
    ).toBeInTheDocument();
  });

  it("renders project table", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByTestId("table")
    ).toBeInTheDocument();
  });

  it("passes loading prop", () => {
    render(<ProjectsPage />);

    expect(tableProps).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
      })
    );
  });

  it("passes all projects initially", () => {
    render(<ProjectsPage />);

    expect(tableProps).toHaveBeenCalledWith(
      expect.objectContaining({
        projects: mockProjects,
      })
    );
  });

  it("passes banks to toolbar", () => {
    render(<ProjectsPage />);

    expect(toolbarProps).toHaveBeenCalledWith(
      expect.objectContaining({
        banks: [
          {
            label: "ICICI Bank",
            value: "ICICI Bank",
          },
          {
            label: "SBI",
            value: "State Bank of India (SBI)",
          },
        ],
      })
    );
  });

  it("passes search state", () => {
    render(<ProjectsPage />);

    expect(toolbarProps).toHaveBeenCalledWith(
      expect.objectContaining({
        search: "",
        selectedBank: "",
        selectedStatus: "",
      })
    );
  });

  it("passes setter functions", () => {
    render(<ProjectsPage />);

    expect(toolbarProps).toHaveBeenCalledWith(
      expect.objectContaining({
        setSearch: expect.any(Function),
        setSelectedBank: expect.any(Function),
        setSelectedStatus: expect.any(Function),
      })
    );
  });

  it("renders empty projects", () => {
    useProjects.mockReturnValue({
      loading: false,
      projects: [],
    });

    render(<ProjectsPage />);

    expect(tableProps).toHaveBeenCalledWith(
      expect.objectContaining({
        projects: [],
      })
    );
  });

  it("passes loading=true", () => {
    useProjects.mockReturnValue({
      loading: true,
      projects: [],
    });

    render(<ProjectsPage />);

    expect(tableProps).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: true,
      })
    );
  });

  it("creates sorted bank list", () => {
    render(<ProjectsPage />);

    const props = toolbarProps.mock.calls[0][0];

    expect(props.banks.length).toBe(2);
    expect(props.banks[0].label).toBe("ICICI Bank");
    expect(props.banks[1].label).toBe("SBI");
  });
});