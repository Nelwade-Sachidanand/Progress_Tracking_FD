import { useNavigate } from "react-router-dom";


export default function ProgressCard() {
  const navigate = useNavigate();

  const projects =
    JSON.parse(
      localStorage.getItem("projects")
    ) || [];

  const handleProjectSelect = (project) => {
    localStorage.setItem(
      "selectedProjectId",
      project.id
    );

    localStorage.setItem(
      "selectedProjectName",
      project.projectName
    );

    navigate("/tasks");
  };

  return (
    <div className="p-6">
      <h1
        className="
        text-3xl
        font-bold
        text-[#0B1F59]
        mb-6
        "
      >
        Dashboard
      </h1>

      {projects.length === 0 ? (
        <div
          className="
          bg-white
          rounded-2xl
          border
          border-[#E5EAF2]
          p-8
          text-center
          "
        >
          No Projects Found
        </div>
      ) : (
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-5
          "
        >
         {projects.map((project) => (
  <div
    key={project.id}
    className="
    bg-white
    rounded-2xl
    border
    border-[#E5EAF2]
    p-6
    "
  >
    <h2 className="text-lg font-bold">
      {project.projectName}
    </h2>

    <p className="text-sm text-slate-500 mt-2">
      {project.bankName}
    </p>

    <button
      onClick={() => {
        localStorage.setItem(
          "selectedProjectId",
          project.id
        );

        localStorage.setItem(
          "selectedProjectName",
          project.projectName
        );

        navigate("/project-details");
      }}
      className="
      mt-4
      bg-[#2563EB]
      hover:bg-[#1D4ED8]
      text-white
      px-5
      py-2.5
      rounded-xl
      font-medium
      "
    >
      View Project Details
    </button>
  </div>
))}
        </div>
      )}
    </div>
  );
}