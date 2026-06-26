import { useState } from "react";
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

  const [showAuditModal, setShowAuditModal] = useState(false);

  const [selectedLog, setSelectedLog] = useState(null);
  return (
    <div
      className="
      h-[calc(100vh-120px)]
      flex
      gap-6
      px-4
      xl:px-6
      2xl:px-8
      py-6
      overflow-hidden
    "
    >
      {/* Main Content */}
      <div
        className="
  w-full
  overflow-y-auto
  "
      >
        <AuditSummaryCards auditLogs={filteredLogs} />

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
        />

        <AuditTable
          logs={filteredLogs}
          loading={loading}
          onView={(log) => {
            setSelectedLog(log);
            setShowAuditModal(true);
          }}
        />
      </div>

      {/* Right Drawer */}
      {/* Audit Modal */}
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
  );
};

export default AuditLogsPage;
