"use client";

import { useState } from "react";
import NumberField from "@/components/measure/NumberField";
import { Button } from "@/components/ui/Button";
import { basicInfoSchema } from "@/lib/schemas";
import type { BasicInfo, Gender } from "@/lib/types";
import { toFieldErrors, withEmptyAsUndefined } from "@/lib/formUtils";

interface StepBasicInfoProps {
  onNext: (basic: BasicInfo) => void;
}

export default function StepBasicInfo({ onNext }: StepBasicInfoProps) {
  const [gender, setGender] = useState<Gender | "">("");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const parsed = basicInfoSchema.safeParse(
      withEmptyAsUndefined({ gender, age, heightCm, weightKg }),
    );
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    onNext(parsed.data);
  };

  /** §4 Segmented Choice — 2지선다는 드롭다운보다 탭 한 번이 낫다 */
  const genderButton = (value: Gender, label: string) => {
    const selected = gender === value;
    return (
      <button
        type="button"
        onClick={() => setGender(value)}
        aria-pressed={selected}
        className={`h-14 flex-1 rounded-sharp text-[1.0625rem] font-bold transition-colors ${
          selected
            ? "bg-brand text-white"
            : "border border-hairline bg-white text-body hover:border-brand"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <span className="mb-1.5 block text-[0.9375rem] font-bold text-heading">
          성별
        </span>
        <div className="flex gap-2">
          {genderButton("M", "남성")}
          {genderButton("F", "여성")}
        </div>
        {errors.gender && (
          <p className="mt-1.5 text-[0.8125rem] font-medium text-danger" role="alert">
            {errors.gender}
          </p>
        )}
      </div>

      <NumberField
        id="age"
        label="나이"
        unit="세"
        value={age}
        placeholder="예: 35"
        error={errors.age}
        onChange={setAge}
      />
      <NumberField
        id="heightCm"
        label="키"
        unit="cm"
        value={heightCm}
        placeholder="예: 172"
        error={errors.heightCm}
        onChange={setHeightCm}
      />
      <NumberField
        id="weightKg"
        label="몸무게"
        unit="kg"
        value={weightKg}
        placeholder="예: 68"
        error={errors.weightKg}
        onChange={setWeightKg}
      />

      <Button variant="primaryLarge" onClick={handleNext} className="w-full">
        다음
      </Button>
    </div>
  );
}
