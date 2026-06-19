import {
  Building2,
  Calendar,
  Database,
  Users,
  Activity,
  Landmark,
} from "lucide-react";

export default function CBSBusinessDetailsTab({
  data,
  updateSection,
}) {
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    updateSection(
      "cbsBusinessDetails",
      {
        [name]:
          type === "checkbox"
            ? checked
            : value,
      }
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2
          className="
          text-lg
          xl:text-xl
          font-semibold
          text-[#0B1F59]
        "
        >
          CBS & Business Details
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          mt-1
        "
        >
          Existing CBS information
          and business statistics.
        </p>
      </div>

      {/* CBS Information */}
      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
      "
      >
        <h3
          className="
          text-md
          font-semibold
          mb-5
          text-[#0B1F59]
        "
        >
          CBS Information
        </h3>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
        >
          {/* Previous Vendor */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Previous CBS Vendor
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
              />

              <input
                type="text"
                name="previousVendor"
                value={
                  data.previousVendor
                }
                onChange={
                  handleChange
                }
                placeholder="Vendor Name"
                className="
                w-full
                h-11
                pl-10
                border
                border-slate-300
                rounded-xl
              "
              />
            </div>
          </div>

          {/* Vendor Period */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Previous Vendor Period
            </label>

            <input
              type="text"
              name="previousVendorPeriod"
              value={
                data.previousVendorPeriod
              }
              onChange={
                handleChange
              }
              placeholder="e.g. 2016-2022"
              className="
              w-full
              h-11
              px-3
              border
              border-slate-300
              rounded-xl
            "
            />
          </div>

          {/* Existing Vendor */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Existing CBS Vendor
            </label>

            <input
              type="text"
              name="existingVendor"
              value={
                data.existingVendor
              }
              onChange={
                handleChange
              }
              placeholder="Current Vendor"
              className="
              w-full
              h-11
              px-3
              border
              border-slate-300
              rounded-xl
            "
            />
          </div>

          {/* CBS Since */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              CBS Since
            </label>

            <div className="relative">
              <Calendar
                size={16}
                className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
              />

              <input
                type="month"
                name="cbsSince"
                value={
                  data.cbsSince
                }
                onChange={
                  handleChange
                }
                className="
                w-full
                h-11
                pl-10
                border
                border-slate-300
                rounded-xl
              "
              />
            </div>
          </div>
        </div>

        {/* Change CBS */}
        <div className="mt-6">
          <label
            className="
            flex
            items-center
            gap-3
            text-sm
            font-medium
          "
          >
            <input
              type="checkbox"
              name="wantToChangeCBS"
              checked={
                data.wantToChangeCBS
              }
              onChange={
                handleChange
              }
            />

            Want To Change CBS?
          </label>

          {data.wantToChangeCBS && (
            <div className="mt-4">
              <label className="block mb-2 text-sm">
                Expected Change Date
              </label>

              <input
                type="date"
                name="changeCBSDate"
                value={
                  data.changeCBSDate
                }
                onChange={
                  handleChange
                }
                className="
                h-11
                px-3
                border
                border-slate-300
                rounded-xl
              "
              />
            </div>
          )}
        </div>
      </div>

      {/* Business Statistics */}
      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
      "
      >
        <h3
          className="
          text-md
          font-semibold
          mb-5
          text-[#0B1F59]
        "
        >
          Business Statistics
        </h3>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        "
        >
          <InputField
            label="Total Active Customers"
            name="totalActiveCustomers"
            value={
              data.totalActiveCustomers
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Total Accounts"
            name="totalAccounts"
            value={
              data.totalAccounts
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Total Users"
            name="totalUsers"
            value={
              data.totalUsers
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Concurrent Users"
            name="concurrentUsers"
            value={
              data.concurrentUsers
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Accounts Increased / Year"
            name="accountsPerYear"
            value={
              data.accountsPerYear
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Daily Transactions"
            name="dailyTransactions"
            value={
              data.dailyTransactions
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Digital Transactions"
            name="digitalTransactions"
            value={
              data.digitalTransactions
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="UPI Transactions"
            name="upiTransactions"
            value={
              data.upiTransactions
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Business Mix"
            name="businessMix"
            value={
              data.businessMix
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Customer Onboarding / Day"
            name="customerOnboarding"
            value={
              data.customerOnboarding
            }
            onChange={
              handleChange
            }
          />

          <InputField
            label="Loan Issues / Day"
            name="loanIssues"
            value={
              data.loanIssues
            }
            onChange={
              handleChange
            }
          />
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label
        className="
        block
        mb-2
        text-sm
        font-medium
      "
      >
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="
        w-full
        h-11
        px-3
        border
        border-slate-300
        rounded-xl
      "
      />
    </div>
  );
}