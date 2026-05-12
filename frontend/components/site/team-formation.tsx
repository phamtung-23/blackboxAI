import Link from "next/link";
import { Crown } from "lucide-react";
import type { Player, Position } from "@/lib/types";

const POSITION_COORDS: Record<Position, { x: number; y: number }> = {
  GK: { x: 50, y: 90 },
  LB: { x: 18, y: 72 },
  CB: { x: 50, y: 78 },
  RB: { x: 82, y: 72 },
  CDM: { x: 50, y: 60 },
  CM: { x: 50, y: 48 },
  CAM: { x: 50, y: 34 },
  LW: { x: 20, y: 26 },
  RW: { x: 80, y: 26 },
  ST: { x: 50, y: 14 },
};

const POSITION_ORDER: Position[] = [
  "ST",
  "LW",
  "RW",
  "CAM",
  "CM",
  "CDM",
  "LB",
  "CB",
  "RB",
  "GK",
];

export function TeamFormation({
  players,
  captainId,
}: {
  players: Player[];
  captainId: string;
}) {
  const buckets = new Map<Position, Player[]>();
  for (const p of players) {
    const arr = buckets.get(p.position) ?? [];
    arr.push(p);
    buckets.set(p.position, arr);
  }

  const positionsOnPitch = POSITION_ORDER.filter((p) => buckets.has(p));

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-emerald-500/20 shadow-xl shadow-black/30">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.32 0.09 132) 0%, oklch(0.28 0.08 132) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 28px, rgba(255,255,255,0.04) 28px, rgba(255,255,255,0.04) 56px)",
        }}
      />

      <svg
        viewBox="0 0 100 140"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-white/30"
        stroke="currentColor"
        strokeWidth="0.4"
        fill="none"
        aria-hidden
      >
        <rect x="2" y="2" width="96" height="136" />
        <line x1="2" y1="70" x2="98" y2="70" />
        <circle cx="50" cy="70" r="10" />
        <circle cx="50" cy="70" r="0.8" fill="currentColor" />
        <rect x="22" y="2" width="56" height="16" />
        <rect x="36" y="2" width="28" height="6" />
        <path d="M 38 18 A 12 12 0 0 0 62 18" />
        <rect x="22" y="122" width="56" height="16" />
        <rect x="36" y="132" width="28" height="6" />
        <path d="M 38 122 A 12 12 0 0 1 62 122" />
        <circle cx="50" cy="14" r="0.6" fill="currentColor" />
        <circle cx="50" cy="126" r="0.6" fill="currentColor" />
      </svg>

      {positionsOnPitch.map((pos) => {
        const ps = buckets.get(pos)!;
        const base = POSITION_COORDS[pos];
        return ps.map((p, i) => {
          const offset = (i - (ps.length - 1) / 2) * 18;
          const x = Math.max(8, Math.min(92, base.x + offset));
          return (
            <Link
              key={p.id}
              href={`/profile/${p.slug}`}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${x}%`, top: `${base.y}%` }}
            >
              <div className="relative">
                <img
                  src={p.avatar}
                  alt={p.name}
                  className="h-11 w-11 rounded-full border-2 border-emerald-400 bg-card object-cover shadow-lg shadow-black/40 transition-transform group-hover:scale-110"
                />
                {p.id === captainId && (
                  <Crown
                    className="-top-2 -right-1 absolute h-4 w-4 fill-amber-300 text-amber-400 drop-shadow"
                    aria-label="Đội trưởng"
                  />
                )}
                <span className="-bottom-1 -right-1 absolute grid h-5 w-5 place-items-center rounded-full bg-emerald-500 font-mono font-bold text-[10px] text-emerald-950 shadow">
                  {p.rating}
                </span>
              </div>
              <div className="max-w-[88px] rounded-md bg-background/80 px-1.5 py-0.5 text-center backdrop-blur">
                <p className="truncate font-medium text-[10px] leading-tight">
                  {p.name.split(" ").slice(-1)[0]}
                </p>
                <p className="font-mono text-[9px] text-emerald-400 leading-none">
                  {p.position}
                </p>
              </div>
            </Link>
          );
        });
      })}
    </div>
  );
}
