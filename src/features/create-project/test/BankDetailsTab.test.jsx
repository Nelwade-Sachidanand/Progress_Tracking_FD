
import BankDetailsTab from "../components/tabs/BankDetailsTab";

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { toast } from "react-toastify";

// Mock toast
vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

// Mock CustomDropdown
vi.mock("../../../../components/common/CustomDropdown", () => ({
  default: ({ label, value, onChange, disabled }) => (
    <div>
      <label>{label}</label>
      <select
        data-testid="bankType"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="UCB">UCB</option>
        <option value="Private">Private</option>
      </select>
    </div>
  ),
}));

// Mock NumberInput
vi.mock("../../../../components/common/NumberInput", () => ({
  default: ({ name, value, onChange, disabled, placeholder }) => (
    <input
      type="number"
      name={name}
      value={value || ""}
      disabled={disabled}
      placeholder={placeholder}
      onChange={onChange}
    />
  ),
}));

describe("BankDetailsTab", () => {
  const updateRootFields = vi.fn();

  const defaultProps = {
    data: {
      bankName: "",
      projectName: "",
      projectManager: "",
      salesPerson: "",
      headOfficeContactNo: "",
      bankType: "",
      noOfBranches: "",
      headOfficeAddress: "",
    },
    updateRootFields,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all fields", () => {
    render(<BankDetailsTab {...defaultProps} />);

    expect(screen.getByText("Project Information")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Bank Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter Project Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Project Manager")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Sales Person")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Contact Number")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter Head Office Address")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter number of branches")
    ).toBeInTheDocument();
  });

  it("updates bank name", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Bank Name"), {
      target: { name: "bankName", value: "ABC Bank" },
    });

    expect(updateRootFields).toHaveBeenCalledWith({
      bankName: "ABC Bank",
    });
  });

  it("updates project name", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Project Name"), {
      target: { name: "projectName", value: "CBS" },
    });

    expect(updateRootFields).toHaveBeenCalledWith({
      projectName: "CBS",
    });
  });

  it("updates project manager", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Project Manager"), {
      target: { name: "projectManager", value: "Sachin" },
    });

    expect(updateRootFields).toHaveBeenCalledWith({
      projectManager: "Sachin",
    });
  });

  it("updates sales person", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Sales Person"), {
      target: { name: "salesPerson", value: "John" },
    });

    expect(updateRootFields).toHaveBeenCalledWith({
      salesPerson: "John",
    });
  });

  it("updates contact number", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Contact Number"), {
      target: {
        name: "headOfficeContactNo",
        value: "9876543210",
      },
    });

    expect(updateRootFields).toHaveBeenCalledWith({
      headOfficeContactNo: "9876543210",
    });
  });

  it("does not allow alphabets in contact number", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Contact Number"), {
      target: {
        name: "headOfficeContactNo",
        value: "abc",
      },
    });

    expect(updateRootFields).not.toHaveBeenCalled();
  });

  it("shows toast when contact exceeds 10 digits", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter Contact Number"), {
      target: {
        name: "headOfficeContactNo",
        value: "12345678901",
      },
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Contact number cannot exceed 10 digits"
    );
    expect(updateRootFields).not.toHaveBeenCalled();
  });

 it("updates bank type", () => {
  render(<BankDetailsTab {...defaultProps} />);

  // Open dropdown
  fireEvent.click(screen.getByRole("button", { name: /select type/i }));

  // Click option
  fireEvent.click(screen.getByRole("button", { name: "Ucb" }));

  expect(updateRootFields).toHaveBeenCalledWith({
    bankType: "UCB",
  });
});

  it("updates number of branches", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter number of branches"),
      {
        target: {
          name: "noOfBranches",
          value: "25",
        },
      }
    );

    expect(updateRootFields).toHaveBeenCalledWith({
      noOfBranches: "25",
    });
  });

  it("updates head office address", () => {
    render(<BankDetailsTab {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter Head Office Address"),
      {
        target: {
          name: "headOfficeAddress",
          value: "Pune",
        },
      }
    );

    expect(updateRootFields).toHaveBeenCalledWith({
      headOfficeAddress: "Pune",
    });
  });

  it("disables all inputs when disabled is true", () => {
    render(<BankDetailsTab {...defaultProps} disabled />);

    expect(
      screen.getByPlaceholderText("Enter Bank Name")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("Enter Project Name")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("Enter Contact Number")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("Enter Head Office Address")
    ).toBeDisabled();

   expect(screen.getByRole("button", { name: /select type/i })).toBeDisabled();
  });

  it("renders draft note", () => {
    render(<BankDetailsTab {...defaultProps} />);

    expect(
      screen.getByText(
        /This Project Can Be Saved as a Draft at Any Stage/i
      )
    ).toBeInTheDocument();
  });
});