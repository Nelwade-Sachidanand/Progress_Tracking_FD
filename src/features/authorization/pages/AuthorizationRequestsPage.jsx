import { useState, useEffect } from "react";
import AuthorizationFilters from "../components/AuthorizationFilters";
import AuthorizationRequestModal from "../components/AuthorizationRequestModal";
import AuthorizationSummaryCards from "../components/AuthorizationSummaryCards";
import AuthorizationTable from "../components/AuthorizationTable";
import { useAuthRequests } from "../hooks/useAuthRequests";
import { useLocation } from "react-router-dom";
const AuthorizationRequestsPage = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const location = useLocation();

  const {
    auths,
    loading,
    approveRequest,
    rejectRequest,
    rollbackRequest,
    allAuths,
    getAuthRequestById,
    approveSelectedRequests,
    rejectSelectedRequests,
  } = useAuthRequests();

  const [search, setSearch] = useState("");
  const [requestType, setRequestType] = useState("");
  const [status, setStatus] = useState("");
  const [requestedBy, setRequestedBy] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestId = params.get("requestId");

    if (!requestId) return;

    const loadRequest = async () => {
      const request = await getAuthRequestById(requestId);

      if (request) {
        setSelectedRequest(request);
      }
    };

    loadRequest();
  }, [location.search]);

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
      log.newActivityName?.toLowerCase().includes(search.toLowerCase()) ||
      log.oldActivityName?.toLowerCase().includes(search.toLowerCase()) ||
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

  const [currentPage, setCurrentPage] = useState(1);

  const RECORDS_PER_PAGE = 10;

  const totalPages = Math.ceil(sortedLogs.length / RECORDS_PER_PAGE);

  const paginatedLogs = sortedLogs.slice((currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE);

  const clearFilters = () => {
    setSearch("");
    setRequestType("");
    setStatus("");
    setRequestedBy("");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, requestType, requestedBy, status]);

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
          clearFilters={clearFilters}
        />

        <div className="overflow-x-auto mt-[-25px]">
          <AuthorizationTable
            logs={paginatedLogs}
            allLogs={sortedLogs}
            loading={loading}
            onView={setSelectedRequest}
            approveSelectedRequests={approveSelectedRequests}
            rejectSelectedRequests={rejectSelectedRequests}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={filteredLogs.length}
            onPageChange={setCurrentPage}
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
