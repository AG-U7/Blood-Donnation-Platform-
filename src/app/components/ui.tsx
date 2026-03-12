import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger", size?: "sm" | "md" | "lg" }
>(({ className, variant = "primary", size = "md", ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[#CC0000] text-white hover:bg-[#990000] focus-visible:ring-[#CC0000]",
    secondary: "bg-white border border-[#CC0000] text-[#CC0000] hover:bg-[#F9F9F9]",
    ghost: "bg-transparent text-[#444444] hover:bg-[#F9F9F9]",
    danger: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
  };
  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-12 px-6 text-[14px]",
    lg: "h-14 px-8 text-base",
  };
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      {...props}
    />
  );
});
Button.displayName = "Button";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(({ className, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-lg border border-[#E0E0E0] bg-white px-3 py-2 text-sm text-[#111111]",
          "placeholder:text-[#888888] focus:outline-none focus:border-[#CC0000] focus:ring-4 focus:ring-[#CC0000]/15",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#F5F5F5]",
          error && "border-[#FF0000] focus:border-[#FF0000] focus:ring-[#FF0000]/15",
          className
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
        {...props}
      />
      {error && <span className="text-[#FF0000] text-xs mt-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{error}</span>}
    </div>
  );
});
Input.displayName = "Input";

export const Badge = ({ children, variant = "default", className }: { children: React.ReactNode, variant?: "critical" | "moderate" | "low" | "active" | "inactive" | "pending" | "default" | "success" | "warning", className?: string }) => {
  const variants = {
    critical: "bg-[#CC0000] text-white",
    moderate: "bg-[#D4720B] text-white",
    low: "bg-[#1A7A3F] text-white",
    active: "bg-[#E8F5EE] text-[#1A7A3F]",
    inactive: "bg-[#F5F5F5] text-[#888888]",
    pending: "bg-[#FFF4E5] text-[#D4720B]",
    success: "bg-[#E8F5E9] text-[#1A7A3F]",
    warning: "bg-[#FFF4E5] text-[#D4720B]",
    default: "bg-[#E0E0E0] text-[#444444]"
  };
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variants[variant], className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </span>
  );
};

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white rounded-xl border border-[#E0E0E0] p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]", className)}>
    {children}
  </div>
);

export const Typography = {
  H1: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h1 className={cn("text-[32px] md:text-[48px] text-[#111111] leading-tight font-semibold", className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </h1>
  ),
  H2: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h2 className={cn("text-[20px] md:text-[28px] text-[#111111] leading-tight font-semibold", className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </h2>
  ),
  H3: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h3 className={cn("text-[16px] md:text-[20px] text-[#111111] leading-tight font-semibold", className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </h3>
  ),
  Body: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <p className={cn("text-[14px] md:text-[16px] text-[#444444]", className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </p>
  ),
  Small: ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <span className={cn("text-[12px] md:text-[13px] text-[#888888] font-medium", className)} style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {children}
    </span>
  ),
};