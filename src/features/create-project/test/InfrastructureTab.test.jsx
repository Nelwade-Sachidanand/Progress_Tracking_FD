import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import InfrastructureTab from "../components/tabs/InfrastructureTab";

describe("InfrastructureTab", () => {
  const mockUpdateSection = vi.fn();
  const mockUpdateArraySection = vi.fn();

  const infrastructure = {
    currentLicenseType: "Enterprise",
    currentDCVendor: "TCS",
    currentDatabase: "Oracle",
    databaseVersion: "19c",
  };

  const hardwareDetails = [
    {
      serverType: "DB Server",
      units: "2",
      diskSpaceGb: "500",
      ramGb: "64",
      cores: "16",
    },
  ];

  const renderComponent = (
    infra = infrastructure,
    hardware = hardwareDetails,
  ) =>
    render(
      <MemoryRouter>
        <InfrastructureTab
          infrastructure={infra}
          hardwareDetails={hardware}
          updateSection={mockUpdateSection}
          updateArraySection={mockUpdateArraySection}
        />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders headings", () => {
    renderComponent();

    expect(screen.getByText("Existing CBS Infrastructure")).toBeInTheDocument();

    expect(screen.getByText("Infrastructure Details")).toBeInTheDocument();

    expect(screen.getByText("Server Configuration")).toBeInTheDocument();
  });

  test("renders initial values", () => {
    renderComponent();

    expect(screen.getByDisplayValue("Enterprise")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TCS")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Oracle")).toBeInTheDocument();
    expect(screen.getByDisplayValue("19c")).toBeInTheDocument();
  });

  test("updates current license", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("License Type"), {
      target: {
        name: "currentLicenseType",
        value: "Premium",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "infrastructure",
      expect.objectContaining({
        currentLicenseType: "Premium",
      }),
    );
  });

  test("updates current dc vendor", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Vendor Name"), {
      target: {
        name: "currentDCVendor",
        value: "Infosys",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("updates current database", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Oracle / MySQL"), {
      target: {
        name: "currentDatabase",
        value: "MySQL",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("updates database version", () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("Version"), {
      target: {
        name: "databaseVersion",
        value: "8.0",
      },
    });

    expect(mockUpdateSection).toHaveBeenCalled();
  });

  test("changes server type", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("DB Server"), {
      target: {
        value: "App Server",
      },
    });

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("changes units", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("2"), {
      target: {
        value: "5",
      },
    });

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("changes disk space", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("500"), {
      target: {
        value: "1000",
      },
    });

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("changes ram", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("64"), {
      target: {
        value: "128",
      },
    });

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("changes cores", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("16"), {
      target: {
        value: "32",
      },
    });

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("adds server row", () => {
    renderComponent();

    fireEvent.click(
      screen.getByRole("button", {
        name: /add server/i,
      }),
    );

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("removes server row", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]); // first button is BackButton

    expect(mockUpdateArraySection).toHaveBeenCalled();
  });

  test("renders note text", () => {
    renderComponent();

    expect(
      screen.getByText(/Add all production, DR and supporting servers/i),
    ).toBeInTheDocument();
  });

  test("handles empty state", () => {
    renderComponent({}, []);

    expect(screen.getByPlaceholderText("License Type")).toHaveValue("");

    expect(
      screen.getByRole("button", {
        name: /add server/i,
      }),
    ).toBeInTheDocument();
  });

  test("disables add server when all server types selected", () => {
    const allServers = [
      "DB Server",
      "App Server",
      "Web Server",
      "ATM / POS Server",
      "RTGS / NEFT Server",
      "UPI Server",
      "SMS / E-mail Server",
      "Any Other",
    ].map((type) => ({
      serverType: type,
      units: "",
      diskSpaceGb: "",
      ramGb: "",
      cores: "",
    }));

    renderComponent(infrastructure, allServers);

    expect(
      screen.getByRole("button", {
        name: /add server/i,
      }),
    ).toBeDisabled();
  });
});
