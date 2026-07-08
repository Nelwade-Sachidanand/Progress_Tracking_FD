import {
  Building2,
  CreditCard,
  HandCoins,
  Info,
  Landmark,
  Smartphone,
} from "lucide-react";
import NumberInput from "../../../../components/common/NumberInput";

export default function PaymentSystemsTab({ data, updateSection }) {
  const handleToggle = (field) => {
    updateSection("paymentSystems", {
      ...data,
      [field]: !data[field],
    });
  };

  const handleChange = (e) => {
    updateSection("paymentSystems", {
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass = `
    w-full
    h-9
    px-3
    rounded-lg
    border
    border-slate-300
    bg-white
    text-sm
    outline-none
    transition-all
    duration-200
    focus:border-blue-500
  `;

  const products = [
    { key: "rtgs", title: "RTGS", icon: Landmark },
    { key: "neft", title: "NEFT", icon: Landmark },
    { key: "imps", title: "IMPS", icon: Smartphone },
    { key: "atmSwitch", title: "ATM Switch", icon: Building2 },
    { key: "pos", title: "POS", icon: CreditCard },
    { key: "loanRecovery", title: "Loan Recovery", icon: HandCoins },
  ];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#0B1F59]">
          Payment Systems & NPCI Products
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure The Payment Systems And NPCI Products Currently Enabled For
          The Bank.
        </p>
      </div>

      {/* Payment Systems */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-4 text-base font-semibold text-[#0B1F59]">
          Enabled Payment Systems
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-6">
          {products.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                onClick={() => handleToggle(item.key)}
                className={`
                  relative
                  cursor-pointer
                  rounded-xl
                  border
                  p-4
                  transition-all
                  duration-300

                  ${
                    data[item.key]
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-slate-200 hover:border-blue-500"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-lg
                      transition-all

                      ${
                        data[item.key]
                          ? "bg-[#2563EB] text-white"
                          : "bg-blue-100 text-[#2563EB]"
                      }
                    `}
                  >
                    <Icon size={18} />
                  </div>

                  <input
                    type="checkbox"
                    checked={data[item.key] || false}
                    onChange={() => handleToggle(item.key)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 accent-blue-600 cursor-pointer"
                  />
                </div>

                <h4 className="mt-3 text-sm font-semibold text-[#0B1F59]">
                  {item.title}
                </h4>

                {/* <p className="mt-1 text-xs text-slate-500">
                  Enabled In Banking Ecosystem
                </p> */}

                {data[item.key] && (
                  <span
                    className="
                      absolute
                      right-3
                      bottom-3
                      rounded-full
                      bg-green-100
                      px-2
                      py-0.5
                      text-[10px]
                      font-semibold
                      text-green-700
                    "
                  >
                    Active
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Transaction Statistics */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-4 text-base font-semibold text-[#0B1F59]">
          Transaction Statistics
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Daily ATM Transactions",
              name: "dailyAtmTransactions",
            },
            {
              label: "Daily IMPS Transactions",
              name: "dailyImpsTransactions",
            },
            {
              label: "Daily NEFT Transactions",
              name: "dailyNeftTransactions",
            },
            {
              label: "Daily RTGS Transactions",
              name: "dailyRtgsTransactions",
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {field.label}
              </label>

              <NumberInput
                name={field.name}
                value={data[field.name]}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Information */}
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
        "
      >
        <Info size={18} className="mt-0.5 shrink-0 text-green-600" />

        <p className="text-sm text-green-700">
          Enable Only The Payment Systems And NPCI Products That Are Currently
          Integrated With The CBS Environment To Ensure Accurate Project
          Assessment.
        </p>
      </div>
    </div>
  );
}
