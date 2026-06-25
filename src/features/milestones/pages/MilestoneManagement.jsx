import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import BankSelector from "../components/BankSelector";
import MilestoneTable from "../components/MilestoneTable";

import {
  getBanks,
  getMilestoneManagementData,
} from "../utils/milestoneManagementUtils";

import { useProjects } from "../../../context/ProjectContext";
import { useMilestone } from "../hooks/useMilestone";

export default function MilestoneManagement() {
  const { projects } = useProjects();

  const [banks, setBanks] = useState([]);

  const [selectedBank, setSelectedBank] = useState("");

  const [milestones, setMilestones] = useState([]);

  const { updateWeightages, loading } = useMilestone();

  useEffect(() => {
    const bankList = getBanks(projects);

    setBanks(bankList);

    if (bankList.length) {
      setSelectedBank(bankList[0]);
    }
  }, [projects]);

  useEffect(() => {
    if (!selectedBank) return;
    setMilestones(getMilestoneManagementData(selectedBank, projects));
  }, [selectedBank, projects]);

  const handleWeightageChange = (index, value) => {
    const updated = [...milestones];

    updated[index].weightage = value === "" ? "" : Number(value);

    setMilestones(updated);
  };

  const handleUpdate = async () => {
    try {
      if (
        milestones.reduce(
          (sum, item) => sum + Number(item.weightage || 0),
          0,
        ) !== 100
      ) {
        toast.error("Total weightage must equal 100%");

        return;
      }

      const payload = {
        projectId: milestones[0]?.projectId,

        milestones: milestones.map((item) => ({
          phaseName: item.phaseName,
          milestoneName: item.milestoneName,
          weightage: Number(item.weightage),
        })),
      };

      // console.log("Update Payload",payload);

      await updateWeightages(payload);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="
        p-4
        xl:p-6
        2xl:p-8
        space-y-6
      "
    >
      <BankSelector
        banks={banks}
        selectedBank={selectedBank}
        setSelectedBank={setSelectedBank}
      />

      <MilestoneTable
        milestones={milestones}
        loading={loading}
        onUpdate={handleUpdate}
        onWeightageChange={handleWeightageChange}
      />
    </div>
  );
}
