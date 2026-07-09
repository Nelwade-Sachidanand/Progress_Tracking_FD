import { Briefcase, Building2, Info, MapPin, Phone } from "lucide-react";
import { toast } from "react-toastify";
import CustomDropdown from "../../../../components/common/CustomDropdown";
import NumberInput from "../../../../components/common/NumberInput";

export default function BankDetailsTab({ data, updateRootFields }) {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "headOfficeContactNo") {
      if (!/^\d*$/.test(value)) {
        return;
      }

      if (value.length > 10) {
        toast.error("Contact number cannot exceed 10 digits");
        return;
      }
    }

    updateRootFields({
      [name]: value,
    });
  };

  const handleDropdownChange = (name, value) => {
    updateRootFields({
      [name]: value,
    });
  };

  const inputClass = `
  w-full
  h-9
  px-3
  text-sm
  text-slate-700

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  outline-none
  transition-all
  duration-200

  focus:border-blue-500
  placeholder:text-slate-500
`;

  const iconInputClass = `
  w-full
  h-9
  pl-10
  pr-3
  text-sm
  text-slate-700

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  outline-none
  transition-all
  duration-200

  focus:border-blue-500
  placeholder:text-slate-500
`;

  return (
    <div className="space-y-4 mb-10">
      {/* Header */}

      <div>
        <h2 className="text-xl font-semibold text-[#0B1F59]">
          Project Information
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Fill Bank and Project Details
        </p>
      </div>

      {/* Card */}

      <div className="rounded-xl border border-[#CDD7E3] bg-white p-4">
        {/* ============================
            Row 1
        ============================ */}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Project Name */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Project Name
            </label>

            <div className="relative">
              <Briefcase
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                name="projectName"
                value={data.projectName || ""}
                onChange={handleChange}
                placeholder="Enter Project Name"
                className={iconInputClass}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Bank Name */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Bank Name
            </label>

            <div className="relative">
              <Building2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                name="bankName"
                value={data.bankName || ""}
                onChange={handleChange}
                placeholder="Enter Bank Name"
                className={iconInputClass}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Project Manager */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Project Manager
            </label>

            <input
              type="text"
              name="projectManager"
              value={data.projectManager || ""}
              onChange={handleChange}
              placeholder="Enter Project Manager"
              className={inputClass}
              autoComplete="off"
            />
          </div>

          {/* Sales Person */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Sales Person
            </label>

            <input
              type="text"
              name="salesPerson"
              value={data.salesPerson || ""}
              onChange={handleChange}
              placeholder="Enter Sales Person"
              className={inputClass}
              autoComplete="off"
            />
          </div>
        </div>

        {/* ============================
            Row 2 Starts
        ============================ */}

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {/* Contact Number */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Head Office Contact No
            </label>

            <div className="relative">
              <Phone
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                maxLength={10}
                name="headOfficeContactNo"
                value={data.headOfficeContactNo || ""}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                className={iconInputClass}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Type Of Bank */}
          <CustomDropdown
            label="Type Of Bank"
            placeholder="Select Type"
            value={data.bankType || ""}
            onChange={(value) => handleDropdownChange("bankType", value)}
            options={[
              {
                label: "UCB",
                value: "UCB",
              },
              {
                label: "Co-Operative",
                value: "Co-Operative",
              },
              {
                label: "Private",
                value: "Private",
              },
              {
                label: "Nationalized",
                value: "Nationalized",
              },
            ]}
          />

          {/* Number Of Branches */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              No. Of Branches
            </label>

            <NumberInput
              name="noOfBranches"
              value={data.noOfBranches}
              onChange={handleChange}
              placeholder="Enter number of branches"
              className={inputClass}
            />
          </div>

          {/* Head Office Address */}
          <div className="xl:col-span-2">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Head Office Address
            </label>

            <div className="relative">
              <MapPin
                size={16}
                className="absolute left-3 top-3 text-slate-500"
              />

              <textarea
                rows={2}
                name="headOfficeAddress"
                value={data.headOfficeAddress || ""}
                onChange={handleChange}
                placeholder="Enter Head Office Address"
                autoComplete="off"
                className="
                w-full
                resize-none

                rounded-lg
                border
                border-[#B8C4D1]
                bg-white

                pl-10
                pr-3
                pt-2.5

                text-sm
                text-slate-700
                placeholder:text-slate-500

                outline-none

                transition-all
                duration-200

                focus:border-blue-500
              "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Compact Note */}

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
    w-[600px]
  "
      >
        <Info size={18} className="mt-0.5 shrink-0 text-green-600" />

        <p className="text-sm text-green-700">
          This Project Can Be Saved as a Draft at Any Stage and Continued Later.
        </p>
      </div>
    </div>
  );
}
