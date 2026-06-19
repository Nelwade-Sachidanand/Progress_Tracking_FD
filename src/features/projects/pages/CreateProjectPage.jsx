import useProjectForm from "../hooks/useProjectForm";

import ProjectStepper from "../components/ProjectStepper";
import ProjectNavigation from "../components/ProjectNavigation";

import BankDetailsTab from "../components/tabs/BankDetailsTab";
import ManagementDetailsTab from "../components/tabs/ManagementDetailsTab";
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";
import InfrastructureTab from "../components/tabs/InfrastructureTab";
import DigitalChannelsTab from "../components/tabs/DigitalChannelsTab";
import PaymentSystemsTab from "../components/tabs/PaymentSystemsTab";

export default function CreateProjectPage() {
  const {
    currentStep,
    setCurrentStep,
    formData,
    updateSection,
  } = useProjectForm();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BankDetailsTab
            data={formData.bankDetails}
            updateSection={updateSection}
          />
        );

      case 1:
        return (
          <ManagementDetailsTab
            data={
              formData.managementDetails
            }
            updateSection={updateSection}
          />
        );

      case 2:
        return (
          <CBSBusinessDetailsTab
            data={
              formData.cbsBusinessDetails
            }
            updateSection={updateSection}
          />
        );

      case 3:
        return (
          <InfrastructureTab
            data={
              formData.infrastructure
            }
            updateSection={updateSection}
          />
        );

      case 4:
        return (
          <DigitalChannelsTab
            data={
              formData.digitalChannels
            }
            updateSection={updateSection}
          />
        );

      case 5:
        return (
          <PaymentSystemsTab
            data={
              formData.paymentSystems
            }
            updateSection={updateSection}
          />
        );

      default:
        return null;
    }
  };

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
        <ProjectStepper
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />

        <div className="mt-8">
          {renderStep()}
        </div>

        <ProjectNavigation
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
}