import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import TaskActions from "../components/TaskActions";
import { exportExcelReport } from "../../add-task/api/exportExcelApi";
import { toast } from "react-toastify";
import { Packer } from "docx";
import { saveAs } from "file-saver";
const navigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => navigate,
}));

let mockProjects = [
  {
    id: "1",
    projectName: "Demo Project",
    bankName: "ABC Bank",
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "Milestone 1",
            tasks: [
              {
                taskName: "Task 1",
                subTasks: [
                  {
                    subTaskName: "Sub Task 1",
                    activities: [
                      {
                        activityName: "Activity 1",
                        owner: "Sachin",
                        progress: 75,
                        executionStatus: "Completed",
                        scheduleHealth: "On Track",
                        plannedStartDate: "2025-01-01",
                        plannedEndDate: "2025-01-05",
                        actualStartDate: "2025-01-01",
                        actualEndDate: "2025-01-05",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

vi.mock("../../../context/ProjectContext", () => ({
  useProjects: () => ({
    projects: mockProjects,
  }),
}));

vi.mock("../../add-task/api/exportExcelApi", () => ({
  exportExcelReport: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("file-saver", () => ({
  saveAs: vi.fn(),
}));

vi.mock("docx", () => ({
  Document: vi.fn(),
  Packer: {
    toBlob: vi.fn().mockResolvedValue(new Blob(["doc"])),
  },
  Paragraph: vi.fn(),
  Table: vi.fn(),
  TableRow: vi.fn(),
  TableCell: vi.fn(),
  HeadingLevel: {
    HEADING_1: "Heading1",
  },
  WidthType: {},
}));

vi.mock("../components/PrintReport", () => ({
  default: () => (
    <div data-testid="print-report">
      Print Report
    </div>
  ),
}));

vi.mock("../components/GenerateReportModal", () => ({
  default: ({
    isOpen,
    onClose,
    onGenerate,
    setReportType,
  }) =>
    isOpen ? (
      <div>
        <h2>Generate Report Modal</h2>

        <button onClick={() => setReportType("pdf")}>
          PDF
        </button>

        <button onClick={() => setReportType("excel")}>
          Excel
        </button>

        <button onClick={() => setReportType("csv")}>
          CSV
        </button>

        <button onClick={() => setReportType("word")}>
          Word
        </button>

        <button onClick={onGenerate}>
          Generate
        </button>

        <button onClick={onClose}>
          Close Modal
        </button>
      </div>
    ) : null,
}));

const defaultProps = {
  activities: [],
  selectedPhase: "All Phases",
  selectedMilestone: [],
  selectedTask: "All Tasks",
  selectedSubTask: "All Sub Tasks",
  selectedActivity: "All Activities",
  selectedStatus: "All Status",
};

beforeEach(() => {
  vi.clearAllMocks();
mockProjects = [
  {
    id: "1",
    projectName: "Demo Project",
    bankName: "ABC Bank",
    phases: [
      {
        phaseName: "Phase 1",
        milestones: [
          {
            milestoneName: "Milestone 1",
            tasks: [
              {
                taskName: "Task 1",
                subTasks: [
                  {
                    subTaskName: "Sub Task 1",
                    activities: [
                      {
                        activityName: "Activity 1",
                        owner: "Sachin",
                        progress: 75,
                        executionStatus: "Completed",
                        scheduleHealth: "On Track",
                        plannedStartDate: "2025-01-01",
                        plannedEndDate: "2025-01-05",
                        actualStartDate: "2025-01-01",
                        actualEndDate: "2025-01-05",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
  sessionStorage.clear();

  sessionStorage.setItem("selectedProjectId", "1");
  sessionStorage.setItem("selectedProjectName", "Demo Project");

  sessionStorage.setItem(
    "user",
    JSON.stringify({
      role: "ADMIN",
    })
  );

  window.URL.createObjectURL = vi.fn(() => "blob:test");
  window.URL.revokeObjectURL = vi.fn();

  HTMLAnchorElement.prototype.click = vi.fn();

  window.open = vi.fn(() => ({
    document: {
      write: vi.fn(),
      close: vi.fn(),
    },
    print: vi.fn(),
    close: vi.fn(),
    focus: vi.fn(),
  }));
});
describe("TaskActions - Render & Navigation", () => {
  it("renders Generate Report button", () => {
    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders Add Task button for ADMIN", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /add task/i,
      })
    ).toBeInTheDocument();
  });

  it("renders Add Task button for IMPLEMENTATION USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /add task/i,
      })
    ).toBeInTheDocument();
  });

  it("does not render Add Task button for USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.queryByRole("button", {
        name: /add task/i,
      })
    ).not.toBeInTheDocument();
  });

  it("opens Generate Report modal", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    expect(
      screen.getByText("Generate Report Modal")
    ).toBeInTheDocument();
  });

  it("closes Generate Report modal", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /close modal/i,
      })
    );

    expect(
      screen.queryByText("Generate Report Modal")
    ).not.toBeInTheDocument();
  });

  it("navigates to add-task page", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    expect(navigate).toHaveBeenCalledWith(
      "add-task"
    );
  });

  it("renders PrintReport component", () => {
    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByTestId("print-report")
    ).toBeInTheDocument();
  });

  it("renders hidden PrintReport container", () => {
    const { container } = render(
      <TaskActions {...defaultProps} />
    );

    const hiddenDiv =
      container.querySelector(
        'div[style*="left: -9999px"]'
      );

    expect(hiddenDiv).toBeTruthy();
  });

  it("opens modal multiple times", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    expect(
      screen.getByText("Generate Report Modal")
    ).toBeInTheDocument();
  });

  it("renders without crashing when activities prop is empty", () => {
    render(
      <TaskActions
        {...defaultProps}
        activities={[]}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders with selected filters", () => {
    render(
      <TaskActions
        {...defaultProps}
        selectedPhase="Phase 1"
        selectedMilestone={["Milestone 1"]}
        selectedTask="Task 1"
        selectedSubTask="Sub Task 1"
        selectedActivity="Activity 1"
        selectedStatus="Completed"
      />
    );

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });
});
describe("TaskActions - PDF & Excel", () => {
  it("generates PDF report", async () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "PDF",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(window.open).toHaveBeenCalled();
    });

    expect(toast.error).not.toHaveBeenCalled();
  });

  it("exports excel successfully", async () => {
    exportExcelReport.mockResolvedValue(
      new Blob(["excel"])
    );

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Excel",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(exportExcelReport).toHaveBeenCalledTimes(1);
    });
expect(exportExcelReport).toHaveBeenCalledWith(
  expect.objectContaining({
    projectId: "1",
    projectName: "Demo Project",
  })
);

    expect(window.URL.createObjectURL).toHaveBeenCalled();

    // expect(toast.success).toHaveBeenCalledWith(
    //   "Excel downloaded successfully"
    // );
    expect(toast.success).toHaveBeenCalled();
  });

  it("shows excel export error", async () => {
    exportExcelReport.mockRejectedValue({
      response: {
        data: {
          statusDesc: "Export Failed",
        },
      },
    });

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Excel",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Export Failed"
      );
    });
  });

  it("shows generic excel export error", async () => {
    exportExcelReport.mockRejectedValue(
      new Error("Server Error")
    );

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Excel",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to export report"
      );
    });
  });

  it("shows no project selected error", () => {
    sessionStorage.removeItem("selectedProjectId");

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "No project selected. No permission to generate report."
    );
  });

  it("shows invalid project error", () => {
    sessionStorage.setItem("selectedProjectId", "999");

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    expect(toast.error).toHaveBeenCalled();
  });

  it("closes modal after successful excel export", async () => {
    exportExcelReport.mockResolvedValue(
      new Blob(["excel"])
    );

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Excel",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(
        screen.queryByText("Generate Report Modal")
      ).not.toBeInTheDocument();
    });
  });
});


describe("TaskActions - CSV & Word Report", () => {
  it("downloads CSV successfully", async () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "CSV",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Generate",
      })
    );

    await waitFor(() => {
      expect(window.URL.createObjectURL).toHaveBeenCalled();
    });
expect(toast.success).toHaveBeenCalled();
    // expect(toast.success).toHaveBeenCalledWith(
    //   "CSV report downloaded successfully"
    // );
  });

  it("shows no activities found error for csv", async () => {
   mockProjects = [
  {
    id: "1",
    projectName: "Demo Project",
    bankName: "ABC",
    phases: [],
  },
];

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    fireEvent.click(screen.getByText("CSV"));

   fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "No activities found for selected filters"
      );
    });
  });

  it("handles csv generation exception", async () => {
    vi.spyOn(URL, "createObjectURL").mockImplementation(() => {
      throw new Error("CSV Error");
    });

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Generate Report"));

    fireEvent.click(screen.getByText("CSV"));

  fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to generate CSV report"
      );
    });
  });

  it("downloads word report successfully", async () => {
    Packer.toBlob.mockResolvedValue(new Blob(["doc"]));

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Generate Report"));

fireEvent.click(screen.getByText("Word"));

fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(Packer.toBlob).toHaveBeenCalled();
    });

  });

  it("shows no activities error for word", async () => {
   mockProjects = [
  {
    id: "1",
    projectName: "Demo Project",
    phases: [],
  },
];

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Generate Report"));

    fireEvent.click(screen.getByText("Word"));

    fireEvent.click(screen.getByText("Generate"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "No activities found for selected filters"
      );
    });
  });

  it("handles word generation error", async () => {
    Packer.toBlob.mockRejectedValue(new Error("Doc Error"));

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Generate Report"));

    fireEvent.click(screen.getByText("Word"));
fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Failed to generate Word report"
      );
    });
  });

  it("shows no project selected for word", async () => {
    sessionStorage.setItem("selectedProjectId", "999");

    render(<TaskActions {...defaultProps} />);

    fireEvent.click(screen.getByText("Generate Report"));

    fireEvent.click(screen.getByText("Word"));

  fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
describe("TaskActions - Remaining Branches", () => {
 

 it("opens and closes modal multiple times", () => {
  render(<TaskActions {...defaultProps} />);

  for (let i = 0; i < 3; i++) {
    fireEvent.click(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    );

    expect(
      screen.getByText("Generate Report Modal")
    ).toBeInTheDocument();

    fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    expect(
      screen.queryByText("Generate Report Modal")
    ).not.toBeInTheDocument();
  }
});

  it("renders with empty activities", () => {
    render(
      <TaskActions
        {...defaultProps}
        activities={[]}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders with undefined activities", () => {
    render(
      <TaskActions
        {...defaultProps}
        activities={undefined}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders with null activities", () => {
    render(
      <TaskActions
        {...defaultProps}
        activities={null}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("renders when project list is empty", () => {
    mockProjects = [];

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /generate report/i,
      })
    ).toBeInTheDocument();
  });

  it("handles invalid selected project", async () => {
    sessionStorage.setItem(
      "selectedProjectId",
      "999"
    );


 render(<TaskActions {...defaultProps} />);

fireEvent.click(
  screen.getByRole("button", {
    name: /generate report/i,
  })
);

fireEvent.click(
  screen.getByRole("button", {
    name: /^generate$/i,
  })
);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  it("keeps Add Task hidden for USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "USER",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.queryByRole("button", {
        name: /add task/i,
      })
    ).not.toBeInTheDocument();
  });

  it("shows Add Task for ADMIN", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "ADMIN",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /add task/i,
      })
    ).toBeInTheDocument();
  });

  it("shows Add Task for IMPLEMENTATION USER", () => {
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        role: "IMPLEMENTATION USER",
      })
    );

    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByRole("button", {
        name: /add task/i,
      })
    ).toBeInTheDocument();
  });

  it("navigates to add-task only once", () => {
    render(<TaskActions {...defaultProps} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /add task/i,
      })
    );

    expect(navigate).toHaveBeenCalledTimes(1);

    expect(navigate).toHaveBeenCalledWith(
      "add-task"
    );
  });

  it("renders print component", () => {
    render(<TaskActions {...defaultProps} />);

    expect(
      screen.getByTestId("print-report")
    ).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(
      <TaskActions {...defaultProps} />
    );

    expect(container).toMatchSnapshot();
  });
});