"use client";

import Link from "next/link";
import { MapPin, Footprints } from "lucide-react";
import type { Foot, Player } from "@/lib/types";
import { cn } from "@/lib/utils";

const FOOT_LABEL: Record<Foot, string> = {
  Left: "Trái",
  Right: "Phải",
  Both: "Hai",
};

const POSITION_COLOR: Record<string, string> = {
  GK: "bg-amber-500/90 text-amber-950",
  CB: "bg-sky-500/90 text-sky-950",
  LB: "bg-sky-500/90 text-sky-950",
  RB: "bg-sky-500/90 text-sky-950",
  CDM: "bg-violet-500/90 text-violet-950",
  CM: "bg-violet-500/90 text-violet-950",
  CAM: "bg-violet-500/90 text-violet-950",
  LW: "bg-rose-500/90 text-rose-950",
  RW: "bg-rose-500/90 text-rose-950",
  ST: "bg-emerald-500/90 text-emerald-950",
};

export function PlayerCard({
  player,
  className,
}: {
  player: Player;
  className?: string;
}) {
  return (
    <Link
      href={`/profile/${player.slug}`}
      className={cn(
        "group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={player.avatar}
          alt={player.name}
          className="h-14 w-14 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate font-semibold">{player.name}</p>
            <span className="inline-flex items-center justify-center rounded-md bg-emerald-500/90 px-2 py-0.5 font-mono font-bold text-emerald-950 text-xs">
              {player.rating}
            </span>
          </div>
          <p className="text-muted-foreground text-xs">@{player.username}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span
          className={cn(
            "rounded-md px-2 py-0.5 font-mono font-bold",
            POSITION_COLOR[player.position] ?? "bg-muted",
          )}
        >
          {player.position}
        </span>
        {player.altPositions.slice(0, 2).map((p) => (
          <span
            key={p}
            className="rounded-md border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
          >
            {p}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between text-muted-foreground text-xs">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {player.city}
        </span>
        <span className="inline-flex items-center gap-1">
          <Footprints className="h-3 w-3" />
          {FOOT_LABEL[player.foot]}
        </span>
      </div>
    </Link>
  );
}
