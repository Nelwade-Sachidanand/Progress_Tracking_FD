import { Building2, Calendar } from "lucide-react";
import BackButton from "./BackButton";

export default function CBSBusinessDetailsTab({
  cbsInformation,
  businessStatistics,
  updateSection,
}) {
  const handleCbsChange = (e) => {
    updateSection("cbsInformation", {
      [e.target.name]: e.target.value,
    });
  };

  const handleBusinessChange = (e) => {
    updateSection("businessStatistics", {
      [e.target.name]: e.target.value,
    });
  };

  const inputClass = `
    w-full
    h-11
    px-3
    border
    border-blue-200
    rounded-xl
    bg-white
    outline-none
    transition-all
    duration-200
    focus:border-[#2563EB]
    focus:ring-1
    focus:ring-blue-200
  `;

  const iconInputClass = `
    w-full
    h-11
    pl-10
    border
    border-blue-200
    rounded-xl
    bg-white
    outline-none
    transition-all
    duration-200
    focus:border-[#2563EB]
    focus:ring-1
    focus:ring-blue-200
  `;

  return (
    <div className="space-y-8">
      <BackButton />

      <div>
        <h2 className="text-lg xl:text-xl font-semibold text-[#0B1F59]">
          CBS & Business Details
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Existing CBS information and business statistics.
        </p>
      </div>

      {/* CBS Information */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="text-md font-semibold mb-5 text-[#0B1F59]">
          CBS Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Previous CBS Vendor
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                name="previousCBSVendor"
                value={cbsInformation.previousCBSVendor || ""}
                onChange={handleCbsChange}
                placeholder="Vendor Name"
                className={iconInputClass}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Previous Vendor Period
            </label>

            <input
              type="text"
              name="previousVendorPeriod"
              value={cbsInformation.previousVendorPeriod || ""}
              onChange={handleCbsChange}
              placeholder="e.g. 2016-2022"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Existing CBS Vendor
            </label>

            <input
              type="text"
              name="existingCBSVendor"
              value={cbsInformation.existingCBSVendor || ""}
              onChange={handleCbsChange}
              placeholder="Current Vendor"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">CBS Since</label>

            <div className="relative">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="month"
                name="cbsSince"
                value={cbsInformation.cbsSince || ""}
                onChange={handleCbsChange}
                className={iconInputClass}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Statistics */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="text-md font-semibold mb-5 text-[#0B1F59]">
          Business Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <InputField
            label="Total Active Customers"
            name="totalActiveCustomers"
            value={businessStatistics.totalActiveCustomers}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Total Accounts"
            name="totalAccounts"
            value={businessStatistics.totalAccounts}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Total Users"
            name="totalUsers"
            value={businessStatistics.totalUsers}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Concurrent Users"
            name="concurrentUsers"
            value={businessStatistics.concurrentUsers}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Accounts Increased / Year"
            name="accountsPerYear"
            value={businessStatistics.accountsPerYear}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Daily Transactions"
            name="dailyTransactions"
            value={businessStatistics.dailyTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Digital Transactions"
            name="digitalTransactions"
            value={businessStatistics.digitalTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            label="UPI Transactions"
            name="upiTransactions"
            value={businessStatistics.upiTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Business Mix"
            name="businessMix"
            value={businessStatistics.businessMix}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Customer Onboarding / Day"
            name="customerOnboarding"
            value={businessStatistics.customerOnboarding}
            onChange={handleBusinessChange}
          />

          <InputField
            label="Loan Issues / Day"
            name="loanIssues"
            value={businessStatistics.loanIssues}
            onChange={handleBusinessChange}
          />
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-700">
          Enter current CBS and business statistics for accurate project
          planning and sizing.
        </p>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        className="
          w-full
          h-11
          px-3
          border
          border-blue-200
          rounded-xl
          bg-white
          outline-none
          transition-all
          duration-200
          focus:border-[#2563EB]
          focus:ring-1
          focus:ring-blue-200
        "
      />
    </div>
  );
}
