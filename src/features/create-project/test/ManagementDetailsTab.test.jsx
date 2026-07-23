import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import ManagementDetailsTab from "../components/tabs/ManagementDetailsTab";

describe("ManagementDetailsTab", () => {
  const mockUpdateSection = vi.fn();

  const mockData = {
    chairman: {
      name: "John Chairman",
      contactNumber: "1111111111",
    },
    ceo: {
      name: "John CEO",
      contactNumber: "2222222222",
    },
    consultant: {
      name: "John Consultant",
      contactNumber: "3333333333",
    },
    itHead: {
      name: "John IT",
      contactNumber: "4444444444",
    },
  };

  const renderComponent = (data = mockData) =>
    render(
      <MemoryRouter>
        <ManagementDetailsTab data={data} updateSection={mockUpdateSection} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders heading", () => {
    renderComponent();

    expect(screen.getByText("Management Details")).toBeInTheDocument();
  });

  test("renders description", () => {
    renderComponent();

    expect(
      screen.getByText(/Enter key management contacts/i),
    ).toBeInTheDocument();
  });

  test("renders chairman fields", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("Enter Chairman Name"),
    ).toBeInTheDocument();
  });

  test("renders CEO fields", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("Enter CEO Name")).toBeInTheDocument();
  });

  test("renders consultant fields", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("Enter Consultant Name"),
    ).toBeInTheDocument();
  });

  test("renders IT head fields", () => {
    renderComponent();

    expect(
      screen.getByPlaceholderText("Enter IT Head Name"),
    ).toBeInTheDocument();
  });

  test("renders initial values", () => {
    renderComponent();

    expect(screen.getByDisplayValue("John Chairman")).toBeInTheDocument();

    expect(screen.getByDisplayValue("1111111111")).toBeInTheDocument();
  });

  test("updates chairman name", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter Chairman Name"), {
      target: {
        value: "New Chairman",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("contactDetails", {
      ...mockData,
      chairman: {
        ...mockData.chairman,
        name: "New Chairman",
      },
    });
  });

  test("updates chairman contact", () => {
    renderComponent();

    const contactInputs = screen.getAllByPlaceholderText(
      "Enter Contact Number",
    );

    fireEvent.change(contactInputs[0], {
      target: {
        value: "9999999999",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith("contactDetails", {
      ...mockData,
      chairman: {
        ...mockData.chairman,
        contactNumber: "9999999999",
      },
    });
  });

  test("updates CEO name", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter CEO Name"), {
      target: {
        value: "New CEO",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("updates consultant name", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter Consultant Name"), {
      target: {
        value: "New Consultant",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("updates IT head name", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Enter IT Head Name"), {
      target: {
        value: "New IT Head",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("renders info text", () => {
    renderComponent();

expect(
  screen.getByText(/enter key management contacts of the bank/i)
).toBeInTheDocument();
  });

  test("handles empty data safely", () => {
    renderComponent({});

    expect(screen.getByPlaceholderText("Enter Chairman Name")).toHaveValue("");

    expect(
      screen.getAllByPlaceholderText("Enter Contact Number")[0],
    ).toHaveValue("");
  });
});
