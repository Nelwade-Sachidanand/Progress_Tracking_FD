import { describe, it, expect, vi, beforeEach } from "vitest";
import apiClient from "../../../services/apiClient";
import {
  uploadDocument,
  getAllDocuments,
  downloadDocument,
} from "../services/documentService";

vi.mock("../../../services/apiClient", () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

describe("documentService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("uploads document successfully", async () => {
    const file = new File(["test"], "test.pdf", {
      type: "application/pdf",
    });

    const payload = {
      projectId: "1",
      projectName: "Project A",
      bankName: "ABC Bank",
      phaseName: "Phase 1",
      milestoneName: "M1",
      taskName: "Task 1",
      subTaskName: "SubTask 1",
      activityName: "Activity 1",
    };

    apiClient.post.mockResolvedValue({
      data: {
        statusType: "S",
      },
    });

    const result = await uploadDocument(file, payload);

    expect(apiClient.post).toHaveBeenCalledTimes(1);

    expect(apiClient.post).toHaveBeenCalledWith(
      "/documents/upload",
      expect.any(FormData),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    expect(result).toEqual({
      statusType: "S",
    });
  });

  it("gets all documents", async () => {
    const response = {
      statusType: "S",
      details: [],
    };

    apiClient.get.mockResolvedValue({
      data: response,
    });

    const result = await getAllDocuments();

    expect(apiClient.get).toHaveBeenCalledWith(
      "/documents/getAll"
    );

    expect(result).toEqual(response);
  });

  it("downloads document", async () => {
    const blob = new Blob(["test"]);

    apiClient.get.mockResolvedValue({
      data: blob,
      headers: {
        "content-type": "application/pdf",
      },
    });

    const result = await downloadDocument(10);

    expect(apiClient.get).toHaveBeenCalledWith(
      "/documents/download/10",
      {
        responseType: "blob",
      }
    );

    expect(result.data).toEqual(blob);
  });

  it("throws upload error", async () => {
    apiClient.post.mockRejectedValue(new Error("Upload Failed"));

    const file = new File(["abc"], "test.pdf", {
      type: "application/pdf",
    });

    const payload = {
      projectId: "1",
      projectName: "Project A",
      bankName: "ABC",
      phaseName: "Phase 1",
      milestoneName: "M1",
      taskName: "Task",
      subTaskName: "SubTask",
      activityName: "Activity",
    };

    await expect(
      uploadDocument(file, payload)
    ).rejects.toThrow("Upload Failed");
  });

  it("throws getAllDocuments error", async () => {
    apiClient.get.mockRejectedValue(new Error("Server Error"));

    await expect(getAllDocuments()).rejects.toThrow(
      "Server Error"
    );
  });

  it("throws downloadDocument error", async () => {
    apiClient.get.mockRejectedValue(new Error("Download Failed"));

    await expect(downloadDocument(1)).rejects.toThrow(
      "Download Failed"
    );
  });
});