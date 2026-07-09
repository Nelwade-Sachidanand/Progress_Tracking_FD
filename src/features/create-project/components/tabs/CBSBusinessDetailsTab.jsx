import { Building2, Calendar, Info } from "lucide-react";
import NumberInput from "../../../../components/common/NumberInput";

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
  h-9
  px-3

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  text-sm
  text-slate-700
  placeholder:text-slate-500

  outline-none

  transition-all
  duration-200

  focus:border-blue-500
`;

  const iconInputClass = `
  w-full
  h-9
  pl-10
  pr-3

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  text-sm
  text-slate-700
  placeholder:text-slate-500

  outline-none

  transition-all
  duration-200

  focus:border-blue-500
`;

  return (
    <div className="space-y-4">
      {/* Header */}

      <div>
        <h2 className="text-xl font-semibold text-[#0B1F59]">
          CBS & Business Details
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Enter Existing CBS Information and Business Statistics.
        </p>
      </div>

      {/* =========================
          CBS INFORMATION
      ========================== */}

      <div className="rounded-xl border border-[#CDD7E3] bg-white p-4">
        <h3 className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[200px]">
          CBS Information
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Previous CBS Vendor */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Previous CBS Vendor
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                autoComplete="off"
                name="previousCBSVendor"
                value={cbsInformation.previousCBSVendor || ""}
                onChange={handleCbsChange}
                placeholder="Enter Previous Vendor"
                className={iconInputClass}
              />
            </div>
          </div>

          {/* Previous Vendor Period */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Previous Vendor Period
            </label>

            <input
              type="text"
              autoComplete="off"
              name="previousVendorPeriod"
              value={cbsInformation.previousVendorPeriod || ""}
              onChange={handleCbsChange}
              placeholder="Example: 2016 - 2022"
              className={inputClass}
            />
          </div>

          {/* Existing CBS Vendor */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Existing CBS Vendor
            </label>

            <input
              type="text"
              autoComplete="off"
              name="existingCBSVendor"
              value={cbsInformation.existingCBSVendor || ""}
              onChange={handleCbsChange}
              placeholder="Enter Existing Vendor"
              className={inputClass}
            />
          </div>

          {/* CBS Since */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              CBS Since
            </label>

            <div className="relative">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
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

      {/* =========================
          BUSINESS STATISTICS
      ========================== */}

      <div className="rounded-xl border border-[#CDD7E3] bg-white p-4">
        <h3 className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[200px]">
          Business Statistics
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-6">
          <InputField
            type="number"
            label="Total Active Customers"
            name="totalActiveCustomers"
            value={businessStatistics.totalActiveCustomers}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Total Accounts"
            name="totalAccounts"
            value={businessStatistics.totalAccounts}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Total Users"
            name="totalUsers"
            value={businessStatistics.totalUsers}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Concurrent Users"
            name="concurrentUsers"
            value={businessStatistics.concurrentUsers}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Accounts Increased / Year"
            name="accountsPerYear"
            value={businessStatistics.accountsPerYear}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Daily Transactions"
            name="dailyTransactions"
            value={businessStatistics.dailyTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Digital Transactions"
            name="digitalTransactions"
            value={businessStatistics.digitalTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="UPI Transactions"
            name="upiTransactions"
            value={businessStatistics.upiTransactions}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Business Mix"
            name="businessMix"
            value={businessStatistics.businessMix}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Customer Onboarding / Day"
            name="customerOnboarding"
            value={businessStatistics.customerOnboarding}
            onChange={handleBusinessChange}
          />

          <InputField
            type="number"
            label="Loan Issues / Day"
            name="loanIssues"
            value={businessStatistics.loanIssues}
            onChange={handleBusinessChange}
          />
        </div>
      </div>

      {/* =========================
          Information
      ========================== */}

      <div
        className="
          flex
          items-start
          gap-3
          rounded-lg
          border
          border-green-200
          bg-green-50
          px-4
          py-3
          w-[800px]
        "
      >
        <Info size={18} className="mt-0.5 shrink-0 text-green-600" />

        <p className="text-sm text-green-700">
          Enter Current CBS Information And Business Statistics For Accurate
          Project Planning And Capacity Estimation.
        </p>
      </div>
    </div>
  );
}

/* ==========================================================
   Reusable Input Field
========================================================== */

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">
        {label}
      </label>

      {type === "number" ? (
        <NumberInput
          name={name}
          value={value}
          onChange={onChange}
          className="
            h-9
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            text-sm
            outline-none
            transition-all
            focus:border-blue-500
          "
        />
      ) : (
        <input
          type="text"
          name={name}
          value={value ?? ""}
          autoComplete="off"
          onChange={onChange}
          className="
            h-10
            w-full
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            text-sm
            outline-none
            transition-all
            focus:border-blue-500
          "
        />
      )}
    </div>
  );
}
