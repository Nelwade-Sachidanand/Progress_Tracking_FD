import { describe, expect, test } from "vitest";
import { mapProjectPayload } from "../utils/projectMapper";

describe("mapProjectPayload", () => {
  test("maps complete form data correctly", () => {
    const formData = {
      projectName: "CBS Migration",
      bankName: "ABC Bank",
      projectManager: "John",
      salesPerson: "Mike",

      headOfficeAddress: "Mumbai",
      headOfficeContactNo: "9999999999",
      noOfBranches: "25",

      bankType: "UCB",

      contactDetails: {
        chairman: {
          name: "Chairman",
          contactNumber: "1111111111",
        },
        ceo: {
          name: "CEO",
          contactNumber: "2222222222",
        },
        consultant: {
          name: "Consultant",
          contactNumber: "3333333333",
        },
        itHead: {
          name: "IT Head",
          contactNumber: "4444444444",
        },
      },

      cbsInformation: {
        previousCBSVendor: "Vendor A",
        previousVendorPeriod: "2015-2020",
        existingCBSVendor: "Vendor B",
        cbsSince: "2020-01",
      },

      businessStatistics: {
        totalActiveCustomers: "1000",
        totalAccounts: "2000",
        totalUsers: "50",
        concurrentUsers: "20",
        accountsPerYear: "500",
        dailyTransactions: "10000",
        digitalTransactions: "5000",
        upiTransactions: "3000",
        businessMix: "Retail",
        customerOnboarding: "25",
        loanIssues: "5",
      },

      infrastructure: {
        currentLicenseType: "Enterprise",
        currentDCVendor: "TCS",
        currentDatabase: "Oracle",
        databaseVersion: "19c",
      },

      hardwareDetails: [
        {
          serverType: "DB Server",
          units: "2",
          diskSpaceGb: "500",
          ramGb: "64",
          cores: "16",
        },
      ],

      digitalChannels: {
        mobileBanking: true,
        internetBanking: true,
        tabletBanking: false,
        pigmyBanking: false,

        mobileUsers: "1000",
        internetUsers: "800",
        cardUsers: "700",
        activeDigitalUsers: "600",
      },

      paymentSystems: {
        rtgs: true,
        neft: true,
        imps: true,
        atmSwitch: true,
        pos: true,
        loanRecovery: false,

        dailyAtmTransactions: "1000",
        dailyImpsTransactions: "500",
        dailyNeftTransactions: "300",
        dailyRtgsTransactions: "100",
      },
    };

    const result = mapProjectPayload(formData);

    expect(result.projectName).toBe("CBS Migration");

    expect(result.noOfBranches).toBe(25);

    expect(result.businessStatistics.totalActiveCustomers).toBe(1000);

    expect(result.businessStatistics.totalAccounts).toBe(2000);

    expect(result.hardwareDetails[0].units).toBe(2);

    expect(result.hardwareDetails[0].diskSpaceGb).toBe(500);

    expect(result.hardwareDetails[0].ramGb).toBe(64);

    expect(result.hardwareDetails[0].cores).toBe(16);

    expect(result.digitalChannels.mobileUsers).toBe(1000);

    expect(result.paymentSystems.dailyAtmTransactions).toBe(1000);

    expect(result.paymentSystems.rtgs).toBe(true);
  });

  test("converts empty numeric fields to zero", () => {
    const formData = {
      noOfBranches: "",

      contactDetails: {
        chairman: { name: "", contactNumber: "" },
        ceo: { name: "", contactNumber: "" },
        consultant: { name: "", contactNumber: "" },
        itHead: { name: "", contactNumber: "" },
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
          serverType: "",
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
        pigmyBanking: false,

        mobileUsers: "",
        internetUsers: "",
        cardUsers: "",
        activeDigitalUsers: "",
      },

      paymentSystems: {
        rtgs: false,
        neft: false,
        imps: false,
        atmSwitch: false,
        pos: false,
        loanRecovery: false,

        dailyAtmTransactions: "",
        dailyImpsTransactions: "",
        dailyNeftTransactions: "",
        dailyRtgsTransactions: "",
      },
    };

    const result = mapProjectPayload(formData);

    expect(result.noOfBranches).toBe(0);

    expect(result.businessStatistics.totalAccounts).toBe(0);

    expect(result.businessStatistics.totalUsers).toBe(0);

    expect(result.hardwareDetails[0].units).toBe(0);

    expect(result.hardwareDetails[0].diskSpaceGb).toBe(0);

    expect(result.digitalChannels.mobileUsers).toBe(0);

    expect(result.paymentSystems.dailyRtgsTransactions).toBe(0);
  });

  test("maps boolean values correctly", () => {
    const result = mapProjectPayload({
      projectName: "",
      bankName: "",
      projectManager: "",
      salesPerson: "",
      headOfficeAddress: "",
      headOfficeContactNo: "",
      noOfBranches: "",

      bankType: "",

      contactDetails: {
        chairman: { name: "", contactNumber: "" },
        ceo: { name: "", contactNumber: "" },
        consultant: { name: "", contactNumber: "" },
        itHead: { name: "", contactNumber: "" },
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

      hardwareDetails: [],

      digitalChannels: {
        mobileBanking: true,
        internetBanking: false,
        tabletBanking: true,
        pigmyBanking: false,

        mobileUsers: "",
        internetUsers: "",
        cardUsers: "",
        activeDigitalUsers: "",
      },

      paymentSystems: {
        rtgs: true,
        neft: false,
        imps: true,
        atmSwitch: true,
        pos: false,
        loanRecovery: true,

        dailyAtmTransactions: "",
        dailyImpsTransactions: "",
        dailyNeftTransactions: "",
        dailyRtgsTransactions: "",
      },
    });

    expect(result.digitalChannels.mobileBanking).toBe(true);
    expect(result.digitalChannels.internetBanking).toBe(false);

    expect(result.paymentSystems.rtgs).toBe(true);
    expect(result.paymentSystems.neft).toBe(false);
  });
});
