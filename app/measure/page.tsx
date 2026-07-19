"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepBasicInfo from "@/components/measure/StepBasicInfo";
import StepFitnessInputs from "@/components/measure/StepFitnessInputs";
import { toResultQuery } from "@/lib/schemas";
import type { BasicInfo, FitnessInputs } from "@/lib/types";

const STEPS = ["기본 정보", "체력 측정값"] as const;

export default function MeasurePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [basic, setBasic] = useState<BasicInfo | null>(null);

  const handleBasicNext = (info: BasicInfo) => {
    setBasic(info);
    setStep(1);
  };

  const handleSubmit = (items: FitnessInputs) => {
    if (!basic) return;
    router.push(`/result?${toResultQuery(basic, items)}`);
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <div className="mb-6">
        <div className="mb-2 flex justify-between text-sm">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={
                i === step
                  ? "font-bold text-emerald-600 dark:text-emerald-400"
                  : "text-neutral-400"
              }
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div
          className="h-2 rounded-full bg-neutral-200 dark:bg-neutral-800"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          <div
            className="h-2 rounded-full bg-emerald-500 transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="mb-6 text-2xl font-bold">
        {step === 0 ? "기본 정보를 알려주세요" : "체력 측정값을 입력해주세요"}
      </h1>

      {step === 0 ? (
        <StepBasicInfo onNext={handleBasicNext} />
      ) : (
        <StepFitnessInputs onBack={() => setStep(0)} onSubmit={handleSubmit} />
      )}

      {step === 1 && (
        <p className="mt-4 text-xs leading-relaxed text-neutral-500">
          각 항목의 &ldquo;측정 방법&rdquo;을 눌러 자가측정 안내를 확인하세요.
          입력값은 국민체력100 공공데이터 분포와 비교하는 데만 사용되며 서버에
          저장되지 않습니다.
        </p>
      )}
    </div>
  );
}
