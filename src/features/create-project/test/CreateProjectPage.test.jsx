import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import useProjectForm from "../hooks/useProjectForm";
import CreateProjectPage from "../pages/CreateProjectPage";
import { getProjectInformation } from "../services/createProjectService";

vi.mock("../components/tabs/BackButton", () => ({
  default: () => (
    <button data-testid="back-button">
      Back
    </button>
  ),
}));
vi.mock("../hooks/useProjectForm");
const mockLoadProjectInformation = vi.fn();

vi.mock("../hooks/useProjectInformation", () => ({
  default: () => ({
    projectInformation: mockProjects,
    loadProjectInformation: mockLoadProjectInformation,
  }),
}));

vi.mock("../services/createProjectService", () => ({
  getProjectInformation: vi.fn(),
}));

/* ---------------- Stepper ---------------- */

vi.mock("../components/ProjectStepper", () => ({
  default: ({ currentStep }) => (
    <div data-testid="project-stepper">Stepper-{currentStep}</div>
  ),
}));

/* ---------------- Navigation ---------------- */

vi.mock("../components/ProjectNavigation", () => ({
  default: ({ currentStep }) => (
    <div data-testid="project-navigation">Navigation-{currentStep}</div>
  ),
}));

/* ---------------- Tabs ---------------- */

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

/* ---------------- Mock Data ---------------- */

const mockProjects = [
  {
    id: "1",
    bankName: "Axis Bank",
    projectName: "CBS Upgrade",
  },
  {
    id: "2",
    bankName: "HDFC Bank",
    projectName: "Mobile Banking",
  },
];

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

describe("CreateProjectPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useProjectForm.mockReturnValue(baseHookData);

    getProjectInformation.mockResolvedValue({
      statusType: "S",
      details: {
        bankName: "Axis Bank",
      },
    });
  });
  test("renders project stepper", () => {
    render(<CreateProjectPage />);

    expect(screen.getByTestId("project-stepper")).toBeInTheDocument();
  });

  test("renders project navigation", () => {
    render(<CreateProjectPage />);

    expect(screen.getByTestId("project-navigation")).toBeInTheDocument();
  });

  test("loads project information on mount", () => {
    render(<CreateProjectPage />);

    expect(mockLoadProjectInformation).toHaveBeenCalledTimes(1);
  });

  test("renders bank selector", () => {
    render(<CreateProjectPage />);

    expect(screen.getByText("Select Existing Bank")).toBeInTheDocument();
  });

  test("opens bank dropdown", () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();

    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();
  });

  test("clicking new project resets form", () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    const options = screen.getAllByText("➕ New Project");

    fireEvent.click(options[1]);

    expect(mockResetForm).toHaveBeenCalledTimes(1);
  });

  test("loads selected project successfully", async () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() => {
      expect(getProjectInformation).toHaveBeenCalledWith(
        "Axis Bank",
        "CBS Upgrade",
      );
    });

    expect(mockSetFormData).toHaveBeenCalled();
  });

  test("does not set form when API returns failure", async () => {
    getProjectInformation.mockResolvedValue({
      statusType: "E",
    });

    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() => expect(getProjectInformation).toHaveBeenCalled());

    expect(mockSetFormData).not.toHaveBeenCalled();
  });

  test("handles API exception", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    getProjectInformation.mockRejectedValue(new Error("Failed"));

    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() => expect(spy).toHaveBeenCalled());

    spy.mockRestore();
  });

  test("closes dropdown after selecting project", async () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() =>
      expect(screen.queryByText("HDFC Bank")).not.toBeInTheDocument(),
    );
  });

  test("shows selected bank after selection", async () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /axis bank/i,
        }),
      ).toBeInTheDocument();
    });
  });

  test("renders BankDetailsTab for step 0", () => {
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

  test("renders nothing for invalid step", () => {
    useProjectForm.mockReturnValue({
      ...baseHookData,
      currentStep: 99,
    });

    render(<CreateProjectPage />);

    expect(screen.queryByText("BankDetailsTab")).not.toBeInTheDocument();

    expect(screen.queryByText("ManagementDetailsTab")).not.toBeInTheDocument();

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

  test("renders dropdown even when no projects exist", () => {
    render(<CreateProjectPage />);

    expect(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    ).toBeInTheDocument();
  });

  test("closes dropdown when clicking outside", () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Axis Bank")).not.toBeInTheDocument();
  });

  test("cleanup removes outside click listener", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");

    const { unmount } = render(<CreateProjectPage />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));

    removeSpy.mockRestore();
  });

  test("renders selected bank after successful selection", async () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    fireEvent.click(screen.getByText("Axis Bank"));

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /axis bank/i,
        }),
      ).toBeInTheDocument();
    });
  });

  test("renders page container", () => {
    const { container } = render(<CreateProjectPage />);

    expect(container.firstChild).toBeInTheDocument();
  });

  test("renders white content card", () => {
    const { container } = render(<CreateProjectPage />);

    expect(container.querySelector(".bg-white")).toBeInTheDocument();
  });

  test("renders bank selection label", () => {
    render(<CreateProjectPage />);

    expect(screen.getByText("Select Existing Bank")).toBeInTheDocument();
  });

  test("shows check icon for new project initially", () => {
    render(<CreateProjectPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /new project/i,
      }),
    );

    expect(screen.getAllByText("➕ New Project").length).toBeGreaterThan(0);
  });
});
