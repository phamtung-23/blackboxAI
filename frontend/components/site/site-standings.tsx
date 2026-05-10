"use client";

import Link from "next/link";
import { TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";
import { AnimatedTable, type ColumnDef } from "@/components/ui/animated-table";
import { VercelTabs } from "@/components/ui/vercel-tabs";
import { TEAMS } from "@/lib/data";
import type { Format, Team } from "@/lib/types";

const FORMAT_LABEL: Record<Format, string> = {
  "5-a-side": "Sân 5",
  "7-a-side": "Sân 7",
  "11-a-side": "Sân 11",
};

type Row = {
  id: string;
  pos: number;
  team: Team;
  played: number;
  rating: number;
  members: string;
  openSlots: number;
  form: ("W" | "D" | "L")[];
};

function buildRows(filter: (t: Team) => boolean): Row[] {
  return TEAMS.filter(filter)
    .sort((a, b) => b.rating - a.rating)
    .map((team, idx) => ({
      id: team.id,
      pos: idx + 1,
      team,
      played: team.recentForm.length * 3,
      rating: team.rating,
      members: `${team.members}/${team.capacity}`,
      openSlots: team.openSlots,
      form: team.recentForm,
    }));
}

const FORM_COLOR: Record<"W" | "D" | "L", string> = {
  W: "bg-emerald-500 text-emerald-950",
  D: "bg-amber-400 text-amber-950",
  L: "bg-rose-500 text-rose-950",
};

const columns: ColumnDef<Row>[] = [
  {
    id: "pos",
    header: "#",
    accessorKey: "pos",
    sortable: true,
    width: "60px",
    cell: (row) => (
      <span className="inline-flex items-center gap-1 font-semibold">
        {row.pos === 1 ? (
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
        ) : row.pos === 2 ? (
          <Minus className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <TrendingDown className="h-3.5 w-3.5 text-rose-500" />
        )}
        {row.pos}
      </span>
    ),
  },
  {
    id: "team",
    header: "Đội",
    sortable: false,
    cell: (row) => (
      <Link
        href={`/teams#${row.team.slug}`}
        className="inline-flex items-center gap-3 hover:text-emerald-400"
      >
        <img
          src={row.team.logo}
          alt=""
          className="h-7 w-7 rounded-md bg-muted"
        />
        <div className="leading-tight">
          <div className="font-medium">{row.team.name}</div>
          <div className="text-muted-foreground text-xs">
            {row.team.city} · {FORMAT_LABEL[row.team.format]}
          </div>
        </div>
      </Link>
    ),
  },
  {
    id: "rating",
    header: "Điểm",
    accessorKey: "rating",
    sortable: true,
    align: "center",
    width: "90px",
    cell: (row) => <span className="font-bold">{row.rating}</span>,
  },
  {
    id: "members",
    header: "Thành viên",
    accessorKey: "members",
    align: "center",
    width: "100px",
  },
  {
    id: "openSlots",
    header: "Suất trống",
    accessorKey: "openSlots",
    sortable: true,
    align: "center",
    width: "80px",
    cell: (row) =>
      row.openSlots > 0 ? (
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 font-semibold text-emerald-400 text-xs">
          {row.openSlots} suất
        </span>
      ) : (
        <span className="text-muted-foreground">Đủ</span>
      ),
  },
  {
    id: "form",
    header: "Phong độ",
    align: "right",
    cell: (row) => (
      <div className="inline-flex items-center justify-end gap-1">
        {row.form.map((f, i) => (
          <span
            key={i}
            className={`grid h-6 w-6 place-items-center rounded-md font-bold text-[10px] ${FORM_COLOR[f]}`}
          >
            {f}
          </span>
        ))}
      </div>
    ),
  },
  {
    id: "go",
    header: "",
    align: "right",
    width: "60px",
    cell: (row) => (
      <Link
        href={`/teams#${row.team.slug}`}
        className="inline-flex items-center justify-end gap-1 text-emerald-400 text-sm hover:text-emerald-300"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </Link>
    ),
  },
];

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <AnimatedTable data={rows} columns={columns} striped />
    </div>
  );
}

export function SiteStandings() {
  return (
    <section id="leaderboard" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-10 flex flex-col items-start gap-3">
        <span className="text-emerald-400 text-sm font-semibold uppercase tracking-[0.2em]">
          Bảng xếp hạng cộng đồng
        </span>
        <h2 className="text-balance font-bold text-4xl tracking-tight md:text-5xl">
          Đội mạnh nhất tuần này
        </h2>
        <p className="max-w-xl text-muted-foreground">
          Xếp hạng dựa trên điểm cộng đồng và phong độ 5 trận gần nhất.
          Bấm vào tên đội để xem hồ sơ, lịch tập, và thành tích.
        </p>
      </div>
      <VercelTabs
        defaultTab="all"
        tabs={[
          { label: "Tất cả", value: "all", content: <Table rows={buildRows(() => true)} /> },
          { label: "Sân 11", value: "11", content: <Table rows={buildRows((t) => t.format === "11-a-side")} /> },
          { label: "Sân 7", value: "7", content: <Table rows={buildRows((t) => t.format === "7-a-side")} /> },
          { label: "Sân 5", value: "5", content: <Table rows={buildRows((t) => t.format === "5-a-side")} /> },
        ]}
      />
    </section>
  );
}
