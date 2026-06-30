import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UploadDocumentModal from "../UploadDocumentModal";

const mockDoc = { activity: "Test Activity" };

describe("UploadDocumentModal", () => {
  it("renders modal when open", () => {
    render(
      <UploadDocumentModal
        isOpen={true}
        document={mockDoc}
        onClose={() => {}}
        onUpload={() => {}}
      />
    );

    expect(screen.getByText("Upload Document")).toBeInTheDocument();
    expect(screen.getByText("Test Activity")).toBeInTheDocument();
  });

  it("accepts valid file types and triggers upload", () => {
    const onUpload = vi.fn();

    render(
      <UploadDocumentModal
        isOpen={true}
        document={mockDoc}
        onClose={() => {}}
        onUpload={onUpload}
      />
    );

    const input = screen.getByTestId("file-input");

    const validFiles = [
      new File(["pdf"], "test.pdf", {
        type: "application/pdf",
      }),
      new File(["word"], "test.docx", {
        type:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      }),
      new File(["excel"], "test.xlsx", {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      new File(["image"], "test.png", {
        type: "image/png",
      }),
    ];

    validFiles.forEach((file) => {
      fireEvent.change(input, {
        target: { files: [file] },
      });

      fireEvent.click(screen.getByText("Upload Document"));

      expect(onUpload).toHaveBeenCalled();
    });

    expect(onUpload).toHaveBeenCalledTimes(validFiles.length);
  });

  it("rejects invalid file types", () => {
    const onUpload = vi.fn();
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(
      <UploadDocumentModal
        isOpen={true}
        document={mockDoc}
        onClose={() => {}}
        onUpload={onUpload}
      />
    );

    const input = screen.getByTestId("file-input");

    const invalidFile = new File(["virus"], "test.exe", {
      type: "application/x-msdownload",
    });

    fireEvent.change(input, {
      target: { files: [invalidFile] },
    });

    fireEvent.click(screen.getByText("Upload Document"));

    expect(onUpload).not.toHaveBeenCalled();
    expect(alertMock).toHaveBeenCalledWith(
      "Only PDF, Word, Excel and Images are allowed."
    );

    alertMock.mockRestore();
  });
});