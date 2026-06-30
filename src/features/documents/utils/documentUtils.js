export function getFileExtension(fileName = "") {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

export function formatFileSize(bytes = 0) {
  if (!bytes) return "-";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }

  return `${(kb / 1024).toFixed(2)} MB`;
}

export function formatDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date) {
  if (!date) return "-";

  return new Date(date).toLocaleString("en-IN");
}

export function getStatusColor(status) {
  switch (status) {
    case "Uploaded":
      return "bg-green-100 text-green-700";

    case "Pending":
      return "bg-orange-100 text-orange-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export function downloadFile(url, fileName) {
  if (!url) return;

  const link = document.createElement("a");

  link.href = url;
  link.download = fileName || "document";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export function openFile(url) {
  if (!url) return;

  window.open(url, "_blank");
}