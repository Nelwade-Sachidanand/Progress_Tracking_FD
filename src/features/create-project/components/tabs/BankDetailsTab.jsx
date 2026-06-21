import { Briefcase, Building2, MapPin, Phone } from "lucide-react";

import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";

export default function BankDetailsTab({ data, updateRootFields }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateRootFields({
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

  const iconInputClass = `
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
      {/* Back Button */}
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
          Project Information
        </h2>

        <p
          className="
        text-sm
        text-slate-500
        mt-1
      "
        >
          Fill bank and project details
        </p>
      </div>

      {/* Form Container */}
      <div
        className="
          bg-white
          border
          border-blue-200
          rounded-2xl
          p-5
        "
      >
        {/* Row 1 */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {/* Project Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Project Name
            </label>

            <div className="relative">
              <Briefcase
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
                name="projectName"
                value={data.projectName || ""}
                onChange={handleChange}
                placeholder="Enter project name"
                className={iconInputClass}
              />
            </div>
          </div>

          {/* Bank Name */}
          <div>
            <label className="block mb-2 text-sm font-medium">Bank Name</label>

            <div className="relative">
              <Building2
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
                name="bankName"
                value={data.bankName || ""}
                onChange={handleChange}
                placeholder="Enter bank name"
                className={iconInputClass}
              />
            </div>
          </div>

          {/* Project Manager */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Project Manager
            </label>

            <input
              type="text"
              name="projectManager"
              value={data.projectManager || ""}
              onChange={handleChange}
              placeholder="Enter project manager"
              className={inputClass}
            />
          </div>

          {/* Sales Person */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Sales Person
            </label>

            <input
              type="text"
              name="salesPerson"
              value={data.salesPerson || ""}
              onChange={handleChange}
              placeholder="Enter sales person"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
            mt-5
          "
        >
          {/* Head Office Address */}
          <div className="xl:col-span-2">
            <label className="block mb-2 text-sm font-medium">
              Head Office Address
            </label>

            <div className="relative">
              <MapPin
                size={16}
                className="
                  absolute
                  left-3
                  top-4
                  text-slate-400
                "
              />

              <textarea
                rows={3}
                name="headOfficeAddress"
                value={data.headOfficeAddress || ""}
                onChange={handleChange}
                placeholder="Enter head office address"
                className="
                  w-full
                  pl-10
                  pt-3
                  border
                  border-blue-200
                  rounded-xl
                  bg-white
                  outline-none
                  resize-none
                  transition-all
                  duration-200
                  focus:border-[#2563EB]
                  focus:ring-1
                  focus:ring-blue-200
                "
              />
            </div>
          </div>

          {/* Contact Number */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Head Office Contact No
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
                name="headOfficeContactNo"
                value={data.headOfficeContactNo || ""}
                onChange={handleChange}
                placeholder="Enter contact no"
                className={iconInputClass}
              />
            </div>
          </div>

          {/* Branches */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              No. Of Branches
            </label>

            <input
              type="number"
              name="noOfBranches"
              value={data.noOfBranches || ""}
              onChange={handleChange}
              placeholder="Enter branches"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
            mt-5
           
            
          "
        >
          <div>
            <label className="block mb-2 text-sm font-medium ">
              Type Of Bank
            </label>

            <select
              name="bankType"
              value={data.bankType || ""}
              onChange={handleChange}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select Type</option>

              <option value="UCB">UCB</option>

              <option value="Co-Operative">Co-Operative</option>

              <option value="Private">Private</option>

              <option value="Nationalized">Nationalized</option>
            </select>
          </div>
        </div>
      </div>

      {/* Note */}
      <div
        className="
          bg-green-50
          border
          border-green-200
          rounded-xl
          p-4
        "
      >
        <h4
          className="
            text-green-700
            font-semibold
            text-sm
          "
        >
          Note
        </h4>

        <p
          className="
            text-green-600
            text-sm
            mt-1
          "
        >
          You can save the project as draft at any stage and continue later.
        </p>
      </div>
    </div>
  );
}
