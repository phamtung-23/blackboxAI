"use client";

import Link from "next/link";
import { MapPin, Users, ArrowRight, Star } from "lucide-react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { Magnetic } from "@/components/ui/magnetic";
import { TypewriterText } from "@/components/ui/typewritter-text";
import { TEAMS } from "@/lib/data";
import type { Format, Level, Team } from "@/lib/types";

const FORMAT_LABEL: Record<Format, string> = {
  "5-a-side": "Sân 5",
  "7-a-side": "Sân 7",
  "11-a-side": "Sân 11",
};
const LEVEL_LABEL: Record<Level, string> = {
  Casual: "Vui chơi",
  Amateur: "Nghiệp dư",
  "Semi-pro": "Bán chuyên",
  Competitive: "Chuyên",
};

const HERO_TEAMS: (Team & { span?: string; accent: string })[] = [
  { ...TEAMS[0], span: "md:col-span-2 md:row-span-2", accent: "from-emerald-500/40 to-cyan-500/40" },
  { ...TEAMS[1], accent: "from-amber-400/40 to-rose-500/40" },
  { ...TEAMS[2], accent: "from-cyan-500/40 to-blue-500/40" },
  { ...TEAMS[3], accent: "from-rose-500/40 to-orange-500/40" },
  { ...TEAMS[4], accent: "from-violet-500/40 to-indigo-500/40" },
];

export function SiteTeams() {
  return (
    <section id="teams" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12 flex flex-col items-start gap-3">
        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
          Đội nổi bật
        </span>
        <h2 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Đội nào đang cần{" "}
          <TypewriterText
            words={["bạn?", "thủ môn?", "tiền đạo?", "trung vệ?"]}
            typingSpeed={70}
            deletingSpeed={40}
            className="text-emerald-400"
          />
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Lướt qua những đội đang mở suất gần bạn. Nhấn vào thẻ để xem lịch
          tập, thành tích, thành viên — và gửi yêu cầu gia nhập trong một chạm.
        </p>
      </div>

      <BentoGrid>
        {HERO_TEAMS.map((team) => (
          <Magnetic key={team.id} intensity={0.25} range={140}>
            <Link
              href={`/teams#${team.slug}`}
              className={`group relative block h-full w-full overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 ${team.span ?? ""}`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${team.accent} opacity-50 transition-opacity duration-500 group-hover:opacity-80`}
              />
              <img
                src={team.cover}
                alt={team.name}
                className="absolute inset-0 h-full w-full object-cover opacity-50 mix-blend-luminosity transition-transform duration-700 group-hover:scale-105"
              />
              <div className="relative flex h-full flex-col justify-between p-6 text-left">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-white text-xs backdrop-blur-sm">
                    <MapPin className="h-3 w-3" />
                    {team.city}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 font-semibold text-emerald-950 text-xs">
                    <Star className="h-3 w-3" />
                    {team.rating}
                  </span>
                </div>
                <div>
                  <p className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-white/80 text-xs backdrop-blur-sm">
                    {FORMAT_LABEL[team.format]} · {LEVEL_LABEL[team.level]}
                  </p>
                  <h3 className="mt-2 font-bold text-2xl text-white drop-shadow-md md:text-3xl">
                    {team.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-white/80 text-sm">
                      <Users className="h-4 w-4" />
                      {team.members}/{team.capacity}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 font-semibold text-emerald-950 text-xs">
                      Mở {team.openSlots} suất
                    </span>
                  </div>
                </div>
              </div>
              <span className="absolute inset-x-6 bottom-3 inline-flex items-center justify-end gap-1 text-white/70 text-xs opacity-0 transition-opacity group-hover:opacity-100">
                Xin gia nhập <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </Magnetic>
        ))}
      </BentoGrid>

      <div className="mt-8 flex justify-center">
        <Link
          href="/teams"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-5 py-2.5 text-sm transition-colors hover:border-emerald-500/40 hover:text-emerald-400"
        >
          Xem tất cả 124 đội <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
