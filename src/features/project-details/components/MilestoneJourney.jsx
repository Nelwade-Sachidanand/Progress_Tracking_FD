import {
  Flag,
  FileText,
  Pencil,
  Laptop,
  Bug,
  GraduationCap,
  Database,
  Server,
  ClipboardCheck,
  Rocket,
} from "lucide-react";

export default function MilestoneJourney() {
  const milestones = [
    {
      name: "Project\nInitiation",
      percentage: "23%",
      status: "In Progress",
      icon: Flag,
      active: true,
    },
    {
      name: "Requirement\nStudy",
      percentage: "0%",
      status: "Not Started",
      icon: FileText,
    },
    {
      name: "Solution\nDesign",
      percentage: "0%",
      status: "Not Started",
      icon: Pencil,
    },
    {
      name: "Development",
      percentage: "0%",
      status: "Not Started",
      icon: Laptop,
    },
    {
      name: "Testing\n(QA)",
      percentage: "0%",
      status: "Not Started",
      icon: Bug,
    },
    {
      name: "Training",
      percentage: "0%",
      status: "Not Started",
      icon: GraduationCap,
    },
    {
      name: "UAT - 1\n(Bank Module)",
      percentage: "0%",
      status: "Not Started",
      icon: Database,
    },
    {
      name: "Data Migration\n(Final)",
      percentage: "0%",
      status: "Not Started",
      icon: Server,
    },
    {
      name: "UAT - 2\n(High Value)",
      percentage: "0%",
      status: "Not Started",
      icon: ClipboardCheck,
    },
    {
      name: "Go Live",
      percentage: "0%",
      status: "Not Started",
      icon: Rocket,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-4 mt-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="
          w-8 h-8
          rounded-full
          bg-[#2563EB]
          text-white
          flex
          items-center
          justify-center
          text-sm
          font-bold
          "
        >
          3
        </div>

        <h2 className="text-[16px] font-bold text-[#0B1F59]">
          Milestone Journey (Weightage Wise)
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Dashed Line */}
        <div
          className="
          absolute
          top-7
          left-10
          right-10
          border-t-2
          border-dashed
          border-[#D6DCE8]
          "
        />

        <div className="grid grid-cols-10 gap-1 relative z-10">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                {/* Circle Icon */}
                <div
                  className={`
                    w-11
                    h-11
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-white
                    border-2
                    ${
                      milestone.active
                        ? "border-[#2563EB]"
                        : "border-[#E5EAF2]"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={
                      milestone.active
                        ? "text-[#2563EB]"
                        : "text-[#64748B]"
                    }
                  />
                </div>

                {/* Name */}
                <p
                  className="
                  mt-4
                  text-[11px]
                  font-semibold
                  text-[#0B1F59]
                  whitespace-pre-line
                  min-h-[42px]
                  "
                >
                  {milestone.name}
                </p>

                {/* Percentage */}
                <p
                  className={`
                  mt-3
                  text-[14px]
                  font-bold
                  ${
                    milestone.active
                      ? "text-[#2563EB]"
                      : "text-[#0B1F59]"
                  }
                `}
                >
                  {milestone.percentage}
                </p>

                {/* Status */}
                <p
                  className={`
                  text-[10px]
                  mt-1
                  ${
                    milestone.active
                      ? "text-[#2563EB]"
                      : "text-[#94A3B8]"
                  }
                `}
                >
                  {milestone.status}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Scale */}
        <div className="mt-10 border-t border-[#E5EAF2] pt-4">
          <div className="flex justify-between text-xs text-[#64748B] px-4">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}