import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import MilestoneTable from "../components/MilestoneTable";

import { getMilestoneManagementData } from "../utils/milestoneManagementUtils";

import { useProjects } from "../../../context/ProjectContext";
import { useMilestone } from "../hooks/useMilestone";

export default function MilestoneManagement() {
  const { projects } = useProjects();

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const [milestones, setMilestones] = useState([]);

  const { updateWeightages, loading } = useMilestone();

  useEffect(() => {
    if (!selectedProjectId) {
      setMilestones([]);
      return;
    }

    setMilestones(
      getMilestoneManagementData(selectedProjectId, projects)
    );
  }, [selectedProjectId, projects]);

  const handleWeightageChange = (index, value) => {
    const updated = [...milestones];

    updated[index].weightage =
      value === "" ? "" : Number(value);

    setMilestones(updated);
  };

  const handleUpdate = async () => {
    try {
      const totalWeightage = milestones.reduce(
        (sum, item) => sum + Number(item.weightage || 0),
        0
      );

      if (totalWeightage !== 100) {
        toast.error("Total weightage must equal 100%");
        return;
      }

      const payload = {
        projectId: selectedProjectId,
        milestones: milestones.map((item) => ({
          phaseId: item.phaseId,
          milestoneId: item.milestoneId,
          weightage: Number(item.weightage),
        })),
      };

      await updateWeightages(payload);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update milestone weightages.");
    }
  };

  return (
    <div
      className="
        p-4
        xl:p-5
        2xl:p-6
        space-y-4
      "
    >
      <MilestoneTable
        milestones={milestones}
        loading={loading}
        onUpdate={handleUpdate}
        onWeightageChange={handleWeightageChange}
      />
    </div>
  );
}