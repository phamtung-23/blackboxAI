"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Star, Users, CalendarClock } from "lucide-react";
import { useAnimatedToast } from "@/components/ui/animated-toast";
import type { Format, Level, Team } from "@/lib/types";
import { cn } from "@/lib/utils";

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

const FORM_COLOR: Record<"W" | "D" | "L", string> = {
  W: "bg-emerald-500 text-emerald-950",
  D: "bg-amber-400 text-amber-950",
  L: "bg-rose-500 text-rose-950",
};

export function TeamCard({
  team,
  className,
}: {
  team: Team;
  className?: string;
}) {
  const { addToast } = useAnimatedToast();
  return (
    <article
      id={team.slug}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10",
        className,
      )}
    >
      <Link
        href={`/teams/${team.slug}`}
        className="relative block h-32 overflow-hidden"
      >
        <img
          src={team.cover}
          alt=""
          className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <div className="absolute inset-x-4 bottom-3 flex items-end gap-3">
          <img
            src={team.logo}
            alt=""
            className="h-14 w-14 rounded-xl border-2 border-card bg-background object-cover"
          />
          <div className="flex-1">
            <p className="font-bold text-lg leading-tight">{team.name}</p>
            <p className="inline-flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              {team.city}
            </p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/90 px-2 py-1 font-mono font-bold text-emerald-950 text-xs">
            <Star className="h-3 w-3" />
            {team.rating}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-medium text-emerald-400">
            {FORMAT_LABEL[team.format]}
          </span>
          <span className="rounded-md border border-border/60 px-2 py-0.5 text-muted-foreground">
            {LEVEL_LABEL[team.level]}
          </span>
          <span className="rounded-md border border-border/60 px-2 py-0.5 text-muted-foreground">
            Thành lập {team.founded}
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{team.bioVi}</p>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-background/40 p-2">
            <span className="text-muted-foreground">Thành viên</span>
            <span className="font-mono font-semibold">
              <Users className="mr-1 inline h-3 w-3" />
              {team.members}/{team.capacity}
            </span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-background/40 p-2">
            <span className="text-muted-foreground">Trống</span>
            <span className="font-mono font-semibold text-emerald-400">
              {team.openSlots} suất
            </span>
          </div>
          <div className="flex flex-col gap-0.5 rounded-lg border border-border/60 bg-background/40 p-2">
            <span className="text-muted-foreground">Phong độ</span>
            <span className="inline-flex gap-0.5">
              {team.recentForm.slice(-5).map((f, i) => (
                <span
                  key={i}
                  className={cn(
                    "grid h-4 w-4 place-items-center rounded-sm font-bold text-[9px]",
                    FORM_COLOR[f],
                  )}
                >
                  {f}
                </span>
              ))}
            </span>
          </div>
        </div>

        <p className="inline-flex items-center gap-1 text-muted-foreground text-xs">
          <CalendarClock className="h-3 w-3" />
          {team.schedule}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Link
            href={`/teams/${team.slug}`}
            className="text-muted-foreground text-xs hover:text-foreground"
          >
            Xem chi tiết
          </Link>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-emerald-950 text-sm font-semibold transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={team.openSlots === 0}
            onClick={() =>
              addToast({
                type: "success",
                title: `Đã gửi đến ${team.name}`,
                message: `Đơn xin gia nhập đã được gửi · đội trưởng sẽ phản hồi sớm.`,
              })
            }
          >
            {team.openSlots === 0 ? "Đã đủ" : "Xin gia nhập"}
            {team.openSlots > 0 && <ArrowRight className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </article>
  );
}
