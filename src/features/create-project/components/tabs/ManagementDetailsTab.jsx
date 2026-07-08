import { Info, Phone, User } from "lucide-react";
import { toast } from "react-toastify";

export default function ManagementDetailsTab({ data, updateSection }) {
  const contacts = [
    { label: "Chairman", key: "chairman" },
    { label: "CEO", key: "ceo" },
    { label: "Consultant", key: "consultant" },
    { label: "IT Head", key: "itHead" },
  ];

  const handleChange = (contactKey, field, value) => {
    if (field === "contactNumber") {
      if (!/^\d*$/.test(value)) return;

      if (value.length > 10) {
        toast.error("Contact number cannot exceed 10 digits");
        return;
      }

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
    h-9
    pl-10
    pr-3
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#0B1F59]">
          Management Details
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Enter key management contacts of the bank.
        </p>
      </div>

      {/* Contact Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
          {contacts.map((contact) => (
            <div
              key={contact.key}
              className="rounded-lg border border-slate-200 p-4"
            >
              <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#EFF6FF] px-3 py-2">
                <User size={18} className="text-[#2563EB]" />
                <h3 className="text-base font-semibold text-[#0B1F59]">
                  {contact.label}
                </h3>
              </div>

              <div className="space-y-3">
                {/* Name */}

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      autoComplete="off"
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
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Contact Number
                  </label>

                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      maxLength={10}
                      autoComplete="off"
                      value={data?.[contact.key]?.contactNumber || ""}
                      onChange={(e) =>
                        handleChange(
                          contact.key,
                          "contactNumber",
                          e.target.value,
                        )
                      }
                      placeholder="Enter Contact Number"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
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
        w-[800px]
      "
      >
        <Info size={18} className="mt-0.5 shrink-0 text-green-600" />

        <p className="text-sm text-green-700">
          These Contact Details Will Be Used for Communication, Project
          Coordination, and Management Approvals.
        </p>
      </div>
    </div>
  );
}
