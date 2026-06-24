import { createContext, useContext, useEffect, useState } from "react";
import { getProjectsByUserId } from "../services/projectService";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  const fetchProjects = async (userId) => {
    try {
      setLoading(true);

      const response = await getProjectsByUserId(userId);

      // console.log(response);

      if (response?.statusType === "S") {
        setProjects(response.details || []);
        return response.details;
      }
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProjects(user.id);
    } else {
      setProjects([]);
    }
  }, [user?.id]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        fetchProjects,
        setProjects,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
