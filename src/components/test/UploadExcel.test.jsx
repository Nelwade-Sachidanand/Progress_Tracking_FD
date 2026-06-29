import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import toast from "react-hot-toast";
import UploadExcel from "../pages/UploadExcel";

const mockUploadExcel = vi.fn();

vi.mock("../hooks/useExcel", () => ({
  useExcel: () => ({
    uploadExcel: mockUploadExcel,
  }),
}));

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("UploadExcel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getFileInput = () => document.querySelector('input[type="file"]');

  const validFile = new File(["excel-data"], "Project.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const validXlsFile = new File(["excel-data"], "Project.xls", {
    type: "application/vnd.ms-excel",
  });

  const invalidFile = new File(["text"], "sample.txt", {
    type: "text/plain",
  });

  const largeFile = new File(["large"], "Large.xlsx", {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  Object.defineProperty(largeFile, "size", {
    value: 11 * 1024 * 1024,
  });

  it("renders heading", () => {
    render(<UploadExcel />);

    expect(screen.getByText("Upload Project Excel")).toBeInTheDocument();
  });

  it("renders upload button", () => {
    render(<UploadExcel />);

    expect(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    ).toBeInTheDocument();
  });

  it("upload button is disabled initially", () => {
    render(<UploadExcel />);

    expect(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    ).toBeDisabled();
  });

  it("renders file input", () => {
    render(<UploadExcel />);

    expect(getFileInput()).toBeInTheDocument();
  });

  it("accepts xlsx file", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    expect(screen.getByText("Project.xlsx")).toBeInTheDocument();
  });

  it("accepts xls file", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validXlsFile],
      },
    });

    expect(screen.getByText("Project.xls")).toBeInTheDocument();
  });

  it("rejects invalid file extension", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [invalidFile],
      },
    });

    expect(toast.error).toHaveBeenCalledWith(
      "Only Excel files (.xlsx or .xls) are allowed.",
    );
  });

  it("rejects large file", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [largeFile],
      },
    });

    expect(toast.error).toHaveBeenCalledWith(
      "File size should not exceed 10 MB.",
    );
  });

  it("shows selected filename", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    expect(screen.getByText("Project.xlsx")).toBeInTheDocument();
  });

  it("uploads excel successfully", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "S",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(mockUploadExcel).toHaveBeenCalledWith(validFile);
    });

    expect(toast.success).toHaveBeenCalledWith("Excel uploaded successfully.");
  });

  it("shows backend failure message", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "F",
      message: "Upload Failed",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Upload Failed");
    });
  });

  it("shows default backend failure message", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "F",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Failed to upload Excel.");
    });
  });

  it("handles rejected upload promise", async () => {
    mockUploadExcel.mockRejectedValue(new Error("Network Error"));

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Something went wrong while uploading.",
      );
    });
  });

  it("shows uploading state", async () => {
    mockUploadExcel.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                statusType: "S",
              }),
            100,
          ),
        ),
    );

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    expect(screen.getByText("Uploading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Upload Excel")).toBeInTheDocument();
    });
  });

  it("calls upload api once", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "S",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(mockUploadExcel).toHaveBeenCalledTimes(1);
    });
  });

  it("upload button becomes enabled after selecting file", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    expect(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    ).not.toBeDisabled();
  });

  it("disables upload button while uploading", async () => {
    mockUploadExcel.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                statusType: "S",
              }),
            100,
          ),
        ),
    );

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /uploading...|upload excel/i,
      }),
    ).toBeDisabled();

    await waitFor(() => {
      expect(mockUploadExcel).toHaveBeenCalled();
    });
  });

  it("removes selected file", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    expect(screen.getByText("Project.xlsx")).toBeInTheDocument();

    const removeButton = screen.getAllByRole("button")[0];

    fireEvent.click(removeButton);

    expect(screen.queryByText("Project.xlsx")).not.toBeInTheDocument();
  });

  it("shows selected file size", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    expect(screen.getByText(/KB/i)).toBeInTheDocument();
  });

  it("clears selected file after successful upload", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "S",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(screen.queryByText("Project.xlsx")).not.toBeInTheDocument();
    });
  });

  it("does not clear selected file when upload fails", async () => {
    mockUploadExcel.mockResolvedValue({
      statusType: "F",
      message: "Upload Failed",
    });

    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [validFile],
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("Project.xlsx")).toBeInTheDocument();
    });
  });

  it("handles empty file selection", () => {
    render(<UploadExcel />);

    fireEvent.change(getFileInput(), {
      target: {
        files: [],
      },
    });

    expect(screen.queryByText("Project.xlsx")).not.toBeInTheDocument();
  });

  it("supports accept attribute", () => {
    render(<UploadExcel />);

    expect(getFileInput()).toHaveAttribute("accept", ".xlsx,.xls");
  });

  it("renders upload icon", () => {
    const { container } = render(<UploadExcel />);

    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("file input is hidden", () => {
    render(<UploadExcel />);

    expect(getFileInput()).toHaveClass("hidden");
  });

  it("does not call upload api when no file is selected", () => {
    render(<UploadExcel />);

    expect(mockUploadExcel).not.toHaveBeenCalled();
  });

  it("keeps upload button disabled when no file is selected", () => {
    render(<UploadExcel />);

    expect(
      screen.getByRole("button", {
        name: /upload excel/i,
      }),
    ).toBeDisabled();

    expect(mockUploadExcel).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
  });
});
