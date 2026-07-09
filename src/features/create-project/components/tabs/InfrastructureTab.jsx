import { Database, Info, Plus, Trash2 } from "lucide-react";
import TableDropdown from "../../../../components/common/TableDropdown";

export default function InfrastructureTab({
  infrastructure = {},
  hardwareDetails = [],
  updateSection = () => { },
  updateArraySection = () => { },
}) {
  const serverOptions = [
    "DB Server",
    "App Server",
    "Web Server",
    "ATM / POS Server",
    "RTGS / NEFT Server",
    "UPI Server",
    "SMS / E-mail Server",
    "Any Other",
  ];

  const handleChange = (e) => {
    updateSection("infrastructure", {
      ...infrastructure,
      [e.target.name]: e.target.value,
    });
  };

  const handleServerChange = (index, field, value) => {
    const updatedServers = [...hardwareDetails];

    updatedServers[index] = {
      ...updatedServers[index],
      [field]: value,
    };

    updateArraySection("hardwareDetails", updatedServers);
  };

  const addServerRow = () => {
    const selectedServers = hardwareDetails
      .map((s) => s.serverType)
      .filter(Boolean);

    if (selectedServers.length >= serverOptions.length) {
      return;
    }

    updateArraySection("hardwareDetails", [
      ...hardwareDetails,
      {
        serverType: "",
        units: "",
        diskSpaceGb: "",
        ramGb: "",
        cores: "",
      },
    ]);
  };

  const removeServerRow = (index) => {
    const updatedServers = [...hardwareDetails];

    updatedServers.splice(index, 1);

    updateArraySection("hardwareDetails", updatedServers);
  };

  const inputClass = `
  w-full
  h-9
  px-3

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  text-sm
  text-slate-700
  placeholder:text-slate-500

  outline-none

  transition-all
  duration-200

  focus:border-blue-500
`;

  const iconInputClass = `
  w-full
  h-9
  pl-10
  pr-3

  rounded-lg
  border
  border-[#B8C4D1]
  bg-white

  text-sm
  text-slate-700
  placeholder:text-slate-500

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
          Existing CBS Infrastructure
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Enter Current CBS Infrastructure, Database and Server Details.
        </p>
      </div>

      {/* =======================================================
          Infrastructure Details
      ======================================================== */}

      <div className="rounded-xl border border-[#CDD7E3] bg-white p-4">
        <h3 className="mb-4 rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[200px]">
          Infrastructure Details
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {/* Current CBS License */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Current CBS License
            </label>

            <input
              type="text"
              autoComplete="off"
              name="currentLicenseType"
              value={infrastructure.currentLicenseType || ""}
              onChange={handleChange}
              placeholder="Enter License Type"
              className={inputClass}
            />
          </div>

          {/* Current DC Vendor */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Current DC Vendor
            </label>

            <input
              type="text"
              autoComplete="off"
              name="currentDCVendor"
              value={infrastructure.currentDCVendor || ""}
              onChange={handleChange}
              placeholder="Enter Vendor Name"
              className={inputClass}
            />
          </div>

          {/* Current Database */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Current Database
            </label>

            <div className="relative">
              <Database
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                data-testid="current-database"
                type="text"
                autoComplete="off"
                name="currentDatabase"
                value={infrastructure.currentDatabase || ""}
                onChange={handleChange}
                placeholder="Oracle / SQL Server"
                className={iconInputClass}
              />
            </div>
          </div>

          {/* Database Version */}

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Database Version
            </label>

            <input
              type="text"
              autoComplete="off"
              name="databaseVersion"
              value={infrastructure.databaseVersion || ""}
              onChange={handleChange}
              placeholder="Enter Version"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* =======================================================
          Server Configuration
      ======================================================== */}

      <div className="rounded-xl border border-[#CDD7E3] bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="rounded-md bg-blue-50 px-3 py-2 text-base font-semibold text-[#0B1F59] w-[200px]">
            Server Configuration
          </h3>

          <button
            type="button"
            onClick={addServerRow}
            disabled={
              hardwareDetails.filter((s) => s.serverType).length >=
              serverOptions.length
            }
            className="
              flex
              h-9
              items-center
              gap-2
              rounded-lg
              bg-[#2563EB]
              px-4
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:bg-slate-300
              cursor-pointer
            "
          >
            <Plus size={16} />
            Add Server
          </button>
        </div>

        <div className="overflow-x-auto mt-[-10px]">
          <table className="min-w-[980px] w-full border-separate border-spacing-y-1">
            <thead>
              <tr className="rounded-lg bg-slate-100">
                <th className="rounded-l-lg px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  Server Type
                </th>

                <th className="px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  No. Of Units
                </th>

                <th className="px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  Disk Space (GB)
                </th>

                <th className="px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  RAM (GB)
                </th>

                <th className="px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  No. Of Cores
                </th>

                <th className="rounded-r-lg px-3 py-2 text-center text-sm font-semibold text-[#0B1F59]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {hardwareDetails.map((server, index) => (
                <tr key={index} className="rounded-lg bg-white shadow-sm">
                  {/* Server Type */}

                  <td className="p-2 w-[240px] min-w-[240px]">
                    <TableDropdown
                      placeholder="Select Server"
                      value={server.serverType}
                      onChange={(value) =>
                        handleServerChange(index, "serverType", value)
                      }
                      options={serverOptions.map((option) => ({
                        label: option,
                        value: option,
                      }))}
                    />
                  </td>

                  {/* Units */}

                  <td className="p-2">
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      value={server.units || ""}
                      onChange={(e) =>
                        handleServerChange(index, "units", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                      className="
                        h-9
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        px-3
                        text-sm
                        outline-none
                        transition-all
                        duration-200
                        focus:border-blue-500
                      "
                    />
                  </td>

                  {/* Disk Space */}

                  <td className="p-2">
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      value={server.diskSpaceGb || ""}
                      onChange={(e) =>
                        handleServerChange(index, "diskSpaceGb", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                      className="
                        h-9
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        px-3
                        text-sm
                        outline-none
                        transition-all
                        duration-200
                        focus:border-blue-500
                      "
                    />
                  </td>

                  {/* RAM */}

                  <td className="p-2">
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      value={server.ramGb || ""}
                      onChange={(e) =>
                        handleServerChange(index, "ramGb", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                      className="
                        h-9
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        px-3
                        text-sm
                        outline-none
                        transition-all
                        duration-200
                        focus:border-blue-500
                      "
                    />
                  </td>

                  {/* Cores */}

                  <td className="p-2">
                    <input
                      type="number"
                      autoComplete="off"
                      min="0"
                      value={server.cores || ""}
                      onChange={(e) =>
                        handleServerChange(index, "cores", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                      className="
                        h-9
                        w-full
                        rounded-lg
                        border
                        border-slate-300
                        px-3
                        text-sm
                        outline-none
                        transition-all
                        duration-200
                        focus:border-blue-500
                      "
                    />
                  </td>

                  {/* Delete */}

                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeServerRow(index)}
                      className="
                        inline-flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        text-red-500
                        transition-all
                        hover:bg-red-50
                        hover:text-red-700
                        cursor-pointer
                      "
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* =======================================================
          Information
      ======================================================== */}

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
          Enter Current CBS Infrastructure, Database and Server Configuration
          Details for Accurate Capacity Planning and Infrastructure Assessment.
        </p>
      </div>
    </div>
  );
}
