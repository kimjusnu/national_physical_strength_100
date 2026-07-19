"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StepBasicInfo from "@/components/measure/StepBasicInfo";
import StepFitnessInputs from "@/components/measure/StepFitnessInputs";
import { toResultQuery } from "@/lib/schemas";
import type { BasicInfo, FitnessInputs } from "@/lib/types";

const STEPS = [
  { label: "기본 정보", title: "기본 정보를 알려주세요" },
  { label: "체력 측정값", title: "측정한 값을 입력해주세요" },
] as const;

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
    <div className="mx-auto w-full max-w-[30rem] px-4 py-8">
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between text-[0.8125rem] font-bold">
          {STEPS.map((s, i) => (
            <span key={s.label} className={i === step ? "text-brand" : "text-placeholder"}>
              {i + 1}. {s.label}
            </span>
          ))}
        </div>
        <div
          className="h-1.5 overflow-hidden rounded-sharp bg-surface-neutral"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
        >
          <div
            className="h-full bg-brand transition-[width] duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="mb-6 text-2xl font-bold tracking-[-0.5px] text-heading">
        {STEPS[step].title}
      </h1>

      {step === 0 ? (
        <StepBasicInfo onNext={handleBasicNext} />
      ) : (
        <StepFitnessInputs onBack={() => setStep(0)} onSubmit={handleSubmit} />
      )}

      {step === 1 && (
        <p className="mt-5 text-[0.8125rem] leading-relaxed text-caption">
          각 항목의 &lsquo;측정 방법&rsquo;을 눌러 자가측정 절차를 확인하세요.
          입력값은 국민체력100 분포와 비교하는 데만 쓰이며 서버에 저장되지 않습니다.
        </p>
      )}
    </div>
  );
}
