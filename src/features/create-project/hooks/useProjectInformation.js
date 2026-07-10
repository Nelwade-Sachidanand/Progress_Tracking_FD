import { useState } from "react";
import { toast } from "react-toastify";
import {
  getAllProjectInformation,
  getProjectInfoById,
} from "../services/projectInformationService";

export default function useProjectInformation() {
  const [projectInformation, setProjectInformation] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProjectInformation = async () => {
    try {
      setLoading(true);

      const response = await getAllProjectInformation();

      if (response.statusType === "S") {
        setProjectInformation(response.details);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to load projects",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadProjectInfoById = async (id) => {
    try {
      setLoading(true);

      const response = await getProjectInfoById(id);

      if (response.statusType === "S") {
        setSelectedProject(response.details);
        return response.details;
      }

      return null;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to load project",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    projectInformation,
    selectedProject,
    loading,
    loadProjectInformation,
    loadProjectInfoById,
  };
}