"use client";

import { Trophy } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-border/40 bg-card/40 pb-28 pt-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
            <Trophy className="h-5 w-5" />
          </span>
          <div>
            <div>PitchPro</div>
            <p className="text-muted-foreground text-xs">
              Tạo hồ sơ · Tìm đội · Đá bóng
            </p>
          </div>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground text-sm">
          <li><a href="/teams" className="hover:text-foreground">Đội bóng</a></li>
          <li><a href="/players" className="hover:text-foreground">Cầu thủ</a></li>
          <li><a href="#how" className="hover:text-foreground">Cách hoạt động</a></li>
          <li><a href="#stories" className="hover:text-foreground">Câu chuyện</a></li>
          <li>© 2026 PitchPro</li>
        </ul>
      </div>
    </footer>
  );
}
