

import ProjectOverview from "../components/ProjectOverview";
import { getSelectedProject } from "../data/projectDetailData";
import ExecutiveSummary from "../components/ExecutiveSummary";
import MilestoneJourney from "../components/MilestoneJourney";
import ActivityStatusOverview from "../components/ActivityStatusOverview";
import RiskAndIssues from "../components/RiskAndIssues";
//import GoLiveReadiness from "../components/GoLiveReadiness";
import ExecutiveHealth from "../components/ExecutiveHealth";
import Footer from "../../../components/layout/Footer";
import { useProjects } from "../../../context/ProjectContext";

export default function ProjectDetailPage() {
  const { projects, loading } = useProjects();

  const project = getSelectedProject(projects);

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6">
        No project found
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <ProjectOverview project={project} />
      <div className="h-5"></div>

      <ExecutiveSummary project={project} />
      <div className="h-5"></div>

      <MilestoneJourney project={project} />
      <div className="h-5"></div>

      <ActivityStatusOverview project={project} />
      <div className="h-5"></div>

      <RiskAndIssues project={project} />
      <div className="h-5"></div>

      {/* <GoLiveReadiness project={project} />
      <div className="h-5"></div> */}

      <ExecutiveHealth />

      <Footer />
    </div>
  );
}

