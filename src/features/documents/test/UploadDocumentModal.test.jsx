import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UploadDocumentModal from "../Components/UploadDocumentModal";
import { uploadDocument } from "../services/documentService";
import { toast } from "react-toastify";

vi.mock("../services/documentService", () => ({
  uploadDocument: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("UploadDocumentModal", () => {
  const onClose = vi.fn();
  const onSuccess = vi.fn();

  const documentData = {
    projectId: "1",
    projectName: "Project A",
    bankName: "ABC Bank",
    phase: "Phase 1",
    milestone: "Milestone 1",
    task: "Task 1",
    subTask: "Sub Task 1",
    activity: "KYC Upload",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.setItem("selectedProjectId", "1");
  });

  it("does not render when closed", () => {
    const { container } = render(
      <UploadDocumentModal
        isOpen={false}
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders modal", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByText("Upload Document")).toBeInTheDocument();
    expect(screen.getByText("KYC Upload")).toBeInTheDocument();
  });

  it("upload button is disabled initially", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    expect(screen.getByRole("button", { name: "Upload" })).toBeDisabled();
  });

  it("shows selected file", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const file = new File(["hello"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    expect(screen.getByText("test.pdf")).toBeInTheDocument();
  });

  it("shows error for invalid file type", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const file = new File(["abc"], "test.txt", {
      type: "text/plain",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    expect(toast.error).toHaveBeenCalledWith("Invalid file type!");
  });

  it("shows error when file exceeds 10MB", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const largeFile = new File(
      [new Uint8Array(11 * 1024 * 1024)],
      "large.pdf",
      {
        type: "application/pdf",
      }
    );

    fireEvent.change(input, {
      target: {
        files: [largeFile],
      },
    });

    expect(toast.error).toHaveBeenCalledWith("File must be <= 10MB");
  });

  it("calls onClose when Cancel clicked", () => {
    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    fireEvent.click(screen.getByText("Cancel"));

    expect(onClose).toHaveBeenCalled();
  });

  it("uploads successfully", async () => {
    uploadDocument.mockResolvedValue({
      statusType: "S",
    });

    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const file = new File(["hello"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Upload" }));

    await waitFor(() => {
      expect(uploadDocument).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        "Document uploaded successfully"
      );
      expect(onClose).toHaveBeenCalled();
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("shows upload failed message", async () => {
    uploadDocument.mockResolvedValue({
      statusType: "E",
      statusDesc: "Upload failed",
    });

    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const file = new File(["hello"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Upload" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Upload failed");
    });
  });

  it("handles upload exception", async () => {
    uploadDocument.mockRejectedValue(new Error("Server Error"));

    render(
      <UploadDocumentModal
        isOpen
        document={documentData}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    );

    const input = document.querySelector('input[type="file"]');

    const file = new File(["hello"], "test.pdf", {
      type: "application/pdf",
    });

    fireEvent.change(input, {
      target: {
        files: [file],
      },
    });

    fireEvent.click(screen.getByRole("button", { name: "Upload" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to upload document"
      );
    });
  });
});