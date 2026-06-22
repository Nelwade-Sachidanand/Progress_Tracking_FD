export default function WeightageSummary({
  milestones,
}) {
  const totalWeightage =
    milestones.reduce(
      (sum, milestone) =>
        sum +
        Number(
          milestone.weightage || 0
        ),
      0
    );

  return (
    <tr className="bg-slate-50">
      <td className="px-5 py-4 font-bold">
        Total Weightage
      </td>

      <td className="px-5 py-4 font-bold text-[#2563EB]">
        {totalWeightage}%
      </td>

      <td colSpan={2}></td>
    </tr>
  );
}