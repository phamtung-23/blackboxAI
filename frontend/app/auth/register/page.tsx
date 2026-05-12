"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function getPasswordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const STRENGTH_LABEL = ["Quá yếu", "Yếu", "Khá", "Tốt", "Mạnh"];
const STRENGTH_COLOR = [
  "bg-rose-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-emerald-500",
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password.length < 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (!agree) {
      setError("Bạn cần đồng ý với điều khoản sử dụng.");
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
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
            <h1 className="font-bold text-3xl tracking-tight">
              Tạo tài khoản
            </h1>
            <p className="text-muted-foreground text-sm">
              Gia nhập PitchPro, tạo hồ sơ và tìm đội bóng phù hợp.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-border/60 bg-card/60 p-6 shadow-2xl shadow-black/20 backdrop-blur"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="name" className="font-medium text-sm">
                  Họ và tên
                </label>
                <div className="relative">
                  <User className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-9"
                    disabled={loading}
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="password" className="font-medium text-sm">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Ít nhất 8 ký tự"
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
                {password && (
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex h-1.5 flex-1 gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-full flex-1 rounded-full transition-colors",
                            i < strength
                              ? STRENGTH_COLOR[strength]
                              : "bg-border",
                          )}
                        />
                      ))}
                    </div>
                    <span className="w-12 text-right text-muted-foreground text-xs">
                      {STRENGTH_LABEL[strength]}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="font-medium text-sm">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <Lock className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Nhập lại mật khẩu"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="px-9"
                    disabled={loading}
                    required
                  />
                  {confirm && confirm === password && (
                    <Check className="-translate-y-1/2 absolute top-1/2 right-3 h-4 w-4 text-emerald-400" />
                  )}
                </div>
              </div>

              <label className="flex cursor-pointer items-start gap-2 text-muted-foreground text-sm">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-emerald-500"
                />
                <span>
                  Tôi đồng ý với{" "}
                  <Link
                    href="#"
                    className="text-emerald-400 hover:underline"
                  >
                    điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="#"
                    className="text-emerald-400 hover:underline"
                  >
                    chính sách bảo mật
                  </Link>
                  .
                </span>
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
                {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-muted-foreground text-sm">
            Đã có tài khoản?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-emerald-400 hover:underline"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
