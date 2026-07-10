export const getSelectedProject = (projects) => {
  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

 
  return (
    projects.find(
      (project) => String(project.id) === String(selectedProjectId),
    ) || null
  );
};
