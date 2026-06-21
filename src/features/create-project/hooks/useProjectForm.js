import { useState } from "react";

export default function useProjectForm() {
  const [currentStep, setCurrentStep] = useState(0);

  const initialFormData = {
    projectName: "",
    bankName: "",
    projectManager: "",
    salesPerson: "",

    headOfficeAddress: "",
    headOfficeContactNo: "",
    noOfBranches: "",

    bankType: "",

    contactDetails: {
      chairman: {
        name: "",
        contactNumber: "",
      },

      ceo: {
        name: "",
        contactNumber: "",
      },

      consultant: {
        name: "",
        contactNumber: "",
      },

      itHead: {
        name: "",
        contactNumber: "",
      },
    },

    cbsInformation: {
      previousCBSVendor: "",
      previousVendorPeriod: "",
      existingCBSVendor: "",
      cbsSince: "",
    },

    businessStatistics: {
      totalActiveCustomers: "",
      totalAccounts: "",
      totalUsers: "",
      concurrentUsers: "",
      accountsPerYear: "",
      dailyTransactions: "",
      digitalTransactions: "",
      upiTransactions: "",
      businessMix: "",
      customerOnboarding: "",
      loanIssues: "",
    },

    infrastructure: {
      currentLicenseType: "",
      currentDCVendor: "",
      currentDatabase: "",
      databaseVersion: "",
    },

    hardwareDetails: [
      {
        serverType: "DB Server",
        units: "",
        diskSpaceGb: "",
        ramGb: "",
        cores: "",
      },
    ],

    digitalChannels: {
      mobileBanking: false,
      internetBanking: false,
      tabletBanking: false,
      whatsAppBanking: false,
      missedCallBanking: false,
      smsBanking: false,
      eStatement: false,
      debitCardServices: false,

      mobileUsers: "",
      internetUsers: "",
      cardUsers: "",
      activeDigitalUsers: "",
    },

    paymentSystems: {
      rtgs: false,
      neft: false,
      imps: false,
      upi: false,
      nach: false,
      bbps: false,
      aeps: false,
      rupay: false,
      atmSwitch: false,
      pos: false,
      reconciliation: false,
      aml: false,

      dailyUpiTransactions: "",
      dailyImpsTransactions: "",
      dailyNeftTransactions: "",
      dailyRtgsTransactions: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  const updateArraySection = (section, values) => {
    setFormData((prev) => ({
      ...prev,
      [section]: values,
    }));
  };

  const updateRootFields = (values) => {
    setFormData((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const updateSection = (section, values) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...values,
      },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    updateSection,
    updateRootFields,
    updateArraySection,
    resetForm,
  };
}
