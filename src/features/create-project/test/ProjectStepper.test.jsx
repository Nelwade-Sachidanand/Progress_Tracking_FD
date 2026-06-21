import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProjectStepper from "../components/ProjectStepper";

describe("ProjectStepper", () => {
  const mockSetCurrentStep = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders all steps", () => {
    render(
      <ProjectStepper currentStep={0} setCurrentStep={mockSetCurrentStep} />,
    );

    expect(screen.getByText("Bank Details")).toBeInTheDocument();

    expect(screen.getByText("Management Details")).toBeInTheDocument();

    expect(screen.getByText("CBS & Business Details")).toBeInTheDocument();

    expect(screen.getByText("CBS Infrastructure")).toBeInTheDocument();

    expect(screen.getByText("Digital Channels")).toBeInTheDocument();

    expect(screen.getByText("Payment Systems")).toBeInTheDocument();
  });

  test("renders step numbers", () => {
    render(
      <ProjectStepper currentStep={0} setCurrentStep={mockSetCurrentStep} />,
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });

  test("clicking first step calls setCurrentStep", () => {
    render(
      <ProjectStepper currentStep={0} setCurrentStep={mockSetCurrentStep} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /bank details/i,
      }),
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(0);
  });

  test("clicking middle step calls setCurrentStep", () => {
    render(
      <ProjectStepper currentStep={0} setCurrentStep={mockSetCurrentStep} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /cbs & business details/i,
      }),
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(2);
  });

  test("clicking last step calls setCurrentStep", () => {
    render(
      <ProjectStepper currentStep={0} setCurrentStep={mockSetCurrentStep} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /payment systems/i,
      }),
    );

    expect(mockSetCurrentStep).toHaveBeenCalledWith(5);
  });

  test("renders active step", () => {
    render(
      <ProjectStepper currentStep={2} setCurrentStep={mockSetCurrentStep} />,
    );

    expect(
      screen.getByRole("button", {
        name: /cbs & business details/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders completed and future steps", () => {
    render(
      <ProjectStepper currentStep={3} setCurrentStep={mockSetCurrentStep} />,
    );

    expect(
      screen.getByRole("button", {
        name: /bank details/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /payment systems/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders without crashing on last step", () => {
    render(
      <ProjectStepper currentStep={5} setCurrentStep={mockSetCurrentStep} />,
    );

    expect(screen.getByText("Payment Systems")).toBeInTheDocument();
  });
});
