"use client";

import { useState } from "react";
import NumberField from "@/components/measure/NumberField";
import MeasureGuideModal from "@/components/measure/MeasureGuideModal";
import { fitnessInputsSchema } from "@/lib/schemas";
import { ITEM_LABELS, ITEM_UNITS } from "@/data/normTables";
import type { FitnessInputs, FitnessItemKey } from "@/lib/types";
import { toFieldErrors, withEmptyAsUndefined } from "@/lib/formUtils";

interface StepFitnessInputsProps {
  onBack: () => void;
  onSubmit: (items: FitnessInputs) => void;
}

const FIELD_ORDER: Array<{
  key: FitnessItemKey;
  placeholder: string;
  optional?: boolean;
}> = [
  { key: "grip", placeholder: "예: 38.5" },
  { key: "situp", placeholder: "예: 30" },
  { key: "jump", placeholder: "예: 190" },
  { key: "bodyfat", placeholder: "예: 21.5" },
  { key: "shuttle", placeholder: "예: 25", optional: true },
];

export default function StepFitnessInputs({
  onBack,
  onSubmit,
}: StepFitnessInputsProps) {
  const [values, setValues] = useState<Record<FitnessItemKey, string>>({
    grip: "",
    situp: "",
    jump: "",
    bodyfat: "",
    shuttle: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [guideItem, setGuideItem] = useState<FitnessItemKey | null>(null);

  const handleSubmit = () => {
    const parsed = fitnessInputsSchema.safeParse(withEmptyAsUndefined(values));
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    onSubmit(parsed.data);
  };

  return (
    <div className="space-y-5">
      {FIELD_ORDER.map(({ key, placeholder, optional }) => (
        <NumberField
          key={key}
          id={key}
          label={ITEM_LABELS[key]}
          unit={ITEM_UNITS[key]}
          value={values[key]}
          placeholder={placeholder}
          error={errors[key]}
          optional={optional}
          onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
          onGuide={() => setGuideItem(key)}
        />
      ))}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 py-4 font-semibold hover:border-emerald-400 transition-colors"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-[2] rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white hover:bg-emerald-700 transition-colors"
        >
          내 체력나이 확인하기
        </button>
      </div>

      <MeasureGuideModal itemKey={guideItem} onClose={() => setGuideItem(null)} />
    </div>
  );
}
