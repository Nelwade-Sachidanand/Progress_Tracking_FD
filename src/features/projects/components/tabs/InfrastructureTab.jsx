import { Database, Server, Plus } from "lucide-react";

export default function InfrastructureTab({
  data,
  updateSection,
}) {
  const handleChange = (e) => {
    updateSection("infrastructure", {
      [e.target.name]: e.target.value,
    });
  };

  const handleServerChange = (
    index,
    field,
    value
  ) => {
    const updatedServers = [
      ...data.servers,
    ];

    updatedServers[index][field] =
      value;

    updateSection(
      "infrastructure",
      {
        servers: updatedServers,
      }
    );
  };

  const addServerRow = () => {
    updateSection(
      "infrastructure",
      {
        servers: [
          ...data.servers,
          {
            serverType: "",
            units: "",
            diskSpace: "",
            ram: "",
            cores: "",
          },
        ],
      }
    );
  };

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
          Existing CBS Infrastructure
        </h2>

        <p
          className="
          text-sm
          text-slate-500
          mt-1
        "
        >
          Current CBS setup,
          database and server
          details.
        </p>
      </div>

      {/* Infrastructure Info */}
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
          text-md
          font-semibold
          mb-5
          text-[#0B1F59]
        "
        >
          Infrastructure Details
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
          {/* License */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current CBS License
            </label>

            <input
              type="text"
              name="currentLicenseType"
              value={
                data.currentLicenseType
              }
              onChange={
                handleChange
              }
              placeholder="License Type"
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

          {/* DC Vendor */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Current DC Vendor
            </label>

            <input
              type="text"
              name="currentDCVendor"
              value={
                data.currentDCVendor
              }
              onChange={
                handleChange
              }
              placeholder="Vendor Name"
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

          {/* Database */}
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
                type="text"
                name="currentDatabase"
                value={
                  data.currentDatabase
                }
                onChange={
                  handleChange
                }
                placeholder="Oracle / MySQL"
                className="
                w-full
                h-11
                pl-10
                border
                border-slate-300
                rounded-xl
              "
              />
            </div>
          </div>

          {/* Version */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Database Version
            </label>

            <input
              type="text"
              name="databaseVersion"
              value={
                data.databaseVersion
              }
              onChange={
                handleChange
              }
              placeholder="Version"
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

      {/* Server Configuration */}
      <div
        className="
        bg-white
        border
        border-slate-200
        rounded-2xl
        p-5
      "
      >
        <div
          className="
          flex
          justify-between
          items-center
          mb-5
        "
        >
          <h3
            className="
            text-md
            font-semibold
            text-[#0B1F59]
          "
          >
            Server Configuration
          </h3>

          <button
            type="button"
            onClick={addServerRow}
            className="
            flex
            items-center
            gap-2
            bg-[#2563EB]
            text-white
            px-4
            h-10
            rounded-xl
          "
          >
            <Plus size={16} />
            Add Server
          </button>
        </div>

        <div className="overflow-x-auto">
          <table
            className="
            w-full
            min-w-[900px]
            border-collapse
          "
          >
            <thead>
              <tr
                className="
                bg-slate-100
                text-left
              "
              >
                <th className="p-3">
                  Server Type
                </th>

                <th className="p-3">
                  Units
                </th>

                <th className="p-3">
                  Disk Space
                </th>

                <th className="p-3">
                  RAM
                </th>

                <th className="p-3">
                  CPU Cores
                </th>
              </tr>
            </thead>

            <tbody>
              {data.servers.map(
                (
                  server,
                  index
                ) => (
                  <tr
                    key={index}
                    className="
                    border-b
                    border-slate-200
                  "
                  >
                    <td className="p-2">
                      <input
                        value={
                          server.serverType
                        }
                        onChange={(e) =>
                          handleServerChange(
                            index,
                            "serverType",
                            e.target.value
                          )
                        }
                        className="
                        w-full
                        h-10
                        px-3
                        border
                        border-slate-300
                        rounded-lg
                      "
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          server.units
                        }
                        onChange={(e) =>
                          handleServerChange(
                            index,
                            "units",
                            e.target.value
                          )
                        }
                        className="
                        w-full
                        h-10
                        px-3
                        border
                        border-slate-300
                        rounded-lg
                      "
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          server.diskSpace
                        }
                        onChange={(e) =>
                          handleServerChange(
                            index,
                            "diskSpace",
                            e.target.value
                          )
                        }
                        className="
                        w-full
                        h-10
                        px-3
                        border
                        border-slate-300
                        rounded-lg
                      "
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          server.ram
                        }
                        onChange={(e) =>
                          handleServerChange(
                            index,
                            "ram",
                            e.target.value
                          )
                        }
                        className="
                        w-full
                        h-10
                        px-3
                        border
                        border-slate-300
                        rounded-lg
                      "
                      />
                    </td>

                    <td className="p-2">
                      <input
                        value={
                          server.cores
                        }
                        onChange={(e) =>
                          handleServerChange(
                            index,
                            "cores",
                            e.target.value
                          )
                        }
                        className="
                        w-full
                        h-10
                        px-3
                        border
                        border-slate-300
                        rounded-lg
                      "
                      />
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div
        className="
        bg-blue-50
        border
        border-blue-200
        rounded-xl
        p-4
      "
      >
        <p
          className="
          text-sm
          text-blue-700
        "
        >
          Add all production,
          DR and supporting
          servers currently used
          by the CBS ecosystem.
        </p>
      </div>
    </div>
  );
}