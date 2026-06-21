import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import useProjectForm from "../hooks/useProjectForm";
import CreateProjectPage from "../pages/CreateProjectPage";

vi.mock("../hooks/useProjectForm");

vi.mock("../components/ProjectStepper", () => ({
  default: (props) => (
    <div data-testid="project-stepper">Stepper-{props.currentStep}</div>
  ),
}));

vi.mock("../components/ProjectNavigation", () => ({
  default: (props) => (
    <div data-testid="project-navigation">Navigation-{props.currentStep}</div>
  ),
}));

vi.mock("../components/tabs/BankDetailsTab", () => ({
  default: () => <div>BankDetailsTab</div>,
}));

vi.mock("../components/tabs/ManagementDetailsTab", () => ({
  default: () => <div>ManagementDetailsTab</div>,
}));

vi.mock("../components/tabs/CBSBusinessDetailsTab", () => ({
  default: () => <div>CBSBusinessDetailsTab</div>,
}));

vi.mock("../components/tabs/InfrastructureTab", () => ({
  default: () => <div>InfrastructureTab</div>,
}));

vi.mock("../components/tabs/DigitalChannelsTab", () => ({
  default: () => <div>DigitalChannelsTab</div>,
}));

vi.mock("../components/tabs/PaymentSystemsTab", () => ({
  default: () => <div>PaymentSystemsTab</div>,
}));

describe("CreateProjectPage", () => {
  const mockSetCurrentStep = vi.fn();
  const mockSetFormData = vi.fn();
  const mockUpdateSection = vi.fn();
  const mockUpdateRootFields = vi.fn();
  const mockUpdateArraySection = vi.fn();
  const mockResetForm = vi.fn();

  const baseHookData = {
    currentStep: 0,
    setCurrentStep: mockSetCurrentStep,
    formData: {
      contactDetails: {},
      cbsInformation: {},
      businessStatistics: {},
      infrastructure: {},
      hardwareDetails: [],
      digitalChannels: {},
      paymentSystems: {},
    },
    setFormData: mockSetFormData,
    updateSection: mockUpdateSection,
    updateRootFields: mockUpdateRootFields,
    updateArraySection: mockUpdateArraySection,
    resetForm: mockResetForm,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders ProjectStepper", () => {
    useProjectForm.mockReturnValue(baseHookData);

    render(<CreateProjectPage />);

    expect(screen.getByTestId("project-stepper")).toBeInTheDocument();
  });

  test("renders ProjectNavigation", () => {
    useProjectForm.mockReturnValue(baseHookData);

    render(<CreateProjectPage />);

    expect(screen.getByTestId("project-navigation")).toBeInTheDocument();
  });

  test("renders BankDetailsTab for step 0", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 0,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("BankDetailsTab")).toBeInTheDocument();
  });

  test("renders ManagementDetailsTab for step 1", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 1,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("ManagementDetailsTab")).toBeInTheDocument();
  });

  test("renders CBSBusinessDetailsTab for step 2", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 2,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("CBSBusinessDetailsTab")).toBeInTheDocument();
  });

  test("renders InfrastructureTab for step 3", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 3,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("InfrastructureTab")).toBeInTheDocument();
  });

  test("renders DigitalChannelsTab for step 4", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 4,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("DigitalChannelsTab")).toBeInTheDocument();
  });

  test("renders PaymentSystemsTab for step 5", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 5,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("PaymentSystemsTab")).toBeInTheDocument();
  });

  test("renders no tab for invalid step", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 99,
    });

    render(<CreateProjectPage />);

    expect(screen.queryByText("BankDetailsTab")).not.toBeInTheDocument();

    expect(screen.queryByText("PaymentSystemsTab")).not.toBeInTheDocument();
  });

  test("passes currentStep to ProjectStepper", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 3,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("Stepper-3")).toBeInTheDocument();
  });

  test("passes currentStep to ProjectNavigation", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 4,
    });

    render(<CreateProjectPage />);

    expect(screen.getByText("Navigation-4")).toBeInTheDocument();
  });
});
