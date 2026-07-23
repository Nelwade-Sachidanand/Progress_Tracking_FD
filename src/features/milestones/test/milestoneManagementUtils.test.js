import { describe, it, expect } from "vitest";
import { getMilestoneManagementData } from "../utils/milestoneManagementUtils";

describe("getMilestoneManagementData", () => {
  const projects = [
    {
      id: "P1",
      projectName: "Project One",
      bankName: "HDFC",
      phases: [
        {
          phaseId: "PH1",
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneId: "M1",
              milestoneName: "Milestone 1",
              weightage: 40,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        { progress: 50 },
                        { progress: 100 },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              milestoneId: "M2",
              milestoneName: "Milestone 2",
              weightage: 60,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        { progress: 20 },
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
    {
      id: "P2",
      projectName: "Project Two",
      bankName: "SBI",
      phases: [
        {
          phaseId: "PH2",
          phaseName: "Phase 2",
          milestones: [
            {
              milestoneId: "M3",
              milestoneName: "Milestone 3",
              weightage: 100,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [
                        { progress: 80 },
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

  it("returns milestones for selected project", () => {
    const result = getMilestoneManagementData("P1", projects);

    expect(result).toHaveLength(2);

    expect(result[0].projectId).toBe("P1");
    expect(result[0].projectName).toBe("Project One");
    expect(result[0].bankName).toBe("HDFC");
  });

  it("returns all milestones when selectedProjectId is empty", () => {
    const result = getMilestoneManagementData("", projects);

    expect(result).toHaveLength(3);
  });

  it("calculates average progress correctly", () => {
    const result = getMilestoneManagementData("P1", projects);

    expect(result[0].progress).toBe(75); // (50+100)/2
    expect(result[1].progress).toBe(20);
  });

  it("returns zero progress when no activities exist", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "M1",
                tasks: [],
              },
            ],
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(0);
  });

  it("uses empty string when weightage is null", () => {
    const data = [
      {
        id: "P1",
        projectName: "Project",
        bankName: "Bank",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
                weightage: null,
                tasks: [],
              },
            ],
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].weightage).toBe("");
  });

  it("creates correct id", () => {
    const result = getMilestoneManagementData("P1", projects);

    expect(result[0].id).toBe("P1-M1");
  });

  it("returns empty array when project not found", () => {
    const result = getMilestoneManagementData("XYZ", projects);

    expect(result).toEqual([]);
  });

  it("handles undefined phases", () => {
    const data = [
      {
        id: "P1",
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result).toEqual([]);
  });

  it("handles undefined milestones", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result).toEqual([]);
  });

  it("handles undefined tasks", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
              },
            ],
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(0);
  });

  it("handles undefined subTasks", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
                tasks: [{}],
              },
            ],
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(0);
  });

  it("handles undefined activities", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
                tasks: [
                  {
                    subTasks: [{}],
                  },
                ],
              },
            ],
          },
        ],
      },
    ];

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(0);
  });

  it("treats missing activity progress as zero", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
                tasks: [
                  {
                    subTasks: [
                      {
                        activities: [{}, {}],
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

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(0);
  });

  it("rounds average progress", () => {
    const data = [
      {
        id: "P1",
        phases: [
          {
            phaseId: "PH1",
            phaseName: "Phase",
            milestones: [
              {
                milestoneId: "M1",
                milestoneName: "Milestone",
                tasks: [
                  {
                    subTasks: [
                      {
                        activities: [
                          { progress: 20 },
                          { progress: 21 },
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

    const result = getMilestoneManagementData("P1", data);

    expect(result[0].progress).toBe(21);
  });
});