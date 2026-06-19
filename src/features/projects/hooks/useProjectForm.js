import { useState } from "react";

export default function useProjectForm() {
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        bankDetails: {
            projectName: "",
            bankName: "",
            projectManager: "",
            salesPerson: "",
            headOfficeAddress: "",
            headOfficeContactNo: "",
            noOfBranches: "",
            typeOfBank: "",
        },

        managementDetails: {
            chairmanName: "",
            chairmanContact: "",

            ceoName: "",
            ceoContact: "",

            consultantName: "",
            consultantContact: "",

            itHeadName: "",
            itHeadContact: "",
        },

        cbsBusinessDetails: {
            previousVendor: "",
            previousVendorPeriod: "",

            existingVendor: "",
            cbsSince: "",

            wantToChangeCBS: false,
            changeCBSDate: "",

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

            servers: [
                {
                    serverType: "DB Server",
                    units: "",
                    diskSpace: "",
                    ram: "",
                    cores: "",
                },
            ],
        },

        digitalChannels: {
            mobileBanking: false,
            internetBanking: false,
            tabletBanking: false,
        },

        paymentSystems: {
            rtgs: false,
            neft: false,

            atm: false,
            upi: false,
            imps: false,
            nach: false,
            bbps: false,

            aml: false,
            los: false,
            audit: false,
        },
    });

    const updateSection = (section, values) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                ...values,
            },
        }));
    };

    return {
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        updateSection,
    };
}