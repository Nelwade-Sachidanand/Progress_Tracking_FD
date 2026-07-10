import CustomDropdown from "../../../components/common/CustomDropdown";

export default function BankSelector({ banks, selectedBank, setSelectedBank }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-[#CDD7E3]
        p-3
      "
    >
      <div
        className="
    grid
    grid-cols-1
    md:grid-cols-[minmax(0,420px)]
    items-center
    gap-4
  "
      >
        <div>
          <label className="mb-1 ml-1 block text-base font-medium text-slate-700 2xl:text-lg">
            Select Bank
          </label>

          <CustomDropdown
            placeholder="Select Bank"
            value={selectedBank}
            onChange={setSelectedBank}
            options={banks.map((bank) => ({
              label: bank,
              value: bank,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
