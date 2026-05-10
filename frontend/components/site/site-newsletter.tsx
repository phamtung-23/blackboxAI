"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";
import { useAnimatedToast } from "@/components/ui/animated-toast";
import SegmentedButton from "@/components/ui/segmented-button";
import { HighlightText } from "@/components/ui/highlight-text";

export function SiteNewsletter() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("player");
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useAnimatedToast();

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <div className="overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/60 via-background to-background p-10 md:p-16">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Sẵn sàng khoác{" "}
            <HighlightText variant="circle" color="primary">
              áo đấu
            </HighlightText>
            ?
          </h2>
          <p className="max-w-xl text-muted-foreground">
            Đăng ký danh sách chờ — chúng tôi sẽ gửi đường dẫn kích hoạt trong
            vòng 24 giờ và mời bạn vào nhóm đầu tiên trong thành phố.
          </p>

          <SegmentedButton
            buttons={[
              { id: "player", label: "Tôi là cầu thủ" },
              { id: "captain", label: "Tôi quản lý đội" },
              { id: "both", label: "Cả hai" },
            ]}
            defaultActive={role}
            onChange={setRole}
          />

          <form
            className="mt-2 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@")) {
                addToast({
                  type: "error",
                  message: "Email không hợp lệ.",
                });
                return;
              }
              setSubscribed(true);
              addToast({
                type: "success",
                title: "Đã đăng ký",
                message: `Đã thêm ${email} vào danh sách chờ (${role}).`,
              });
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email-cua-ban@gmail.com"
              className="h-11 flex-1 rounded-md border border-border bg-background px-4 text-sm outline-none focus:border-emerald-500"
              required
            />
            <LiquidMetalButton
              label={subscribed ? "Đã trong danh sách" : "Đăng ký chờ"}
              onClick={() => {
                /* form handles it */
              }}
            />
          </form>
          {subscribed && (
            <p className="inline-flex items-center gap-2 text-emerald-400 text-sm">
              <Check className="h-4 w-4" /> Hẹn gặp bạn trên sân!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
