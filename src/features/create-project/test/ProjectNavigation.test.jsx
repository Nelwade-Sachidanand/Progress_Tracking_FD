import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProjectNavigation from "../components/ProjectNavigation";
import { toast } from "react-toastify";


const mockNavigate = vi.fn();
const mockSaveProject = vi.fn();
const mockUpdateProject = vi.fn();
const mockToastSuccess = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../hooks/useCreateProject", () => ({
  default: () => ({
    saveProject: mockSaveProject,
    updateProject: mockUpdateProject,
    loading: false,
  }),
}));

vi.mock("../utils/projectMapper", () => ({
  mapProjectPayload: vi.fn((data) => data),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("ProjectNavigation", () => {
  const defaultProps = {
    currentStep: 0,
    setCurrentStep: vi.fn(),
    formData: { projectName: "Test Project" },
    resetForm: vi.fn(),
    setSelectedProjectId: vi.fn(),
    setSelectedInfoId: vi.fn(),
    disabled: false,
    isView: false,
    isEdit: false,
    selectedInfoId: "123",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("renders buttons", () => {
    render(<ProjectNavigation {...defaultProps} />);

    expect(screen.getByRole("button", { name: /previous/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /save draft/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  });

  it("disables previous button on first step", () => {
    render(<ProjectNavigation {...defaultProps} />);

    expect(
      screen.getByRole("button", { name: /previous/i })
    ).toBeDisabled();
  });

  it("moves to previous step", () => {
    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={2}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /previous/i }));

    expect(defaultProps.setCurrentStep).toHaveBeenCalled();
  });

  it("moves to next step", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    expect(defaultProps.setCurrentStep).toHaveBeenCalled();
  });

  it("saves draft", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /save draft/i }));

    expect(
      JSON.parse(sessionStorage.getItem("projectDraft"))
    ).toEqual(defaultProps.formData);

    expect(toast.success).toHaveBeenCalledWith(
  "Draft Saved Successfully"
);
  });

  it("disables save draft when disabled prop is true", () => {
    render(
      <ProjectNavigation
        {...defaultProps}
        disabled
      />
    );

    expect(
      screen.getByRole("button", { name: /save draft/i })
    ).toBeDisabled();
  });

  it("creates project successfully", async () => {
    mockSaveProject.mockResolvedValue({
      statusType: "S",
    });

    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={5}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      })
    );

    await waitFor(() => {
      expect(mockSaveProject).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("/projects");
    });

    expect(defaultProps.resetForm).toHaveBeenCalled();
    expect(defaultProps.setSelectedProjectId).toHaveBeenCalledWith("");
    expect(defaultProps.setSelectedInfoId).toHaveBeenCalledWith("");
    expect(defaultProps.setCurrentStep).toHaveBeenCalledWith(0);
  });

  it("updates project successfully", async () => {
    mockUpdateProject.mockResolvedValue({
      statusType: "S",
    });

    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={5}
        isEdit
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /update project/i,
      })
    );

    await waitFor(() => {
      expect(mockUpdateProject).toHaveBeenCalledWith(
        "123",
        defaultProps.formData
      );
    });
  });

  it("shows view project button in view mode", () => {
    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={5}
        isView
      />
    );

    expect(
      screen.getByRole("button", {
        name: /view project/i,
      })
    ).toBeDisabled();
  });

  it("shows create project button on last step", () => {
    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={5}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /create project/i,
      })
    ).toBeInTheDocument();
  });

  it("shows update project button when editing", () => {
    render(
      <ProjectNavigation
        {...defaultProps}
        currentStep={5}
        isEdit
      />
    );

    expect(
      screen.getByRole("button", {
        name: /update project/i,
      })
    ).toBeInTheDocument();
  });
});