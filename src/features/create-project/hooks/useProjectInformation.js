import { useState } from "react";
import { toast } from "react-toastify";
import { getAllProjectInformation } from "../services/projectInformationService";

export default function useProjectInformation() {
  const [projectInformation, setProjectInformation] = useState([]);
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

  return {
    projectInformation,
    loading,
    loadProjectInformation,
  };
}
