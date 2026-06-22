export const getSelectedProject = () => {
  const projects =
    JSON.parse(localStorage.getItem("projects")) || [];

  const selectedProjectId =localStorage.getItem("selectedProjectId");

  return (
    projects.find(
      (project) =>
        String(project.id) ===
        String(selectedProjectId)
    ) || null
  );
};