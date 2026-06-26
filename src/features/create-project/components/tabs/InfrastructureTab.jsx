import { Database, Plus, Trash2 } from "lucide-react";
import BackButton from "./BackButton";

export default function InfrastructureTab({
  infrastructure = {},
  hardwareDetails = [],
  updateSection = () => {},
  updateArraySection = () => {},
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

  return (
    <div className="space-y-8">
      <BackButton />

      {/* Header */}
      <div>
        <h2 className="text-lg xl:text-xl font-semibold text-[#0B1F59]">
          Existing CBS Infrastructure
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Current CBS setup, database and server details.
        </p>
      </div>

      {/* Infrastructure Details */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <h3 className="text-md font-semibold mb-5 text-[#0B1F59]">
          Infrastructure Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current CBS License
            </label>

            <input
              type="text"
              name="currentLicenseType"
              value={infrastructure.currentLicenseType || ""}
              onChange={handleChange}
              placeholder="License Type"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Current DC Vendor
            </label>

            <input
              type="text"
              name="currentDCVendor"
              value={infrastructure.currentDCVendor || ""}
              onChange={handleChange}
              placeholder="Vendor Name"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Current Database
            </label>

            <div className="relative">
              <Database
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
                data-testid="current-database"
                type="text"
                name="currentDatabase"
                value={infrastructure.currentDatabase || ""}
                onChange={handleChange}
                placeholder="e.g. Oracle / SQL"
                className="
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
                "
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Database Version
            </label>

            <input
              type="text"
              name="databaseVersion"
              value={infrastructure.databaseVersion || ""}
              onChange={handleChange}
              placeholder="Version"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Server Configuration */}
      <div className="bg-white border border-blue-200 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-md font-semibold text-[#0B1F59]">
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
              items-center
              gap-2
              bg-[#2563EB]
              text-white
              px-4
              h-10
              rounded-xl
              cursor-pointer
              hover:bg-blue-700
              transition-all
              disabled:bg-slate-300
              disabled:cursor-not-allowed
            "
          >
            <Plus size={16} />
            Add Server
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-separate border-spacing-y-2">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-3 py-3 text-sm font-semibold text-center">
                  Server Type
                </th>

                <th className="px-3 py-3 text-sm font-semibold text-center">
                  No. of Units
                </th>

                <th className="px-3 py-3 text-sm font-semibold text-center">
                  Disk Space (GB)
                </th>

                <th className="px-3 py-3 text-sm font-semibold text-center">
                  RAM (GB)
                </th>

                <th className="px-3 py-3 text-sm font-semibold text-center">
                  No. of Cores
                </th>

                <th className="px-3 py-3 text-sm font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {hardwareDetails.map((server, index) => (
                <tr key={index}>
                  <td className="p-2">
                    <select
                      value={server.serverType}
                      onChange={(e) =>
                        handleServerChange(index, "serverType", e.target.value)
                      }
                      className="
                          w-full
                          h-9
                          px-2
                          text-sm
                          border
                          border-blue-200
                          rounded-md
                          outline-none
                          cursor-pointer
                        "
                    >
                      <option value="">Select</option>

                      {serverOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-2">
                    <input
                      value={server.units || ""}
                      onChange={(e) =>
                        handleServerChange(index, "units", e.target.value)
                      }
                      className="
                          w-full
                          h-9
                          px-2
                          text-sm
                          border
                          border-blue-200
                          rounded-md
                        "
                    />
                  </td>

                  <td className="p-2">
                    <input
                      value={server.diskSpaceGb || ""}
                      onChange={(e) =>
                        handleServerChange(index, "diskSpaceGb", e.target.value)
                      }
                      className="
                          w-full
                          h-9
                          px-2
                          text-sm
                          border
                          border-blue-200
                          rounded-md
                        "
                    />
                  </td>

                  <td className="p-2">
                    <input
                      value={server.ramGb || ""}
                      onChange={(e) =>
                        handleServerChange(index, "ramGb", e.target.value)
                      }
                      className="
                          w-full
                          h-9
                          px-2
                          text-sm
                          border
                          border-blue-200
                          rounded-md
                        "
                    />
                  </td>

                  <td className="p-2">
                    <input
                      value={server.cores || ""}
                      onChange={(e) =>
                        handleServerChange(index, "cores", e.target.value)
                      }
                      className="
                          w-full
                          h-9
                          px-2
                          text-sm
                          border
                          border-blue-200
                          rounded-md
                        "
                    />
                  </td>

                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => removeServerRow(index)}
                      className="
                          p-2
                          rounded-full
                          text-red-500
                          hover:bg-red-50
                          hover:text-red-700
                          transition-all
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

      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <p className="text-sm text-green-700">
          Add all production, DR and supporting servers currently used by the
          CBS ecosystem.
        </p>
      </div>
    </div>
  );
}
