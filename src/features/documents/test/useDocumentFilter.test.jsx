import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useDocumentFilters from "../useDocumentFilters";

const docs = [
  {
    milestone: "M01",
    activity: "A1",
    uploadedBy: "Admin",
    uploadStatus: "Uploaded",
    fileName: "file1.pdf",
  },
  {
    milestone: "M02",
    activity: "A2",
    uploadedBy: "User",
    uploadStatus: "Pending",
    fileName: "file2.pdf",
  },
];

describe("useDocumentFilters", () => {
  it("filters by status", () => {
    const { result } = renderHook(() => useDocumentFilters(docs));

    act(() => {
      result.current.setSelectedStatus("Uploaded");
    });

    expect(result.current.filteredDocuments.length).toBe(1);
  });

  it("filters by search", () => {
    const { result } = renderHook(() => useDocumentFilters(docs));

    act(() => {
      result.current.setSearchTerm("file2");
    });

    expect(result.current.filteredDocuments.length).toBe(1);
  });
});