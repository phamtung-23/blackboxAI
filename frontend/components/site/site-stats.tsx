"use client";

import { ShieldCheck, Users, MapPin, CalendarRange } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { NumberCounter } from "@/components/ui/number-counter";

const STATS = [
  {
    icon: ShieldCheck,
    value: 124,
    label: "Đội đang hoạt động",
    tip: "Đội có ít nhất một trận trong 30 ngày qua.",
    duration: 2.0,
  },
  {
    icon: Users,
    value: 2_410,
    label: "Hồ sơ cầu thủ",
    suffix: "+",
    tip: "Cầu thủ đã hoàn thiện hồ sơ và có chỉ số kỹ năng.",
    duration: 2.4,
  },
  {
    icon: CalendarRange,
    value: 86,
    label: "Suất trống tuần này",
    tip: "Vị trí các đội đang mở để cầu thủ ứng tuyển trong 7 ngày tới.",
    duration: 1.6,
  },
  {
    icon: MapPin,
    value: 9,
    label: "Thành phố",
    tip: "Hà Nội, TP.HCM, Đà Nẵng, Hải Phòng, Huế, Cần Thơ, Hạ Long, Nha Trang, Vũng Tàu.",
    duration: 1.4,
  },
];

export function SiteStats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map(({ icon: Icon, value, label, tip, suffix, duration }) => (
          <AnimatedTooltip
            key={label}
            content={tip}
            placement="top"
            animation="spring"
          >
            <div className="group flex h-full flex-col items-start gap-2 rounded-2xl border border-border/60 bg-card/60 p-6 transition-colors hover:border-emerald-500/40">
              <Icon className="h-6 w-6 text-emerald-400" />
              <NumberCounter
                value={value}
                duration={duration}
                separator=","
                suffix={suffix}
                className="font-bold text-3xl tracking-tight md:text-4xl"
              />
              <p className="text-muted-foreground text-sm text-left">
                {label}
              </p>
            </div>
          </AnimatedTooltip>
        ))}
      </div>
    </section>
  );
}
