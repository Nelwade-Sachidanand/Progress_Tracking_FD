import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import useProjectForm from "../hooks/useProjectForm";
import CreateProjectPage from "../pages/CreateProjectPage";
// import useProjectInformation from "../hooks/useProjectInformation";
// import { useParams, useLocation } from "react-router-dom";
import { getProjectInformation } from "../services/createProjectService";
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockSetFormData = vi.fn();
const mockSetCurrentStep = vi.fn();
const mockResetForm = vi.fn();
const mockLoadProjectInfoById = vi.fn();

vi.mock("../hooks/useProjectForm", () => ({
  default: () => ({
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
    updateSection: vi.fn(),
    updateRootFields: vi.fn(),
    updateArraySection: vi.fn(),
    resetForm: mockResetForm,
  }),
}));

vi.mock("../hooks/useProjectInformation", () => ({
  default: () => ({
    loadProjectInfoById: mockLoadProjectInfoById,
  }),
}));
const { mockUseParams, mockUseLocation } = vi.hoisted(() => ({
  mockUseParams: vi.fn(),
  mockUseLocation: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useParams: mockUseParams,
  useLocation: mockUseLocation,
}));

vi.mock("../components/tabs/BackButton", () => ({
  default: () => <button>Back</button>,
}));

vi.mock("../components/ProjectStepper", () => ({
  default: () => <div>Project Stepper</div>,
}));

vi.mock("../components/ProjectNavigation", () => ({
  default: () => <div>Project Navigation</div>,
}));

vi.mock("../components/tabs/BankDetailsTab", () => ({
  default: () => <div>Bank Details Tab</div>,
}));

vi.mock("../components/tabs/ManagementDetailsTab", () => ({
  default: () => <div>Management Details Tab</div>,
}));

vi.mock("../components/tabs/CBSBusinessDetailsTab", () => ({
  default: () => <div>CBS Business Details Tab</div>,
}));

vi.mock("../components/tabs/InfrastructureTab", () => ({
  default: () => <div>Infrastructure Tab</div>,
}));

vi.mock("../components/tabs/DigitalChannelsTab", () => ({
  default: () => <div>Digital Channels Tab</div>,
}));

vi.mock("../components/tabs/PaymentSystemsTab", () => ({
  default: () => <div>Payment Systems Tab</div>,
}));

vi.mock("../../../components/common/DraftModal", () => ({
  default: ({ open, onContinue, onDiscard }) =>
    open ? (
      <div>
        <p>Draft Modal</p>
        <button onClick={onContinue}>Continue</button>
        <button onClick={onDiscard}>Discard</button>
      </div>
    ) : null,
}));

describe("CreateProjectPage", () => {
 beforeEach(() => {
  vi.clearAllMocks();
  sessionStorage.clear();

  mockUseParams.mockReturnValue({
    id: "",
  });

  mockUseLocation.mockReturnValue({
    pathname: "/create",
  });
});

  it("renders page successfully", () => {
    render(<CreateProjectPage />);

    expect(screen.getByText("Back")).toBeInTheDocument();
    expect(screen.getByText("Project Stepper")).toBeInTheDocument();
    expect(screen.getByText("Bank Details Tab")).toBeInTheDocument();
    expect(screen.getByText("Project Navigation")).toBeInTheDocument();
  });

  it("renders BankDetailsTab on step 0", () => {
    render(<CreateProjectPage />);

    expect(screen.getByText("Bank Details Tab")).toBeInTheDocument();
  });

  it("does not show draft modal in create mode", () => {
    render(<CreateProjectPage />);

    expect(screen.queryByText("Draft Modal")).not.toBeInTheDocument();
  });

  it("loads project when id exists", async () => {
  mockUseParams.mockReturnValue({
    id: "1",
  });

  mockUseLocation.mockReturnValue({
    pathname: "/edit/1",
  });

  mockLoadProjectInfoById.mockResolvedValue({
    bankName: "SBI",
  });

  render(<CreateProjectPage />);

  await waitFor(() => {
    expect(mockLoadProjectInfoById).toHaveBeenCalledWith("1");
  });

  expect(mockSetFormData).toHaveBeenCalledWith({
    bankName: "SBI",
  });
});


it("continues draft", async () => {
  sessionStorage.setItem(
    "projectDraft",
    JSON.stringify({
      bankName: "SBI",
    })
  );

  mockUseLocation.mockReturnValue({
    pathname: "/edit",
  });

  render(<CreateProjectPage />);

  expect(await screen.findByText("Draft Modal")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Continue"));

  expect(mockSetFormData).toHaveBeenCalledWith({
    bankName: "SBI",
  });
});
it("discards draft", async () => {
  sessionStorage.setItem(
    "projectDraft",
    JSON.stringify({
      bankName: "SBI",
    })
  );

  mockUseLocation.mockReturnValue({
    pathname: "/edit",
  });

  render(<CreateProjectPage />);

  fireEvent.click(await screen.findByText("Discard"));

  expect(mockResetForm).toHaveBeenCalled();
});
});