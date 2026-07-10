import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PreviewDocumentModal from "../Components/PreviewDocumentModal";
import { downloadDocument } from "../services/documentService";
import { toast } from "react-toastify";

vi.mock("../services/documentService", () => ({
  downloadDocument: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("PreviewDocumentModal", () => {
  const mockDocument = {
    documentId: 1,
    activity: "KYC Upload",
    fileName: "doc1.pdf",
    uploadedBy: "Admin",
    uploadedDate: "2025-01-01",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    global.URL.createObjectURL = vi.fn(() => "blob:test");
    global.URL.revokeObjectURL = vi.fn();

    document.body.innerHTML = "";
  });

  it("does not render when closed", () => {
    const { container } = render(
      <PreviewDocumentModal
        isOpen={false}
        document={mockDocument}
        onClose={vi.fn()}
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders document details", () => {
    render(
      <PreviewDocumentModal
        isOpen={true}
        document={mockDocument}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Document Details")).toBeInTheDocument();
    expect(screen.getByText("KYC Upload")).toBeInTheDocument();
    expect(screen.getByText("doc1.pdf")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
  });

  it("calls onClose when X button is clicked", () => {
    const onClose = vi.fn();

    render(
      <PreviewDocumentModal
        isOpen={true}
        document={mockDocument}
        onClose={onClose}
      />
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when Close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <PreviewDocumentModal
        isOpen={true}
        document={mockDocument}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByText("Close"));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("downloads document successfully", async () => {
    downloadDocument.mockResolvedValue({
      data: new Blob(["test"]),
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="doc1.pdf"',
      },
    });

    render(
      <PreviewDocumentModal
        isOpen={true}
        document={mockDocument}
        onClose={vi.fn()}
      />
    );

    const downloadButton = screen.getByTitle("Download");

    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(downloadDocument).toHaveBeenCalledWith(1);
    });
  });

  it("disables download button when documentId is missing", () => {
    render(
      <PreviewDocumentModal
        isOpen={true}
        document={{
          ...mockDocument,
          documentId: null,
        }}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByTitle("Download")).toBeDisabled();
  });

  it("shows toast when download fails", async () => {
    downloadDocument.mockRejectedValue(new Error("Download failed"));

    render(
      <PreviewDocumentModal
        isOpen={true}
        document={mockDocument}
        onClose={vi.fn()}
      />
    );

    fireEvent.click(screen.getByTitle("Download"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to download document"
      );
    });
  });
});