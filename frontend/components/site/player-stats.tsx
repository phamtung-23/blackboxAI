"use client";

import { motion } from "motion/react";
import type { PlayerStats } from "@/lib/types";
import { cn } from "@/lib/utils";

const LABELS: Record<keyof PlayerStats, string> = {
  pace: "PAC",
  shooting: "SHO",
  passing: "PAS",
  dribbling: "DRI",
  defending: "DEF",
  physical: "PHY",
  stamina: "STA",
  goalkeeping: "GK",
};

const FULL: Record<keyof PlayerStats, string> = {
  pace: "Tốc độ",
  shooting: "Dứt điểm",
  passing: "Chuyền",
  dribbling: "Rê bóng",
  defending: "Phòng ngự",
  physical: "Thể chất",
  stamina: "Bền sức",
  goalkeeping: "Bắt bóng",
};

function colorFor(value: number) {
  if (value >= 85) return "bg-emerald-500";
  if (value >= 75) return "bg-emerald-400";
  if (value >= 60) return "bg-amber-400";
  return "bg-rose-500";
}

export function PlayerStatBars({
  stats,
  className,
}: {
  stats: PlayerStats;
  className?: string;
}) {
  const entries = (Object.entries(stats) as [keyof PlayerStats, number][])
    .filter(([, v]) => typeof v === "number");

  return (
    <ul className={cn("grid grid-cols-1 gap-2 sm:grid-cols-2", className)}>
      {entries.map(([key, value], i) => (
        <li key={key} className="flex items-center gap-3">
          <span className="w-10 shrink-0 font-mono text-xs text-muted-foreground">
            {LABELS[key]}
          </span>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{FULL[key]}</span>
              <span className="font-mono font-semibold">{value}</span>
            </div>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${value}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.9, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={cn("h-full rounded-full", colorFor(value))}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function StatBadge({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-lg border border-border/60 bg-card/60 px-3 py-2">
      <span className="font-mono font-bold text-lg">{value}</span>
      <span className="text-muted-foreground text-[10px] uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
