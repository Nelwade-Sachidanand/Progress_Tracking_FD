import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";

const mockSaveProject = vi.fn();

vi.mock("../hooks/useCreateProject", () => ({
  default: () => ({
    saveProject: mockSaveProject,
    loading: false,
  }),
}));

vi.mock("../utils/projectMapper", () => ({
  mapProjectPayload: vi.fn(),
}));

import ProjectNavigation from "../components/ProjectNavigation";
import { mapProjectPayload } from "../utils/projectMapper";

describe("ProjectNavigation", () => {
  const mockSetCurrentStep = vi.fn();
  const mockResetForm = vi.fn();

  const defaultProps = {
    currentStep: 1,
    setCurrentStep: mockSetCurrentStep,
    formData: {
      projectName: "Test Project",
    },
    resetForm: mockResetForm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders navigation buttons", () => {
    render(<ProjectNavigation {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /previous/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /save draft/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /next/i,
      }),
    ).toBeInTheDocument();
  });

  test("previous button disabled on first step", () => {
    render(<ProjectNavigation {...defaultProps} currentStep={0} />);

    expect(
      screen.getByRole("button", {
        name: /previous/i,
      }),
    ).toBeDisabled();
  });

  test("calls setCurrentStep when previous clicked", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /previous/i,
      }),
    );

    expect(mockSetCurrentStep).toHaveBeenCalledTimes(1);
  });

  test("previous callback prevents negative value", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /previous/i,
      }),
    );

    const callback = mockSetCurrentStep.mock.calls[0][0];

    expect(callback(0)).toBe(0);
    expect(callback(3)).toBe(2);
  });

  test("calls setCurrentStep when next clicked", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /next/i,
      }),
    );

    expect(mockSetCurrentStep).toHaveBeenCalledTimes(1);
  });

  test("next callback prevents exceeding max step", () => {
    render(<ProjectNavigation {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /next/i,
      }),
    );

    const callback = mockSetCurrentStep.mock.calls[0][0];

    expect(callback(5)).toBe(5);
    expect(callback(2)).toBe(3);
  });

  test("shows create project button on last step", () => {
    render(<ProjectNavigation {...defaultProps} currentStep={5} />);

    expect(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    ).toBeInTheDocument();
  });

  test("calls mapProjectPayload before save", async () => {
    mapProjectPayload.mockReturnValue({
      mapped: true,
    });

    mockSaveProject.mockResolvedValue({
      statusType: "S",
    });

    render(<ProjectNavigation {...defaultProps} currentStep={5} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    );

    await waitFor(() => {
      expect(mapProjectPayload).toHaveBeenCalledWith(defaultProps.formData);
    });
  });

  test("calls saveProject with mapped payload", async () => {
    mapProjectPayload.mockReturnValue({
      mapped: true,
    });

    mockSaveProject.mockResolvedValue({
      statusType: "S",
    });

    render(<ProjectNavigation {...defaultProps} currentStep={5} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    );

    await waitFor(() => {
      expect(mockSaveProject).toHaveBeenCalledWith({
        mapped: true,
      });
    });
  });

  test("calls resetForm on successful project creation", async () => {
    mapProjectPayload.mockReturnValue({
      mapped: true,
    });

    mockSaveProject.mockResolvedValue({
      statusType: "S",
    });

    render(<ProjectNavigation {...defaultProps} currentStep={5} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    );

    await waitFor(() => {
      expect(mockResetForm).toHaveBeenCalledTimes(1);
    });
  });

  test("does not resetForm on failed project creation", async () => {
    mapProjectPayload.mockReturnValue({
      mapped: true,
    });

    mockSaveProject.mockResolvedValue({
      statusType: "E",
    });

    render(<ProjectNavigation {...defaultProps} currentStep={5} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /create project/i,
      }),
    );

    await waitFor(() => {
      expect(mockResetForm).not.toHaveBeenCalled();
    });
  });

  test("save draft button renders", () => {
    render(<ProjectNavigation {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /save draft/i,
      }),
    ).toBeInTheDocument();
  });
});
