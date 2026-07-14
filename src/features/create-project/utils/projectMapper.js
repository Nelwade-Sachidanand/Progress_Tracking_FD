export const mapProjectPayload = (formData) => ({
  projectName: formData.projectName,
  bankName: formData.bankName,
  projectManager: formData.projectManager,
  salesPerson: formData.salesPerson,

  headOfficeAddress: formData.headOfficeAddress,
  headOfficeContactNo: formData.headOfficeContactNo,
  noOfBranches: Number(formData.noOfBranches || 0),

  bankType: formData.bankType,

  contactDetails: {
    chairman: {
      name: formData.contactDetails.chairman.name,
      contactNumber: formData.contactDetails.chairman.contactNumber,
    },

    ceo: {
      name: formData.contactDetails.ceo.name,
      contactNumber: formData.contactDetails.ceo.contactNumber,
    },

    consultant: {
      name: formData.contactDetails.consultant.name,
      contactNumber: formData.contactDetails.consultant.contactNumber,
    },

    itHead: {
      name: formData.contactDetails.itHead.name,
      contactNumber: formData.contactDetails.itHead.contactNumber,
    },
  },

  cbsInformation: {
    previousCBSVendor: formData.cbsInformation.previousCBSVendor,

    previousVendorPeriod: formData.cbsInformation.previousVendorPeriod,

    existingCBSVendor: formData.cbsInformation.existingCBSVendor,

    cbsSince: formData.cbsInformation.cbsSince,
  },

  businessStatistics: {
    totalActiveCustomers: Number(
      formData.businessStatistics.totalActiveCustomers || 0,
    ),

    totalAccounts: Number(formData.businessStatistics.totalAccounts || 0),

    totalUsers: Number(formData.businessStatistics.totalUsers || 0),

    concurrentUsers: Number(formData.businessStatistics.concurrentUsers || 0),

    accountsPerYear: Number(formData.businessStatistics.accountsPerYear || 0),

    dailyTransactions: Number(
      formData.businessStatistics.dailyTransactions || 0,
    ),

    digitalTransactions: Number(
      formData.businessStatistics.digitalTransactions || 0,
    ),

    upiTransactions: Number(formData.businessStatistics.upiTransactions || 0),

    businessMix: formData.businessStatistics.businessMix,

    customerOnboarding: Number(
      formData.businessStatistics.customerOnboarding || 0,
    ),

    loanIssues: Number(formData.businessStatistics.loanIssues || 0),
  },

  infrastructure: {
    currentLicenseType: formData.infrastructure.currentLicenseType,

    currentDCVendor: formData.infrastructure.currentDCVendor,

    currentDatabase: formData.infrastructure.currentDatabase,

    databaseVersion: formData.infrastructure.databaseVersion,
  },

  hardwareDetails: formData.hardwareDetails.map((server) => ({
    serverType: server.serverType,

    units: Number(server.units || 0),

    diskSpaceGb: Number(server.diskSpaceGb || 0),

    ramGb: Number(server.ramGb || 0),

    cores: Number(server.cores || 0),
  })),

  digitalChannels: {
    mobileBanking: formData.digitalChannels.mobileBanking,

    internetBanking: formData.digitalChannels.internetBanking,

    tabletBanking: formData.digitalChannels.tabletBanking,

    pigmyBanking: formData.digitalChannels.pigmyBanking,

    mobileUsers: Number(formData.digitalChannels.mobileUsers || 0),

    internetUsers: Number(formData.digitalChannels.internetUsers || 0),

    cardUsers: Number(formData.digitalChannels.cardUsers || 0),

    activeDigitalUsers: Number(
      formData.digitalChannels.activeDigitalUsers || 0,
    ),
  },

  paymentSystems: {
    rtgs: formData.paymentSystems.rtgs,

    neft: formData.paymentSystems.neft,

    imps: formData.paymentSystems.imps,

    atmSwitch: formData.paymentSystems.atmSwitch,

    pos: formData.paymentSystems.pos,

    loanRecovery: formData.paymentSystems.loanRecovery,

    dailyAtmTransactions: Number(
      formData.paymentSystems.dailyAtmTransactions || 0,
    ),

    dailyImpsTransactions: Number(
      formData.paymentSystems.dailyImpsTransactions || 0,
    ),

    dailyNeftTransactions: Number(
      formData.paymentSystems.dailyNeftTransactions || 0,
    ),

    dailyRtgsTransactions: Number(
      formData.paymentSystems.dailyRtgsTransactions || 0,
    ),
  },
});
