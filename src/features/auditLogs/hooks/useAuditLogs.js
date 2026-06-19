import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAuditLogs } from "../services/auditLogService";

export const useAuditLogs = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);

      const response = await getAuditLogs();

      if (response?.statusType === "S") {
        setAuditLogs(response.details || []);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.statusDesc || "Failed to load audit logs",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return {
    auditLogs,
    loading,
    fetchAuditLogs,
  };
};
