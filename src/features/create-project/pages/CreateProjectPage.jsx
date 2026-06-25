import useProjectForm from "../hooks/useProjectForm";

import ProjectNavigation from "../components/ProjectNavigation";
import ProjectStepper from "../components/ProjectStepper";

import { useProjects } from "../../../context/ProjectContext";
import BankDetailsTab from "../components/tabs/BankDetailsTab";
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";
import DigitalChannelsTab from "../components/tabs/DigitalChannelsTab";
import InfrastructureTab from "../components/tabs/InfrastructureTab";
import ManagementDetailsTab from "../components/tabs/ManagementDetailsTab";
import PaymentSystemsTab from "../components/tabs/PaymentSystemsTab";

import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getProjectInformation } from "../services/createProjectService";

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

  const { projects } = useProjects();

  const [selectedProjectId, setSelectedProjectId] = useState("");

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

  const [showBanks, setShowBanks] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowBanks(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="
      p-4
      md:p-6
      xl:p-8
      2xl:p-10
      max-w-[1800px]
      mx-auto
    "
    >
      <div
        className="
        bg-white
        rounded-2xl
        border
        border-slate-200
        p-4
        md:p-6
        xl:p-8
      "
      >
        <div className="mb-6 flex items-center gap-4">
          <div className="w-full max-w-md">
            <label
              className="
              block
              mb-2
              text-sm
              font-semibold
              text-[#0B1F59]
            "
            >
              Select Existing Bank
            </label>

            <div ref={dropdownRef} className="relative">
              {/* Button */}

              <button
                type="button"
                onClick={() => setShowBanks(!showBanks)}
                className="
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-[#D6E4FF]
                bg-white
                text-[#0B1F59]
                font-medium
                shadow-sm
                flex
                items-center
                justify-between
                hover:border-[#2563EB]
                transition
                cursor-pointer
              "
              >
                <span className="truncate">
                  {selectedProjectId
                    ? projects.find(
                        (p) => String(p.id) === String(selectedProjectId),
                      )?.bankName
                    : "➕ New Project"}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition ${showBanks ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}

              {showBanks && (
                <div
                  className="
                  absolute
                  left-0
                  mt-2
                  w-full
                  bg-white
                  rounded-2xl
                  shadow-xl
                  border
                  border-[#E2E8F0]
                  overflow-hidden
                  z-50
                  max-h-72
                  overflow-y-auto
                "
                >
                  {/* New Project */}

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProjectId("");
                      resetForm();
                      setShowBanks(false);
                    }}
                    className="
                    w-full
                    px-4
                    py-3
                    text-left
                    hover:bg-[#EEF4FF]
                    transition
                    flex
                    items-center
                    justify-between
                    cursor-pointer
                  "
                  >
                    <span>➕ New Project</span>

                    {!selectedProjectId && (
                      <Check size={16} className="text-[#2563EB]" />
                    )}
                  </button>

                  {/* Banks */}

                  {projects.map((project) => (
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
                      w-full
                      px-4
                      py-3
                      text-left
                      hover:bg-[#EEF4FF]
                      transition
                      flex
                      items-center
                      justify-between
                      cursor-pointer

                      ${
                        String(selectedProjectId) === String(project.id)
                          ? "bg-[#EEF4FF] text-[#2563EB] font-semibold"
                          : "text-[#0B1F59]"
                      }
                      `}
                    >
                      <span className="break-words">{project.bankName}</span>

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

        <ProjectStepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        <div className="mt-8">{renderStep()}</div>

        <ProjectNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formData={formData}
          resetForm={resetForm}
        />
      </div>
    </div>
  );
}
