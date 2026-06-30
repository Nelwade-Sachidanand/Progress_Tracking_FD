import { X } from "lucide-react";

export default function AuditDetailsModal({ log, onClose }) {
  if (!log) return null;

  const oldData = log.oldData ? JSON.parse(log.oldData) : null;
  const newData = log.newData ? JSON.parse(log.newData) : null;

  const renderJson = (current, compare, isOld, level = 0,keyName = "") => {


    const hiddenFields = ["password", "projectIds", "projectId"];

  if (hiddenFields.includes(keyName)) {
    if (keyName === "projectIds") {
      return (
        <span className="text-slate-400 italic">
          [{current?.length || 0} projects hidden]
        </span>
      );
    }

    return (
      <span className="text-slate-400 italic">
        ****** (hidden)
      </span>
    );
  }
    // Primitive values

//      if (keyName === "password") {
//     return (
//       <span className="text-slate-400 italic">
//         ****** (encrypted)
//       </span>
//     );
//   }

//   if (keyName === "projectIds") {
//   return (
//     <span className="text-slate-400 italic">
//       [{current.length} projects hidden]
//     </span>
//   );
// }
    if (
      current === null ||
      typeof current === "string" ||
      typeof current === "number" ||
      typeof current === "boolean"
    ) {
      const changed = JSON.stringify(current) !== JSON.stringify(compare);

      return (
        <span
          className={
            changed
              ? isOld
                ? "text-red-600 font-semibold"
                : "text-green-600 font-semibold"
              : "text-slate-800"
          }
        >
          {typeof current === "string" ? `"${current}"` : String(current)}
        </span>
      );
    }

    // Array
    if (Array.isArray(current)) {
      return (
        <>
          <span>[</span>

          <div className="pl-6">
            {current.map((item, index) => (
              <div key={index}>
                {renderJson(item, compare?.[index], isOld, level + 1)}
                {index < current.length - 1 && ","}
              </div>
            ))}
          </div>

          <span>]</span>
        </>
      );
    }

    // Object
    return (
      <>
        <span>{"{"}</span>
        <div className="pl-6">
  {Object.entries(current).map(([key, value], index, arr) => (
    <div key={key}>
      <span className="text-blue-700 font-medium">
        "{key}"
      </span>

      <span>: </span>

      {renderJson(
        value,
        compare?.[key],
        isOld,
        level + 1,
        key
      )}

      {index < arr.length - 1 && ","}
    </div>
  ))}
</div>

        {/* <div className="pl-6">
          {Object.entries(current).map(([key, value], index, arr) => (
            <div key={key}>
              <span className="text-blue-700 font-medium">"{key}"</span>

              <span>: </span>

              {renderJson(value, compare?.[key], isOld, level + 1)}

              {index < arr.length - 1 && ","}
            </div>
          ))}
        </div> */}

        <span>{"}"}</span>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">
      <div
        className="
          bg-white
          rounded-xl
          shadow-xl
          w-full
          max-w-6xl
          max-h-[85vh]
          overflow-hidden
        "
      >
        {/* Header */}

        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0F172A]">
            Audit Details
          </h2>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 max-h-[72vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Previous Data */}

            <div
              className="
    bg-[#FAFAF8]
    border
    border-[#E5E7EB]
    rounded-xl
    p-4
  "
            >
              <h3
                className="
      text-red-600
      font-semibold
      text-base
      mb-4
      pb-2
      border-b
      border-red-200
    "
              >
                Previous Data
              </h3>

              <div
                className="
      bg-white
      border
      border-slate-200
      rounded-lg
      p-4
      overflow-auto
      font-mono
      text-sm
      leading-7
      text-slate-800
      min-h-[500px]
    "
              >
                {oldData ? (
                  renderJson(oldData, newData, true)
                ) : (
                  <span className="text-slate-400">No Previous Data</span>
                )}
              </div>
            </div>
            {/* Updated Data */}

            <div
              className="
    bg-[#FAFAF8]
    border
    border-[#E5E7EB]
    rounded-xl
    p-4
  "
            >
              <h3
                className="
      text-green-600
      font-semibold
      text-base
      mb-4
      pb-2
      border-b
      border-green-200
    "
              >
                Updated Data
              </h3>

              <div
                className="
      bg-white
      border
      border-slate-200
      rounded-lg
      p-4
      overflow-auto
      font-mono
      text-sm
      leading-7
      text-slate-800
      min-h-[500px]
    "
              >
                {newData ? (
                  renderJson(newData, oldData, false)
                ) : (
                  <span className="text-slate-400">No Updated Data</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
