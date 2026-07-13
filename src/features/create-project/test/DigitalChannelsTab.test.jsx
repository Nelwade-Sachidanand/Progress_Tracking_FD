import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import DigitalChannelsTab from "../components/tabs/DigitalChannelsTab";

describe("DigitalChannelsTab", () => {
  const mockUpdateSection = vi.fn();

  const mockData = {
    mobileBanking: true,
    internetBanking: false,
    tabletBanking: false,
    pigmyBanking: false,

    mobileUsers: "1000",
    internetUsers: "500",
    cardUsers: "800",
    activeDigitalUsers: "700",
  };

  const renderComponent = (data = mockData) =>
    render(
      <MemoryRouter>
        <DigitalChannelsTab data={data} updateSection={mockUpdateSection} />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders heading", () => {
    renderComponent();
    expect(screen.getByText("Digital Channels")).toBeInTheDocument();
  });

  test("renders channel section", () => {
    renderComponent();
    expect(screen.getByText("Available Digital Channels")).toBeInTheDocument();
  });

  test("renders statistics section", () => {
    renderComponent();
    expect(screen.getByText("Channel Statistics")).toBeInTheDocument();
  });

 

  test("renders all digital channels", () => {
    renderComponent();

    expect(screen.getByText("Mobile Banking")).toBeInTheDocument();
    expect(screen.getByText("Internet Banking")).toBeInTheDocument();
    expect(screen.getByText("Tablet Banking")).toBeInTheDocument();
    expect(screen.getByText("PigMy Banking")).toBeInTheDocument();
  });

  test("toggles mobile banking card", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Mobile Banking"));

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ mobileBanking: false }),
    );
  });

  test("toggles internet banking card", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Internet Banking"));

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ internetBanking: true }),
    );
  });

  test("updates mobile users", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("1000"), {
      target: { name: "mobileUsers", value: "2000" },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ mobileUsers: "2000" }),
    );
  });

  test("updates internet users", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("500"), {
      target: { name: "internetUsers", value: "900" },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ internetUsers: "900" }),
    );
  });

  test("updates card users", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("800"), {
      target: { name: "cardUsers", value: "1200" },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ cardUsers: "1200" }),
    );
  });

  test("updates active digital users", () => {
    renderComponent();

    fireEvent.change(screen.getByDisplayValue("700"), {
      target: { name: "activeDigitalUsers", value: "1500" },
    });

    expect(mockUpdateSection).toHaveBeenCalledWith(
      "digitalChannels",
      expect.objectContaining({ activeDigitalUsers: "1500" }),
    );
  });

  test("renders note text", () => {
    renderComponent();

    expect(
      screen.getByText(/currently live and actively used/i),
    ).toBeInTheDocument();
  });

  test("renders safely with empty data", () => {
    renderComponent({});
    expect(screen.getByText("Mobile Banking")).toBeInTheDocument();
  });
});
