"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Bell,
  Home,
  Moon,
  Search,
  Settings,
  Shield,
  Sun,
  UserCircle2,
  Users,
} from "lucide-react";
import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
  DockSeparator,
} from "@/components/ui/dock";

const ITEMS = [
  { icon: Home, label: "Trang chủ", href: "/" },
  { icon: Shield, label: "Đội bóng", href: "/teams" },
  { icon: Users, label: "Cầu thủ", href: "/players" },
  { icon: UserCircle2, label: "Hồ sơ của tôi", href: "/profile/p1" },
  { icon: Search, label: "Tìm kiếm", href: "/players" },
];

const META = [
  { icon: Bell, label: "Thông báo" },
  { icon: Settings, label: "Cài đặt" },
];

export function SiteDock() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
      <Dock className="pointer-events-auto rounded-2xl border border-border/60 bg-card/80 p-2 shadow-2xl backdrop-blur-md">
        {ITEMS.map(({ icon: Icon, label, href }) => (
          <DockItem key={label}>
            <Link href={href} className="grid h-full w-full place-items-center">
              <DockIcon>
                <Icon />
              </DockIcon>
            </Link>
            <DockLabel>{label}</DockLabel>
          </DockItem>
        ))}
        <DockSeparator />
        <ThemeDockItem />
        {META.map(({ icon: Icon, label }) => (
          <DockItem key={label}>
            <DockIcon>
              <Icon />
            </DockIcon>
            <DockLabel>{label}</DockLabel>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}

function ThemeDockItem() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? "Sáng" : "Tối";

  return (
    <DockItem onClick={() => setTheme(isDark ? "light" : "dark")}>
      <DockIcon>
        <Icon />
      </DockIcon>
      <DockLabel>{label}</DockLabel>
    </DockItem>
  );
}
