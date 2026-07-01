import { useEffect, useMemo, useState } from "react";
import { useProjects } from "../../../context/ProjectContext";

import DocumentFilters from "../components/DocumentFilters";
import DocumentTable from "../components/DocumentTable";
import HistoryModal from "../components/HistoryModal";
import PreviewDocumentModal from "../components/PreviewDocumentModal";
import UploadDocumentModal from "../components/UploadDocumentModal";

import useDocumentFilters from "../hooks/useDocumentFilters";

import { saveAs } from "file-saver";
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

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [showUploadModal, setShowUploadModal] = useState(false);

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchProjects(user.id);
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

                history: activity.document?.history || [],
              });
            });
          });
        });
      });
    });

    setDocuments(docs);
  }, [selectedProject]);
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
  } = useDocumentFilters(documents);
  console.log("Documents:", documents);


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
    console.log(document);
    setSelectedDocument(document);

    setShowPreviewModal(true);
  };

  const handleHistory = (document) => {
    setSelectedDocument(document);

    setShowHistoryModal(true);
  };

  /*Clear Filters*/
  const clearFilters = () => {
    setSelectedPhase("All Phases");

    setSelectedMilestone([]);

    setSelectedTask("All Tasks");

    setSelectedSubTask("All Sub Tasks");

    setSelectedActivity("All Activities");

    setSelectedStatus("All Status");

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
      {/* Selected Project */}
      {/* <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        shadow-sm
        p-5
        mb-6
        "
      > */}{" "}
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
      {/* Summary */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-5
        mb-6
        "
      >
        <div
          className="
          bg-white
          rounded-2xl
          border
          border-slate-200
          p-5
          shadow-sm
          "
        >
          <p className="text-slate-500 text-sm">Total Documents</p>

          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-[#0B1F59]
            "
          >
            {total}
          </h2>
        </div>

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-green-200
          p-5
          shadow-sm
          "
        >
          <p className="text-slate-500 text-sm">Uploaded</p>

          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-green-600
            "
          >
            {uploaded}
          </h2>
        </div>

        <div
          className="
          bg-white
          rounded-2xl
          border
          border-orange-200
          p-5
          shadow-sm
          "
        >
          <p className="text-slate-500 text-sm">Pending</p>

          <h2
            className="
            mt-2
            text-3xl
            font-bold
            text-orange-500
            "
          >
            {pending}
          </h2>
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
            onHistory={handleHistory}
          />
        )}
      </div>
      {/* Pagination */}
      {filteredDocuments.length > 0 && (
        <div
          className="
          mt-8
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
          "
        >
          <p
            className="
            text-sm
            text-slate-500
            "
          >
            Showing
            <span className="font-semibold px-1">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>
            -
            <span className="font-semibold px-1">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredDocuments.length)}
            </span>
            of
            <span className="font-semibold px-1">
              {filteredDocuments.length}
            </span>
            documents
          </p>

          <div
            className="
            flex
            items-center
            gap-2
            "
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="
              px-4
              py-2
              rounded-lg
              border
              disabled:opacity-50
              hover:bg-slate-50
              "
            >
              Previous
            </button>

            <div
              className="
              px-4
              py-2
              rounded-lg
              bg-[#2563EB]
              text-white
              font-semibold
              "
            >
              {currentPage}
            </div>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="
              px-4
              py-2
              rounded-lg
              border
              disabled:opacity-50
              hover:bg-slate-50
              "
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Upload Document Modal */}
      {/* <UploadDocumentModal
        isOpen={showUploadModal}
        document={selectedDocument}
        onClose={() => {
          setShowUploadModal(false);
          setSelectedDocument(null);
        }}
        onUpload={(file) => {
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.activity === selectedDocument.activity &&
              doc.milestone === selectedDocument.milestone &&
              doc.task === selectedDocument.task
                ? {
                    ...doc,
                    fileName: file.name,
                    fileUrl: URL.createObjectURL(file),
                    uploadStatus: "Uploaded",
                    uploadedBy: user?.username || "Admin",
                    uploadedDate: new Date().toLocaleDateString(),
                  }
                : doc,
            ),
          );

          setShowUploadModal(false);
          setSelectedDocument(null);
        }}
      /> */}
      <UploadDocumentModal
  isOpen={showUploadModal}
  document={selectedDocument}
  onClose={() => {
    setShowUploadModal(false);
    setSelectedDocument(null);
  }}
  onUpload={handleUpload}
/>
      {/* Preview Modal */}
      {/* <PreviewDocumentModal
        isOpen={showPreviewModal}
        document={selectedDocument}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedDocument(null);
        }}
      /> */}
      {/* Version History */}
      {/* <HistoryModal
        isOpen={showHistoryModal}
        document={selectedDocument}
        onClose={() => {
          setShowHistoryModal(false);
          setSelectedDocument(null);
        }}
      /> */}
    </div>
  );
}
