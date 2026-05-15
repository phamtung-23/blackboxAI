'use client'
import React from 'react';

const shimmerCss = `
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes shimmer-spin {
    to {
      --angle: 360deg;
    }
  }
`;

type ShimmerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

export default function ShimmerButton({
  className = '',
  children = 'Shimmer Button',
  ...props
}: ShimmerButtonProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: shimmerCss }} />
      <button
        {...props}
        className={`relative inline-flex items-center justify-center p-[1.5px] bg-border rounded-full overflow-hidden group ${className}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'conic-gradient(from var(--angle), transparent 25%, var(--color-emerald-500), transparent 50%)',
            animation: 'shimmer-spin 2.5s linear infinite',
          }}
        />
        <span className="relative z-10 inline-flex items-center justify-center w-full h-full px-8 py-3 text-foreground bg-card rounded-full group-hover:bg-accent transition-colors duration-300">
          {children}
        </span>
      </button>
    </>
  );
}
