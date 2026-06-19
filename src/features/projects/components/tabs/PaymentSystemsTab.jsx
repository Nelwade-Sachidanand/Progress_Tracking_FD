import {
  Landmark,
  CreditCard,
  Smartphone,
  Receipt,
  Wallet,
  Building2,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export default function PaymentSystemsTab({
  data,
  updateSection,
}) {
  const handleToggle = (field) => {
    updateSection("paymentSystems", {
      [field]: !data[field],
    });
  };

  const products = [
    {
      key: "rtgs",
      title: "RTGS",
      icon: Landmark,
    },
    {
      key: "neft",
      title: "NEFT",
      icon: Landmark,
    },
    {
      key: "imps",
      title: "IMPS",
      icon: Smartphone,
    },
    {
      key: "upi",
      title: "UPI",
      icon: Smartphone,
    },
    {
      key: "nach",
      title: "NACH",
      icon: Receipt,
    },
    {
      key: "bbps",
      title: "BBPS",
      icon: Receipt,
    },
    {
      key: "aeps",
      title: "AEPS",
      icon: Wallet,
    },
    {
      key: "rupay",
      title: "RuPay",
      icon: CreditCard,
    },
    {
      key: "atmSwitch",
      title: "ATM Switch",
      icon: Building2,
    },
    {
      key: "pos",
      title: "POS",
      icon: CreditCard,
    },
    {
      key: "reconciliation",
      title: "Reconciliation",
      icon: CheckCircle,
    },
    {
      key: "aml",
      title: "AML",
      icon: ShieldCheck,
    },
  ];

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
          Payment Systems & NPCI Products
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          mt-1
        "
        >
          Select payment systems,
          NPCI products and banking
          integrations currently
          enabled.
        </p>
      </div>

      {/* Products Grid */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-5
      "
      >
        {products.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              onClick={() =>
                handleToggle(item.key)
              }
              className={`
                cursor-pointer
                border
                rounded-2xl
                p-5
                transition-all
                hover:shadow-md

                ${
                  data[item.key]
                    ? "border-[#2563EB] bg-blue-50"
                    : "border-slate-200 bg-white"
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
                  <Icon
                    size={22}
                    className="text-[#2563EB]"
                  />
                </div>

                <input
                  type="checkbox"
                  checked={
                    data[item.key] || false
                  }
                  onChange={() =>
                    handleToggle(
                      item.key
                    )
                  }
                />
              </div>

              <h4
                className="
                mt-4
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
                mt-2
              "
              >
                Enabled in bank
                ecosystem
              </p>
            </div>
          );
        })}
      </div>

      {/* Statistics */}
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
          font-semibold
          text-[#0B1F59]
          mb-5
        "
        >
          Transaction Statistics
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
          <div>
            <label className="block mb-2 text-sm">
              Daily UPI Transactions
            </label>

            <input
              type="number"
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

          <div>
            <label className="block mb-2 text-sm">
              Daily IMPS Transactions
            </label>

            <input
              type="number"
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

          <div>
            <label className="block mb-2 text-sm">
              Daily NEFT Transactions
            </label>

            <input
              type="number"
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

          <div>
            <label className="block mb-2 text-sm">
              Daily RTGS Transactions
            </label>

            <input
              type="number"
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
        </div>
      </div>

      {/* Info */}
      <div
        className="
        bg-purple-50
        border
        border-purple-200
        rounded-xl
        p-4
      "
      >
        <p
          className="
          text-sm
          text-purple-700
        "
        >
          Select only active payment
          systems currently integrated
          with CBS and NPCI ecosystem.
        </p>
      </div>
    </div>
  );
}