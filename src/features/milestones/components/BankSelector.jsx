import CustomDropdown from "../../../components/common/CustomDropdown";

export default function BankSelector({
  banks,
  selectedBank,
  setSelectedBank,
}) {
  const getBankShortName = (bankName) => {
    const match = bankName.match(/\(([^)]+)\)/);

    return match ? match[1] : bankName;
  };

  return (
    <div className="flex items-center gap-1 mt-[-10px]">
      <label className="whitespace-nowrap text-base font-medium text-slate-700">
        Select Bank :
      </label>

      <div className="w-[250px]">
        <CustomDropdown
          placeholder="Select Bank"
          value={selectedBank}
          onChange={setSelectedBank}
          options={banks.map((bank) => ({
            label: getBankShortName(bank),
            value: bank,
          }))}
        />
      </div>
    </div>
  );
}