import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";

vi.mock("../components/tabs/BackButton", () => ({
  default: () => <button>Back to Dashboard</button>,
}));

describe("CBSBusinessDetailsTab", () => {
  const mockUpdateSection = vi.fn();

  const mockProps = {
    cbsInformation: {
      previousCBSVendor: "TCS",
      previousVendorPeriod: "2018-2022",
      existingCBSVendor: "Infosys",
      cbsSince: "2024-01",
    },
    businessStatistics: {
      totalActiveCustomers: "1000",
      totalAccounts: "2000",
      totalUsers: "300",
      concurrentUsers: "100",
      accountsPerYear: "500",
      dailyTransactions: "10000",
      digitalTransactions: "8000",
      upiTransactions: "5000",
      businessMix: "Retail",
      customerOnboarding: "50",
      loanIssues: "10",
    },
    updateSection: mockUpdateSection,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders headings", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    expect(screen.getByText("CBS & Business Details")).toBeInTheDocument();

    expect(screen.getByText("CBS Information")).toBeInTheDocument();

    expect(screen.getByText("Business Statistics")).toBeInTheDocument();
  });

  test("renders back button", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    expect(
      screen.getByRole("button", {
        name: /back to dashboard/i,
      }),
    ).toBeInTheDocument();
  });

  test("renders initial values", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    expect(screen.getByDisplayValue("TCS")).toBeInTheDocument();

    expect(screen.getByDisplayValue("Infosys")).toBeInTheDocument();

    expect(screen.getByDisplayValue("1000")).toBeInTheDocument();
  });

  test("updates previous CBS vendor", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByPlaceholderText("Vendor Name"), {
      target: {
        name: "previousCBSVendor",
        value: "Oracle",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("cbsInformation", {
      previousCBSVendor: "Oracle",
    });
  });

  test("updates previous vendor period", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByPlaceholderText("e.g. 2016-2022"), {
      target: {
        name: "previousVendorPeriod",
        value: "2020-2025",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("cbsInformation", {
      previousVendorPeriod: "2020-2025",
    });
  });

  test("updates existing CBS vendor", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByPlaceholderText("Current Vendor"), {
      target: {
        name: "existingCBSVendor",
        value: "Finacle",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("cbsInformation", {
      existingCBSVendor: "Finacle",
    });
  });

  test("updates cbs since", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("2024-01"), {
      target: {
        name: "cbsSince",
        value: "2025-01",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("cbsInformation", {
      cbsSince: "2025-01",
    });
  });

  test("updates total active customers", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("1000"), {
      target: {
        name: "totalActiveCustomers",
        value: "1500",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("businessStatistics", {
      totalActiveCustomers: "1500",
    });
  });

  test("updates daily transactions", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("10000"), {
      target: {
        name: "dailyTransactions",
        value: "15000",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("businessStatistics", {
      dailyTransactions: "15000",
    });
  });

  test("updates loan issues", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    fireEvent.change(screen.getByDisplayValue("10"), {
      target: {
        name: "loanIssues",
        value: "20",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("businessStatistics", {
      loanIssues: "20",
    });
  });

  test("renders note text", () => {
    render(<CBSBusinessDetailsTab {...mockProps} />);

    expect(
      screen.getByText(/Enter current CBS and business statistics/i),
    ).toBeInTheDocument();
  });

  test("handles empty props safely", () => {
    render(
      <CBSBusinessDetailsTab
        cbsInformation={{}}
        businessStatistics={{}}
        updateSection={mockUpdateSection}
      />,
    );

    expect(screen.getByPlaceholderText("Vendor Name")).toHaveValue("");

    expect(screen.getByPlaceholderText("Current Vendor")).toHaveValue("");
  });
});
