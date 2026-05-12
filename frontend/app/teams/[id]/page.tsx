import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CalendarClock,
  Crown,
  MapPin,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteDock } from "@/components/site/site-dock";
import { StatBadge } from "@/components/site/player-stats";
import { TeamFormation } from "@/components/site/team-formation";
import { TeamJoinButton } from "@/components/site/team-join-button";
import { PLAYERS, TEAMS, getTeamById, getTeamMembers } from "@/lib/data";
import type { Format, Level } from "@/lib/types";
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
const FORM_LABEL: Record<"W" | "D" | "L", string> = {
  W: "Thắng",
  D: "Hòa",
  L: "Thua",
};

export function generateStaticParams() {
  return TEAMS.map((t) => ({ id: t.slug }));
}

export default function TeamDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const team = getTeamById(params.id);
  if (!team) notFound();

  const members = getTeamMembers(team);
  const captain = PLAYERS.find((p) => p.id === team.captainId);
  const wins = team.recentForm.filter((r) => r === "W").length;
  const draws = team.recentForm.filter((r) => r === "D").length;
  const losses = team.recentForm.filter((r) => r === "L").length;
  const totalForm = team.recentForm.length || 1;
  const winRate = Math.round((wins / totalForm) * 100);
  const fillPercent = Math.round((team.members / team.capacity) * 100);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main className="pt-24 pb-32">
        <div className="relative h-[280px] overflow-hidden md:h-[360px]">
          <img
            src={team.cover}
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <Link
            href="/teams"
            className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/60 px-3 py-1.5 text-sm backdrop-blur hover:border-emerald-500/40"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Đội bóng
          </Link>
        </div>

        <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-6 md:-mt-32">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
            <img
              src={team.logo}
              alt={team.name}
              className="h-32 w-32 rounded-3xl border-4 border-background bg-card object-cover shadow-2xl md:h-40 md:w-40"
            />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">
                Thành lập {team.founded} · {team.country}
              </p>
              <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
                {team.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md bg-emerald-500/20 px-2 py-1 font-mono font-bold text-emerald-400">
                  {FORMAT_LABEL[team.format]}
                </span>
                <span className="rounded-md border border-border/60 px-2 py-1 font-mono text-muted-foreground">
                  {LEVEL_LABEL[team.level]}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {team.city}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {team.members}/{team.capacity}
                </span>
              </div>
            </div>
            <span className="inline-flex h-20 w-20 shrink-0 items-center justify-center gap-1 rounded-3xl bg-emerald-500 font-mono font-bold text-3xl text-emerald-950 shadow-lg">
              <Star className="h-5 w-5" />
              {team.rating}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <TeamJoinButton
              teamName={team.name}
              disabled={team.openSlots === 0}
              openSlots={team.openSlots}
            />
            <Link
              href={`/players?team=${team.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm transition-colors hover:border-emerald-500/40 hover:bg-background"
            >
              <Users className="h-4 w-4" />
              Xem đội hình
            </Link>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <section className="space-y-6">
              <Card>
                <h2 className="font-semibold text-lg">Giới thiệu</h2>
                <p className="mt-3 text-muted-foreground">{team.bioVi}</p>
              </Card>

              {members.length > 0 && (
                <Card>
                  <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">Đội hình</h2>
                    <span className="text-muted-foreground text-xs">
                      Bố trí theo vị trí chính
                    </span>
                  </div>
                  <div className="mt-4 mx-auto max-w-sm">
                    <TeamFormation
                      players={members}
                      captainId={team.captainId}
                    />
                  </div>
                </Card>
              )}

              <Card>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Thành viên</h2>
                  <span className="text-muted-foreground text-xs">
                    {members.length} thành viên đã có hồ sơ
                  </span>
                </div>
                {members.length === 0 ? (
                  <p className="mt-3 text-muted-foreground text-sm">
                    Chưa có thành viên nào lập hồ sơ trên PitchPro.
                  </p>
                ) : (
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    {members.map((p) => {
                      const isCaptain = p.id === team.captainId;
                      return (
                        <li key={p.id}>
                          <Link
                            href={`/profile/${p.slug}`}
                            className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/40 p-3 transition-colors hover:border-emerald-500/40"
                          >
                            <img
                              src={p.avatar}
                              alt=""
                              className="h-12 w-12 rounded-xl object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <p className="truncate font-medium text-sm">
                                  {p.name}
                                </p>
                                {isCaptain && (
                                  <Crown
                                    className="h-3.5 w-3.5 shrink-0 text-amber-400"
                                    aria-label="Đội trưởng"
                                  />
                                )}
                              </div>
                              <p className="text-muted-foreground text-xs">
                                {p.position} · {p.city}
                              </p>
                            </div>
                            <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500/20 font-mono font-bold text-emerald-400 text-sm">
                              {p.rating}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">Phong độ 5 trận gần nhất</h2>
                <div className="mt-4 flex items-center gap-2">
                  {team.recentForm.map((f, i) => (
                    <span
                      key={i}
                      title={FORM_LABEL[f]}
                      className={cn(
                        "grid h-10 w-10 place-items-center rounded-lg font-bold text-sm",
                        FORM_COLOR[f],
                      )}
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-lg border border-border/60 bg-background/40 p-2">
                    <p className="text-muted-foreground">Thắng</p>
                    <p className="font-bold text-emerald-400 text-lg">{wins}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/40 p-2">
                    <p className="text-muted-foreground">Hòa</p>
                    <p className="font-bold text-amber-400 text-lg">{draws}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-background/40 p-2">
                    <p className="text-muted-foreground">Thua</p>
                    <p className="font-bold text-rose-400 text-lg">{losses}</p>
                  </div>
                </div>
              </Card>
            </section>

            <aside className="space-y-6">
              <Card>
                <h2 className="font-semibold text-lg">Thống kê nhanh</h2>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <StatBadge value={team.rating} label="Rating" />
                  <StatBadge value={winRate} label="Tỉ lệ thắng %" />
                  <StatBadge value={team.openSlots} label="Suất còn trống" />
                  <StatBadge value={fillPercent} label="Tỉ lệ lấp đầy %" />
                </div>
                <div className="mt-4">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Quy mô đội</span>
                    <span className="font-mono">
                      {team.members}/{team.capacity}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-background/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">Lịch thi đấu</h2>
                <p className="mt-3 inline-flex items-start gap-2 text-sm">
                  <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                  <span>{team.schedule}</span>
                </p>
              </Card>

              {captain && (
                <Card>
                  <h2 className="font-semibold text-lg">Đội trưởng</h2>
                  <Link
                    href={`/profile/${captain.slug}`}
                    className="mt-3 flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3 transition-colors hover:border-emerald-500/40"
                  >
                    <img
                      src={captain.avatar}
                      alt=""
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="inline-flex items-center gap-1.5 truncate font-medium">
                        {captain.name}
                        <Crown className="h-3.5 w-3.5 shrink-0 text-amber-400" />
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {captain.position} · {captain.city}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </Card>
              )}

              {team.achievements.length > 0 && (
                <Card>
                  <h2 className="font-semibold text-lg">Thành tích</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {team.achievements.map((a) => (
                      <li
                        key={`${a.year}-${a.title}`}
                        className="flex items-start gap-2"
                      >
                        <Trophy className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                        <span>
                          <span className="font-medium">{a.title}</span>
                          <span className="ml-1 text-muted-foreground text-xs">
                            · {a.year}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
      <SiteDock />
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card/60 p-6">
      {children}
    </section>
  );
}
