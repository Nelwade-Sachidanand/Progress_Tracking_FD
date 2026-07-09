import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import useProjectForm from "../hooks/useProjectForm";
import useProjectInformation from "../hooks/useProjectInformation";

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

  const { projectInformation, loadProjectInformation } =
    useProjectInformation();

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [showBanks, setShowBanks] = useState(false);

  const [showDraftModal, setShowDraftModal] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const draft = sessionStorage.getItem("projectDraft");

    console.log("Draft:", draft);

    if (draft) {
      console.log("Opening Draft Modal");
      setShowDraftModal(true);
    }
  }, []);

  useEffect(() => {
    loadProjectInformation();
  }, []);

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
    setSelectedProjectId("");
    setCurrentStep(0);
    setShowDraftModal(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BankDetailsTab data={formData} updateRootFields={updateRootFields} />
        );

      case 1:
        return (
          <ManagementDetailsTab
            data={formData.contactDetails}
            updateSection={updateSection}
          />
        );

      case 2:
        return (
          <CBSBusinessDetailsTab
            cbsInformation={formData.cbsInformation}
            businessStatistics={formData.businessStatistics}
            updateSection={updateSection}
          />
        );

      case 3:
        return (
          <InfrastructureTab
            infrastructure={formData.infrastructure}
            hardwareDetails={formData.hardwareDetails}
            updateSection={updateSection}
            updateArraySection={updateArraySection}
          />
        );

      case 4:
        return (
          <DigitalChannelsTab
            data={formData.digitalChannels}
            updateSection={updateSection}
          />
        );

      case 5:
        return (
          <PaymentSystemsTab
            data={formData.paymentSystems}
            updateSection={updateSection}
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

            <div className="w-full max-w-md">
              <label className="mb-1 ml-1 block text-sm font-semibold text-[#0B1F59]">
                Select Existing Bank
              </label>

              <div ref={dropdownRef} className="relative">
                {/* Dropdown Button */}

                <button
                  type="button"
                  onClick={() => setShowBanks((prev) => !prev)}
                  className="
                  flex
                  h-9
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-lg
                  border
                  border-[#D6E4FF]
                  bg-white
                  px-4
                  text-sm
                  font-medium
                  text-[#0B1F59]
                  shadow-sm
                  focus:border-blue-500
                "
                >
                  <span className="truncate">
                    {selectedProjectId
                      ? projectInformation.find(
                          (p) => String(p.id) === String(selectedProjectId),
                        )?.bankName
                      : "➕ New Project"}
                  </span>

                  <ChevronDown
                    size={18}
                    className={`transition-transform ${
                      showBanks ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}

                {showBanks && (
                  <div
                    className="
                    absolute
                    left-0
                    z-50
                    mt-2
                    max-h-72
                    w-full
                    overflow-y-auto
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    shadow-xl
                  "
                  >
                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setSelectedProjectId("");
                        setShowBanks(false);
                      }}
                      className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-between
                      px-4
                      py-2.5
                      text-left
                      transition
                      hover:bg-[#EEF4FF]
                    "
                    >
                      <span>➕ New Project</span>

                      {!selectedProjectId && (
                        <Check size={16} className="text-[#2563EB]" />
                      )}
                    </button>

                    {projectInformation.map((project) => (
                      <button
                        key={project.id}
                        type="button"
                        onClick={async () => {
                          setSelectedProjectId(project.id);
                          setShowBanks(false);

                          try {
                            const response = await getProjectInformation(
                              project.bankName,
                              project.projectName,
                            );

                            if (response?.statusType === "S") {
                              setFormData(response.details);
                            }
                          } catch (error) {
                            console.error(error);
                          }
                        }}
                        className={`
                        flex
                        w-full
                        cursor-pointer
                        items-center
                        justify-between
                        px-4
                        py-2.5
                        text-left
                        transition
                        hover:bg-[#EEF4FF]

                        ${
                          String(selectedProjectId) === String(project.id)
                            ? "bg-[#EEF4FF] font-semibold text-[#2563EB]"
                            : "text-[#0B1F59]"
                        }
                      `}
                      >
                        <span className="truncate">{project.bankName}</span>

                        {String(selectedProjectId) === String(project.id) && (
                          <Check size={16} className="text-[#2563EB]" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
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
            loadProjectInformation={loadProjectInformation}
          />
        </div>
      </div>
    </>
  );
}
