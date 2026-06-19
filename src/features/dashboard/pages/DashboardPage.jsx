import useDashboardData from "../hooks/useDashboardData";

import DashboardToolbar from "../components/DashboardToolbar";
import KpiCards from "../components/KpiCards";
import PortfolioProgress from "../components/PortfolioProgress";
import { useNavigate } from "react-router-dom";
import ProgressCard from "../components/ProgressCard";

export default function DashboardPage() {
  const data = useDashboardData();
  const navigate = useNavigate();

  const handleCreateProject = () => {
    navigate("/create-project");
  };

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
      <KpiCards data={data} />

      <PortfolioProgress data={data} />

      <ProgressCard/>
    </div>
  );
}
