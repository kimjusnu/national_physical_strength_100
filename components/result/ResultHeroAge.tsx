interface ResultHeroAgeProps {
  realAge: number;
  overallAge: number;
}

/** 체력나이 히어로 — 실제나이 대비 젊으면 초록, 많으면 주황으로 피드백 */
export default function ResultHeroAge({ realAge, overallAge }: ResultHeroAgeProps) {
  const displayAge = Math.round(overallAge);
  const gap = realAge - displayAge;

  const gapBadge =
    gap > 0
      ? {
          text: `실제 나이보다 ${gap}세 젊어요!`,
          className:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
        }
      : gap < 0
        ? {
            text: `실제 나이보다 ${-gap}세 많아요`,
            className:
              "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
          }
        : {
            text: "실제 나이와 같아요",
            className:
              "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
          };

  return (
    <section className="rounded-3xl bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950 dark:to-background border border-emerald-100 dark:border-emerald-900 px-6 py-10 text-center">
      <p className="text-sm text-neutral-500 mb-2">
        국민체력100 데이터와 비교한 당신의 체력나이는
      </p>
      <p className="mb-3">
        <span className="text-7xl font-black text-emerald-600 dark:text-emerald-400">
          {displayAge}
        </span>
        <span className="ml-1 text-3xl font-bold text-emerald-600 dark:text-emerald-400">
          세
        </span>
      </p>
      <span
        className={`inline-block rounded-full px-4 py-1.5 text-sm font-semibold ${gapBadge.className}`}
      >
        {gapBadge.text}
      </span>
      <p className="mt-3 text-xs text-neutral-400">실제 나이 {realAge}세 기준</p>
    </section>
  );
}
