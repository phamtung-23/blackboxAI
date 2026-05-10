"use client";

import { Radio } from "lucide-react";
import { VelocityMorph } from "@/components/ui/velocity-morph";

const OPENINGS = [
  "Hanoi Rovers cần 1 hậu vệ trái · Sân 11 · CN 09:00",
  "Saigon Strikers cần 2 tiền vệ cánh · Sân 7 · T7 19:30",
  "Da Nang Coastal mở 4 suất · Sân 5 vui chơi · sáng T7",
  "Hai Phong United cần 1 tiền đạo · Sân 11 nghiệp dư",
  "Hue Dragons cần 1 tiền vệ tấn công · Sân 7 · T3 18:00",
  "Mekong Warriors mở 7 suất · tái thiết đội",
];

export function SiteTicker() {
  return (
    <section className="border-y border-border/40 bg-card/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 font-semibold text-emerald-400 text-xs uppercase tracking-wider">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          Đang tuyển
        </span>
        <VelocityMorph
          texts={OPENINGS}
          interval={2800}
          className="font-medium text-sm md:text-base"
        />
      </div>
    </section>
  );
}
