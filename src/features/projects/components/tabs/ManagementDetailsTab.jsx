import { User, Phone } from "lucide-react";

export default function ManagementDetailsTab({
  data,
  updateSection,
}) {
  const handleChange = (e) => {
    updateSection(
      "managementDetails",
      {
        [e.target.name]:
          e.target.value,
      }
    );
  };

  const contacts = [
    {
      label: "Chairman",
      nameField: "chairmanName",
      contactField:
        "chairmanContact",
    },
    {
      label: "CEO",
      nameField: "ceoName",
      contactField:
        "ceoContact",
    },
    {
      label: "Consultant",
      nameField:
        "consultantName",
      contactField:
        "consultantContact",
    },
    {
      label: "IT Head",
      nameField: "itHeadName",
      contactField:
        "itHeadContact",
    },
  ];

  return (
    <div className="space-y-6">
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
          Enter key management
          contacts of the bank.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="space-y-5">
        {contacts.map(
          (contact) => (
            <div
              key={contact.label}
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
                "
                >
                  Name of{" "}
                  {contact.label}
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
                    name={
                      contact.nameField
                    }
                    value={
                      data[
                        contact
                          .nameField
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={`Enter ${contact.label} Name`}
                    className="
                    w-full
                    h-11
                    pl-10
                    border
                    border-slate-300
                    rounded-xl
                    outline-none
                    focus:ring-2
                    focus:ring-[#2563EB]
                  "
                  />
                </div>
              </div>

              {/* Contact */}
              <div>
                <label
                  className="
                  block
                  mb-2
                  text-sm
                  font-medium
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
                    name={
                      contact.contactField
                    }
                    value={
                      data[
                        contact
                          .contactField
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Enter Contact Number"
                    className="
                    w-full
                    h-11
                    pl-10
                    border
                    border-slate-300
                    rounded-xl
                    outline-none
                    focus:ring-2
                    focus:ring-[#2563EB]
                  "
                  />
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Info Box */}
      <div
        className="
        bg-slate-50
        border
        border-slate-200
        rounded-xl
        p-4
      "
      >
        <p
          className="
          text-sm
          text-slate-600
        "
        >
          These contacts will be
          used for communication,
          project coordination and
          management approvals.
        </p>
      </div>
    </div>
  );
}