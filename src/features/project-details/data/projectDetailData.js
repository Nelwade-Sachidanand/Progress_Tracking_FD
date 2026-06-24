export const getSelectedProject = (projects) => {
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  // console.log("Projects:", projects);
  // console.log("Selected Id:", selectedProjectId);
  // console.log("Selected Project:", selectedProject);

  return (
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null
  );
};
