"use client";

import { ArrowRight } from "lucide-react";
import { useAnimatedToast } from "@/components/ui/animated-toast";

export function TeamJoinButton({
  teamName,
  openSlots,
  disabled,
}: {
  teamName: string;
  openSlots: number;
  disabled?: boolean;
}) {
  const { addToast } = useAnimatedToast();
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() =>
        addToast({
          type: "success",
          title: `Đã gửi đến ${teamName}`,
          message: "Đơn xin gia nhập đã được gửi · đội trưởng sẽ phản hồi sớm.",
        })
      }
      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-emerald-950 text-sm shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {disabled ? "Đã đủ thành viên" : `Xin gia nhập · ${openSlots} suất`}
      {!disabled && <ArrowRight className="h-4 w-4" />}
    </button>
  );
}
