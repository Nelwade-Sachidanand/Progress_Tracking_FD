import {
  Smartphone,
  Globe,
  Tablet,
  MessageCircle,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";

export default function DigitalChannelsTab({
  data,
  updateSection,
}) {
  const handleToggle = (field) => {
    updateSection("digitalChannels", {
      [field]: !data[field],
    });
  };

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
          Digital Channels
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          mt-1
        "
        >
          Select digital channels
          currently offered by the
          bank.
        </p>
      </div>

      {/* Channels Grid */}
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
        {channels.map((channel) => {
          const Icon = channel.icon;

          return (
            <div
              key={channel.key}
              onClick={() =>
                handleToggle(channel.key)
              }
              className={`
                cursor-pointer
                border
                rounded-2xl
                p-5
                transition-all
                hover:shadow-md

                ${
                  data[channel.key]
                    ? "border-[#2563EB] bg-blue-50"
                    : "border-slate-200 bg-white"
                }
              `}
            >
              <div
                className="
                flex
                items-center
                justify-between
              "
              >
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
                    data[channel.key] || false
                  }
                  onChange={() =>
                    handleToggle(
                      channel.key
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
                {channel.title}
              </h4>

              <p
                className="
                text-xs
                text-slate-500
                mt-2
              "
              >
                Available for bank
                customers
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Details */}
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
          mb-4
        "
        >
          Channel Statistics
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
              Mobile Banking Users
            </label>

            <input
              type="number"
              name="mobileUsers"
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
              Internet Banking Users
            </label>

            <input
              type="number"
              name="internetUsers"
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
              Debit Card Users
            </label>

            <input
              type="number"
              name="cardUsers"
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
              Active Digital Users
            </label>

            <input
              type="number"
              name="activeDigitalUsers"
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
        bg-green-50
        border
        border-green-200
        rounded-xl
        p-4
      "
      >
        <p
          className="
          text-sm
          text-green-700
        "
        >
          Select only the channels
          that are currently live and
          being used by customers.
        </p>
      </div>
    </div>
  );
}