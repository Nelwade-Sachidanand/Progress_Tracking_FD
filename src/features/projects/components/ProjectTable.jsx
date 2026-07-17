import { Building2, Download, Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Pagination from "../../../components/layout/Pagination";
import { calculateOverallProgress } from "../../dashboard/utils/dashboardUtils";
import { useNavigate } from "react-router-dom";
import { getProjectMetrics } from "../../dashboard/utils/projectMetrics";
import Swal from "sweetalert2";
import useProjectActions from "../hooks/useProjectActions";


export default function ProjectTable({ projects = [] }) {

  const { deleteProject } = useProjectActions();

  const navigate = useNavigate();

  const RECORDS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(projects.length / RECORDS_PER_PAGE);

  const pageProjects = projects.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE,
  );

  const getStatus = (progress) => {
    if (progress >= 100) {
      return {
        label: "Completed",
        className: "bg-green-100 text-green-700",
      };
    }

    if (progress >= 70) {
      return {
        label: "On Track",
        className: "bg-blue-100 text-blue-700",
      };
    }

    if (progress >= 40) {
      return {
        label: "At Risk",
        className: "bg-amber-100 text-amber-700",
      };
    }

    return {
      label: "Delayed",
      className: "bg-red-100 text-red-700",
    };
  };



  return (
    <div className="overflow-x-auto mt-5 rounded-2xl border border-[#CDD7E3] bg-white shadow-sm">
      <table className="w-full table-auto">
        <thead>
          <tr className="border-b border-[#CDD7E3] bg-blue-100">
            <th className="w-[50px] px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Sr. No.
            </th>

            <th className="w-[20%] px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Bank
            </th>

            <th className="w-[20%] px-1 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Project
            </th>

            <th className="w-[20%] px-4 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Project Manager
            </th>

            <th className="w-[17%] px-1 py-4 text-left text-base font-semibold text-slate-600 whitespace-nowrap">
              Progress
            </th>

            <th className="w-[13%] px-4 py-4 text-center text-base font-semibold text-slate-600 whitespace-nowrap">
              Status
            </th>

            <th className="w-[12%] px-4 py-4 text-center text-base font-semibold text-slate-600 whitespace-nowrap">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {projects.length > 0 ? (
            pageProjects.map((project, index) => {
              const metrics = getProjectMetrics(project);
              const status = getStatus(metrics.status);

              const progress = calculateOverallProgress([project]);

              const shortBankName = project.bankName.match(/\(([^)]+)\)/)?.[1] || project.bankName;

              return (
                <tr
                  key={project.id}
                  className="
                  border-b
                  border-[#CDD7E3]
                "
                >
                  {/* Project */}

                  <td className="px-6 py-3">
                    <span className="text-sm xl:text-base font-medium text-slate-700">
                      {(currentPage - 1) * RECORDS_PER_PAGE + index + 1}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* <div
                        className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                        text-[#2563EB]
                      "
                      >
                        <Building2 size={18} />
                      </div> */}

                      <div className="min-w-0">
                        <h4
                          className="
                          truncate
                          text-sm
                          xl:text-base
                          font-semibold
                          text-slate-700
                        "
                          title={project.bankName}
                        >
                          {shortBankName}
                        </h4>

                        {/* <p
                          className="
                          truncate
                          text-xs
                          xl:text-sm
                          text-slate-600
                        "
                          title={project.bankName}
                        >
                          {project.bankName}
                        </p> */}
                      </div>
                    </div>
                  </td>

                  <td className="px-1 py-3">
                    <span
                      className="
                      inline-block
                      max-w-full
                      truncate
                      rounded-xl
                      bg-blue-100
                      px-3
                      py-1.5
                      text-sm
                      xl:text-sm
                      font-medium
                      text-blue-700
                    "
                      title={project.projectName}
                    >
                      {project.projectName}
                    </span>
                  </td>

                  {/* Project Manager */}

                  <td className="px-4 py-3">
                    <span
                      className="
                      block
                      truncate
                      text-sm
                      xl:text-base
                      font-medium
                      text-slate-700
                    "
                      title={project.projectManager}
                    >
                      {project.projectManager}
                    </span>
                  </td>

                  {/* Progress */}

                  <td className="px-1 py-3">
                    <div className="flex items-center gap-1">
                      <div className="h-2 flex-1 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-[#2563EB] transition-all duration-500"
                          style={{
                            width: `${metrics.overallProgress || 0}%`,
                          }}
                        />
                      </div>

                      <span
                        className="
                        w-10
                        text-right
                        text-sm
                        xl:text-base
                        font-medium
                        text-slate-700
                      "
                      >
                        {metrics.overallProgress || 0}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`
                      inline-flex
                      items-center
                      justify-center
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-semibold
                      whitespace-nowrap
                      ${status.className}
                    `}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => navigate(`/projects/view/${project.projectInformationId}`)}
                        title="View Project"
                        className="
                        h-9
                        w-9
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        hover:bg-blue-100
                        transition-colors
                        cursor-pointer
                      "
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => navigate(`/projects/edit/${project.projectInformationId}`)}
                        title="Edit Project"
                        className="
                        h-9
                        w-9
                        rounded-lg
                        bg-amber-50
                        text-amber-600
                        flex
                        items-center
                        justify-center
                        hover:bg-amber-100
                        transition-colors
                        cursor-pointer
                      "
                      >
                        <Pencil size={16} />
                      </button>

                      {/* <button
                        title="Export Project"
                        className="
                        h-9
                        w-9
                        rounded-lg
                        bg-green-50
                        text-green-600
                        flex
                        items-center
                        justify-center
                        hover:bg-green-100
                        transition-colors
                        cursor-pointer
                      "
                      >
                        <Download size={16} />
                      </button> */}

                      <button
                        title="Delete Project"
                        onClick={() => {
                          Swal.fire({
                            title: "Delete Project?",
                            text: "This action cannot be undone.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#dc2626",
                            cancelButtonColor: "#64748b",
                            confirmButtonText: "Delete",
                            cancelButtonText: "Cancel",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await deleteProject(project.id);
                            }
                          });
                        }}
                        className="
                        h-9
                        w-9
                        rounded-lg
                        bg-red-50
                        text-red-600
                        flex
                        items-center
                        justify-center
                        hover:bg-red-100
                        transition-colors
                        cursor-pointer
                      "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={6}
                className="
                py-14
                text-center
                text-slate-500
                text-sm
              "
              >
                No projects found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRecords={projects.length}
        recordsPerPage={RECORDS_PER_PAGE}
        onPageChange={setCurrentPage}
        label="Projects"
      />
    </div>
  );
}
