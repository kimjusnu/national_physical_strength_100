import Link from "next/link";

const FEATURES = [
  {
    icon: "📊",
    title: "국민체력100 데이터 기반",
    description:
      "전국 체력인증센터에서 수집된 KSPO 공공데이터 분포와 내 기록을 비교합니다.",
  },
  {
    icon: "🎂",
    title: "내 몸의 진짜 나이",
    description:
      "악력·근지구력·순발력·체지방률로 \"내 성적이 평균이 되는 나이\"를 역산합니다.",
  },
  {
    icon: "🏃",
    title: "강점·보완점 한눈에",
    description:
      "항목별 백분위 차트로 또래 대비 위치를 확인하고 보완점을 찾아보세요.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <section className="mb-10 text-center">
        <p className="mb-3 inline-block rounded-full bg-emerald-100 dark:bg-emerald-900 px-4 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          KSPO 국민체력100 공공데이터 활용 서비스
        </p>
        <h1 className="mb-4 text-4xl font-black leading-tight">
          당신의{" "}
          <span className="text-emerald-600 dark:text-emerald-400">체력나이</span>
          는<br />몇 세인가요?
        </h1>
        <p className="mb-8 text-neutral-500 leading-relaxed">
          간단한 자가측정 4가지로
          <br />
          국민체력100 데이터와 비교한 내 몸의 나이를 알아보세요.
        </p>
        <Link
          href="/measure"
          className="inline-block w-full rounded-2xl bg-emerald-600 py-5 text-xl font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-colors"
        >
          내 체력나이 측정하기
        </Link>
        <p className="mt-3 text-xs text-neutral-400">
          약 3분 소요 · 회원가입 없음 · 입력값은 저장되지 않아요
        </p>
      </section>

      <section className="space-y-4">
        {FEATURES.map((feature) => (
          <div
            key={feature.title}
            className="flex gap-4 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4"
          >
            <span className="text-3xl" aria-hidden>
              {feature.icon}
            </span>
            <div>
              <h2 className="font-bold">{feature.title}</h2>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <p className="mt-8 text-center text-xs leading-relaxed text-neutral-400">
        본 서비스의 체력 기준분포는 국민체육진흥공단 국민체력100
        체력인증센터 측정결과 공공데이터(공공데이터포털 data.go.kr)를
        활용합니다.
      </p>
    </div>
  );
}
