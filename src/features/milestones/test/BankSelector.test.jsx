import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BankSelector from "../components/BankSelector";



const mockDropdown = vi.fn();

vi.mock("../../../components/common/CustomDropdown", () => ({
  default: (props) => {
    mockDropdown(props);

    return (
      <select
        data-testid="custom-dropdown"
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value="">{props.placeholder}</option>

        {props.options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  },
}));

describe("BankSelector", () => {
  const setSelectedBank = vi.fn();

  const banks = [
    "State Bank of India (SBI)",
    "HDFC Bank (HDFC)",
    "ICICI Bank",
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders label", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    expect(
      screen.getByText("Select Bank :")
    ).toBeInTheDocument();
  });

  it("renders dropdown", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    expect(
      screen.getByTestId("custom-dropdown")
    ).toBeInTheDocument();
  });

  it("passes placeholder to dropdown", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    expect(mockDropdown).toHaveBeenCalled();

    expect(mockDropdown.mock.calls[0][0].placeholder).toBe(
      "Select Bank"
    );
  });

  it("creates bank options with short names", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    expect(screen.getByText("SBI")).toBeInTheDocument();
    expect(screen.getByText("HDFC")).toBeInTheDocument();
    expect(screen.getByText("ICICI Bank")).toBeInTheDocument();
  });

  it("passes selected value", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank="HDFC Bank (HDFC)"
        setSelectedBank={setSelectedBank}
      />
    );

    expect(
      screen.getByTestId("custom-dropdown")
    ).toHaveValue("HDFC Bank (HDFC)");
  });

  it("calls setSelectedBank on change", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    fireEvent.change(
      screen.getByTestId("custom-dropdown"),
      {
        target: {
          value: "State Bank of India (SBI)",
        },
      }
    );

    expect(setSelectedBank).toHaveBeenCalledWith(
      "State Bank of India (SBI)"
    );
  });

  it("renders empty options when banks array is empty", () => {
    render(
      <BankSelector
        banks={[]}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    const options = screen.getAllByRole("option");

    // Only placeholder
    expect(options).toHaveLength(1);
  });

  it("passes correct number of options", () => {
    render(
      <BankSelector
        banks={banks}
        selectedBank=""
        setSelectedBank={setSelectedBank}
      />
    );

    const props = mockDropdown.mock.calls[0][0];

    expect(props.options).toHaveLength(3);
  });
});