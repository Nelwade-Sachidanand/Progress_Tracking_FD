import { useMemo, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import ProjectToolbar from "../components/ProjectToolbar";
import { getProjectMetrics } from "../../dashboard/utils/projectMetrics";

import { useProjects } from "../../../context/ProjectContext";

export default function ProjectsPage() {
  const { projects, loading } = useProjects();

  const [search, setSearch] = useState("");

  const [selectedBank, setSelectedBank] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");

  const getBankDisplayName = (bankName) => {
    const match = bankName.match(/\(([^)]+)\)/);

    if (match) {
      return match[1]; // e.g. Gajanan Bank
    }

    return bankName; // If no short name exists
  };

  const banks = [
    ...new Set(projects.map((project) => project.bankName).filter(Boolean)),
  ]
    .sort((a, b) =>
      getBankDisplayName(a).localeCompare(getBankDisplayName(b))
    )
    .map((bank) => ({
      label: getBankDisplayName(bank),
      value: bank,
    }));

  const filteredProjects = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return projects
      .filter((project) => {
        console.log("project : ", project);
        const projectStatus = getProjectMetrics(project).status;
        const matchesSearch =
          !searchText ||
          project.projectName?.toLowerCase().includes(searchText) ||
          project.bankName?.toLowerCase().includes(searchText) ||
          project.projectManager?.toLowerCase().includes(searchText);

        const matchesBank =
          !selectedBank || project.bankName === selectedBank;

        const matchesStatus =!selectedStatus || projectStatus === selectedStatus;

        return matchesSearch && matchesBank && matchesStatus;
      })
      .sort((a, b) => {
        if (!searchText) return 0;

        const aStarts =
          a.projectName?.toLowerCase().startsWith(searchText) ||
          a.bankName?.toLowerCase().startsWith(searchText) ||
          a.projectManager?.toLowerCase().startsWith(searchText);

        const bStarts =
          b.projectName?.toLowerCase().startsWith(searchText) ||
          b.bankName?.toLowerCase().startsWith(searchText) ||
          b.projectManager?.toLowerCase().startsWith(searchText);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return 0;
      });
  }, [projects, search, selectedBank, selectedStatus]);

  return (
    <div className="p-4 sm:p-5 md:p-6 lg:p-8">
      <div className="mx-auto w-full space-y-5">
        <ProjectToolbar
          search={search}
          setSearch={setSearch}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          banks={banks}
        />

        <ProjectTable loading={loading} projects={filteredProjects} />
      </div>
    </div>
  );
}
