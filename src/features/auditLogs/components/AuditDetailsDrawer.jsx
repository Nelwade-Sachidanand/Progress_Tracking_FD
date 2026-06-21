import { Clock, FileText, User, X } from "lucide-react";

export default function AuditDetailsDrawer({ log, onClose }) {
  if (!log) return null;

  const oldData = log.oldData ? JSON.parse(log.oldData) : null;

  const newData = log.newData ? JSON.parse(log.newData) : null;

  const formatLabel = (str = "") =>
    str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

  const renderValue = (value, compareValue, isOld, key = "") => {
    // Primitive values
    if (
      value === null ||
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      const changed = JSON.stringify(value) !== JSON.stringify(compareValue);

      return (
        <span
          className={`font-medium ${
            changed ? (isOld ? "text-red-300" : "text-green-300") : "text-white"
          }`}
        >
          {typeof value === "boolean" ? (value ? "Yes" : "No") : String(value)}
        </span>
      );
    }

    // Arrays (hardwareDetails)
    if (Array.isArray(value)) {
      return (
        <div className="space-y-4">
          {value.map((item, index) => (
            <div
              key={index}
              className="
              bg-slate-800
              rounded-xl
              p-4
              border
              border-slate-700
            "
            >
              <div className="text-cyan-300 font-semibold mb-3">
                Server {index + 1}
              </div>

              {Object.entries(item).map(([k, v]) => (
                <div
                  key={k}
                  className="
                  flex
                  justify-between
                  py-2
                  border-b
                  border-slate-700
                  last:border-0
                "
                >
                  <span className="text-slate-300">{formatLabel(k)}</span>

                  <span className="text-white font-medium">{String(v)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // Contact Card
    if (
      value &&
      typeof value === "object" &&
      "name" in value &&
      "contactNumber" in value
    ) {
      return (
        <div
          className="
          bg-slate-800
          rounded-xl
          border
          border-slate-700
          overflow-hidden
          shadow-sm
          max-w-md
          mx-auto
        "
        >
          <div
            className="
            bg-slate-700
            py-3
            text-center
            border-b
            border-slate-600
          "
          >
            <h5
              className="
              text-cyan-300
              font-semibold
              text-base
            "
            >
              {formatLabel(key)}
            </h5>
          </div>

          <div className="p-4">
            <div
              className="
              flex
              justify-between
              py-2
              border-b
              border-slate-700
            "
            >
              <span className="text-slate-300">Name</span>

              <span className="text-white font-medium">
                {value.name || "-"}
              </span>
            </div>

            <div
              className="
              flex
              justify-between
              py-2
            "
            >
              <span className="text-slate-300">Contact Number</span>

              <span className="text-white font-medium">
                {value.contactNumber || "-"}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Generic Object
    return (
      <div className="space-y-4">
        {Object.entries(value).map(([childKey, childValue]) => {
          const isContactCard =
            childValue &&
            typeof childValue === "object" &&
            "name" in childValue &&
            "contactNumber" in childValue;

          // Contact cards should render standalone
          if (isContactCard) {
            return (
              <div key={childKey}>
                {renderValue(
                  childValue,
                  compareValue?.[childKey],
                  isOld,
                  childKey,
                )}
              </div>
            );
          }

          return (
            <div
              key={childKey}
              className="
              flex
              justify-between
              gap-4
              py-2
              border-b
              border-slate-700
              last:border-0
            "
            >
              <span className="text-cyan-300">{formatLabel(childKey)}</span>

              <div className="text-right">
                {renderValue(
                  childValue,
                  compareValue?.[childKey],
                  isOld,
                  childKey,
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderJsonDiff = (current, compare, isOld = false) => {
    return Object.entries(current || {}).map(([key, value]) => {
      const changed = JSON.stringify(value) !== JSON.stringify(compare?.[key]);

      return (
        <div
          key={key}
          className={`
            mb-5
            rounded-2xl
            p-4
            ${
              changed
                ? isOld
                  ? "bg-red-500/10 border border-red-400"
                  : "bg-green-500/10 border border-green-400"
                : "bg-slate-900"
            }
          `}
        >
          <h4
            className="
              text-yellow-300
              font-semibold
              mb-4
              text-sm
              xl:text-base
            "
          >
            {formatLabel(key)}
          </h4>

          {renderValue(value, compare?.[key], isOld)}
        </div>
      );
    });
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      border-slate-200
      shadow-sm
      sticky
      h-full
      flex
      flex-col
      top-5
      overflow-hidden
      "
    >
      {/* Header */}

      <div
        className="
        px-6
        py-5
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        "
      >
        <h2
          className="
          text-xl
          font-bold
          text-[#142850]
          2xl:text-2xl
          2xl:font-semibold
          2xl:tracking-wide
          "
        >
          Audit Details
        </h2>

        <button
          onClick={onClose}
          className="
          h-10
          w-10
          rounded-xl
          hover:bg-slate-100
          flex
          items-center
          justify-center
          cursor-pointer
          2xl:w-12 2xl:h-12
          2xl:text-lg
          2xl:font-medium
          2xl:rounded-2xl
          2xl:border-2
          2xl:border-slate-300
          "
        >
          <X size={18} />
        </button>
      </div>

      <div
        className="
        p-6
        space-y-6
        max-h-[85vh]
        overflow-y-auto
        "
      >
        {/* Summary */}

        <div>
          <h3
            className="
            text-lg
            font-semibold
            text-[#142850]
            mb-4
            2xl:text-2xl
            2xl:font-semibold
            2xl:tracking-wide
            "
          >
            Summary
          </h3>

          <div className="space-y-4">
            <div className="flex gap-3">
              <FileText
                size={18}
                className="text-blue-600 mt-1 2xl:w-8 2xl:h-8"
              />

              <div>
                <p className="text-xs text-slate-500 2xl:text-base">
                  Entity Type
                </p>

                <p className="font-medium">{log.entityType}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <FileText
                size={18}
                className="text-purple-600 mt-1 2xl:w-8 2xl:h-8"
              />

              <div>
                <p className="text-xs text-slate-500 2xl:text-base">
                  Action Type
                </p>

                <p className="font-medium">{log.actionType}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <User size={18} className="text-green-600 mt-1 2xl:w-8 2xl:h-8" />

              <div>
                <p className="text-xs text-slate-500 2xl:text-base">
                  Modified By
                </p>

                <p className="font-medium 2xl:text-lg">{log.modifiedBy}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock
                size={18}
                className="text-orange-600 mt-1 2xl:w-8 2xl:h-8"
              />

              <div>
                <p className="text-xs text-slate-500 2xl:text-base">
                  Modified Date
                </p>

                <p className="font-medium 2xl:text-lg">
                  {new Date(log.modifiedDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* OLD DATA */}

        {oldData && (
          <div>
            <h3
              className="
      text-lg
      font-semibold
      text-[#142850]
      mb-3
      2xl:text-xl
      2xl:font-semibold
      2xl:tracking-wide
      "
            >
              Previous Data
            </h3>

            <div
              className="
      bg-slate-900
      text-xs
      p-4
      rounded-2xl
      overflow-auto
      font-mono
      "
            >
              <div className="text-red-300 mb-2 2xl:text-2xl">{`{`}</div>

              {renderJsonDiff(oldData, newData, true)}

              <div className="text-red-300 mt-2 2xl:text-2xl">{`}`}</div>
            </div>
          </div>
        )}

        {newData && (
          <div>
            <h3
              className="
      text-lg
      font-semibold
      text-[#142850]
      mb-3
      2xl:text-xl
      2xl:font-semibold
      2xl:tracking-wide
      "
            >
              Updated Data
            </h3>

            <div
              className="
      bg-slate-900
      text-xs
      p-4
      rounded-2xl
      overflow-auto
      font-mono
      "
            >
              <div className="text-green-300 mb-2 2xl:text-2xl">{`{`}</div>

              {renderJsonDiff(newData, oldData, false)}

              <div className="text-green-300 mt-2 2xl:text-2xl">{`}`}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
