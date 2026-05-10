"use client";

import Link from "next/link";
import SphereImageGrid from "@/components/ui/image-sphere";
import ShutterText from "@/components/ui/shutter-text";
import { GooeyText } from "@/components/ui/gooey-text-morphing";

const COMMUNITY = Array.from({ length: 36 }).map((_, i) => ({
  id: `c${i}`,
  src: `https://i.pravatar.cc/300?img=${(i % 70) + 1}`,
  alt: `PitchPro player ${i + 1}`,
  title: `Player #${i + 1}`,
}));

export function SiteLocker() {
  return (
    <section id="stories" className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div>
          <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
            Cộng đồng
          </span>
          <h2 className="mt-3 text-balance font-bold text-4xl tracking-tight md:text-5xl">
            Cầu thủ PitchPro đến từ khắp nơi.
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Kéo để xoay quả cầu cộng đồng. Mỗi gương mặt là một hồ sơ thật —
            kèm lịch sử trận đấu, kỹ năng, và lịch rảnh để bạn ghép đội.
          </p>
          <div className="mt-8 h-12">
            <GooeyText
              texts={["TẬP", "DỰNG ĐỘI", "GIA NHẬP", "ĐÁ"]}
              className="font-extrabold text-4xl text-emerald-400"
            />
          </div>
          <div className="mt-4">
            <ShutterText text="MỘT ĐỘI · MỘT SÂN" />
          </div>
          <Link
            href="/players"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2.5 text-sm text-emerald-400 hover:bg-emerald-500/20"
          >
            Khám phá hồ sơ cầu thủ
          </Link>
        </div>
        <div className="relative h-[440px] w-full md:h-[520px]">
          <SphereImageGrid
            images={COMMUNITY}
            containerSize={520}
            sphereRadius={220}
            autoRotate
            autoRotateSpeed={0.05}
            className="!h-full !w-full"
          />
        </div>
      </div>
    </section>
  );
}
