"use client";

interface NumberFieldProps {
  id: string;
  label: string;
  unit: string;
  value: string;
  placeholder?: string;
  error?: string;
  optional?: boolean;
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
  onChange,
  onGuide,
}: NumberFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {optional && (
            <span className="ml-1 text-xs text-neutral-400">(선택)</span>
          )}
        </label>
        {onGuide && (
          <button
            type="button"
            onClick={onGuide}
            className="text-xs text-emerald-600 dark:text-emerald-400 underline underline-offset-2"
          >
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
          className="w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent px-4 py-3 pr-14 text-base focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-400">
          {unit}
        </span>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
