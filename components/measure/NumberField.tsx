"use client";

import { HelpCircle } from "lucide-react";

interface NumberFieldProps {
  id: string;
  label: string;
  unit: string;
  value: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
  /** 측정값 입력(§4 Measure Input) — 크고 우측 정렬, 헤딩처럼 취급 */
  measure?: boolean;
  onChange: (value: string) => void;
  onGuide?: () => void;
}

export default function NumberField({
  id,
  label,
  unit,
  value,
  placeholder,
  error,
  optional,
  measure = false,
  onChange,
  onGuide,
}: NumberFieldProps) {
  const inputClass = measure
    ? "h-15 border-2 border-surface-neutral pr-16 text-right text-[1.375rem] font-bold text-heading"
    : "h-14 border border-hairline pr-14 text-[1.0625rem] font-medium text-body";

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-[0.9375rem] font-bold text-heading">
          {label}
          {optional && (
            <span className="ml-1.5 font-medium text-caption">(선택)</span>
          )}
        </label>
        {onGuide && (
          <button
            type="button"
            onClick={onGuide}
            className="inline-flex items-center gap-1 text-[0.8125rem] font-bold text-brand hover:text-brand-hover"
          >
            <HelpCircle size={14} strokeWidth={2.25} aria-hidden />
            측정 방법
          </button>
        )}
      </div>

      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-sharp bg-white px-4 placeholder:font-medium placeholder:text-placeholder focus:border-brand-hover focus:bg-mint focus:outline-none ${inputClass} ${
            error ? "border-danger" : ""
          }`}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[0.9375rem] font-medium text-caption">
          {unit}
        </span>
      </div>

      {error && (
        <p
          id={`${id}-error`}
          className="mt-1.5 text-[0.8125rem] font-medium text-danger"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
