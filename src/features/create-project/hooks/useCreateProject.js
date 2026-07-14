import { useState } from "react";
import { toast } from "react-toastify";

import { createProject,updateProjectInformation } from "../services/createProjectService";

export default function useCreateProject() {
  const [loading, setLoading] = useState(false);

  const saveProject = async (payload) => {
    try {
      setLoading(true);

      // console.log(JSON.stringify(payload, null, 2));

      const response = await createProject(payload);

      if (response.statusType === "S") {
        toast.success(response.statusDesc);

        return response;
      }

      toast.error(response.statusDesc);

      return null;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to create project",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id,payload) => {
    try {
      setLoading(true);

      const response = await updateProjectInformation(id,payload);

      if (response.statusType === "S") {
        toast.success(response.statusDesc || "Project updated successfully");
      }

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to update project",
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveProject,
    loading,
    updateProject,
  };

}
