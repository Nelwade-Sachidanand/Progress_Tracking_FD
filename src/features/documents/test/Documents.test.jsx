import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Documents from "../pages/Documents";

const mockFetchProjects = vi.fn();
const mockUseDocumentFilters = vi.fn();

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: [
      {
        id: 1,
        projectName: "Project A",
        bankName: "ABC Bank",
        phases: [],
      },
    ],
    fetchProjects: mockFetchProjects,
  }),
}));

vi.mock("../services/documentService", () => ({
  getAllDocuments: vi.fn().mockResolvedValue({
    statusType: "S",
    details: [],
  }),
}));

vi.mock("../hooks/useDocumentFilters", () => ({
  default: (...args) => mockUseDocumentFilters(...args),
}));

vi.mock("../components/DocumentFilters", () => ({
  default: () => <div>Document Filters</div>,
}));

vi.mock("../components/DocumentTable", () => ({
  default: ({ onUpload, onPreview }) => (
    <div>
      <div>Document Table</div>

      <button onClick={() => onUpload({ id: 1 })}>
        Upload
      </button>

      <button onClick={() => onPreview({ id: 1 })}>
        Preview
      </button>
    </div>
  ),
}));

vi.mock("../components/UploadDocumentModal", () => ({
  default: ({ isOpen }) =>
    isOpen ? <div>Upload Modal</div> : null,
}));

vi.mock("../components/PreviewDocumentModal", () => ({
  default: ({ isOpen }) =>
    isOpen ? <div>Preview Modal</div> : null,
}));

vi.mock("../../../components/layout/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

const emptyHookData = {
  phases: [],
  milestones: [],
  tasks: [],
  subTasks: [],
  activities: [],

  selectedPhase: "All Phases",
  selectedMilestone: [],
  selectedTask: "All Tasks",
  selectedSubTask: "All Sub Tasks",
  selectedActivity: "All Activities",
  selectedStatus: "All Status",
  searchTerm: "",

  setSelectedPhase: vi.fn(),
  setSelectedMilestone: vi.fn(),
  setSelectedTask: vi.fn(),
  setSelectedSubTask: vi.fn(),
  setSelectedActivity: vi.fn(),
  setSelectedStatus: vi.fn(),
  setSearchTerm: vi.fn(),

  handlePhaseChange: vi.fn(),
  handleMilestoneChange: vi.fn(),
  handleTaskChange: vi.fn(),
  handleSubTaskChange: vi.fn(),

  filteredDocuments: [],
};

const documentHookData = {
  ...emptyHookData,
  filteredDocuments: [
    {
      id: 1,
      activity: "KYC Upload",
      uploadStatus: "Pending",
    },
  ],
};

describe("Documents", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    sessionStorage.setItem(
      "user",
      JSON.stringify({ id: 1 })
    );

    sessionStorage.setItem("selectedProjectId", "1");
  });

  it("renders page title", () => {
    mockUseDocumentFilters.mockReturnValue(emptyHookData);

    render(<Documents />);

    expect(
      screen.getByText("Sign Off Documents")
    ).toBeInTheDocument();
  });

  it("shows selected project", () => {
    mockUseDocumentFilters.mockReturnValue(emptyHookData);

    render(<Documents />);

    expect(screen.getByText("Project A")).toBeInTheDocument();
  });

  it("renders filters", () => {
    mockUseDocumentFilters.mockReturnValue(emptyHookData);

    render(<Documents />);

    expect(
      screen.getByText("Document Filters")
    ).toBeInTheDocument();
  });

  it("shows summary cards", () => {
    mockUseDocumentFilters.mockReturnValue(emptyHookData);

    render(<Documents />);

    expect(
      screen.getByText("Total Documents")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Uploaded")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pending")
    ).toBeInTheDocument();
  });

  it("shows empty state", () => {
    mockUseDocumentFilters.mockReturnValue(emptyHookData);

    render(<Documents />);

    expect(
      screen.getByText("No Sign-Off Documents Found")
    ).toBeInTheDocument();
  });

  it("renders document table", () => {
    mockUseDocumentFilters.mockReturnValue(documentHookData);

    render(<Documents />);

    expect(
      screen.getByText("Document Table")
    ).toBeInTheDocument();
  });

  it("opens upload modal", () => {
    mockUseDocumentFilters.mockReturnValue(documentHookData);

    render(<Documents />);

    fireEvent.click(screen.getByText("Upload"));

    expect(
      screen.getByText("Upload Modal")
    ).toBeInTheDocument();
  });

  it("opens preview modal", () => {
    mockUseDocumentFilters.mockReturnValue(documentHookData);

    render(<Documents />);

    fireEvent.click(screen.getByText("Preview"));

    expect(
      screen.getByText("Preview Modal")
    ).toBeInTheDocument();
  });

  it("shows pagination when documents exist", () => {
    mockUseDocumentFilters.mockReturnValue(documentHookData);

    render(<Documents />);

    expect(
      screen.getByText("Pagination")
    ).toBeInTheDocument();
  });
});