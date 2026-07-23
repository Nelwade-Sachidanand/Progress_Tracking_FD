
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";


// Mock NumberInput
vi.mock("../../../../components/common/NumberInput", () => ({
  default: ({ name, value, onChange, disabled, className }) => (
    <input
      type="number"
      name={name}
      value={value ?? ""}
      onChange={onChange}
      disabled={disabled}
      className={className}
    />
  ),
}));

describe("CBSBusinessDetailsTab", () => {
  const updateSection = vi.fn();

  const defaultProps = {
    cbsInformation: {
      previousCBSVendor: "",
      previousVendorPeriod: "",
      existingCBSVendor: "",
      cbsSince: "",
    },
    businessStatistics: {
      totalActiveCustomers: "",
      totalAccounts: "",
      totalUsers: "",
      concurrentUsers: "",
      accountsPerYear: "",
      dailyTransactions: "",
      digitalTransactions: "",
      upiTransactions: "",
      businessMix: "",
      customerOnboarding: "",
      loanIssues: "",
    },
    updateSection,
    disabled: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders component", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    expect(screen.getByText("CBS & Business Details")).toBeInTheDocument();
    expect(screen.getByText("CBS Information")).toBeInTheDocument();
    expect(screen.getByText("Business Statistics")).toBeInTheDocument();
  });

  it("updates previous CBS vendor", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter Previous Vendor"),
      {
        target: {
          name: "previousCBSVendor",
          value: "Finacle",
        },
      }
    );

    expect(updateSection).toHaveBeenCalledWith("cbsInformation", {
      previousCBSVendor: "Finacle",
    });
  });

  it("updates previous vendor period", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Example: 2016 - 2022"),
      {
        target: {
          name: "previousVendorPeriod",
          value: "2018 - 2024",
        },
      }
    );

    expect(updateSection).toHaveBeenCalledWith("cbsInformation", {
      previousVendorPeriod: "2018 - 2024",
    });
  });

  it("updates existing CBS vendor", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter Existing Vendor"),
      {
        target: {
          name: "existingCBSVendor",
          value: "FinOne",
        },
      }
    );

    expect(updateSection).toHaveBeenCalledWith("cbsInformation", {
      existingCBSVendor: "FinOne",
    });
  });

  it("updates CBS since", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    fireEvent.change(
  document.querySelector('input[name="cbsSince"]'),
  {
    target: {
      value: "2024-01",
    },
  }
);

expect(updateSection).toHaveBeenCalledWith("cbsInformation", {
  cbsSince: "2024-01",
});
  });

  it("updates total active customers", () => {
  render(<CBSBusinessDetailsTab {...defaultProps} />);

  fireEvent.change(
    document.querySelector('input[name="totalActiveCustomers"]'),
    {
      target: {
        value: "1000",
      },
    }
  );

  expect(updateSection).toHaveBeenCalledWith("businessStatistics", {
    totalActiveCustomers: "1000",
  });
});

 it("updates total accounts", () => {
  render(<CBSBusinessDetailsTab {...defaultProps} />);

  fireEvent.change(
    document.querySelector('input[name="totalAccounts"]'),
    {
      target: {
        value: "2500",
      },
    }
  );

  expect(updateSection).toHaveBeenCalledWith("businessStatistics", {
    totalAccounts: "2500",
  });
});

 it("updates daily transactions", () => {
  render(<CBSBusinessDetailsTab {...defaultProps} />);

  fireEvent.change(
    document.querySelector('input[name="dailyTransactions"]'),
    {
      target: {
        value: "5000",
      },
    }
  );

  expect(updateSection).toHaveBeenCalledWith("businessStatistics", {
    dailyTransactions: "5000",
  });
});

  it("disables all inputs", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} disabled />);

    expect(
      screen.getByPlaceholderText("Enter Previous Vendor")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("Example: 2016 - 2022")
    ).toBeDisabled();

    expect(
      screen.getByPlaceholderText("Enter Existing Vendor")
    ).toBeDisabled();
  });

  it("renders information message", () => {
    render(<CBSBusinessDetailsTab {...defaultProps} />);

    expect(
      screen.getByText(
        /Enter Current CBS Information And Business Statistics/i
      )
    ).toBeInTheDocument();
  });
});