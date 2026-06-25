import { Clock, FileText, User, X } from "lucide-react";

export default function AuditDetailsModal({ log, onClose }) {
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
            changed
  ? isOld
    ? "bg-red-100 border border-red-300"
    : "bg-green-100 border border-green-300"
  : "bg-white border border-slate-200"
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
bg-white
rounded-xl
p-4
border
border-slate-200
"
            >
              <div className="text-[#475569] font-semibold mb-3">
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
                  border-slate-200
                  last:border-0
                "
                >
                  <span className="text-slate-300">{formatLabel(k)}</span>

                  <span className="text-[#0F172A] font-medium">{String(v)}</span>
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
          bg-white
          border-slate-200
          rounded-xl
          border
         
          overflow-hidden
          shadow-sm
          max-w-md
          mx-auto
        "
        >
          <div
            className="
           bg-slate-50
            py-3
            text-center
            border-b
            border-slate-200
          "
          >
            <h5
              className="
              text-[#475569]
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
              border-slate-200
            "
            >
              <span className="text-slate-300">Name</span>

              <span className="text-[#0F172A] font-medium">
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
              <span className="text-slate-600">Contact Number</span>

              <span className="text-[#0F172A] font-medium">
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
              border-slate-200
              last:border-0
            "
            >
              <span className="text-[#475569]">{formatLabel(childKey)}</span>

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

//   const renderJsonDiff = (current, compare, isOld = false) => {
//     return Object.entries(current || {}).map(([key, value]) => {
//       const changed = JSON.stringify(value) !== JSON.stringify(compare?.[key]);

//       return (
//         <div
//           key={key}
//           className={`
//             mb-5
//             rounded-2xl
//             p-4
//             ${
//   changed
//     ? isOld
//       ? "bg-red-100 border border-red-300"
//       : "bg-green-100 border border-green-300"
//     : "bg-white border border-slate-200"
// }
//           `}
//         >
//           <h4
//             className="
//               text-[#2563EB]
//               font-semibold
//               mb-4
//               text-sm
//               xl:text-base
//             "
//           >
//             {formatLabel(key)}
//           </h4>

//           {renderValue(value, compare?.[key], isOld)}
//         </div>
//       );
//     });
//   };

 return (
 <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center p-4">

<div
  className="
  bg-white
  rounded-xl
  shadow-xl
  w-full
  max-w-4xl
  max-h-[80vh]
  overflow-hidden
  "
>      {/* Header */}

     <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
  <h2 className="text-lg font-semibold text-[#0F172A]">
    Audit Details
  </h2>

  <button
    onClick={onClose}
    className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
  >
    <X size={16} />
  </button>
</div>

      {/* Summary */}


      {/* Old vs New */}

     <div
  className="
  p-5
  max-h-[65vh]
  overflow-y-auto
  "
>
  <div
    className="
    grid
    grid-cols-1
    lg:grid-cols-2
    gap-4
    "
  >
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

      {Object.keys(oldData || {}).map((key) => (
        <div
          key={key}
          className="
          flex
          justify-between
          gap-3
          py-2
          border-b
          border-slate-200
          last:border-0
          text-sm
          "
        >
          <span className="font-medium text-slate-600">
            {formatLabel(key)}
          </span>

          <span
            className={
              JSON.stringify(oldData?.[key]) !==
              JSON.stringify(newData?.[key])
                ? "text-red-600 font-semibold"
                : "text-slate-700"
            }
          >
            {String(oldData?.[key] ?? "-")}
          </span>
        </div>
      ))}
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

      {Object.keys(newData || {}).map((key) => (
        <div
          key={key}
          className="
          flex
          justify-between
          gap-3
          py-2
          border-b
          border-slate-200
          last:border-0
          text-sm
          "
        >
          <span className="font-medium text-slate-600">
            {formatLabel(key)}
          </span>

          <span
            className={
              JSON.stringify(oldData?.[key]) !==
              JSON.stringify(newData?.[key])
                ? "text-green-600 font-semibold"
                : "text-slate-700"
            }
          >
            {String(newData?.[key] ?? "-")}
          </span>
        </div>
      ))}
    </div>
  </div>
</div>

    </div>

  </div>
);
}
