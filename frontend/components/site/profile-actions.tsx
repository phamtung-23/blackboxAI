"use client";

import { MessageSquare, UserPlus, Share2 } from "lucide-react";
import { useAnimatedToast } from "@/components/ui/animated-toast";
import type { Player } from "@/lib/types";

export function ProfileActions({ player }: { player: Player }) {
  const { addToast } = useAnimatedToast();

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() =>
          addToast({
            type: "success",
            title: `Đã mời ${player.name}`,
            message: "Chờ cầu thủ phản hồi yêu cầu của bạn.",
          })
        }
        className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 font-semibold text-emerald-950 text-sm hover:bg-emerald-400"
      >
        <UserPlus className="h-4 w-4" />
        Mời gia nhập đội
      </button>
      <button
        type="button"
        onClick={() =>
          addToast({
            type: "info",
            message: `Đã mở chat với ${player.name}.`,
          })
        }
        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:border-emerald-500/40"
      >
        <MessageSquare className="h-4 w-4" />
        Nhắn tin
      </button>
      <button
        type="button"
        onClick={() =>
          addToast({
            type: "info",
            message: "Đã sao chép liên kết hồ sơ.",
          })
        }
        className="inline-flex items-center gap-2 rounded-full border border-border/60 px-5 py-2.5 text-sm hover:border-emerald-500/40"
      >
        <Share2 className="h-4 w-4" />
        Chia sẻ
      </button>
    </div>
  );
}
