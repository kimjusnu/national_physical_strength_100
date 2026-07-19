"use client";

import { useState } from "react";
import NumberField from "@/components/measure/NumberField";
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

  const genderButton = (value: Gender, label: string) => (
    <button
      type="button"
      onClick={() => setGender(value)}
      aria-pressed={gender === value}
      className={`flex-1 rounded-xl border py-3 font-semibold transition-colors ${
        gender === value
          ? "border-emerald-600 bg-emerald-600 text-white"
          : "border-neutral-300 dark:border-neutral-700 hover:border-emerald-400"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="space-y-5">
      <div>
        <span className="mb-1 block text-sm font-medium">성별</span>
        <div className="flex gap-3">
          {genderButton("M", "남성")}
          {genderButton("F", "여성")}
        </div>
        {errors.gender && (
          <p className="mt-1 text-xs text-red-500" role="alert">
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

      <button
        type="button"
        onClick={handleNext}
        className="w-full rounded-xl bg-emerald-600 py-4 text-lg font-bold text-white hover:bg-emerald-700 transition-colors"
      >
        다음
      </button>
    </div>
  );
}
