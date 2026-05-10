"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { Magnetic } from "@/components/ui/magnetic";

const NAV = [
  { label: "Trang chủ", href: "/" },
  { label: "Đội bóng", href: "/teams" },
  { label: "Cầu thủ", href: "/players" },
];

export function SiteHeader() {
  const router = useRouter();
  return (
    <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md border-b border-border/40 bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
            <Trophy className="h-5 w-5" />
          </span>
          <span className="text-lg tracking-tight">PitchPro</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Magnetic key={item.href} intensity={0.3} range={60}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </Magnetic>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Magnetic intensity={0.4} range={80}>
            <LiquidMetalButton
              label="Đăng ký"
              onClick={() => router.push("/profile/p1")}
            />
          </Magnetic>
        </div>
      </div>
    </header>
  );
}
