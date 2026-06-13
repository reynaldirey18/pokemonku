"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { LoaderCircle } from "lucide-react";

type ButtonProps = {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const sizeClass = {
  sm: "text-xs px-3 py-1.5",
  md: "text-sm px-5 py-2",
  lg: "text-base px-7 py-3",
};

const variantClass = {
  primary: "",
  ghost: "opacity-70 border-white/10",
  danger: "border-red-400/40 text-red-300",
};

export default function Button({
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  className,
  children,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={cn(
        "glass-button inline-flex items-center justify-center gap-2 rounded-full font-medium",
        sizeClass[size],
        variantClass[variant],
        (disabled || isLoading) && "pointer-events-none opacity-50",
        className,
      )}
    >
      {isLoading && <LoaderCircle className="animate-spin" size={16} />}
      {children}
    </motion.button>
  );
}
