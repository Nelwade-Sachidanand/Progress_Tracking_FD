import {
  CreditCard,
  Globe,
  Mail,
  MessageCircle,
  Phone,
  Smartphone,
  Tablet,
} from "lucide-react";
import BackButton from "./BackButton";

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
      key: "whatsAppBanking",
      title: "WhatsApp Banking",
      icon: MessageCircle,
    },
    {
      key: "missedCallBanking",
      title: "Missed Call Banking",
      icon: Phone,
    },
    {
      key: "smsBanking",
      title: "SMS Banking",
      icon: Mail,
    },
    {
      key: "eStatement",
      title: "E-Statement",
      icon: Mail,
    },
    {
      key: "debitCardServices",
      title: "Debit Card Services",
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-8">
      <BackButton />

      {/* Header */}
      <div>
        <h2 className="text-lg xl:text-xl font-semibold text-[#0B1F59]">
          Digital Channels
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Select digital channels currently offered by the bank.
        </p>
      </div>

      {/* Digital Channels */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-[#0B1F59] mb-5">
          Available Digital Channels
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <div
                key={channel.key}
                onClick={() => handleToggle(channel.key)}
                className={`
                  cursor-pointer
                  rounded-2xl
                  p-5
                  border
                  transition-all
                  duration-300
                  bg-white
                  ${
                    data[channel.key]
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
                    checked={data[channel.key] || false}
                    onChange={() => handleToggle(channel.key)}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      w-4
                      h-4
                      accent-blue-600
                    "
                  />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-[#0B1F59]">
                  {channel.title}
                </h4>

                <p className="text-xs text-slate-500 mt-1">
                  Available for bank customers
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="font-semibold text-[#0B1F59] mb-5">
          Channel Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Mobile Banking Users
            </label>

            <input
              type="text"
              name="mobileUsers"
              value={data.mobileUsers || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Internet Banking Users
            </label>

            <input
              type="text"
              name="internetUsers"
              value={data.internetUsers || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Debit Card Users
            </label>

            <input
              type="text"
              name="cardUsers"
              value={data.cardUsers || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Active Digital Users
            </label>

            <input
              type="text"
              name="activeDigitalUsers"
              value={data.activeDigitalUsers || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-700">
          Select only the channels that are currently live and actively used by
          customers.
        </p>
      </div>
    </div>
  );
}
