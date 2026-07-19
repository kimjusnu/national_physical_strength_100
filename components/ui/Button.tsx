import type { ComponentProps } from "react";
import Link from "next/link";

/** DESIGN.md §4 Buttons — 모든 CTA는 700, radius 2px, hover는 밝아진다 */

type Variant = "primary" | "primaryLarge" | "ghost" | "neutral";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand text-white h-12 px-6 text-[1.0625rem] hover:bg-brand-hover disabled:bg-hairline disabled:text-disabled",
  primaryLarge:
    "bg-brand text-white h-15 px-8 text-lg tracking-[-0.5px] hover:bg-brand-hover disabled:bg-hairline disabled:text-disabled",
  ghost:
    "bg-white text-brand border border-brand h-12 px-6 text-[1.0625rem] hover:bg-mint",
  neutral:
    "bg-surface-neutral text-body h-12 px-6 text-[1.0625rem] hover:bg-hairline",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sharp font-bold transition-colors duration-150 disabled:cursor-not-allowed active:shadow-[inset_0_1px_1px_rgba(0,0,0,0.12)]";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`${BASE} ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={`${BASE} ${VARIANTS[variant]} ${className}`} {...props} />
  );
}
