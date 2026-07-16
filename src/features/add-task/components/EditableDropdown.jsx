import {
  ChevronDown,
  Pencil,
  Check,
  X,
} from "lucide-react";

export default function EditableDropdown({
  label,

  value,
  placeholder,

  items = [],

  showDropdown,
  setShowDropdown,

  showAdd,
  setShowAdd,

  newValue,
  setNewValue,

  editingId,
  editingValue,
  setEditingValue,

  handleSelect,
  handleAdd,

  startEdit,
  handleSave,
  cancelEdit,

  disabled = false,
}) {
    const hasUnsavedItem = items.some((item) => item.isNew);
  return (
    <div className="relative w-full">
      {/* Label */}
<label className="block mb-1 ml-1 text-sm font-medium text-slate-700">
                {label} <span className="text-red-500">*</span>
              </label>
      

      {/* Button */}
{/* 
      <button
        type="button"
        disabled={disabled}
        onClick={() => setShowDropdown(!showDropdown)}
        className="
          w-full
          h-11
          px-4
          border
          border-[#DCE3EE]
          rounded-xl
          bg-white
          flex
          items-center
          justify-between
          text-sm
          cursor-pointer
        "
      > */}
       <button
                  data-testid="phase-dropdown"
                  type="button"
                  disabled={disabled}
                         onClick={() => setShowDropdown(!showDropdown)}

                  className="w-full h-9 px-3 bg-white border border-[#DCE3EE] rounded-lg flex items-center justify-between text-sm cursor-pointer"
                >
                  <span  className={
            value
              ? "text-slate-900"
              : "text-slate-900"
          }>
                     {value || placeholder}
                  </span>
                  <ChevronDown
                    size={14}
                     className={`transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
                  //  className={`transition-transform ${showPhaseDropdown ? "rotate-180" : ""}`}
                  />
                
        {/* <span
          className={
            value
              ? "text-slate-700"
              : "text-slate-400"
          }
        >
         
        </span> */}

        {/* <ChevronDown
          size={18}
          className={`transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
        /> */}
      </button>

      {/* Dropdown */}

      {showDropdown && (
                         <div className="absolute top-full left-0 mt-2 w-full bg-white border border-[#DCE3EE] rounded-xl shadow-xl z-50">
                    <div className="max-h-52 overflow-y-auto">

            {items.length > 0 ? (

              items.map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50"
                >
                  {editingId === item.id ? (

                    <div className="flex items-center gap-2 w-full">

                      <input
                        autoFocus
                        value={editingValue}
                        onChange={(e) =>
                          setEditingValue(e.target.value)
                        }
                        className="
                          flex-1
                          h-9
                          px-3
                          border
                          border-[#DCE3EE]
                          rounded-lg
                          text-sm
                        "
                      />

                      <button
                        type="button"
                        onClick={handleSave}
                        className="
                        
                          w-8
                          h-5
                          rounded-md
                          bg-blue-100
                          text-blue-600
                          flex
                          items-center
                          justify-center
                           border 
      
                        "
                        
                      >
                        <Check size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="
                          w-8
                          h-5
                          rounded-md
                          bg-red-100
                          text-red-600
                          flex
                          items-center
                          justify-center
                            border  
                        "
                      >
                        <X size={14} />
                      </button>

                    </div>

                  ) : (

                    <>
                      <button
                        type="button"
                        onClick={() => handleSelect(item)}
                        className="
                          flex-1
                          text-left
                          text-sm
                          cursor-pointer
                        "
                      >
                        {item.name}
                      </button>

                      {item.isNew && (
                        <button
                          type="button"
                          onClick={() => startEdit(item)}
                          className="
                            ml-2
                            text-blue-600
                            hover:text-blue-800
                          "
                        >
                          <Pencil size={15} />
                        </button>
                      )}
                    </>

                  )}
                </div>

              ))

            ) : (

              <div className="p-3 text-sm text-slate-400">
                No {label} Found
              </div>

            )}

          </div>
                    <div className="border-t border-[#E5E7EB]" />

          <div className="p-4">
            {!showAdd ? (
<button
  type="button"
  disabled={showAdd || hasUnsavedItem}
  onClick={() => setShowAdd(true)}
  className={`text-sm font-medium ${
    showAdd || hasUnsavedItem
      ? "text-slate-400 cursor-not-allowed"
      : "text-[#6D4AFF] cursor-pointer"
  }`}
>
  + Add New {label}
</button>            ) : (
              <div className="space-y-3">
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={`Enter ${label} Name`}
                  className="w-full h-9 px-3 border border-[#DCE3EE] rounded-lg text-sm"
                />

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdd(false);
                      setNewValue("");
                    }}
                    className="px-4 py-1.5 border border-[#DCE3EE] rounded-lg text-sm cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="px-4 py-1.5 bg-[#6D4AFF] text-white rounded-lg text-sm cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}