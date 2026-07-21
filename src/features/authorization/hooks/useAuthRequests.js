import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllAuthRequests as allAuthRequests,
  approveRequest as approveRequestApi,
  approveSelectedRequests as approveSelectedRequestsApi,
  getAuthRequests,
  getActivityUpdateRequestById as getAuthRequestByIdApi,
  rejectRequest as rejectRequestApi,
  rejectSelectedRequests as rejectSelectedRequestsApi,
  rollbackRequest as rollbackRequestApi,
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
      toast.error(
        error.response?.data?.statusDesc ||
        "Failed to load authorization requests",
      );
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (requestId) => {
    try {
      setLoading(true);

      const response = await approveRequestApi(requestId);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        // Refresh list after approval
        await fetchAuthRequests();
        await getAllAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to approve request",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const rejectRequest = async (requestId, reason) => {
    console.log(reason);
    try {
      setLoading(true);

      const response = await rejectRequestApi(requestId, reason);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        // Refresh list after rejection
        await fetchAuthRequests();
        await getAllAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to reject request",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAllAuthRequests = async () => {
    try {
      setLoading(true);

      const response = await allAuthRequests();
      // console.log(response);
      setAllAuths(response.details || []);
      // return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to get All Auth Requests",
      );
    }
  };

  const approveSelectedRequests = async (requestIds) => {
    try {
      setLoading(true);

      const response = await approveSelectedRequestsApi(requestIds);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        await fetchAuthRequests();
        await getAllAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to approve requests",
      );
    } finally {
      setLoading(false);
    }
  };

  const rejectSelectedRequests = async (requestIds, reason) => {
    try {
      setLoading(true);

      const response = await rejectSelectedRequestsApi(requestIds, reason);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        await fetchAuthRequests();
        await getAllAuthRequests();
      }

      return response;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to reject requests",
      );
    } finally {
      setLoading(false);
    }
  };

  const rollbackRequest = async (requestId, password, reason) => {
    try {
      setLoading(true);

      const response = await rollbackRequestApi(requestId, password, reason);
      // console.log(response);

      if (response?.statusType === "S") {
        toast.success(response.statusDesc);

        await fetchAuthRequests();
        await getAllAuthRequests();
        return response;
      }

      return null;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to rollback request",
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getAuthRequestById = async (requestId) => {
    try {
      setLoading(true);

      const response = await getAuthRequestByIdApi(requestId);

      if (response?.statusType === "S") {
        return response.details;
      }

      toast.error(response?.statusDesc);
      return null;
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc ||
        "Failed to fetch authorization request"
      );
      return null;
    } finally {
      setLoading(false);
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
    rollbackRequest,

    approveSelectedRequests,
    rejectSelectedRequests,

    getAllAuthRequests,
    getAuthRequestById,
    allAuths,
  };
};
