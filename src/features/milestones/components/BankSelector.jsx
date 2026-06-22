import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function BankSelector({
  banks,
  selectedBank,
  setSelectedBank,
}) {
  const [showBanks, setShowBanks] =
    useState(false);

  return (
    <div
      className="
        bg-white
        border
        border-[#E2E8F0]
        rounded-2xl
        p-4
        xl:p-6
        2xl:p-8
        shadow-sm
      "
    >
      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          gap-4
        "
      >
        {/* Label */}

        <label
          className="
            text-base
            xl:text-lg
            2xl:text-xl
            font-semibold
            text-[#0B1F59]
            shrink-0
          "
        >
          Select Bank :
        </label>

        {/* Dropdown */}

        <div
          className="
            relative
            w-full
            lg:w-[380px]
            xl:w-[420px]
            2xl:w-[500px]
          "
        >
          <button
            onClick={() =>
              setShowBanks(!showBanks)
            }
            className="
              w-full
              h-11
              xl:h-12
              2xl:h-14
              px-4
              border
              border-[#CBD5E1]
              rounded-xl
              bg-white
              flex
              items-center
              justify-between
              text-[#0B1F59]
              font-medium
              cursor-pointer
              hover:border-[#2563EB]
              transition
            "
          >
            <span
              className="
                truncate
                text-sm
                xl:text-base
                2xl:text-lg
                flex-1
                text-left
              "
              title={selectedBank}
            >
              {selectedBank ||
                "Select Bank"}
            </span>

            <ChevronDown
              size={18}
              className={`
                flex-shrink-0
                transition-transform
                ${
                  showBanks
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {showBanks && (
            <div
              className="
                absolute
                top-[52px]
                xl:top-[56px]
                2xl:top-[62px]
                left-0
                w-full
                bg-white
                border
                border-[#E2E8F0]
                rounded-xl
                shadow-xl
                z-50
                max-h-[320px]
                overflow-y-auto
              "
            >
              {banks.map((bank) => (
                <button
                  key={bank}
                  onClick={() => {
                    setSelectedBank(
                      bank
                    );
                    setShowBanks(
                      false
                    );
                  }}
                  title={bank}
                  className="
                    w-full
                    px-4
                    py-3
                    text-left
                    text-sm
                    xl:text-base
                    text-[#0B1F59]
                    hover:bg-[#F8FAFC]
                    border-b
                    border-[#F1F5F9]
                    last:border-b-0
                    transition
                    cursor-pointer
                    break-words
                  "
                >
                  {bank}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}