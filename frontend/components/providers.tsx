"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { AnimatedToastProvider } from "@/components/ui/animated-toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AnimatedToastProvider>{children}</AnimatedToastProvider>
    </ThemeProvider>
  );
}
