import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getFileExtension,
  formatFileSize,
  formatDate,
  formatDateTime,
  getStatusColor,
  downloadFile,
  openFile,
} from "../utils/documentUtils";

describe("documentUtils", () => {
  describe("getFileExtension", () => {
    it("returns file extension", () => {
      expect(getFileExtension("test.pdf")).toBe("pdf");
      expect(getFileExtension("image.PNG")).toBe("png");
      expect(getFileExtension("file.xlsx")).toBe("xlsx");
    });

    it("returns empty string when filename is empty", () => {
      expect(getFileExtension("")).toBe("");
      expect(getFileExtension()).toBe("");
    });

    it("returns filename when no extension exists", () => {
      expect(getFileExtension("document")).toBe("document");
    });
  });

  describe("formatFileSize", () => {
    it("returns '-' when size is zero", () => {
      expect(formatFileSize()).toBe("-");
      expect(formatFileSize(0)).toBe("-");
    });

    it("formats KB correctly", () => {
      expect(formatFileSize(1024)).toBe("1.00 KB");
      expect(formatFileSize(2048)).toBe("2.00 KB");
    });

    it("formats MB correctly", () => {
      expect(formatFileSize(1024 * 1024)).toBe("1.00 MB");
      expect(formatFileSize(5 * 1024 * 1024)).toBe("5.00 MB");
    });
  });

  describe("formatDate", () => {
    it("returns '-' for empty date", () => {
      expect(formatDate()).toBe("-");
      expect(formatDate(null)).toBe("-");
    });

    it("formats date", () => {
      const result = formatDate("2025-01-15");
      expect(result).toContain("15");
      expect(result).toContain("2025");
    });
  });

  describe("formatDateTime", () => {
    it("returns '-' for empty datetime", () => {
      expect(formatDateTime()).toBe("-");
      expect(formatDateTime(null)).toBe("-");
    });

    it("formats datetime", () => {
      expect(
        formatDateTime("2025-01-15T10:30:00")
      ).toBeTruthy();
    });
  });

  describe("getStatusColor", () => {
    it("returns uploaded color", () => {
      expect(getStatusColor("Uploaded")).toBe(
        "bg-green-100 text-green-700"
      );
    });

    it("returns pending color", () => {
      expect(getStatusColor("Pending")).toBe(
        "bg-orange-100 text-orange-700"
      );
    });

    it("returns rejected color", () => {
      expect(getStatusColor("Rejected")).toBe(
        "bg-red-100 text-red-700"
      );
    });

    it("returns default color", () => {
      expect(getStatusColor("Unknown")).toBe(
        "bg-slate-100 text-slate-700"
      );
    });
  });

  describe("downloadFile", () => {
    let createElementSpy;
    let appendSpy;
    let removeSpy;

    beforeEach(() => {
      appendSpy = vi.spyOn(document.body, "appendChild");
      removeSpy = vi.spyOn(document.body, "removeChild");

      createElementSpy = vi.spyOn(document, "createElement");
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("returns when url is missing", () => {
      downloadFile();

      expect(createElementSpy).not.toHaveBeenCalled();
    });

    it("creates and clicks download link", () => {
  const appendSpy = vi.spyOn(document.body, "appendChild");
  const removeSpy = vi.spyOn(document.body, "removeChild");

  const clickSpy = vi
    .spyOn(HTMLAnchorElement.prototype, "click")
    .mockImplementation(() => {});

  downloadFile("http://test.com/file.pdf", "file.pdf");

  expect(appendSpy).toHaveBeenCalled();
  expect(clickSpy).toHaveBeenCalled();
  expect(removeSpy).toHaveBeenCalled();
});
  });

  describe("openFile", () => {
    beforeEach(() => {
      window.open = vi.fn();
    });

    it("returns when url is missing", () => {
      openFile();

      expect(window.open).not.toHaveBeenCalled();
    });

    it("opens new tab", () => {
      openFile("http://test.com/file.pdf");

      expect(window.open).toHaveBeenCalledWith(
        "http://test.com/file.pdf",
        "_blank"
      );
    });
  });
});