"use client";

import Link from "next/link";
import { ArrowRight, Footprints, MapPin, Trophy } from "lucide-react";
import { CharacterMorph } from "@/components/ui/character-morph";
import { PlayerStatBars } from "@/components/site/player-stats";
import { PLAYERS } from "@/lib/data";
import type { Foot } from "@/lib/types";

const FOOT_LABEL: Record<Foot, string> = {
  Left: "Chân trái",
  Right: "Chân phải",
  Both: "Hai chân",
};

const FEATURED = PLAYERS[0];

export function SiteSpotlight() {
  return (
    <section id="profile" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="flex flex-col gap-4">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Hồ sơ cầu thủ
          </span>
          <h2 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
            Khoe với cộng đồng{" "}
            <CharacterMorph
              texts={["kỹ năng", "phong độ", "trình độ", "câu chuyện"]}
              className="inline-block align-baseline text-emerald-400"
            />
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Mỗi cầu thủ trên PitchPro có một hồ sơ bóng đá: vị trí sở trường,
            chân thuận, chỉ số kiểu FIFA, lịch sử trận đấu và thành tích. Đội
            trưởng sẽ thấy ngay bạn đá được vai gì.
          </p>
          <ul className="mt-2 grid gap-2 text-sm">
            {[
              "Chỉ số kiểu FIFA: TĐ · DỨT · CHUYỀN · RÊ · THỦ · THỂ LỰC",
              "Một vị trí chính kèm 1–2 vị trí phụ",
              "Lịch sử trận, bàn thắng, kiến tạo và thành tích",
              "Lịch rảnh trong tuần để đội biết khi nào ghép được",
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/40 px-4 py-2"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 text-[10px]">
                  ✓
                </span>
                <span className="text-muted-foreground">{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link
              href={`/profile/${FEATURED.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-emerald-950 text-sm hover:bg-emerald-400"
            >
              Xem hồ sơ mẫu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/players"
              className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:border-emerald-500/40"
            >
              Khám phá cầu thủ
            </Link>
          </div>
        </div>

        <ProfileMockup />
      </div>
    </section>
  );
}

function ProfileMockup() {
  const p = FEATURED;
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-emerald-500/30 to-cyan-500/10 blur-2xl"
      />
      <article className="overflow-hidden rounded-[28px] border border-border/60 bg-card shadow-2xl">
        <div className="relative h-40 overflow-hidden">
          <img src={p.cover} alt="" className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        </div>
        <div className="relative px-6 pt-0 pb-6">
          <div className="-mt-12 flex items-end gap-4">
            <img
              src={p.avatar}
              alt={p.name}
              className="h-24 w-24 rounded-2xl border-4 border-card object-cover shadow-lg"
            />
            <div className="flex-1">
              <p className="font-bold text-2xl">{p.name}</p>
              <p className="text-muted-foreground text-sm">@{p.username}</p>
            </div>
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-emerald-500 font-mono font-bold text-2xl text-emerald-950">
              {p.rating}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-md bg-emerald-500/15 px-2 py-1 font-mono font-bold text-emerald-400">
              {p.position}
            </span>
            {p.altPositions.map((alt) => (
              <span
                key={alt}
                className="rounded-md border border-border/60 px-2 py-1 font-mono text-muted-foreground"
              >
                {alt}
              </span>
            ))}
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
              <Footprints className="h-3 w-3" />
              {FOOT_LABEL[p.foot]}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {p.city}
            </span>
          </div>

          <p className="mt-4 text-muted-foreground text-sm">{p.bioVi}</p>

          <div className="mt-5 rounded-xl border border-border/60 bg-background/40 p-4">
            <PlayerStatBars stats={p.stats} />
          </div>

          {p.achievements.length > 0 && (
            <div className="mt-4 flex items-start gap-2 text-sm">
              <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
              <span>
                <span className="font-semibold">{p.achievements[0].title}</span>{" "}
                <span className="text-muted-foreground">· {p.achievements[0].year}</span>
              </span>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
