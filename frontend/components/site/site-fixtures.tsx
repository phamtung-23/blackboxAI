"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-text";

type Pickup = {
  id: string;
  team: string;
  city: string;
  format: string;
  level: string;
  date: string;
  venue: string;
  needs: string[];
  spots: number;
  href: string;
};

const PICKUPS: Pickup[] = [
  {
    id: "pk1",
    team: "Hanoi Rovers",
    city: "Hà Nội",
    format: "Sân 11",
    level: "Bán chuyên",
    date: "CN · 09:00",
    venue: "Sân Tây Hồ",
    needs: ["LB", "GK"],
    spots: 2,
    href: "/teams#hanoi-rovers",
  },
  {
    id: "pk2",
    team: "Saigon Strikers",
    city: "TP.HCM",
    format: "Sân 7",
    level: "Chuyên",
    date: "T7 · 19:30",
    venue: "Trung tâm thể thao Quận 2",
    needs: ["LW", "RW"],
    spots: 2,
    href: "/teams#saigon-strikers",
  },
  {
    id: "pk3",
    team: "Da Nang Coastal",
    city: "Đà Nẵng",
    format: "Sân 5",
    level: "Vui chơi",
    date: "T7 · 07:00",
    venue: "Sân Mỹ Khê",
    needs: ["Mọi vị trí"],
    spots: 4,
    href: "/teams#danang-coastal",
  },
  {
    id: "pk4",
    team: "Hue Dragons",
    city: "Huế",
    format: "Sân 7",
    level: "Nghiệp dư",
    date: "T3 · 18:00",
    venue: "Sân TP Huế",
    needs: ["CAM", "ST"],
    spots: 2,
    href: "/teams#hue-dragons",
  },
];

export function SiteFixtures() {
  return (
    <section id="fixtures" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Trận đang cần người
          </span>
          <h2 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
            Ứng tuyển trong một chạm
          </h2>
        </div>
        <Link
          href="/teams"
          className="hidden items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm transition-colors hover:border-emerald-500/40 md:inline-flex"
        >
          <CalendarDays className="h-4 w-4" /> Xem tất cả trận
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {PICKUPS.map((p, i) => (
          <ScrollReveal key={p.id} effect="fadeUp" speed={1 + i * 0.05}>
            <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-6 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-emerald-400 text-xs font-medium">
                  {p.format} · {p.level}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3.5 w-3.5" /> {p.date}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{p.team}</h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="h-3.5 w-3.5" />
                    {p.venue} · {p.city}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 font-semibold text-emerald-950 text-xs">
                  <Users className="h-3 w-3" />
                  {p.spots} suất
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-muted-foreground">Vị trí cần: </span>
                {p.needs.map((n) => (
                  <span
                    key={n}
                    className="rounded-md border border-border/60 bg-background/40 px-2 py-0.5 font-mono"
                  >
                    {n}
                  </span>
                ))}
              </div>
              <Link
                href={p.href}
                className="mt-5 inline-flex items-center gap-1 text-emerald-400 text-sm font-medium hover:text-emerald-300"
              >
                Xin gia nhập →
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
