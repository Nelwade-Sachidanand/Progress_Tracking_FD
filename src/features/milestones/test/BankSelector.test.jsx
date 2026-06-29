import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import BankSelector from "../components/BankSelector";

describe("BankSelector", () => {
  const setSelectedBank = vi.fn();

  const banks = ["HDFC Bank", "ICICI Bank", "Axis Bank"];

  const defaultProps = {
    banks,
    selectedBank: "",
    setSelectedBank,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders label", () => {
    render(<BankSelector {...defaultProps} />);

    expect(screen.getByText("Select Bank :")).toBeInTheDocument();
  });

  it("shows placeholder initially", () => {
    render(<BankSelector {...defaultProps} />);

    expect(screen.getByText("Select Bank")).toBeInTheDocument();
  });

  it("shows selected bank", () => {
    render(<BankSelector {...defaultProps} selectedBank="HDFC Bank" />);

    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("ICICI Bank")).toBeInTheDocument();

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();
  });

  it("closes dropdown when button clicked again", () => {
    render(<BankSelector {...defaultProps} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(screen.getByText("ICICI Bank")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText("ICICI Bank")).not.toBeInTheDocument();
  });

  it("selects bank", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("Axis Bank"));

    expect(setSelectedBank).toHaveBeenCalledWith("Axis Bank");
  });

  it("closes dropdown after selecting bank", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    fireEvent.click(screen.getByText("HDFC Bank"));

    expect(screen.queryByText("ICICI Bank")).not.toBeInTheDocument();
  });

  it("renders all banks", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("HDFC Bank")).toBeInTheDocument();

    expect(screen.getByText("ICICI Bank")).toBeInTheDocument();

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();
  });

  it("handles empty banks array", () => {
    render(<BankSelector {...defaultProps} banks={[]} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByText("HDFC Bank")).not.toBeInTheDocument();
  });

  it("closes dropdown on outside click", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();

    fireEvent.mouseDown(document);

    expect(screen.queryByText("Axis Bank")).not.toBeInTheDocument();
  });

  it("button exists", () => {
    render(<BankSelector {...defaultProps} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("dropdown is hidden initially", () => {
    render(<BankSelector {...defaultProps} />);

    expect(screen.queryByText("Axis Bank")).not.toBeInTheDocument();
  });

  it("selected bank is shown in title attribute", () => {
    render(<BankSelector {...defaultProps} selectedBank="ICICI Bank" />);

    expect(screen.getByTitle("ICICI Bank")).toBeInTheDocument();
  });

  it("renders one main button initially", () => {
    render(<BankSelector {...defaultProps} />);

    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("renders bank buttons when opened", () => {
    render(<BankSelector {...defaultProps} />);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("supports multiple open close operations", () => {
    render(<BankSelector {...defaultProps} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(screen.getByText("Axis Bank")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<BankSelector {...defaultProps} />);

    expect(container).toMatchSnapshot();
  });
});
