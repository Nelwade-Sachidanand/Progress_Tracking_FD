import { Building2, Download, Eye, Pencil, Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

import ProjectProgress from "./ProjectProgress";
import ProjectStatusBadge from "./ProjectStatusBadge";

export default function ProjectTableRow({ project }) {
  const navigate = useNavigate();

  return (
    <tr
      className="
        border-b
        border-slate-100
        transition-all
        duration-200
        hover:bg-slate-50
      "
    >
      {/* Project Name */}

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-100
              text-[#2563EB]
            "
          >
            <Building2 size={20} />
          </div>

          <div>
            <h4 className="font-semibold text-[#0B1F59]">
              {project.projectName}
            </h4>

            <p className="text-xs text-slate-500">{project.projectCode}</p>
          </div>
        </div>
      </td>

      {/* Bank */}

      <td className="px-6 py-5">
        <div className="max-w-[250px] truncate" title={project.bankName}>
          {project.bankName}
        </div>
      </td>

      {/* Project Manager */}

      <td className="px-6 py-5">{project.projectManager}</td>

      {/* Start Date */}

      <td className="px-6 py-5 text-center">{project.startDate}</td>

      {/* Go Live */}

      <td className="px-6 py-5 text-center">{project.goLiveDate}</td>

      {/* Progress */}

      <td className="px-6 py-5 w-[220px]">
        <ProjectProgress progress={project.progress} />
      </td>

      {/* Status */}

      <td className="px-6 py-5 text-center">
        <ProjectStatusBadge status={project.status} />
      </td>

      {/* Actions */}

      <td className="px-6 py-5">
        <div className="flex justify-center gap-2">
          {/* View */}

          <button
            title="View Project"
            onClick={() => navigate(`/projects/view/${project.id}`)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-blue-50
              hover:text-blue-600
              cursor-pointer
            "
          >
            <Eye size={18} />
          </button>

          {/* Edit */}

          <button
            title="Edit Project"
            onClick={() => navigate(`/projects/edit/${project.id}`)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-amber-50
              hover:text-amber-600
              cursor-pointer
            "
          >
            <Pencil size={18} />
          </button>

          {/* Export */}

          <button
            title="Export Excel"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-green-50
              hover:text-green-600
              cursor-pointer
            "
          >
            <Download size={18} />
          </button>

          {/* Delete */}

          <button
            title="Delete Project"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-600
              cursor-pointer
            "
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}
