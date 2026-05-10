"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, UserPlus, IdCard } from "lucide-react";
import { GlitchText } from "@/components/ui/glitch-text";
import { HighlightText } from "@/components/ui/highlight-text";
import { Magnetic } from "@/components/ui/magnetic";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { RotatingText } from "@/components/ui/rotate-text";
import { useAnimatedToast } from "@/components/ui/animated-toast";

export function SiteHero() {
  const { addToast } = useAnimatedToast();

  useEffect(() => {
    const id = setTimeout(() => {
      addToast({
        type: "success",
        title: "Hanoi Rovers vừa mở 4 suất",
        message: "Cần 1 hậu vệ trái và 1 thủ môn dự bị · Chủ nhật 09:00",
        duration: 6000,
      });
    }, 1400);
    return () => clearTimeout(id);
  }, [addToast]);

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24">
      <PitchBackdrop />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" />
          <GlitchText
            words={["MỚI · 6 ĐỘI ĐANG TUYỂN", "CÒN 24 SUẤT TUẦN NÀY", "VÒNG 14"]}
            interval={2400}
          />
        </span>

        <h1 className="font-bold text-balance text-5xl leading-[1.2] tracking-tight md:text-7xl lg:text-[5.25rem]">
          Tìm đội bóng
          <br />
          <span className="text-muted-foreground">Khoác</span>{" "}
          <RotatingText
            words={["áo.", "đội.", "trận.", "phong độ."]}
            interval={2400}
            className="px-1 pb-2 align-baseline text-emerald-400"
          />
        </h1>

        <p className="max-w-2xl text-balance text-muted-foreground text-lg md:text-xl">
          PitchPro là nơi cầu thủ tạo{" "}
          <HighlightText variant="underline" color="primary">
            hồ sơ
          </HighlightText>{" "}
          bóng đá, khám phá các đội đang cần người và xin gia nhập đúng trình
          độ — đúng kỹ năng, đúng thành phố, đúng màu áo.
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Magnetic intensity={0.5} range={120}>
            <Link href="/teams">
              <RainbowButton className="px-7 py-3 text-base font-semibold">
                Tìm đội ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </RainbowButton>
            </Link>
          </Magnetic>
          <Magnetic intensity={0.5} range={120}>
            <Link href="/profile/p1">
              <RainbowButton className="px-7 py-3 text-base font-semibold">
                <IdCard className="mr-2 h-5 w-5" />
                Tạo hồ sơ
              </RainbowButton>
            </Link>
          </Magnetic>
          <Magnetic intensity={0.5} range={120}>
            <Link href="/players">
              <RainbowButton className="px-7 py-3 text-base font-semibold">
                <UserPlus className="mr-2 h-5 w-5" />
                Tuyển cầu thủ
              </RainbowButton>
            </Link>
          </Magnetic>
        </div>

        <div className="mt-6 flex items-center gap-3 text-muted-foreground text-sm">
          <div className="flex -space-x-2">
            {[
              "https://i.pravatar.cc/40?img=12",
              "https://i.pravatar.cc/40?img=23",
              "https://i.pravatar.cc/40?img=47",
              "https://i.pravatar.cc/40?img=51",
            ].map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="h-7 w-7 rounded-full border-2 border-background"
              />
            ))}
          </div>
          <span>
            <span className="font-semibold text-foreground">Hơn 2.400 cầu thủ</span>{" "}
            đã có hồ sơ · 124 đội đang hoạt động
          </span>
        </div>
      </div>
    </section>
  );
}

function PitchBackdrop() {
  return (
    <>
      <img
        aria-hidden
        src="/hero-pitch.jpg"
        alt=""
        className="-z-20 absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-black/60"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-gradient-to-b from-background/30 via-background/40 to-background"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,theme(colors.emerald.500/0.35),transparent_55%)] mix-blend-overlay"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />
    </>
  );
}
