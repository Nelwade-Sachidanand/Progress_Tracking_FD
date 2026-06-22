

import ProjectOverview from "../components/ProjectOverview";
import { getSelectedProject } from "../data/projectDetailData";
import ExecutiveSummary from "../components/ExecutiveSummary";
import MilestoneJourney from "../components/MilestoneJourney";
import ActivityStatusOverview from "../components/ActivityStatusOverview";
import RiskAndIssues from "../components/RiskAndIssues";
import GoLiveReadiness from "../components/GoLiveReadiness";
import ExecutiveHealth from "../components/ExecutiveHealth";
import Footer from "../../../components/layout/Footer";

export default function ProjectDetailPage() {
      const project =
            getSelectedProject();
      return (
            <div className="p-6 bg-[#F8FAFC] min-h-screen">

                  <ProjectOverview project={project} />
                  <div className="h-5"></div>
                  <ExecutiveSummary project={project} />
                  <div className="h-0"></div>
                 <MilestoneJourney project={project}/>
                  <div className="h-5"></div>
                  <ActivityStatusOverview project={project}/>
                  <div className="h-5"></div>
                <RiskAndIssues project={project}/>
                  <div className="h-5"></div>
                  <GoLiveReadiness project={project} />
                  <div className="h-5"></div>
                  <ExecutiveHealth />
                  <Footer></Footer>
            </div>
      );
}

