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

  const filteredLogs = auths.filter((log) => {
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

  return (
    <div
      className="
      w-full
      px-4
      md:px-6
      xl:px-8
      2xl:px-10
      py-5
      space-y-5
      "
    >
      <AuthorizationSummaryCards auths={allAuths} />

      <AuthorizationFilters
        logs={auths}
        search={search}
        setSearch={setSearch}
        requestType={requestType}
        setRequestType={setRequestType}
        status={status}
        setStatus={setStatus}
        requestedBy={requestedBy}
        setRequestedBy={setRequestedBy}
      />

      <AuthorizationTable
        logs={filteredLogs}
        loading={loading}
        onView={setSelectedRequest}
        approveSelectedRequests={approveSelectedRequests}
        rejectSelectedRequests={rejectSelectedRequests}
      />

      {selectedRequest && (
        <AuthorizationRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default AuthorizationRequestsPage;
