import React, { useMemo, useState } from "react";

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
const svgs = {
  flag: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
<line x1="4" y1="22" x2="4" y2="15"/>
</svg>
  ),
  fileText: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
<polyline points="14 2 14 8 20 8"/>
<line x1="16" y1="13" x2="8" y2="13"/>
<line x1="16" y1="17" x2="8" y2="17"/>
<line x1="10" y1="9" x2="8" y2="9"/>
</svg>
  ),
  pencil: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
</svg>
  ),
  laptop: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
<line x1="2" y1="20" x2="22" y2="20"/>
</svg>
  ),
  bug: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<rect x="8" y="6" width="8" height="14" rx="4"/>
<path d="m12 12 0 0"/><path d="m12 20 0 0"/><path d="m12 16 0 0"/><path d="m12 8 0 0"/>
<path d="M16 6V4"/><path d="M8 6V4"/><path d="M16 18v2"/><path d="M8 18v2"/>
<path d="m20 10-2-2"/><path d="m4 10 2-2"/><path d="m20 14-2 2"/><path d="m4 14 2 2"/>
</svg>
  ),
  graduationCap: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
<path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
</svg>
  ),
  database: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<ellipse cx="12" cy="5" rx="9" ry="3"/>
<path d="M3 5V19A9 3 0 0 0 21 19V5"/>
<path d="M3 12A9 3 0 0 0 21 12"/>
</svg>
  ),
  server: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
<rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
<line x1="6" y1="6" x2="6.01" y2="6"/>
<line x1="6" y1="18" x2="6.01" y2="18"/>
</svg>
  ),
  clipboardCheck: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
<path d="m9 14 2 2 4-4"/>
</svg>
  ),
  rocket: (c, s) => (
<svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
<path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
<path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
<path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
</svg>
  ),
};
 
const icons = [
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
];
 
const statusColors = {
  "Delayed":     { border:"#DC2626", text:"#DC2626", label:"#DC2626", pct:"#DC2626" },
  "In Progress": { border:"#0c40ea", text:"#0c40ea", label:"#0c40ea", pct:"#0c40ea" },
  "Completed":   { border:"#16A34A", text:"#16A34A", label:"#16A34A", pct:"#16A34A" },
  "Not Started": { border:"#94A3B8", text:"#64748B", label:"#64748B", pct:"#0B1F59" },
};
 
/* ── Tooltip ── */
function Tooltip({ milestone, index, x, y, visible, onClose }) {
  if (!visible || !milestone) return null;
  const colors = statusColors[milestone.status] || statusColors["Not Started"];
  return (
<div
      onMouseLeave={onClose}
      style={{
        position: 'fixed',
        left: x,
        top: y - 10,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
        background: '#fff',
        border: '1px solid #E5EAF2',
        borderRadius: '10px',
        padding: '12px 16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        minWidth: '180px',
        fontFamily: 'var(--kimi-font-sans, sans-serif)',
        pointerEvents: 'auto',
      }}
>
<div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px' }}>
<div style={{
          width:'28px', height:'28px', borderRadius:'50%', border:`2px solid ${colors.border}`,
          display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0
        }}>
          {(() => {
  const Icon = icons[index % icons.length];

  return <Icon size={14} color={colors.text} />;
})()}
</div>
<span style={{ fontSize:'14px', fontWeight:600, color:'#0B1F59' }}>{milestone.name}</span>
</div>

</div>
  );
}
 
/* ── Main component ── */
export default function MilestoneJourney({ project }) {
  const [tooltip, setTooltip] = useState(null);
 
  const ITEMS_PER_ROW = 8;
  const NODE_R = window.innerWidth < 640 ? 20 : 26;
 
  const GAP_X = window.innerWidth < 640 ? 42 : 73;
const GAP_Y = window.innerWidth < 640 ? 48 : 65;
//const PAD = window.innerWidth < 640 ? 12 : 20;
const PAD = window.innerWidth < 640 ? 20 : 50;
 
  /* ── Build milestones from project data (your existing logic) ── */
  const milestones = project?.phases?.flatMap(
    (phase) =>
      phase.milestones?.map((milestone, index) => {
        const activities = milestone.tasks?.flatMap(
          (task) => task.subTasks?.flatMap((s) => s.activities || []) || []
        ) || [];
       const total = activities.length;

// Average progress of all activities
const avg =
  total > 0
    ? Math.round(
        activities.reduce(
          (sum, activity) => sum + (Number(activity.progress) || 0),
          0
        ) / total
      )
    : 0;

// Status based on average progress
let status = "Not Started";

if (avg >= 100) {
  status = "Completed";
} else if (avg > 0) {
  status = "In Progress";
}
 
        return {
          name: milestone.milestoneName,
          percentage: `${avg}%`,
          progress: avg,
          status,
        };
      }) || []
  ) || [];
  /* ── Serpentine row grouping ── */
  const rows = useMemo(() => {
    const out = [];
    for (let i = 0; i < milestones.length; i += ITEMS_PER_ROW) {
      const row = milestones.slice(i, i + ITEMS_PER_ROW);
      if (out.length % 2 === 1) row.reverse();
      out.push(row);
    }
    return out;
  }, [milestones]);
 
  /* ── SVG dashed connector path with vertical curve wrapping ── */
 const pathD = useMemo(() => {
  if (!rows.length) return "";
  const colW = NODE_R * 2 + GAP_X;
  const rowH = NODE_R * 2 + GAP_Y + 50;
  let d = "";



  const colX = (col) => PAD + col * colW + NODE_R;



  rows.forEach((row, rIdx) => {
const isRev = rIdx % 2 === 1;
const cy = PAD + rIdx * rowH + NODE_R;



 // Visual columns where this row starts (entry) and ends (exit)
 const entryCol = isRev ? ITEMS_PER_ROW - 1 : 0;
  const exitCol = isRev ? ITEMS_PER_ROW - row.length : row.length - 1;
  const entryX = colX(entryCol);
// const exitX = colX(exitCol);
const exitX = colX(exitCol) + NODE_R;



  if (rIdx === 0) {
 d += `M ${entryX} ${cy} L ${exitX} ${cy}`;
  } else {
const prevRow = rows[rIdx - 1];
  const prevIsRev = (rIdx - 1) % 2 === 1;
   const prevExitCol = prevIsRev
  ? ITEMS_PER_ROW - prevRow.length
 : prevRow.length - 1;
 const prevExitX = colX(prevExitCol);
 const prevCy = PAD + (rIdx - 1) * rowH + NODE_R;



 //const r = (cy - prevCy) / 2;
const r = Math.abs(cy - prevCy) / 2 + 8;


  const bulgeRight = !prevIsRev;
  const sweep = bulgeRight ? 1 : 0;



  d += ` M ${prevExitX} ${prevCy} A ${r} ${r} 0 0 ${sweep} ${entryX} ${cy}`;



 // continue the dashed line across the rest of this row
  d += ` L ${exitX} ${cy}`;
 }
  });
  return d;
}, [rows]);
 
 const colW = NODE_R * 2 + GAP_X;

//const svgW = PAD * 2 + ITEMS_PER_ROW * colW;
const svgW =
  PAD * 2 +
  ITEMS_PER_ROW * colW +
  60;
  const svgH = PAD * 2 + rows.length * (NODE_R * 2 + GAP_Y + 50);
 
  const handleNodeEnter = (e, milestone, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      milestone,
      index: idx,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };
 
  return (
    <div
      className="w-full bg-white rounded-2xl border border-[#CDD7E3] p-3 sm:p-4 lg:p-5"
      style={{
        fontFamily: "var(--kimi-font-sans, sans-serif)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-2 mb-4 sm:mb-6"><div
        className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold"
      >
        3
      </div><h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B1F59]">Milestone Journey</h2></div>

      {/* SVG diagram */}
      <div className="w-full overflow-x-auto scrollbar-thin"><svg
        width={svgW}
        height={svgH}
        className="mx-auto block"
        style={{
          minWidth: svgW,
          display: "block",
        }}
      ><path
          d={pathD}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="2"
          strokeDasharray="6 5"
          strokeLinecap="round"
        />

        {rows.map((row, rIdx) => {
          const isRev = rIdx % 2 === 1;
          const cy = PAD + rIdx * (NODE_R * 2 + GAP_Y + 50) + NODE_R;

          return row.map((m, cIdx) => {
            const origIdx = rIdx * ITEMS_PER_ROW + (isRev ? row.length - 1 - cIdx : cIdx);
            const colors = statusColors[m.status] || statusColors["Not Started"];

            const colW = NODE_R * 2 + GAP_X;

            let visualColumn;

            if (rIdx % 2 === 0) {
              visualColumn = cIdx;
            } else {
              visualColumn = ITEMS_PER_ROW - row.length + cIdx;
            }

            const cx = PAD + visualColumn * colW + NODE_R;
            return (
              <g
                key={`${rIdx}-${cIdx}`}
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => handleNodeEnter(e, m, origIdx)}
                onMouseLeave={() => setTooltip(null)}
              ><circle
                  cx={cx} cy={cy} r={NODE_R}
                  fill="#fff"
                  stroke={colors.border}
                  strokeWidth="2"
                /><foreignObject x={cx - 11} y={cy - 11} width={22} height={22}><div
                  className="flex items-center justify-center w-full h-full"
                  style={{ color: colors.text }}
                >
                  {(() => {
                    const Icon = icons[origIdx % icons.length];

                    return <Icon size={20} color={colors.text} strokeWidth={1.8} />;
                  })()}
                </div></foreignObject><text
                  x={cx}
                  y={cy + NODE_R + 18}
                  textAnchor="middle"
                  className="text-[10px] sm:text-[12px] font-bold"
                  style={{
                    fill: "#0B1F59",
                    fontFamily: "var(--kimi-font-sans, sans-serif)",
                  }}
                >
                  {(m.name.match(/^M\d+/)?.[0]) || m.name}
                </text><text
                  x={cx} y={cy + NODE_R + 36} textAnchor="middle"
                  className="text-[12px] sm:text-[14px] font-bold"
                  style={{ fill: colors.pct, fontFamily: 'var(--kimi-font-sans, sans-serif)' }}
                >
                  {m.percentage}
                </text><text
                  x={cx} y={cy + NODE_R + 52} textAnchor="middle"
                  className="text-[9px] sm:text-[10px]"
                  style={{ fill: colors.label, fontFamily: 'var(--kimi-font-sans, sans-serif)' }}
                >
                  {m.status}
                </text></g>
            );
          });
        })}
      </svg></div>

      {/* Tooltip portal */}
      {tooltip && (
        <Tooltip
          milestone={tooltip.milestone}
          index={tooltip.index}
          x={tooltip.x}
          y={tooltip.y}
          visible={true}
          onClose={() => setTooltip(null)}
        />
      )}
    </div>
  );
}