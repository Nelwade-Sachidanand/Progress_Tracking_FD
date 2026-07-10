import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DocumentTable from "../Components/DocumentTable";

describe("DocumentTable", () => {
  const mockDocuments = [
    {
      id: 1,
      activity: "KYC Upload",
      phase: "Phase 1",
      milestone: "Milestone 1",
      documents: [
        {
          fileName: "doc1.pdf",
          uploadedBy: "Admin",
          uploadedDate: "2025-01-01T10:00:00",
        },
      ],
    },
  ];

  it("renders document information", () => {
    render(
      <DocumentTable
        documents={mockDocuments}
        onUpload={vi.fn()}
        onPreview={vi.fn()}
        onHistory={vi.fn()}
      />
    );

    expect(screen.getByText("KYC Upload")).toBeInTheDocument();
    expect(screen.getByText("doc1.pdf")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("Uploaded")).toBeInTheDocument();
  });

  it("calls upload handler", () => {
    const onUpload = vi.fn();

    render(
      <DocumentTable
        documents={mockDocuments}
        onUpload={onUpload}
        onPreview={vi.fn()}
        onHistory={vi.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

    expect(onUpload).toHaveBeenCalledTimes(1);
    expect(onUpload).toHaveBeenCalledWith(mockDocuments[0]);
  });

  it("calls preview handler", () => {
    const onPreview = vi.fn();

    render(
      <DocumentTable
        documents={mockDocuments}
        onUpload={vi.fn()}
        onPreview={onPreview}
        onHistory={vi.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[1]);

    expect(onPreview).toHaveBeenCalledTimes(1);
    expect(onPreview).toHaveBeenCalledWith(
      mockDocuments[0].documents[0]
    );
  });

  it("shows 'No File' when no document exists", () => {
    render(
      <DocumentTable
        documents={[
          {
            id: 2,
            activity: "PAN Upload",
            phase: "Phase 1",
            milestone: "Milestone 2",
            documents: [],
          },
        ]}
        onUpload={vi.fn()}
        onPreview={vi.fn()}
        onHistory={vi.fn()}
      />
    );

    expect(screen.getByText("No File")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("disables preview button when no file exists", () => {
    render(
      <DocumentTable
        documents={[
          {
            id: 2,
            activity: "PAN Upload",
            phase: "Phase 1",
            milestone: "Milestone 2",
            documents: [],
          },
        ]}
        onUpload={vi.fn()}
        onPreview={vi.fn()}
        onHistory={vi.fn()}
      />
    );

    const buttons = screen.getAllByRole("button");

    expect(buttons[1]).toBeDisabled();
  });

  it("renders empty state when documents array is empty", () => {
    render(
      <DocumentTable
        documents={[]}
        onUpload={vi.fn()}
        onPreview={vi.fn()}
        onHistory={vi.fn()}
      />
    );

    expect(screen.getByText("No documents found.")).toBeInTheDocument();
  });
});