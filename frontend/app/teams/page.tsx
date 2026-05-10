"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteDock } from "@/components/site/site-dock";
import { TeamCard } from "@/components/site/team-card";
import { TEAMS } from "@/lib/data";
import type { Format, Level } from "@/lib/types";

const FORMATS: Format[] = ["5-a-side", "7-a-side", "11-a-side"];
const FORMAT_LABEL: Record<Format, string> = {
  "5-a-side": "Sân 5",
  "7-a-side": "Sân 7",
  "11-a-side": "Sân 11",
};
const LEVELS: Level[] = ["Casual", "Amateur", "Semi-pro", "Competitive"];
const LEVEL_LABEL: Record<Level, string> = {
  Casual: "Vui chơi",
  Amateur: "Nghiệp dư",
  "Semi-pro": "Bán chuyên",
  Competitive: "Chuyên",
};

export default function TeamsPage() {
  const [query, setQuery] = useState("");
  const [format, setFormat] = useState<Format | "all">("all");
  const [level, setLevel] = useState<Level | "all">("all");
  const [openOnly, setOpenOnly] = useState(false);

  const filtered = useMemo(() => {
    return TEAMS.filter((t) => {
      if (format !== "all" && t.format !== format) return false;
      if (level !== "all" && t.level !== level) return false;
      if (openOnly && t.openSlots === 0) return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !t.name.toLowerCase().includes(q) &&
          !t.city.toLowerCase().includes(q) &&
          !t.bioVi.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [query, format, level, openOnly]);

  const cities = Array.from(new Set(TEAMS.map((t) => t.city)));

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main className="pt-28 pb-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3">
            <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
              Đội bóng
            </span>
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
              Tìm đội phù hợp với{" "}
              <span className="text-emerald-400">trình độ và lịch</span> của bạn
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              {TEAMS.length} đội đang hoạt động · {cities.length} thành phố ·{" "}
              {TEAMS.reduce((acc, t) => acc + t.openSlots, 0)} suất đang mở.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm theo tên đội, thành phố..."
                className="h-10 w-full rounded-md border border-border bg-background pr-3 pl-9 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select
                value={format}
                onChange={(v) => setFormat(v as Format | "all")}
                options={[
                  { value: "all", label: "Tất cả sân" },
                  ...FORMATS.map((f) => ({ value: f, label: FORMAT_LABEL[f] })),
                ]}
              />
              <Select
                value={level}
                onChange={(v) => setLevel(v as Level | "all")}
                options={[
                  { value: "all", label: "Tất cả trình độ" },
                  ...LEVELS.map((l) => ({ value: l, label: LEVEL_LABEL[l] })),
                ]}
              />
              <label className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm">
                <input
                  type="checkbox"
                  checked={openOnly}
                  onChange={(e) => setOpenOnly(e.target.checked)}
                  className="accent-emerald-500"
                />
                Chỉ đội còn suất
              </label>
            </div>
          </div>

          <div className="mt-4 text-muted-foreground text-sm">
            {filtered.length} kết quả
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full rounded-2xl border border-dashed border-border/60 bg-card/40 p-12 text-center text-muted-foreground">
                Không có đội nào khớp bộ lọc — thử bỏ điều kiện hoặc đổi
                thành phố nhé.
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
