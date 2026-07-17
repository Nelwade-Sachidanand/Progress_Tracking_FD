import React, { useEffect, useMemo, useRef, useState } from "react";



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
  "Delayed":     { border: "#DC2626", text: "#DC2626", label: "#DC2626", pct: "#DC2626" },
  "In Progress": { border: "#0c40ea", text: "#0c40ea", label: "#0c40ea", pct: "#0c40ea" },
  "Completed":   { border: "#16A34A", text: "#16A34A", label: "#16A34A", pct: "#16A34A" },
  "Not Started": { border: "#94A3B8", text: "#64748B", label: "#64748B", pct: "#0B1F59" },
};



/* ── Balanced row splitter ──
   Distributes items into the fewest possible rows (capped at maxPerRow),
   spreading them as evenly as possible so no row is much shorter than
   another (max difference of 1 item), eliminating trailing whitespace.
   Example: 13 items, maxPerRow=9 → rows of 7 + 6 (not 9 + 4). */
function balanceRows(items, maxPerRow) {
  const total = items.length;
  if (total === 0) return [];



  const numRows = Math.ceil(total / maxPerRow);
  const base = Math.floor(total / numRows);
  const remainder = total % numRows;



  const rows = [];
  let idx = 0;
  for (let r = 0; r < numRows; r++) {
    const size = base + (r < remainder ? 1 : 0); // first `remainder` rows get +1
    let row = items.slice(idx, idx + size).map((m, i) => ({
      ...m,
      __origIdx: idx + i, // preserve true original index for icons/colors
    }));
    if (r % 2 === 1) row = row.reverse();
    rows.push(row);
    idx += size;
  }
  return rows;
}



/* ── Hook: measure a container's rendered width, updates on resize ── */
function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);



  useEffect(() => {
    const el = ref.current;
    if (!el) return;



    const update = () => setWidth(el.getBoundingClientRect().width);
    update();



    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);



    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);



  return [ref, width];
}



/* ── Tooltip ── */
function Tooltip({ milestone, index, x, y, visible, onClose }) {
  if (!visible || !milestone) return null;
  const colors = statusColors[milestone.status] || statusColors["Not Started"];
  return (
    <div
      onMouseLeave={onClose}
      style={{
        position: "fixed",
        left: x,
        top: y - 10,
        transform: "translate(-50%, -100%)",
        zIndex: 9999,
        background: "#fff",
        border: "1px solid #E5EAF2",
        borderRadius: "10px",
        padding: "12px 16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        minWidth: "180px",
        fontFamily: "var(--kimi-font-sans, sans-serif)",
        pointerEvents: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            border: `2px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {(() => {
            const Icon = icons[index % icons.length];
            return <Icon size={14} color={colors.text} />;
          })()}
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#0B1F59" }}>
          {milestone.name}
        </span>
      </div>
    </div>
  );
}



/* ── Main component ── */
export default function MilestoneJourney({ project }) {
  const [tooltip, setTooltip] = useState(null);
  const [wrapRef, containerWidth] = useContainerWidth();



  // Cap on items per row — actual row sizes are balanced up to this cap
  const MAX_PER_ROW = 9;



  const isMobile = window.innerWidth < 640;
  const NODE_R = isMobile ? 20 : 26;
  const GAP_Y = isMobile ? 35 : 45;
  const PAD = isMobile ? 12 : 20;
  const MIN_GAP_X = isMobile ? 24 : 40; // floor spacing so nodes never crowd on very narrow screens



  /* ── Build milestones from project data ── */
  const milestones =
    project?.phases?.flatMap(
      (phase) =>
        phase.milestones?.map((milestone) => {
          const activities =
            milestone.tasks?.flatMap(
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



  /* ── Balanced serpentine row grouping ──
     Rows are as equal in length as possible (e.g. 6+6, 7+7, 8+8)
     instead of a fixed-size-then-remainder split. */
  const rows = useMemo(() => balanceRows(milestones, MAX_PER_ROW), [milestones]);



  const maxCols = useMemo(
    () => (rows.length ? Math.max(...rows.map((r) => r.length)) : 0),
    [rows]
  );



  /* ── Dynamic column width ──
     Instead of a fixed GAP_X, spread `maxCols` columns evenly across the
     actual measured container width. This makes the diagram always fill
     the card exactly — no leftover white space, no overflow — regardless
     of whether a row has 6, 7, 8, or 9 nodes. */
  const colW = useMemo(() => {
    if (!containerWidth || maxCols <= 1) return NODE_R * 2 + MIN_GAP_X;
    const usable = containerWidth - PAD * 2 - NODE_R * 2;
    const computed = usable / (maxCols - 1);
    return Math.max(computed, NODE_R * 2 + MIN_GAP_X);
  }, [containerWidth, maxCols, NODE_R, PAD, MIN_GAP_X]);



  const rowH = NODE_R * 2 + GAP_Y + 50;



  /* ── SVG dashed connector path with backward-C curve wrapping ── */
  const pathD = useMemo(() => {
    if (!rows.length || !colW) return "";
    let d = "";



    const colX = (col) => PAD + col * colW + NODE_R;



    rows.forEach((row, rIdx) => {
      const isRev = rIdx % 2 === 1;
      const cy = PAD + rIdx * rowH + NODE_R;



      // Visual columns where this row starts (entry) and ends (exit)
      const entryCol = isRev ? maxCols - 1 : 0;
      const exitCol = isRev ? maxCols - row.length : row.length - 1;
      const entryX = colX(entryCol);
      const exitX = colX(exitCol);



      if (rIdx === 0) {
        d += `M ${entryX} ${cy} L ${exitX} ${cy}`;
      } else {
        const prevRow = rows[rIdx - 1];
        const prevIsRev = (rIdx - 1) % 2 === 1;
        const prevExitCol = prevIsRev
          ? maxCols - prevRow.length
          : prevRow.length - 1;
        const prevExitX = colX(prevExitCol);
        const prevCy = PAD + (rIdx - 1) * rowH + NODE_R;



        // Semicircular arc connecting previous row's exit to this row's entry.
        // Right-edge transitions bulge outward right (backward "C" / Ɔ shape);
        // left-edge transitions bulge left (normal "C" shape).
        const r = Math.abs(cy - prevCy) / 2 + 8;
        const bulgeRight = !prevIsRev;
        const sweep = bulgeRight ? 1 : 0;



        d += ` M ${prevExitX} ${prevCy} A ${r} ${r} 0 0 ${sweep} ${entryX} ${cy}`;



        // continue the dashed line across the rest of this row
        d += ` L ${exitX} ${cy}`;
      }
    });
    return d;
  }, [rows, maxCols, colW, rowH, PAD]);



  const svgW = containerWidth || PAD * 2 + maxCols * colW;
  const svgH = PAD * 2 + rows.length * (NODE_R * 2 + GAP_Y + 25);



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
      <div className="flex items-center gap-2 sm:gap-2 mb-4 sm:mb-6">
        <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
          3
        </div>
        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-[#0B1F59]">
          Milestone Journey
        </h2>
      </div>



      {/* SVG diagram — width measured via wrapRef so nodes always fill the card */}
      <div ref={wrapRef} className="w-full overflow-x-auto">
        {containerWidth > 0 && (
          <svg
            width={svgW}
            height={svgH}
            className="block"
            style={{
              display: "block",
            }}
          >
            <path
              d={pathD}
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="2"
              strokeDasharray="6 5"
              strokeLinecap="round"
            />



            {rows.map((row, rIdx) => {
              const isRev = rIdx % 2 === 1;
              const cy = PAD + rIdx * rowH + NODE_R;



              return row.map((m, cIdx) => {
                const origIdx = m.__origIdx;
                const colors = statusColors[m.status] || statusColors["Not Started"];



                const visualColumn = isRev ? maxCols - row.length + cIdx : cIdx;
                const cx = PAD + visualColumn * colW + NODE_R;



                return (
                  <g
                    key={`${rIdx}-${cIdx}`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={(e) => handleNodeEnter(e, m, origIdx)}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <circle
                      cx={cx}
                      cy={cy}
                      r={NODE_R}
                      fill="#fff"
                      stroke={colors.border}
                      strokeWidth="2"
                    />
                    <foreignObject x={cx - 11} y={cy - 11} width={22} height={22}>
                      <div
                        className="flex items-center justify-center w-full h-full"
                        style={{ color: colors.text }}
                      >
                        {(() => {
                          const Icon = icons[origIdx % icons.length];
                          return <Icon size={20} color={colors.text} strokeWidth={1.8} />;
                        })()}
                      </div>
                    </foreignObject>
                    <text
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
                    </text>
                    <text
                      x={cx}
                      y={cy + NODE_R + 36}
                      textAnchor="middle"
                      className="text-[12px] sm:text-[14px] font-bold"
                      style={{ fill: colors.pct, fontFamily: "var(--kimi-font-sans, sans-serif)" }}
                    >
                      {m.percentage}
                    </text>
                    <text
                      x={cx}
                      y={cy + NODE_R + 52}
                      textAnchor="middle"
                      className="text-[9px] sm:text-[10px]"
                      style={{ fill: colors.label, fontFamily: "var(--kimi-font-sans, sans-serif)" }}
                    >
                      {m.status}
                    </text>
                  </g>
                );
              });
            })}
          </svg>
        )}
      </div>



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