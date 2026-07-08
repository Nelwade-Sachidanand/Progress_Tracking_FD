import { Globe, Info, PiggyBank, Smartphone, Tablet } from "lucide-react";
import NumberInput from "../../../../components/common/NumberInput";

export default function DigitalChannelsTab({ data, updateSection }) {
  const handleToggle = (field) => {
    updateSection("digitalChannels", {
      ...data,
      [field]: !data[field],
    });
  };

  const handleChange = (e) => {
    updateSection("digitalChannels", {
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

  const channels = [
    {
      key: "mobileBanking",
      title: "Mobile Banking",
      icon: Smartphone,
    },
    {
      key: "internetBanking",
      title: "Internet Banking",
      icon: Globe,
    },
    {
      key: "tabletBanking",
      title: "Tablet Banking",
      icon: Tablet,
    },
    {
      key: "pigmyBanking",
      title: "PigMy Banking",
      icon: PiggyBank,
    },
  ];

  return (
    <div className="space-y-4">
      {/* ==========================================
          Header
      =========================================== */}

      <div>
        <h2 className="text-xl font-semibold text-[#0B1F59]">
          Digital Channels
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure The Digital Banking Channels Available To Customers.
        </p>
      </div>

      {/* ==========================================
          Available Digital Channels
      =========================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[250px]">
          Available Digital Channels
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <div
                key={channel.key}
                onClick={() => handleToggle(channel.key)}
                className={`
          relative
          cursor-pointer
          rounded-xl
          border
          p-4
          transition-all
          duration-300

          ${
            data[channel.key]
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
                data[channel.key]
                  ? "bg-[#2563EB] text-white"
                  : "bg-blue-100 text-[#2563EB]"
              }
            `}
                  >
                    <Icon size={18} />
                  </div>

                  <input
                    type="checkbox"
                    checked={data[channel.key] || false}
                    onChange={() => handleToggle(channel.key)}
                    onClick={(e) => e.stopPropagation()}
                    className="h-4 w-4 cursor-pointer accent-blue-600"
                  />
                </div>

                <h4 className="mt-3 text-sm font-semibold text-[#0B1F59]">
                  {channel.title}
                </h4>

                {/* <p className="mt-1 text-xs text-slate-500">
                  Available For Bank Customers
                </p> */}

                {data[channel.key] && (
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

      {/* ==========================================
          Channel Statistics
      =========================================== */}

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[250px]">
          Channel Statistics
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Mobile Banking Users */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Mobile Banking Users
            </label>

            <NumberInput
              name="mobileUsers"
              value={data.mobileUsers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Internet Banking Users */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Internet Banking Users
            </label>

            <NumberInput
              name="internetUsers"
              value={data.internetUsers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Debit Card Users */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Debit Card Users
            </label>

            <NumberInput
              name="cardUsers"
              value={data.cardUsers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Active Digital Users */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Active Digital Users
            </label>

            <NumberInput
              name="activeDigitalUsers"
              value={data.activeDigitalUsers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>
      {/* ==========================================
          Information
      =========================================== */}

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
          Enable Only The Digital Channels That Are Currently Live And Actively
          Used By Customers To Ensure Accurate Digital Banking Assessment.
        </p>
      </div>
    </div>
  );
}
