import { Phone, User } from "lucide-react";
import { toast } from "react-toastify";
import BackButton from "./BackButton";

export default function ManagementDetailsTab({ data, updateSection }) {
  const contacts = [
    {
      label: "Chairman",
      key: "chairman",
    },
    {
      label: "CEO",
      key: "ceo",
    },
    {
      label: "Consultant",
      key: "consultant",
    },
    {
      label: "IT Head",
      key: "itHead",
    },
  ];

  const handleChange = (contactKey, field, value) => {
    if (field === "contactNumber") {
      // Allow only digits
      if (!/^\d*$/.test(value)) {
        return;
      }

      // Maximum 10 digits
      if (value.length > 10) {
        toast.error("Contact number cannot exceed 10 digits");
        return;
      }

      // Must start with 6-9 (Indian mobile numbers)
      if (value.length === 1 && !/[6-9]/.test(value)) {
        toast.error("Contact number must start with 6, 7, 8 or 9");
        return;
      }
    }
    updateSection("contactDetails", {
      ...data,
      [contactKey]: {
        ...data[contactKey],
        [field]: value,
      },
    });
  };

  const inputClass = `
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
    <div className="space-y-6">
      <BackButton />

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
          Management Details
        </h2>

        <p
          className="
            text-sm
            text-slate-500
            mt-1
          "
        >
          Enter key management contacts of the bank.
        </p>
      </div>

      {/* Contact Section */}
      <div
        className="
          bg-white
          border
          border-blue-200
          rounded-2xl
          p-5
        "
      >
        <div className="space-y-5">
          {contacts.map((contact) => (
            <div
              key={contact.key}
              className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-4
              "
            >
              {/* Name */}
              <div>
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Name of {contact.label}
                </label>

                <div className="relative">
                  <User
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
                    value={data?.[contact.key]?.name || ""}
                    onChange={(e) =>
                      handleChange(contact.key, "name", e.target.value)
                    }
                    placeholder={`Enter ${contact.label} Name`}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label
                  className="
                    block
                    mb-2
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  Contact Number
                </label>

                <div className="relative">
                  <Phone
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
                    maxLength={10}
                    value={data?.[contact.key]?.contactNumber || ""}
                    onChange={(e) =>
                      handleChange(contact.key, "contactNumber", e.target.value)
                    }
                    placeholder="Enter Contact Number"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
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
          These contacts will be used for communication, project coordination
          and management approvals.
        </p>
      </div>
    </div>
  );
}
