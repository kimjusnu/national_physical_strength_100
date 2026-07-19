"use client";

import { useEffect, useState } from "react";
import { Award, TrendingUp } from "lucide-react";

interface ResultHeroAgeProps {
  realAge: number;
  overallAge: number;
  boundary: "elite" | "needsImprovement" | null;
}

const COUNT_UP_MS = 600;

/**
 * 체력나이 히어로 — DESIGN.md §15 시그니처 모션 1.
 * 실제 나이에서 출발해 체력나이로 카운트한다. 숫자가 올라가는지 내려가는지가
 * 곧 결과의 의미이므로 시작점이 실제 나이여야 한다.
 */
function useCountUp(from: number, to: number): number {
  const [value, setValue] = useState(from);

  useEffect(() => {
    // §15: 모션 축소 선호 시 즉시 값 교체 (duration 0 → 첫 프레임에 최종값)
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduced ? 0 : COUNT_UP_MS;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      // ease-data: 최종값이 차분한 안착점이 되도록 서서히 감속
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to]);

  return value;
}

export default function ResultHeroAge({
  realAge,
  overallAge,
  boundary,
}: ResultHeroAgeProps) {
  const targetAge = Math.round(overallAge);
  const displayed = useCountUp(realAge, targetAge);
  const gap = realAge - targetAge;

  const gapText =
    gap > 0
      ? `실제 나이보다 ${gap}세 젊어요`
      : gap < 0
        ? `실제 나이보다 ${-gap}세 많아요`
        : "실제 나이와 같아요";

  return (
    <section className="rounded-sharp border border-hairline bg-mint px-6 py-10 text-center">
      <p className="text-[0.9375rem] font-medium text-body">
        국민체력100 데이터와 비교한 나의 체력나이
      </p>

      <p className="mt-4 flex items-baseline justify-center text-brand">
        <span className="text-[6rem] font-extrabold leading-none tracking-[-3px]">
          {displayed}
        </span>
        <span className="ml-1 text-3xl font-bold">세</span>
      </p>

      <p className="mt-5 text-[1.375rem] font-bold text-heading">{gapText}</p>
      <p className="mt-1 text-[0.8125rem] text-caption">
        실제 나이 {realAge}세 기준
      </p>

      {boundary && (
        <p
          className={`mt-4 inline-flex items-center gap-1.5 rounded-sharp border px-3.5 py-2 text-[0.9375rem] font-bold ${
            boundary === "elite"
              ? "border-brand bg-white text-brand"
              : "border-warn bg-white text-warn-deep"
          }`}
        >
          {boundary === "elite" ? (
            <Award size={17} strokeWidth={2.25} aria-hidden />
          ) : (
            <TrendingUp size={17} strokeWidth={2.25} aria-hidden />
          )}
          {boundary === "elite" ? "상위 1% 체력" : "체력 개선이 필요해요"}
        </p>
      )}
    </section>
  );
}
