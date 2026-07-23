import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProjectStepper from "../components/ProjectStepper";
import { act, renderHook } from "@testing-library/react";

describe("ProjectStepper", () => {
  const mockSetCurrentStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all step names", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    expect(screen.getByText("Bank Details")).toBeInTheDocument();
    expect(screen.getByText("Management Details")).toBeInTheDocument();
    expect(screen.getByText("CBS & Business Details")).toBeInTheDocument();
    expect(screen.getByText("CBS Infrastructure")).toBeInTheDocument();
    expect(screen.getByText("Digital Channels")).toBeInTheDocument();
    expect(screen.getByText("Payment Systems")).toBeInTheDocument();
  });

  it("renders all step numbers", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(String(i))).toBeInTheDocument();
    }
  });

  it("calls setCurrentStep when first step is clicked", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /bank details/i })
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
  });

  it("calls setCurrentStep when middle step is clicked", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /cbs & business details/i,
      })
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentStep when last step is clicked", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /payment systems/i,
      })
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(5);
  });

  it("renders active step correctly", () => {
    render(
      <ProjectStepper
        currentStep={2}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    const activeButton = screen.getByRole("button", {
      name: /cbs & business details/i,
    });

    expect(activeButton).toHaveClass("bg-[#2563EB]");
  });

  it("renders completed steps", () => {
    render(
      <ProjectStepper
        currentStep={3}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    const completedButton = screen.getByRole("button", {
      name: /bank details/i,
    });

    expect(completedButton).toHaveClass("bg-blue-50");
  });

  it("renders future steps", () => {
    render(
      <ProjectStepper
        currentStep={2}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    const futureButton = screen.getByRole("button", {
      name: /payment systems/i,
    });

    expect(futureButton).toHaveClass("bg-white");
  });

  it("renders correctly on last step", () => {
    render(
      <ProjectStepper
        currentStep={5}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /payment systems/i,
      })
    ).toBeInTheDocument();
  });

  it("renders exactly six buttons", () => {
    render(
      <ProjectStepper
        currentStep={0}
        setCurrentStep={mockSetCurrentStep}
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(6);
  });
});