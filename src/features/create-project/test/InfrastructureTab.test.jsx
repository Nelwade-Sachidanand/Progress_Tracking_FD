import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import InfrastructureTab from "../components/tabs/InfrastructureTab";
//import TableDropdown from "../../../../components/common/TableDropdown";

// Mock TableDropdown
vi.mock("../../../components/common/TableDropdown", () => ({
  default: ({ value, onChange, disabled }) => (
    <select
      data-testid="server-dropdown"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Select</option>
      <option value="DB Server">DB Server</option>
      <option value="App Server">App Server</option>
    </select>
  ),
}));

describe("InfrastructureTab", () => {
  const updateSection = vi.fn();
  const updateArraySection = vi.fn();

  const infrastructure = {
    currentLicenseType: "Finacle",
    currentDCVendor: "IBM",
    currentDatabase: "Oracle",
    databaseVersion: "19c",
  };

  const hardwareDetails = [
    {
      serverType: "DB Server",
      units: "2",
      diskSpaceGb: "500",
      ramGb: "32",
      cores: "8",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders infrastructure fields", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    expect(screen.getByDisplayValue("Finacle")).toBeInTheDocument();
    expect(screen.getByDisplayValue("IBM")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Oracle")).toBeInTheDocument();
    expect(screen.getByDisplayValue("19c")).toBeInTheDocument();
  });

  it("updates infrastructure field", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter License Type"), {
      target: {
        name: "currentLicenseType",
        value: "Flexcube",
      },
    });

    expect(updateSection).toHaveBeenCalledWith("infrastructure", {
      ...infrastructure,
      currentLicenseType: "Flexcube",
    });
  });

  it("renders server row", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("500")).toBeInTheDocument();
    expect(screen.getByDisplayValue("32")).toBeInTheDocument();
    expect(screen.getByDisplayValue("8")).toBeInTheDocument();
  });

  it("adds server row", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /add server/i }));

    expect(updateArraySection).toHaveBeenCalledWith(
      "hardwareDetails",
      expect.arrayContaining([
        hardwareDetails[0],
        {
          serverType: "",
          units: "",
          diskSpaceGb: "",
          ramGb: "",
          cores: "",
        },
      ])
    );
  });

  it("updates server type", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    fireEvent.change(screen.getByTestId("server-dropdown"), {
      target: {
        value: "App Server",
      },
    });

    expect(updateArraySection).toHaveBeenCalledWith("hardwareDetails", [
      {
        ...hardwareDetails[0],
        serverType: "App Server",
      },
    ]);
  });

  it("updates units", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    fireEvent.change(screen.getByDisplayValue("2"), {
      target: {
        value: "5",
      },
    });

    expect(updateArraySection).toHaveBeenCalledWith("hardwareDetails", [
      {
        ...hardwareDetails[0],
        units: "5",
      },
    ]);
  });

  it("removes server row", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
      />
    );

    const addButton = screen.getByRole("button", {
  name: /add server/i,
});

const buttons = screen.getAllByRole("button");
const deleteButton = buttons.find(btn => btn !== addButton);

fireEvent.click(deleteButton);

expect(updateArraySection).toHaveBeenCalledWith(
  "hardwareDetails",
  []
);

  });

  it("disables inputs", () => {
    render(
      <InfrastructureTab
        infrastructure={infrastructure}
        hardwareDetails={hardwareDetails}
        updateSection={updateSection}
        updateArraySection={updateArraySection}
        disabled
      />
    );

    expect(
      screen.getByPlaceholderText("Enter License Type")
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /add server/i })
    ).toBeDisabled();
  });
  it("disables add server button when all server types are selected", () => {
  const allServers = [
    "DB Server",
    "App Server",
    "Web Server",
    "ATM / POS Server",
    "RTGS / NEFT Server",
    "UPI Server",
    "SMS / E-mail Server",
    "Any Other",
  ].map(type => ({
    serverType: type,
    units: "",
    diskSpaceGb: "",
    ramGb: "",
    cores: "",
  }));

  render(
    <InfrastructureTab
      infrastructure={infrastructure}
      hardwareDetails={allServers}
      updateSection={updateSection}
      updateArraySection={updateArraySection}
    />
  );

  expect(
    screen.getByRole("button", { name: /add server/i })
  ).toBeDisabled();
});
it("disables server dropdown", () => {
  render(
    <InfrastructureTab
      infrastructure={infrastructure}
      hardwareDetails={hardwareDetails}
      updateSection={updateSection}
      updateArraySection={updateArraySection}
      disabled
    />
  );

  expect(screen.getByTestId("server-dropdown")).toBeDisabled();
});
it("updates current database", () => {
  render(
    <InfrastructureTab
      infrastructure={infrastructure}
      hardwareDetails={hardwareDetails}
      updateSection={updateSection}
      updateArraySection={updateArraySection}
    />
  );

  fireEvent.change(screen.getByTestId("current-database"), {
    target: {
      name: "currentDatabase",
      value: "SQL Server",
    },
  });

  expect(updateSection).toHaveBeenCalledWith(
    "infrastructure",
    {
      ...infrastructure,
      currentDatabase: "SQL Server",
    }
  );
});
});