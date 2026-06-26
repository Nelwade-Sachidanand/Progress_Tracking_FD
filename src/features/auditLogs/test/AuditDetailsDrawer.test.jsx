import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";

import AuditDetailsModal from "../components/AuditDetailsModal";

describe("AuditDetailsModal", () => {
  const onClose = vi.fn();

  const log = {
    oldData: JSON.stringify({
      projectName: "Project A",
      owner: "Sachin",
      active: true,
      count: 5,
    }),
    newData: JSON.stringify({
      projectName: "Project B",
      owner: "Sachin",
      active: false,
      count: 10,
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns null when log is null", () => {
    const { container } = render(
      <AuditDetailsModal log={null} onClose={onClose} />,
    );

    expect(container.firstChild).toBeNull();
  });

  test("renders modal", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("Audit Details")).toBeInTheDocument();
  });

  test("renders previous data heading", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("Previous Data")).toBeInTheDocument();
  });

  test("renders updated data heading", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("Updated Data")).toBeInTheDocument();
  });

  test("renders project names", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("Project A")).toBeInTheDocument();

    expect(screen.getByText("Project B")).toBeInTheDocument();
  });

  test("renders owner", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getAllByText("Sachin")).toHaveLength(2);
  });

  test("renders boolean values", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("true")).toBeInTheDocument();

    expect(screen.getByText("false")).toBeInTheDocument();
  });

  test("renders numeric values", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    expect(screen.getByText("5")).toBeInTheDocument();

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  test("calls onClose", () => {
    render(<AuditDetailsModal log={log} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("handles missing oldData", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: null,
          newData: JSON.stringify({
            name: "New",
          }),
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Updated Data")).toBeInTheDocument();
  });

  test("handles missing newData", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: JSON.stringify({
            name: "Old",
          }),
          newData: null,
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Previous Data")).toBeInTheDocument();
  });

  test("renders nested object", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: JSON.stringify({
            address: {
              city: "Pune",
            },
          }),
          newData: JSON.stringify({
            address: {
              city: "Mumbai",
            },
          }),
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getAllByText("[object Object]")).toHaveLength(2);
  });

  test("renders array", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: JSON.stringify({
            items: ["A", "B"],
          }),
          newData: JSON.stringify({
            items: ["A", "C"],
          }),
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getAllByText("A,B")).toBeTruthy();
  });

  test("renders contact card object", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: JSON.stringify({
            contact: {
              name: "Sachin",
              contactNumber: "9999999999",
            },
          }),
          newData: JSON.stringify({
            contact: {
              name: "Rahul",
              contactNumber: "8888888888",
            },
          }),
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getAllByText("[object Object]")).toHaveLength(2);
  });

  test("renders null values", () => {
    render(
      <AuditDetailsModal
        log={{
          oldData: JSON.stringify({
            value: null,
          }),
          newData: JSON.stringify({
            value: null,
          }),
        }}
        onClose={onClose}
      />,
    );

    expect(screen.getAllByText("-")).toHaveLength(2);
  });
});
