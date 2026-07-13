import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import BankDetailsTab from "../components/tabs/BankDetailsTab";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));



describe("BankDetailsTab", () => {
  const mockUpdateRootFields = vi.fn();

  const mockData = {
    projectName: "Project A",
    bankName: "HDFC",
    projectManager: "Sachin",
    salesPerson: "John",
    headOfficeAddress: "Mumbai",
    headOfficeContactNo: "9876543210",
    noOfBranches: 20,
    bankType: "Private",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders component", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    expect(screen.getByText("Project Information")).toBeInTheDocument();

    expect(
      screen.getByText("Fill bank and project details"),
    ).toBeInTheDocument();
  });

 
    

  test("renders note section", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    expect(screen.getByText("Note")).toBeInTheDocument();

    expect(screen.getByText(/save the project as draft/i)).toBeInTheDocument();
  });

  test("renders initial values", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    expect(screen.getByDisplayValue("Project A")).toBeInTheDocument();

    expect(screen.getByDisplayValue("HDFC")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Sachin")).toBeInTheDocument();
  });

  test("updates project name", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter project name"), {
      target: {
        name: "projectName",
        value: "New Project",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      projectName: "New Project",
    });
  });

  test("updates bank name", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter bank name"), {
      target: {
        name: "bankName",
        value: "SBI",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      bankName: "SBI",
    });
  });

  test("updates project manager", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter project manager"), {
      target: {
        name: "projectManager",
        value: "Manager",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      projectManager: "Manager",
    });
  });

  test("updates sales person", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter sales person"), {
      target: {
        name: "salesPerson",
        value: "Sales",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      salesPerson: "Sales",
    });
  });

  test("updates address", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter head office address"), {
      target: {
        name: "headOfficeAddress",
        value: "Pune",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      headOfficeAddress: "Pune",
    });
  });

  test("updates contact number", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter contact no"), {
      target: {
        name: "headOfficeContactNo",
        value: "9999999999",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      headOfficeContactNo: "9999999999",
    });
  });

  test("updates branches", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Enter branches"), {
      target: {
        name: "noOfBranches",
        value: "50",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      noOfBranches: "50",
    });
  });

  test("updates bank type", () => {
    render(
      <BankDetailsTab
        data={mockData}
        updateRootFields={mockUpdateRootFields}
      />,
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: {
        name: "bankType",
        value: "UCB",
      },
    });

    expect(mockUpdateRootFields).toHaveBeenCalledWith({
      bankType: "UCB",
    });
  });

  test("renders all dropdown options", () => {
    render(
      <BankDetailsTab data={{}} updateRootFields={mockUpdateRootFields} />,
    );

    expect(screen.getByText("UCB")).toBeInTheDocument();
    expect(screen.getByText("Co-Operative")).toBeInTheDocument();
    expect(screen.getByText("Private")).toBeInTheDocument();
    expect(screen.getByText("Nationalized")).toBeInTheDocument();
  });

  test("renders empty values safely", () => {
    render(
      <BankDetailsTab data={{}} updateRootFields={mockUpdateRootFields} />,
    );

    expect(screen.getByPlaceholderText("Enter project name")).toHaveValue("");

    expect(screen.getByPlaceholderText("Enter bank name")).toHaveValue("");
  });
});
