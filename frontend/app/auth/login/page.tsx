"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    router.push("/");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="-translate-x-1/2 pointer-events-none absolute top-0 left-1/2 h-[480px] w-[820px] rounded-full bg-emerald-500/15 blur-3xl" />
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[640px] rounded-full bg-emerald-500/10 blur-3xl" />

      <Link
        href="/"
        className="absolute top-6 left-6 z-20 inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/60 px-3 py-1.5 text-sm backdrop-blur hover:border-emerald-500/40"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Trang chủ
      </Link>

      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <img
              src="/removebg-preview.png"
              alt="PitchPro"
              className="h-16 w-16 object-contain drop-shadow-[0_8px_24px_rgba(150,195,60,0.35)]"
            />
            <h1 className="font-bold text-3xl tracking-tight">Chào mừng trở lại</h1>
            <p className="text-muted-foreground text-sm">
              Đăng nhập để khám phá đội bóng & cầu thủ.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-2xl shadow-black/20 backdrop-blur"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="font-medium text-sm">
                  Email
                </label>
                <div className="relative">
                  <Mail className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="font-medium text-sm">
                    Mật khẩu
                  </label>
                  <Link
                    href="#"
                    className="text-emerald-400 text-xs hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-9"
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    tabIndex={-1}
                    className="-translate-y-1/2 absolute top-1/2 right-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground text-sm">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-emerald-500"
                />
                Ghi nhớ đăng nhập
              </label>

              {error && (
                <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-destructive text-sm">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 font-semibold text-emerald-950 shadow-lg shadow-emerald-500/20 transition-colors",
                  "hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-70",
                )}
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Chưa có tài khoản?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-emerald-400 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
