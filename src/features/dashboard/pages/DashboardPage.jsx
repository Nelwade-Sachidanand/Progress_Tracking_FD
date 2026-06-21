import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardToolbar from "../components/DashboardToolbar";
import KpiCards from "../components/KpiCards";
import PortfolioProgress from "../components/PortfolioProgress";
import ProgressCard from "../components/ProgressCard";
import useDashboardData from "../hooks/useDashboardData";

import {
  calculateOverallProgress,
  getActiveProjects,
  getDelayedProjects,
  getMilestoneStats,
  getOnTrackProjects,
  getTotalBanks,
  getUpcomingGoLiveProjects,
} from "../utils/dashboardUtils";

export default function DashboardPage() {
  const data = useDashboardData();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const [selectedBank, setSelectedBank] = useState(
    localStorage.getItem("selectedBank") || "All Banks",
  );

  useEffect(() => {
    const handleBankChange = () => {
      setSelectedBank(localStorage.getItem("selectedBank") || "All Banks");
    };

    window.addEventListener("bankChanged", handleBankChange);

    return () => window.removeEventListener("bankChanged", handleBankChange);
  }, []);

  useEffect(() => {
    const handleSearchChange = (event) => {
      setSearchText(event.detail);
    };

    window.addEventListener("dashboardSearch", handleSearchChange);

    return () => {
      window.removeEventListener("dashboardSearch", handleSearchChange);
    };
  }, []);

  const filteredProjects = (data.projects || []).filter((project) => {
    const bankMatch =
      selectedBank === "All Banks" || project.bankName === selectedBank;

    const searchMatch =
      !searchText ||
      project.bankName?.toLowerCase().includes(searchText.toLowerCase()) ||
      project.projectName?.toLowerCase().includes(searchText.toLowerCase());

    return bankMatch && searchMatch;
  });

  const dashboardData = useMemo(() => {
    const projects = filteredProjects;

    const overallProgress = calculateOverallProgress(projects);

    const delayedProjects = getDelayedProjects(projects);

    const onTrackProjects = getOnTrackProjects(projects);

    const upcomingGoLiveProjects = getUpcomingGoLiveProjects(projects);

    const milestoneStats = getMilestoneStats(projects);

    return {
      projects,

      totalBanks: getTotalBanks(projects),

      totalProjects: projects.length,

      activeProjects: getActiveProjects(projects),

      delayedProjects: delayedProjects.length,

      onTrackProjects: onTrackProjects.length,

      upcomingGoLive: upcomingGoLiveProjects.length,

      completedMilestones: milestoneStats.completed,

      inProgressMilestones: milestoneStats.inProgress,

      delayedMilestones: milestoneStats.delayed,

      overallProgress,
    };
  }, [filteredProjects]);

  return (
    <div
      className="
      p-4
      md:p-6
      xl:p-8
      space-y-6
      "
    >
      <DashboardToolbar onCreateProject={handleCreateProject} />
      <KpiCards data={dashboardData} />

      <PortfolioProgress data={dashboardData} />

      <ProgressCard projects={filteredProjects} />
    </div>
  );
}
