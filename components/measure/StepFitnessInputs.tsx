"use client";

import { useState } from "react";
import NumberField from "@/components/measure/NumberField";
import MeasureGuideModal from "@/components/measure/MeasureGuideModal";
import { Button } from "@/components/ui/Button";
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
  // 플레이스홀더는 "예:"를 붙인다 — 우측 정렬 숫자만 두면 입력된 값으로 오인된다
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
          measure
          onChange={(v) => setValues((prev) => ({ ...prev, [key]: v }))}
          onGuide={() => setGuideItem(key)}
        />
      ))}

      <div className="flex gap-2 pt-1">
        <Button variant="neutral" onClick={onBack} className="flex-1">
          이전
        </Button>
        <Button
          variant="primaryLarge"
          onClick={handleSubmit}
          className="flex-[2]"
        >
          결과 보기
        </Button>
      </div>

      <MeasureGuideModal itemKey={guideItem} onClose={() => setGuideItem(null)} />
    </div>
  );
}
