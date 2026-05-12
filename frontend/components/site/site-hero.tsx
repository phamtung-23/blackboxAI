"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, IdCard, Sparkles, Trophy, UserPlus } from "lucide-react";
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
    <section className="relative isolate overflow-hidden pt-32 pb-24 lg:min-h-[760px]">
      <PitchBackdrop />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col items-start gap-6 text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-medium text-emerald-300 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            <GlitchText
              words={["MỚI · 6 ĐỘI ĐANG TUYỂN", "CÒN 24 SUẤT TUẦN NÀY", "VÒNG 14"]}
              interval={2400}
            />
          </span>

          <h1 className="font-bold text-balance text-5xl leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            TÌM ĐỘI BÓNG
            <br />
            <span className="text-muted-foreground">KHOÁC</span>{" "}
            <RotatingText
              words={["ÁO", "ĐỘI", "TRẬN"]}
              interval={2400}
              className="px-1 pb-2 pt-5 align-baseline text-emerald-400"
            />
          </h1>

          <p className="max-w-xl text-balance text-muted-foreground text-lg md:text-xl">
            PitchPro là nơi cầu thủ tạo{" "}
            <HighlightText variant="underline" color="primary">
              hồ sơ
            </HighlightText>{" "}
            bóng đá, khám phá các đội đang cần người và xin gia nhập đúng trình
            độ — đúng kỹ năng, đúng thành phố, đúng màu áo.
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Magnetic intensity={0.5} range={120}>
              <Link href="/teams">
                <RainbowButton className="px-6 py-3 font-semibold text-base">
                  Tìm đội ngay
                  <ArrowRight className="ml-2 h-5 w-5" />
                </RainbowButton>
              </Link>
            </Magnetic>
            <Magnetic intensity={0.5} range={120}>
              <Link href="/profile/p1">
                <RainbowButton className="px-6 py-3 font-semibold text-base">
                  <IdCard className="mr-2 h-5 w-5" />
                  Tạo hồ sơ
                </RainbowButton>
              </Link>
            </Magnetic>
            <Magnetic intensity={0.5} range={120}>
              <Link href="/players">
                <RainbowButton className="px-6 py-3 font-semibold text-base">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Tuyển cầu thủ
                </RainbowButton>
              </Link>
            </Magnetic>
          </div>

          <div className="mt-4 flex items-center gap-3 text-muted-foreground text-sm">
            <div className="-space-x-2 flex">
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

        <FloatingShowcase />
      </div>
    </section>
  );
}

function FloatingShowcase() {
  return (
    <div className="relative hidden h-[520px] lg:block">
      <div className="absolute top-8 right-4 w-[280px] rotate-[3deg] rounded-2xl border border-border/60 bg-card/70 p-4 shadow-2xl shadow-black/40 backdrop-blur transition-transform hover:rotate-0">
        <div className="mb-3 flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/20 text-emerald-300">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-sm">Hanoi Rovers</p>
            <p className="text-muted-foreground text-xs">Sân 7 · Hà Nội</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            ĐANG TUYỂN
          </span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Cần <span className="font-semibold text-foreground">hậu vệ trái</span> và{" "}
          <span className="font-semibold text-foreground">thủ môn</span> · Chủ nhật 09:00
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          {["LB", "GK", "ST"].map((p) => (
            <span
              key={p}
              className="rounded-md bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute top-44 left-2 w-[260px] -rotate-[4deg] rounded-2xl border border-border/60 bg-card/70 p-4 shadow-2xl shadow-black/40 backdrop-blur transition-transform hover:rotate-0">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/80?img=12"
            alt=""
            className="h-12 w-12 rounded-xl border-2 border-emerald-500/40 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold text-sm">Minh Lê</p>
            <p className="text-muted-foreground text-xs">CAM · Hà Nội</p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 font-mono font-bold text-emerald-950 text-sm shadow-lg">
            87
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px]">
          {[
            ["PAC", 82],
            ["SHO", 80],
            ["PAS", 88],
          ].map(([k, v]) => (
            <div key={k} className="rounded-md bg-background/60 py-1">
              <p className="font-mono text-muted-foreground">{k}</p>
              <p className="font-bold text-foreground">{v}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-12 bottom-4 w-[240px] rotate-[2deg] rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 shadow-2xl shadow-emerald-500/10 backdrop-blur transition-transform hover:rotate-0">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-emerald-950">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="font-semibold text-sm">Khớp 96%</p>
            <p className="text-emerald-300/80 text-xs">Bạn vs Saigon Wolves</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-background/60">
          <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600" />
        </div>
      </div>
    </div>
  );
}

function PitchBackdrop() {
  return (
    <>
      <img
        aria-hidden
        src="/UEFA-Champions-League.jpg"
        alt=""
        className="-z-20 absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/20"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,theme(colors.emerald.500/0.25),transparent_45%)]"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
      />
    </>
  );
}
