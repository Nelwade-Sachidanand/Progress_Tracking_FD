import {
  Building2,
  User,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";

export default function BankDetailsTab({
  data,
  updateSection,
}) {
  const handleChange = (e) => {
    updateSection("bankDetails", {
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
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

      {/* Form */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        2xl:grid-cols-4
        gap-4
        2xl:gap-5
      "
      >
        {/* Project Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Project Name *
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
              value={data.projectName}
              onChange={handleChange}
              placeholder="Enter project name"
              className="
              w-full
              h-11
              pl-10
              border
              border-slate-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />
          </div>
        </div>

        {/* Bank Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Bank Name *
          </label>

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
              value={data.bankName}
              onChange={handleChange}
              placeholder="Enter bank name"
              className="
              w-full
              h-11
              pl-10
              border
              border-slate-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />
          </div>
        </div>

        {/* Project Manager */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Project Manager *
          </label>

          <select
            name="projectManager"
            value={data.projectManager}
            onChange={handleChange}
            className="
            w-full
            h-11
            px-3
            border
            border-slate-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          >
            <option value="">
              Select Project Manager
            </option>

            <option value="Manager 1">
              Manager 1
            </option>

            <option value="Manager 2">
              Manager 2
            </option>
          </select>
        </div>

        {/* Sales Person */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Sales Person *
          </label>

          <select
            name="salesPerson"
            value={data.salesPerson}
            onChange={handleChange}
            className="
            w-full
            h-11
            px-3
            border
            border-slate-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          >
            <option value="">
              Select Sales Person
            </option>

            <option value="Sales 1">
              Sales 1
            </option>

            <option value="Sales 2">
              Sales 2
            </option>
          </select>
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
      "
      >
        {/* Head Office Address */}
        <div className="xl:col-span-2">
          <label className="block mb-2 text-sm font-medium">
            Head Office Address *
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
              value={data.headOfficeAddress}
              onChange={handleChange}
              placeholder="Enter head office address"
              className="
              w-full
              pl-10
              pt-3
              border
              border-slate-300
              rounded-xl
              outline-none
              resize-none
              focus:ring-2
              focus:ring-blue-500
            "
            />
          </div>
        </div>

        {/* Contact No */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Head Office Contact No *
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
              value={
                data.headOfficeContactNo
              }
              onChange={handleChange}
              placeholder="Enter contact no"
              className="
              w-full
              h-11
              pl-10
              border
              border-slate-300
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            />
          </div>
        </div>

        {/* No Of Branches */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            No. Of Branches *
          </label>

          <input
            type="number"
            name="noOfBranches"
            value={data.noOfBranches}
            onChange={handleChange}
            placeholder="Enter branches"
            className="
            w-full
            h-11
            px-3
            border
            border-slate-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          />
        </div>
      </div>

      {/* Type of Bank */}
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
          <label className="block mb-2 text-sm font-medium">
            Type Of Bank *
          </label>

          <select
            name="typeOfBank"
            value={data.typeOfBank}
            onChange={handleChange}
            className="
            w-full
            h-11
            px-3
            border
            border-slate-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "
          >
            <option value="">
              Select Type
            </option>

            <option value="UCB">
              UCB
            </option>

            <option value="Co-Operative">
              Co-Operative
            </option>

            <option value="Private">
              Private
            </option>

            <option value="Nationalized">
              Nationalized
            </option>
          </select>
        </div>
      </div>

      {/* Note */}
      <div
        className="
        bg-blue-50
        border
        border-blue-200
        rounded-xl
        p-4
      "
      >
        <h4
          className="
          text-blue-700
          font-semibold
          text-sm
        "
        >
          Note
        </h4>

        <p
          className="
          text-blue-600
          text-sm
          mt-1
        "
        >
          You can save the project as draft
          at any stage and continue later.
        </p>
      </div>
    </div>
  );
}