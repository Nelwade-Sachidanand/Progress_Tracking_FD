import { useEffect, useMemo, useState } from "react";
import { useProjects } from "../../../context/ProjectContext";
import { FileText, UploadCloud, Clock } from "lucide-react";
import Pagination from "../../../components/layout/Pagination";
import DocumentFilters from "../components/DocumentFilters";
import DocumentTable from "../components/DocumentTable";
import PreviewDocumentModal from "../components/PreviewDocumentModal";
import UploadDocumentModal from "../components/UploadDocumentModal";
import { getAllDocuments } from "../services/documentService";

import useDocumentFilters from "../hooks/useDocumentFilters";

export default function Documents() {
  const { projects, fetchProjects } = useProjects();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const selectedProjectId = sessionStorage.getItem("selectedProjectId");

  const selectedProject = useMemo(
    () =>
      projects.find(
        (project) => String(project.id) === String(selectedProjectId),
      ),
    [projects, selectedProjectId],
  );

  const [documents, setDocuments] = useState([]);

  const [documentsDetails, setDocumentsDetails] = useState([]);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);



  const loadDocuments = async () => {
    try {
      const response = await getAllDocuments();

      // console.log("Documents Response:", response.details);

      if (response.statusType === "S") {
        setDocumentsDetails(response.details);
      } else {
        setDocumentsDetails([]);
      }
    } catch (error) {
      console.error("Failed to load documents", error);
      setDocuments([]);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProjects(user.id);
      loadDocuments();
    }
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      setDocuments([]);
      return;
    }

    const docs = [];

    selectedProject.phases?.forEach((phase) => {
      phase.milestones?.forEach((milestone) => {
        milestone.tasks?.forEach((task) => {
          task.subTasks?.forEach((subTask) => {
            subTask.activities?.forEach((activity) => {
              if (!task.taskName?.toLowerCase().includes("sign-off")) {
                return;
              }

              docs.push({
                id: activity.id,

                projectId: selectedProject.id,

                projectName: selectedProject.projectName,

                bankName: selectedProject.bankName,

                phase: phase.phaseName,

                milestone: milestone.milestoneName,

                task: task.taskName,

                subTask: subTask.subTaskName,

                activity: activity.activityName,

                owner: activity.owner,

                uploadStatus: activity.document ? "Uploaded" : "Pending",

                uploadedBy: activity.document?.uploadedBy || "-",

                uploadedDate: activity.document?.uploadedDate || "-",

                version: activity.document?.version || 0,

                fileName: activity.document?.fileName || "",

                fileUrl: activity.document?.fileUrl || "",


              });
            });
          });
        });
      });
    });

    setDocuments(docs);
  }, [selectedProject]);

  const mergedDocuments = useMemo(() => {
    return documents.map((doc) => {
      const matched = documentsDetails.find(
        (d) =>
          d.projectId === doc.projectId &&
          d.phaseName === doc.phase &&
          d.milestoneName === doc.milestone &&
          d.taskName === doc.task &&
          d.subTaskName === doc.subTask &&
          d.activityName === doc.activity,
      );

      // return {
      //   ...doc,
      //   documents: matched?.documents || [],
      // };
      return {
        ...doc,
        documents: matched?.documents || [],


        uploadStatus: matched?.documents?.length > 0 ? "Uploaded" : "Pending",

        uploadedBy: matched?.documents?.[0]?.uploadedBy || "-",
        uploadedDate: matched?.documents?.[0]?.uploadedDate || "-",
        fileName: matched?.documents?.[0]?.fileName || "",
        fileUrl: matched?.documents?.[0]?.fileUrl || "",
      };
    });
  }, [documents, documentsDetails]);

  const {
    phases,
    milestones,
    tasks,
    subTasks,
    activities,

    selectedPhase,
    setSelectedPhase,

    selectedMilestone,
    setSelectedMilestone,

    selectedTask,
    setSelectedTask,

    selectedSubTask,
    setSelectedSubTask,

    selectedActivity,
    setSelectedActivity,

    selectedStatus,
    setSelectedStatus,

    searchTerm,
    setSearchTerm,

    filteredDocuments,

    handlePhaseChange,
    handleMilestoneChange,
    handleTaskChange,
    handleSubTaskChange,
  } = useDocumentFilters(mergedDocuments);

  // console.log("Documents:", documents);

  const total = filteredDocuments.length;

  const uploaded = filteredDocuments.filter(
    (doc) => doc.uploadStatus === "Uploaded",
  ).length;

  const pending = filteredDocuments.filter(
    (doc) => doc.uploadStatus === "Pending",
  ).length;

  /*
   * Pagination
   */

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /*
   * Modal Actions
   */

  const handleUpload = (document) => {
    setSelectedDocument(document);

    setShowUploadModal(true);
  };

  const handlePreview = (document) => {
    // console.log(document);
    setSelectedDocument(document);

    setShowPreviewModal(true);
  };



  /*Clear Filters*/
  const clearFilters = () => {
    setSelectedPhase("");

    setSelectedMilestone([]);

    setSelectedTask("");

    setSelectedSubTask("");

    setSelectedActivity("");

    setSelectedStatus("");

    setSearchTerm("");
  };

  return (
    <div className="w-full p-4 lg:p-6 bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl xl:text-2xl font-bold text-[#0B1F59]">
            Sign Off Documents
          </h1>

          <p className="text-slate-500 mt-1">
            Upload and manage project sign-off documents.
          </p>
        </div>
      </div>
      <div
        className="
        w-full
        
        border
        border-slate-200
        rounded-2xl
        px-6
        py-4
        shadow-sm
        
          
        mb-4
        bg-[#F8FAFF]
        border
        border-[#E2E8F0]
        rounded-2xl
        
        "
      >
        <div className="flex flex-wrap items-center gap-3 text-[15px]">
          <span className="font-semibold text-[#0B1F59]">
            Selected Project :
          </span>

          <span className="text-[#2563EB] font-semibold">
            {selectedProject
              ? selectedProject.projectName
              : "No Project Selected"}
          </span>
        </div>
      </div>
      
      {/* Filters */}
      <DocumentFilters
        phases={phases}
        milestones={milestones}
        tasks={tasks}
        subTasks={subTasks}
        activities={activities}
        selectedPhase={selectedPhase}
        selectedMilestone={selectedMilestone}
        setSelectedMilestone={setSelectedMilestone}
        selectedTask={selectedTask}
        selectedSubTask={selectedSubTask}
        selectedActivity={selectedActivity}
        selectedStatus={selectedStatus}
        searchTerm={searchTerm}
        setSelectedStatus={setSelectedStatus}
        setSearchTerm={setSearchTerm}
        setSelectedActivity={setSelectedActivity}
        handlePhaseChange={handlePhaseChange}
        handleMilestoneChange={handleMilestoneChange}
        handleTaskChange={handleTaskChange}
        handleSubTaskChange={handleSubTaskChange}
        clearFilters={clearFilters}
      />
      <div className="mt-6">
        {filteredDocuments.length === 0 ? (
          <div
            className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          p-16
          text-center
          shadow-sm
          "
          >
            <div
              className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-slate-100
            flex
            items-center
            justify-center
            "
            >
              📄
            </div>

            <h2
              className="
            mt-6
            text-xl
            font-semibold
            text-[#0B1F59]
            "
            >
              No Sign-Off Documents Found
            </h2>

            <p
              className="
            mt-2
            text-slate-500
            "
            >
              No activities match the selected filters.
            </p>
          </div>
        ) : (
          <DocumentTable
            documents={paginatedDocuments}
            onUpload={handleUpload}
            onPreview={handlePreview}

          />
        )}
      </div>
      {/* Pagination */}

      {filteredDocuments.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={filteredDocuments.length}
          recordsPerPage={10}
          label="documents"
          onPageChange={setCurrentPage}
        />
      )}

      <UploadDocumentModal
        isOpen={showUploadModal}
        document={selectedDocument}
        onClose={() => {
          setShowUploadModal(false);
          setSelectedDocument(null);
        }}
        onUpload={handleUpload}
        onSuccess={loadDocuments}
      />
      {/* Preview Modal */}
      <PreviewDocumentModal
        isOpen={showPreviewModal}
        document={selectedDocument}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedDocument(null);
        }}
      />

    </div>
  );
}
