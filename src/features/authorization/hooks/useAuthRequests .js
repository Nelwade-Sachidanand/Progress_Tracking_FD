import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAuthRequests,
  approveRequest as approveRequestApi,
  rejectRequest as rejectRequestApi,
  getAllAuthRequests as allAuthRequests
} from "../services/authService";

export const useAuthRequests = () => {
  const [auths, setAuths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allAuths, setAllAuths] = useState([]);

  const fetchAuthRequests = async () => {
    try {
      setLoading(true);

      const response = await getAuthRequests();

      if (response?.statusType === "S") {
        setAuths(response.details || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.statusDesc ||"Failed to load authorization requests");
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (projectId) => {
    try {
      setLoading(true);

      const response =
        await approveRequestApi(projectId);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        // Refresh list after approval
        await fetchAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(error.response?.data?.statusDesc ||"Failed to approve request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId,reason) => {
    console.log(reason);
    try {
      setLoading(true);

      const response = await rejectRequestApi(requestId,reason);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        // Refresh list after rejection
        await fetchAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(error.response?.data?.statusDesc ||"Failed to reject request");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllAuthRequests = async () => {
    try{
      setLoading(true);

      const response = await allAuthRequests();
      console.log(response);
      setAllAuths(response.details || []);
      // return response;
    }catch(error){
      toast.error(error.response?.data?.statusDesc ||
          "Failed to get All Auth Requests"
      );
    }
  };

  useEffect(() => {
    fetchAuthRequests();
    getAllAuthRequests();
  }, []);

  return {
    auths,
    loading,
    fetchAuthRequests,
    approveRequest,
    rejectRequest,
    getAllAuthRequests,
    allAuths
  };
};