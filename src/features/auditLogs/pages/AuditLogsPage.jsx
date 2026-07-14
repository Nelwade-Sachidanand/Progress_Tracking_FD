import { useState, useEffect } from "react";
import AuditDetailsModal from "../components/AuditDetailsModal";
import AuditFilters from "../components/AuditFilters";
import AuditSummaryCards from "../components/AuditSummaryCards";
import AuditTable from "../components/AuditTable";
import { useAuditLogs } from "../hooks/useAuditLogs";

const AuditLogsPage = () => {
  const { auditLogs, loading } = useAuditLogs();

  const [searchTerm, setSearchTerm] = useState("");

  const [entityType, setEntityType] = useState("");

  const [actionType, setActionType] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  const [showAuditModal, setShowAuditModal] = useState(false);

  const [selectedLog, setSelectedLog] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entityType, actionType, selectedDate]);

  const filteredLogs = auditLogs.filter((log) => {
    const searchMatch =
      !searchTerm ||
      log.entityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.modifiedBy?.toLowerCase().includes(searchTerm.toLowerCase());

    const entityMatch = !entityType || log.entityType === entityType;

    const actionMatch = !actionType || log.actionType === actionType;

    const dateMatch =
      !selectedDate ||
      new Date(log.modifiedDate).toISOString().split("T")[0] === selectedDate;

    return searchMatch && entityMatch && actionMatch && dateMatch;
  });

  const RECORDS_PER_PAGE = 10;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / RECORDS_PER_PAGE)
  );

  const pageLogs = filteredLogs.slice(
    (currentPage - 1) * RECORDS_PER_PAGE,
    currentPage * RECORDS_PER_PAGE
  );

  const clearFilters = () => {
    setSearchTerm("");
    setEntityType("");
    setActionType("");
    setSelectedDate("");
  };

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
        <AuditSummaryCards auditLogs={auditLogs} />

        <AuditFilters
          logs={auditLogs}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          entityType={entityType}
          setEntityType={setEntityType}
          actionType={actionType}
          setActionType={setActionType}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          clearFilters={clearFilters}
        />

        <div className="overflow-x-auto mt-[-25px]">
          <AuditTable
            logs={pageLogs}
            loading={loading}
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={filteredLogs.length}
            onPageChange={setCurrentPage}
            onView={(log) => {
              setSelectedLog(log);
              setShowAuditModal(true);
            }}
          />
        </div>

        {showAuditModal && (
          <AuditDetailsModal
            log={selectedLog}
            onClose={() => {
              setShowAuditModal(false);
              setSelectedLog(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AuditLogsPage;
