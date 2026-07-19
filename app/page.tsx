import { BarChart3, ClipboardCheck, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

/** DESIGN.md §10: 섹션 헤드라인은 후킹이 아니라 사실 진술 */
const FEATURES = [
  {
    Icon: BarChart3,
    title: "국민체력100 데이터와 직접 비교",
    description:
      "전국 체력인증센터에서 쌓인 공공데이터의 성별·연령대 분포에 내 기록을 대입해 백분위를 냅니다.",
  },
  {
    Icon: ClipboardCheck,
    title: "약점 항목에 맞는 운동 처방",
    description:
      "가장 낮게 나온 항목을 짚고, 그 항목을 개선하는 국민체력100 운동 영상을 이유와 함께 보여줍니다.",
  },
  {
    Icon: MapPin,
    title: "가까운 체력인증센터 안내",
    description:
      "간이 측정은 정식 인증을 대신하지 않습니다. 무료로 정확히 측정받을 수 있는 지역 센터를 안내합니다.",
  },
];

const STEPS = [
  "성별·나이·키·몸무게를 입력합니다",
  "악력·윗몸말아올리기·제자리멀리뛰기·체지방률을 입력합니다",
  "체력나이와 항목별 백분위를 확인합니다",
];

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[30rem] px-4 py-10">
      <section className="mb-12">
        <span className="inline-block rounded-chip bg-mint px-3 py-1.5 text-[0.8125rem] font-medium text-brand">
          국민체육진흥공단 국민체력100 공공데이터 활용
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-[1.2] tracking-[-1px] text-heading">
          내 체력은 또래 중에
          <br />
          어디쯤일까요?
        </h1>

        <p className="mt-4 text-[1.0625rem] leading-relaxed text-body">
          집에서 잰 네 가지 값을 국민체력100 측정 데이터와 비교해, 내 체력이
          평균이 되는 나이 — <strong className="font-bold text-heading">체력나이</strong>를
          알려드립니다.
        </p>

        <ButtonLink href="/measure" variant="primaryLarge" className="mt-7 w-full">
          내 체력나이 측정하기
        </ButtonLink>

        <p className="mt-3 text-center text-[0.8125rem] text-caption">
          약 3분 소요 · 회원가입 없음 · 입력값은 서버에 저장되지 않습니다
        </p>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-bold text-heading">측정 순서</h2>
        <ol className="border-t border-hairline">
          {STEPS.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-3 border-b border-hairline py-3.5"
            >
              <span className="flex size-6 flex-none items-center justify-center rounded-sharp bg-mint text-[0.8125rem] font-bold text-brand">
                {i + 1}
              </span>
              <span className="text-[0.9375rem] text-body">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-heading">
          이 서비스가 하는 일
        </h2>
        <div className="space-y-3">
          {FEATURES.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="rounded-sharp border border-hairline bg-white p-5 shadow-[0_2px_5px_rgba(0,0,0,0.12)]"
            >
              <Icon
                size={22}
                strokeWidth={1.75}
                className="text-brand"
                aria-hidden
              />
              <h3 className="mt-3 text-[1.0625rem] font-bold text-heading">
                {title}
              </h3>
              <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-caption">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <p className="mt-8 text-[0.8125rem] leading-relaxed text-caption">
        본 서비스의 체력 기준분포는 국민체육진흥공단 국민체력100 체력인증센터
        측정결과 공공데이터를 활용합니다. 간이 측정 결과이며 정식 체력인증을
        대체하지 않습니다.
      </p>
    </div>
  );
}
