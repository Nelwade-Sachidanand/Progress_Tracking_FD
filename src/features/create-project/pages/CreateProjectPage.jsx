import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import useProjectForm from "../hooks/useProjectForm";
import useProjectInformation from "../hooks/useProjectInformation";
import { useParams, useLocation } from "react-router-dom";


import { getProjectInformation } from "../services/createProjectService";

import BackButton from "../components/tabs/BackButton";
import BankDetailsTab from "../components/tabs/BankDetailsTab";
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";
import DigitalChannelsTab from "../components/tabs/DigitalChannelsTab";
import InfrastructureTab from "../components/tabs/InfrastructureTab";
import ManagementDetailsTab from "../components/tabs/ManagementDetailsTab";
import PaymentSystemsTab from "../components/tabs/PaymentSystemsTab";

import DraftModal from "../../../components/common/DraftModal";
import ProjectNavigation from "../components/ProjectNavigation";
import ProjectStepper from "../components/ProjectStepper";

export default function CreateProjectPage() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    updateSection,
    updateRootFields,
    updateArraySection,
    resetForm,
  } = useProjectForm();

  const { id } = useParams();

  const location = useLocation();

  const isCreate = location.pathname === "/create";

  const isEdit = location.pathname.includes("/edit");

  const isView = location.pathname.includes("/view");

  const mode = isCreate
    ? "create"
    : isEdit
      ? "edit"
      : "view";

  const isReadOnly = isView;

  const { loadProjectInfoById } =
    useProjectInformation();

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedInfoId, setSelectedInfoId] = useState("");
  const [showBanks, setShowBanks] = useState(false);

  const [showDraftModal, setShowDraftModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isEdit) return;
    const draft = sessionStorage.getItem("projectDraft");

    // console.log("Draft:", draft);

    if (draft) {
      // console.log("Opening Draft Modal");
      setShowDraftModal(true);
    }
  }, [isEdit]);

  useEffect(() => {
    if (!id) return;

    const loadProjectInfo = async () => {
      const projectInfo = await loadProjectInfoById(id);

      if (projectInfo) {
        setFormData(projectInfo);
        setSelectedInfoId(id);
      }
    };

    loadProjectInfo();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowBanks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleContinueDraft = () => {
    const draft = sessionStorage.getItem("projectDraft");

    if (draft) {
      const draftData = JSON.parse(draft);
      setFormData(draftData);
    }
    setShowDraftModal(false);
  };

  const handleDiscardDraft = () => {
    sessionStorage.removeItem("projectDraft");
    resetForm();
    setFormData(formData);
    setSelectedProjectId("");
    setCurrentStep(0);
    setShowDraftModal(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BankDetailsTab data={formData} updateRootFields={updateRootFields} disabled={isReadOnly}/>
        );

      case 1:
        return (
          <ManagementDetailsTab
            data={formData.contactDetails}
            updateSection={updateSection}
            disabled={isReadOnly}
          />
        );

      case 2:
        return (
          <CBSBusinessDetailsTab
            cbsInformation={formData.cbsInformation}
            businessStatistics={formData.businessStatistics}
            updateSection={updateSection}
            disabled={isReadOnly}
          />
        );

      case 3:
        return (
          <InfrastructureTab
            infrastructure={formData.infrastructure}
            hardwareDetails={formData.hardwareDetails}
            updateSection={updateSection}
            updateArraySection={updateArraySection}
            disabled={isReadOnly}
          />
        );

      case 4:
        return (
          <DigitalChannelsTab
            data={formData.digitalChannels}
            updateSection={updateSection}
            disabled={isReadOnly}
          />
        );

      case 5:
        return (
          <PaymentSystemsTab
            data={formData.paymentSystems}
            updateSection={updateSection}
            disabled={isReadOnly}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <DraftModal
        open={showDraftModal}
        onContinue={handleContinueDraft}
        onDiscard={handleDiscardDraft}
      />
      <div className="mx-auto max-w-[1800px] p-2 md:p-3 xl:p-3">
        <div className="rounded-2xl border border-[#CDD7E3] bg-white p-4 md:p-5 xl:p-6">
          {/* Header */}
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <BackButton />
          </div>

          {/* Stepper */}

          <ProjectStepper
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />

          {/* Current Step */}

          <div className="mt-4">{renderStep()}</div>

          {/* Navigation */}

          <ProjectNavigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            formData={formData}
            resetForm={resetForm}
            setSelectedProjectId={setSelectedProjectId}
            disabled={isReadOnly}
            isView={isView}
            isEdit={isEdit}
            selectedInfoId={selectedInfoId}
            setSelectedInfoId={setSelectedInfoId}
          />
        </div>
      </div>
    </>
  );
}
