import { Clock, FileText, User, X } from "lucide-react";

export default function AuditDetailsDrawer({ log, onClose }) {
  if (!log) return null;

  const oldData = log.oldData ? JSON.parse(log.oldData) : null;

  const newData = log.newData ? JSON.parse(log.newData) : null;

  const renderJsonDiff = (
    current,
    compare,
    isOld = false
  ) => {

    if (Array.isArray(current)) {
      return current.map((item, index) => (
        <div
          key={index}
          className="
          mb-4
          border-b
          border-slate-700
          pb-3
        "
        >
          <div className="text-cyan-300 mb-2">
            Object {index + 1}
          </div>

          {Object.entries(item).map(([key, value]) => {

            const changed =
              JSON.stringify(value) !==
              JSON.stringify(compare?.[index]?.[key]);

            return (
              <div
                key={key}
                className={`
                px-2 py-1 rounded mb-1
                ${changed
                    ? isOld
                      ? "bg-red-500/20 border-l-4 border-red-400"
                      : "bg-green-500/20 border-l-4 border-green-400"
                    : ""
                  }
              `}
              >
                <span className="text-yellow-300">
                  {key}
                </span>
                <span className="text-slate-400">
                  :{" "}
                </span>

                <span className="text-white">
                  {typeof value === "string"
                    ? `"${value}"`
                    : JSON.stringify(value)}
                </span>
              </div>
            );
          })}
        </div>
      ));
    }

    return Object.entries(current || {}).map(
      ([key, value]) => {
        const changed =
          JSON.stringify(value) !==
          JSON.stringify(compare?.[key]);

        return (
          <div
            key={key}
            className={`
            px-2 py-1 rounded mb-1
            ${changed
                ? isOld
                  ? "bg-red-500/20 border-l-4 border-red-400"
                  : "bg-green-500/20 border-l-4 border-green-400"
                : ""
              }
          `}
          >
            <span className="text-yellow-300">
              {key}
            </span>

            <span className="text-slate-400">
              :{" "}
            </span>

            <span className="text-white">
              {typeof value === "string"
                ? `"${value}"`
                : JSON.stringify(value)}
            </span>
          </div>
        );
      }
    );
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
            2xl:text-xl
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
              <div className="text-red-300 mb-2 2xl:text-xl">{`{`}</div>

              {renderJsonDiff(oldData, newData, true)}

              <div className="text-red-300 mt-2 2xl:text-xl">{`}`}</div>
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
              <div className="text-green-300 mb-2 2xl:text-xl">{`{`}</div>

              {renderJsonDiff(newData, oldData, false)}

              <div className="text-green-300 mt-2 2xl:text-xl">{`}`}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
