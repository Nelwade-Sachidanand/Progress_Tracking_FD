import { useState } from "react";
import AuthorizationFilters from "../components/AuthorizationFilters";
import AuthorizationRequestModal from "../components/AuthorizationRequestModal";
import AuthorizationSummaryCards from "../components/AuthorizationSummaryCards";
import AuthorizationTable from "../components/AuthorizationTable";
import { useAuthRequests } from "../hooks/useAuthRequests";
const AuthorizationRequestsPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const {
    auths,
    loading,
    approveRequest,
    rejectRequest,
    rollbackRequest,
    allAuths,
    approveSelectedRequests,
    rejectSelectedRequests,
  } = useAuthRequests();

  const [search, setSearch] = useState("");
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  const handleApprove = async (requestId) => {
    await approveRequest(requestId);
    setSelectedRequest(null);
  };

  const handleReject = async (requestId, reason) => {
    await rejectRequest(requestId, reason);
    setSelectedRequest(null);
  };

  const handleRollback = async (requestId, password, reason) => {
    const response = await rollbackRequest(requestId, password, reason);

    if (response?.statusType === "S") {
      setSelectedRequest(null);
      return true;
    }

    return false;
  };

  const filteredLogs = allAuths.filter((log) => {
    const matchesSearch =
      !search ||
      log.activityName?.toLowerCase().includes(search.toLowerCase()) ||
      log.requestedBy?.toLowerCase().includes(search.toLowerCase());

    const matchesRequestType =
      !requestType || log.requestSource === requestType;

    const matchesStatus = !status || log.status === status;

    const matchesUser = !requestedBy || log.requestedBy === requestedBy;

    return matchesSearch && matchesRequestType && matchesStatus && matchesUser;
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    // Pending always first
    if (a.status === "PENDING" && b.status !== "PENDING") return -1;
    if (a.status !== "PENDING" && b.status === "PENDING") return 1;

    // Pending requests sort by requestedAt desc
    if (a.status === "PENDING" && b.status === "PENDING") {
      return new Date(b.requestedAt) - new Date(a.requestedAt);
    }

    // Approved / Rejected sort by approvedAt desc
    return (
      new Date(b.approvedAt || b.requestedAt) -
      new Date(a.approvedAt || a.requestedAt)
    );
  });

  return (
    <div
      className="
      p-4
      sm:p-5
      md:p-6
      lg:p-8
    "
    >
      <div
        className="
        w-full
        mx-auto
        space-y-4
        md:space-y-5
        lg:space-y-6
        mt-[-15px]
      "
      >
        <AuthorizationSummaryCards auths={allAuths} />

        <AuthorizationFilters
          logs={allAuths}
          search={search}
          setSearch={setSearch}
          requestType={requestType}
          setRequestType={setRequestType}
          status={status}
          setStatus={setStatus}
          requestedBy={requestedBy}
          setRequestedBy={setRequestedBy}
        />

        <div className="overflow-x-auto mt-[-25px]">
          <AuthorizationTable
            logs={sortedLogs}
            loading={loading}
            onView={setSelectedRequest}
            approveSelectedRequests={approveSelectedRequests}
            rejectSelectedRequests={rejectSelectedRequests}
          />
        </div>

        {selectedRequest && (
          <AuthorizationRequestModal
            request={selectedRequest}
            onClose={() => setSelectedRequest(null)}
            onApprove={handleApprove}
            onReject={handleReject}
            onRollback={handleRollback}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorizationRequestsPage;
 