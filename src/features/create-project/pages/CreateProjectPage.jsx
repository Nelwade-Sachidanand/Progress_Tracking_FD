import useProjectForm from "../hooks/useProjectForm";

import ProjectNavigation from "../components/ProjectNavigation";
import ProjectStepper from "../components/ProjectStepper";

import BankDetailsTab from "../components/tabs/BankDetailsTab";
import CBSBusinessDetailsTab from "../components/tabs/CBSBusinessDetailsTab";
import DigitalChannelsTab from "../components/tabs/DigitalChannelsTab";
import InfrastructureTab from "../components/tabs/InfrastructureTab";
import ManagementDetailsTab from "../components/tabs/ManagementDetailsTab";
import PaymentSystemsTab from "../components/tabs/PaymentSystemsTab";

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
