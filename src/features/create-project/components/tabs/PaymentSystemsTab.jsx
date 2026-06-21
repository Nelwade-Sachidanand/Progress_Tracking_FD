import {
  Building2,
  CheckCircle,
  CreditCard,
  Landmark,
  Receipt,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import BackButton from "./BackButton";

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

  const products = [
    { key: "rtgs", title: "RTGS", icon: Landmark },
    { key: "neft", title: "NEFT", icon: Landmark },
    { key: "imps", title: "IMPS", icon: Smartphone },
    { key: "upi", title: "UPI", icon: Smartphone },
    { key: "nach", title: "NACH", icon: Receipt },
    { key: "bbps", title: "BBPS", icon: Receipt },
    { key: "aeps", title: "AEPS", icon: Wallet },
    { key: "rupay", title: "RuPay", icon: CreditCard },
    { key: "atmSwitch", title: "ATM Switch", icon: Building2 },
    { key: "pos", title: "POS", icon: CreditCard },
    { key: "reconciliation", title: "Reconciliation", icon: CheckCircle },
    { key: "aml", title: "AML", icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8">
      <BackButton />

      {/* Header */}
      <div>
        <h2 className="text-lg xl:text-xl font-semibold text-[#0B1F59]">
          Payment Systems & NPCI Products
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Select payment systems, NPCI products and banking integrations
          currently enabled.
        </p>
      </div>

      {/* Products */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-[#0B1F59] mb-5">
          Enabled Payment Systems
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {products.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.key}
                onClick={() => handleToggle(item.key)}
                className={`
                  cursor-pointer
                  border
                  rounded-2xl
                  p-5
                  transition-all
                  duration-300
                  bg-white

                  ${
                    data[item.key]
                      ? "border-[#2563EB] bg-blue-50 shadow-md"
                      : "border-blue-200 hover:border-[#2563EB] hover:shadow-md"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div
                    className="
                      w-12
                      h-12
                      rounded-xl
                      bg-[#EEF4FF]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <Icon size={22} className="text-[#2563EB]" />
                  </div>

                  <input
                    type="checkbox"
                    checked={data[item.key] || false}
                    onChange={() => handleToggle(item.key)}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      w-4
                      h-4
                      accent-blue-600
                    "
                  />
                </div>

                <h4
                  className="
                    mt-4
                    text-sm
                    font-semibold
                    text-[#0B1F59]
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                    text-xs
                    text-slate-500
                    mt-1
                  "
                >
                  Enabled in bank ecosystem
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-[#0B1F59] mb-5">
          Transaction Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Daily UPI Transactions
            </label>

            <input
              type="number"
              name="dailyUpiTransactions"
              value={data.dailyUpiTransactions || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Daily IMPS Transactions
            </label>

            <input
              type="number"
              name="dailyImpsTransactions"
              value={data.dailyImpsTransactions || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Daily NEFT Transactions
            </label>

            <input
              type="number"
              name="dailyNeftTransactions"
              value={data.dailyNeftTransactions || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Daily RTGS Transactions
            </label>

            <input
              type="number"
              name="dailyRtgsTransactions"
              value={data.dailyRtgsTransactions || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-700">
          Select only active payment systems currently integrated with CBS and
          NPCI ecosystem.
        </p>
      </div>
    </div>
  );
}
