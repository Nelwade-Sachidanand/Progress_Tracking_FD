import { useMemo, useState } from "react";

import ProjectTable from "../components/ProjectTable";
import ProjectToolbar from "../components/ProjectToolbar";

import { useProjects } from "../../../context/ProjectContext";

export default function ProjectsPage() {
  const { projects, loading } = useProjects();

  const [search, setSearch] = useState("");

  const [selectedBank, setSelectedBank] = useState("");

  const [selectedStatus, setSelectedStatus] = useState("");

  const banks = [
    ...new Set(projects.map((project) => project.bankName).filter(Boolean)),
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.projectName?.toLowerCase().includes(search.toLowerCase()) ||
        project.bankName?.toLowerCase().includes(search.toLowerCase()) ||
        project.projectManager?.toLowerCase().includes(search.toLowerCase());

      const matchesBank = !selectedBank || project.bankName === selectedBank;

      const matchesStatus =
        !selectedStatus || project.status === selectedStatus;

      return matchesSearch && matchesBank && matchesStatus;
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
