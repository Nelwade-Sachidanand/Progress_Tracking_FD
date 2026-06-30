import { describe, expect, it } from "vitest";

import {
  getBanks,
  getMilestoneManagementData,
} from "../utils/milestoneManagementUtils";

describe("milestoneManagementUtils", () => {
  const projects = [
    {
      id: "P1",
      projectName: "Project A",
      bankName: "HDFC",
      phases: [
        {
          phaseName: "Phase 1",
          milestones: [
            {
              milestoneName: "Requirement",
              weightage: 20,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 100 }, { progress: 50 }],
                    },
                  ],
                },
              ],
            },
            {
              milestoneName: "Development",
              weightage: 30,
              tasks: [],
            },
          ],
        },
      ],
    },
    {
      id: "P2",
      projectName: "Project B",
      bankName: "ICICI",
      phases: [
        {
          phaseName: "Phase 2",
          milestones: [
            {
              milestoneName: "Testing",
              weightage: 50,
              tasks: [
                {
                  subTasks: [
                    {
                      activities: [{ progress: 100 }],
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

  describe("getBanks", () => {
    it("returns unique bank names", () => {
      expect(getBanks(projects)).toEqual(["HDFC", "ICICI"]);
    });

    it("returns empty array for empty projects", () => {
      expect(getBanks([])).toEqual([]);
    });

    it("removes duplicate bank names", () => {
      const duplicateProjects = [
        ...projects,
        {
          id: "P3",
          bankName: "HDFC",
        },
      ];

      expect(getBanks(duplicateProjects)).toEqual(["HDFC", "ICICI"]);
    });

    it("returns single bank", () => {
      expect(
        getBanks([
          {
            bankName: "Axis",
          },
        ]),
      ).toEqual(["Axis"]);
    });
  });

  describe("getMilestoneManagementData", () => {
    it("returns milestones for selected bank", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result).toHaveLength(2);
    });

    it("returns correct project id", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].projectId).toBe("P1");
    });

    it("returns milestone name", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].milestoneName).toBe("Requirement");
    });

    it("returns phase name", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].phaseName).toBe("Phase 1");
    });

    it("returns project name", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].projectName).toBe("Project A");
    });

    it("returns bank name", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].bankName).toBe("HDFC");
    });

    it("calculates average progress", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].progress).toBe(75);
    });

    it("returns zero progress when no activities", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[1].progress).toBe(0);
    });

    it("returns correct weightage", () => {
      const result = getMilestoneManagementData("HDFC", projects);

      expect(result[0].weightage).toBe(20);
    });

    it("returns empty weightage when undefined", () => {
      const data = [
        {
          id: "P1",
          projectName: "Project",
          bankName: "HDFC",
          phases: [
            {
              phaseName: "Phase",
              milestones: [
                {
                  milestoneName: "Milestone",
                  tasks: [],
                },
              ],
            },
          ],
        },
      ];

      const result = getMilestoneManagementData("HDFC", data);

      expect(result[0].weightage).toBe("");
    });

    it("returns empty array when bank not found", () => {
      expect(getMilestoneManagementData("SBI", projects)).toEqual([]);
    });

    it("returns all milestones for matching bank", () => {
      const result = getMilestoneManagementData("ICICI", projects);

      expect(result).toHaveLength(1);
    });

    it("creates unique milestone id", () => {
      const result = getMilestoneManagementData("ICICI", projects);

      expect(result[0].id).toBe("Project B-Testing");
    });

    it("handles empty project list", () => {
      expect(getMilestoneManagementData("HDFC", [])).toEqual([]);
    });

    it("handles project without phases", () => {
      const result = getMilestoneManagementData("HDFC", [
        {
          bankName: "HDFC",
          phases: [],
        },
      ]);

      expect(result).toEqual([]);
    });

    it("handles milestone without tasks", () => {
      const data = [
        {
          id: "1",
          projectName: "Demo",
          bankName: "HDFC",
          phases: [
            {
              phaseName: "Phase",
              milestones: [
                {
                  milestoneName: "M1",
                  weightage: 40,
                },
              ],
            },
          ],
        },
      ];

      const result = getMilestoneManagementData("HDFC", data);

      expect(result[0].progress).toBe(0);
    });
  });
});
