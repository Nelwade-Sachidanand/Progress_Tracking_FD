import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import PaymentSystemsTab from "../components/tabs/PaymentSystemsTab";

describe("PaymentSystemsTab", () => {
  const mockUpdateSection = vi.fn();

  const mockData = {
    rtgs: true,
    neft: false,
    imps: false,
    atmSwitch: false,
    pos: false,
    loanRecovery: false,

    dailyUpiTransactions: 1000,
    dailyImpsTransactions: 500,
    dailyNeftTransactions: 300,
    dailyRtgsTransactions: 100,
  };

  const renderComponent = (data = mockData) =>
    render(
      <MemoryRouter>
        <PaymentSystemsTab data={data} updateSection={mockUpdateSection} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders heading", () => {
    renderComponent();

    expect(
      screen.getByText("Payment Systems & NPCI Products"),
    ).toBeInTheDocument();
  });

  test("renders section headings", () => {
    renderComponent();

    expect(screen.getByText("Enabled Payment Systems")).toBeInTheDocument();
    expect(screen.getByText("Transaction Statistics")).toBeInTheDocument();
  });

  test("renders payment products", () => {
    renderComponent();

    expect(screen.getByText("RTGS")).toBeInTheDocument();
    expect(screen.getByText("NEFT")).toBeInTheDocument();
    expect(screen.getByText("IMPS")).toBeInTheDocument();
    expect(screen.getByText("ATM Switch")).toBeInTheDocument();
    expect(screen.getByText("POS")).toBeInTheDocument();
    expect(screen.getByText("Loan Recovery")).toBeInTheDocument();
  });

  test("toggles RTGS", () => {
    renderComponent();

    fireEvent.click(screen.getByText("RTGS"));

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({ rtgs: false }),
    );
  });

  test("toggles IMPS", () => {
    renderComponent();

    fireEvent.click(screen.getByText("IMPS"));

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({ imps: true }),
    );
  });

  test("updates daily upi transactions", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("1000"), {
      target: {
        name: "dailyUpiTransactions",
        value: "2000",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({
        dailyUpiTransactions: "2000",
      }),
    );
  });

  test("updates daily imps transactions", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("500"), {
      target: {
        name: "dailyImpsTransactions",
        value: "800",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({
        dailyImpsTransactions: "800",
      }),
    );
  });

  test("updates daily neft transactions", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("300"), {
      target: {
        name: "dailyNeftTransactions",
        value: "600",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({
        dailyNeftTransactions: "600",
      }),
    );
  });

  test("updates daily rtgs transactions", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("100"), {
      target: {
        name: "dailyRtgsTransactions",
        value: "200",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "paymentSystems",
      expect.objectContaining({
        dailyRtgsTransactions: "200",
      }),
    );
  });

  test("renders info box", () => {
    renderComponent();

    expect(
      screen.getByText(/currently integrated with CBS and NPCI ecosystem/i),
    ).toBeInTheDocument();
  });

  test("handles empty data", () => {
    renderComponent({});

    expect(screen.getByText("RTGS")).toBeInTheDocument();
    expect(screen.getByText("NEFT")).toBeInTheDocument();
  });
});
