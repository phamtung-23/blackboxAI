"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteDock } from "@/components/site/site-dock";
import { PlayerCard } from "@/components/site/player-card";
import { PLAYERS } from "@/lib/data";
import type { Position } from "@/lib/types";

const POSITIONS: Position[] = [
  "GK",
  "CB",
  "LB",
  "RB",
  "CDM",
  "CM",
  "CAM",
  "LW",
  "RW",
  "ST",
];

type Tier = "all" | "75" | "80" | "85";

export default function PlayersPage() {
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState<Position | "all">("all");
  const [tier, setTier] = useState<Tier>("all");
  const [city, setCity] = useState<string>("all");

  const cities = Array.from(new Set(PLAYERS.map((p) => p.city)));

  const filtered = useMemo(() => {
    return PLAYERS.filter((p) => {
      if (position !== "all" && p.position !== position && !p.altPositions.includes(position)) {
        return false;
      }
      if (city !== "all" && p.city !== city) return false;
      if (tier !== "all") {
        const min = parseInt(tier, 10);
        if (p.rating < min) return false;
      }
      if (query) {
        const q = query.toLowerCase();
        if (
          !p.name.toLowerCase().includes(q) &&
          !p.username.toLowerCase().includes(q) &&
          !p.city.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [query, position, tier, city]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main className="pt-28 pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Cầu thủ
            </span>
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
              Tuyển <span className="text-emerald-400">đúng người</span> cho đội bạn
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {PLAYERS.length} cầu thủ có hồ sơ đầy đủ · chỉ số cập nhật theo
              từng trận. Lọc theo vị trí, hạng điểm hoặc thành phố.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên, biệt danh..."
                className="h-10 w-full rounded-md border border-border bg-background pr-3 pl-9 text-sm outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select
                value={position}
                onChange={(v) => setPosition(v as Position | "all")}
                options={[
                  { value: "all", label: "Tất cả vị trí" },
                  ...POSITIONS.map((p) => ({ value: p, label: p })),
                ]}
              />
              <Select
                value={tier}
                onChange={(v) => setTier(v as Tier)}
                options={[
                  { value: "all", label: "Mọi hạng" },
                  { value: "75", label: "75+" },
                  { value: "80", label: "80+" },
                  { value: "85", label: "85+" },
                ]}
              />
              <Select
                value={city}
                onChange={setCity}
                options={[
                  { value: "all", label: "Tất cả thành phố" },
                  ...cities.map((c) => ({ value: c, label: c })),
                ]}
              />
            </div>
          </div>

          <div className="mt-4 text-muted-foreground text-sm">
            {filtered.length} kết quả
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border/60 bg-card/40 p-12 text-center text-muted-foreground">
                Không có cầu thủ khớp bộ lọc.
              </p>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      <SiteDock />
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-9 rounded-md border border-border bg-background px-3 text-sm outline-none focus:border-emerald-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
