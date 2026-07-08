import CustomDropdown from "../../../components/common/CustomDropdown";

export default function BankSelector({ banks, selectedBank, setSelectedBank }) {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-slate-200
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
        <CustomDropdown
          label="Select Bank"
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
  );
}
