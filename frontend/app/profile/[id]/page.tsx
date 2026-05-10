import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CalendarRange,
  Footprints,
  MapPin,
  Ruler,
  Trophy,
  Weight,
} from "lucide-react";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteDock } from "@/components/site/site-dock";
import { PlayerStatBars, StatBadge } from "@/components/site/player-stats";
import { ProfileActions } from "@/components/site/profile-actions";
import { PLAYERS, TEAMS, getPlayerById } from "@/lib/data";
import type { Foot, Format } from "@/lib/types";

const FOOT_LABEL: Record<Foot, string> = {
  Left: "Chân trái",
  Right: "Chân phải",
  Both: "Hai chân",
};
const FORMAT_LABEL: Record<Format, string> = {
  "5-a-side": "Sân 5",
  "7-a-side": "Sân 7",
  "11-a-side": "Sân 11",
};

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ id: p.slug }));
}

const RESULT_BADGE: Record<"W" | "D" | "L", string> = {
  W: "bg-emerald-500/20 text-emerald-400",
  D: "bg-amber-500/20 text-amber-400",
  L: "bg-rose-500/20 text-rose-400",
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const player = getPlayerById(params.id);
  if (!player) notFound();

  const team = player.teamId
    ? TEAMS.find((t) => t.id === player.teamId)
    : undefined;

  const totalGoals = player.matchHistory.reduce(
    (acc, m) => acc + (m.goals ?? 0),
    0,
  );
  const totalAssists = player.matchHistory.reduce(
    (acc, m) => acc + (m.assists ?? 0),
    0,
  );
  const wins = player.matchHistory.filter((m) => m.result === "W").length;
  const totalMatches = player.matchHistory.length;
  const winRate = totalMatches
    ? Math.round((wins / totalMatches) * 100)
    : 0;

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <SiteHeader />
      <main className="pb-32">
        <div className="relative h-[280px] overflow-hidden md:h-[360px]">
          <img
            src={player.cover}
            alt=""
            className="h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          <Link
            href="/players"
            className="absolute top-6 left-6 inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/60 px-3 py-1.5 text-sm backdrop-blur hover:border-emerald-500/40 mt-14"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Cầu thủ
          </Link>
        </div>

        <div className="relative z-10 mx-auto -mt-24 max-w-6xl px-6 md:-mt-32">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-end">
            <img
              src={player.avatar}
              alt={player.name}
              className="h-32 w-32 rounded-3xl border-4 border-background object-cover shadow-2xl md:h-40 md:w-40"
            />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">@{player.username}</p>
              <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
                {player.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-md bg-emerald-500/20 px-2 py-1 font-mono font-bold text-emerald-400">
                  {player.position}
                </span>
                {player.altPositions.map((p) => (
                  <span
                    key={p}
                    className="rounded-md border border-border/60 px-2 py-1 font-mono text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {player.city}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md border border-border/60 px-2 py-1 text-muted-foreground">
                  <Footprints className="h-3 w-3" />
                  {FOOT_LABEL[player.foot]}
                </span>
              </div>
            </div>
            <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-emerald-500 font-mono font-bold text-3xl text-emerald-950 shadow-lg">
              {player.rating}
            </span>
          </div>

          <ProfileActions player={player} />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <section className="space-y-6">
              <Card>
                <h2 className="font-semibold text-lg">Giới thiệu</h2>
                <p className="mt-3 text-muted-foreground">{player.bioVi}</p>
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">Chỉ số</h2>
                <div className="mt-4">
                  <PlayerStatBars stats={player.stats} />
                </div>
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">
                  Lịch sử trận đấu
                </h2>
                {player.matchHistory.length === 0 ? (
                  <p className="mt-3 text-muted-foreground text-sm">
                    Chưa có trận nào được ghi.
                  </p>
                ) : (
                  <ul className="mt-4 divide-y divide-border/60">
                    {player.matchHistory.map((m) => (
                      <li
                        key={`${m.date}-${m.opponent}`}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <div>
                          <p className="font-medium">vs {m.opponent}</p>
                          <p className="text-muted-foreground text-xs">{m.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {(m.goals ?? 0) > 0 && (
                            <span className="text-emerald-400">⚽ {m.goals}</span>
                          )}
                          {(m.assists ?? 0) > 0 && (
                            <span className="text-sky-400">🅰 {m.assists}</span>
                          )}
                          <span className="font-mono text-muted-foreground">
                            {m.score}
                          </span>
                          <span
                            className={`grid h-7 w-7 place-items-center rounded-md font-bold text-xs ${RESULT_BADGE[m.result]}`}
                          >
                            {m.result}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </section>

            <aside className="space-y-6">
              <Card>
                <h2 className="font-semibold text-lg">Thống kê nhanh</h2>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <StatBadge value={totalMatches} label="Trận" />
                  <StatBadge value={winRate} label="Tỉ lệ thắng %" />
                  <StatBadge value={totalGoals} label="Bàn thắng" />
                  <StatBadge value={totalAssists} label="Kiến tạo" />
                </div>
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">Thông số</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <Row icon={Calendar} label="Tuổi" value={`${player.age}`} />
                  <Row icon={CalendarRange} label="Số năm chơi" value={`${player.yearsPlaying} năm`} />
                  <Row icon={Ruler} label="Chiều cao" value={`${player.height} cm`} />
                  <Row icon={Weight} label="Cân nặng" value={`${player.weight} kg`} />
                </ul>
              </Card>

              <Card>
                <h2 className="font-semibold text-lg">Lịch rảnh trong tuần</h2>
                <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                  {(
                    [
                      ["Mon", "T2"],
                      ["Tue", "T3"],
                      ["Wed", "T4"],
                      ["Thu", "T5"],
                      ["Fri", "T6"],
                      ["Sat", "T7"],
                      ["Sun", "CN"],
                    ] as const
                  ).map(([day, label]) => {
                    const free = player.availability.includes(day);
                    return (
                      <span
                        key={day}
                        className={`rounded-md border px-2 py-1 font-mono ${
                          free
                            ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400"
                            : "border-border/60 text-muted-foreground line-through"
                        }`}
                      >
                        {label}
                      </span>
                    );
                  })}
                </div>
              </Card>

              {team && (
                <Card>
                  <h2 className="font-semibold text-lg">Đội đang đá</h2>
                  <Link
                    href={`/teams#${team.slug}`}
                    className="mt-3 flex items-center gap-3 rounded-lg border border-border/60 bg-background/40 p-3 hover:border-emerald-500/40"
                  >
                    <img src={team.logo} alt="" className="h-10 w-10 rounded-md" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{team.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {FORMAT_LABEL[team.format]} · {team.city}
                      </p>
                    </div>
                  </Link>
                </Card>
              )}

              {player.achievements.length > 0 && (
                <Card>
                  <h2 className="font-semibold text-lg">Thành tích</h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {player.achievements.map((a) => (
                      <li key={`${a.year}-${a.title}`} className="flex items-start gap-2">
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

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <span className="font-mono">{value}</span>
    </li>
  );
}
