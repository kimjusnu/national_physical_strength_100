import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { computeFitnessAge } from "@/lib/fitnessAge";
import { parseResultQuery } from "@/lib/schemas";
import { getPrescriptionVideos } from "@/lib/kspoApi";
import { pickWeakItems } from "@/lib/videoMatch";
import { ITEM_LABELS } from "@/data/normTables";
import ResultHeroAge from "@/components/result/ResultHeroAge";
import FitnessRadar from "@/components/result/FitnessRadar";
import ItemBreakdown from "@/components/result/ItemBreakdown";
import PrescriptionVideos from "@/components/result/PrescriptionVideos";
import NearbyCenters from "@/components/result/NearbyCenters";
import ShareCard from "@/components/result/ShareCard";
import { SectionCard } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";

interface ResultPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * 공유 링크 미리보기에 그 사람의 체력나이가 찍히도록 OG 이미지를 결과값으로
 * 지정한다. 이미지는 /api/og가 요청 시점에 렌더한다.
 */
export async function generateMetadata({
  searchParams,
}: ResultPageProps): Promise<Metadata> {
  const params = await searchParams;
  const user = parseResultQuery(params);

  if (!user) {
    return { title: "측정 결과 — 체력나이" };
  }

  const { overallAge } = computeFitnessAge(user);
  const fitnessAge = Math.round(overallAge);
  const gap = user.age - fitnessAge;
  const gapText =
    gap > 0
      ? `실제 나이보다 ${gap}세 젊어요`
      : gap < 0
        ? `실제 나이보다 ${-gap}세 많아요`
        : "실제 나이와 같아요";

  const title = `내 체력나이는 ${fitnessAge}세 — ${gapText}`;
  const description =
    "국민체력100 공공데이터와 비교한 체력나이입니다. 나도 3분 만에 측정해보세요.";

  const query = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      typeof v === "string" ? [[k, v] as [string, string]] : [],
    ),
  ).toString();

  const images = [{ url: `/api/og?${query}`, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const user = parseResultQuery(await searchParams);

  // §14 Empty — 왜 비었는지 설명하고 다음 한 걸음을 준다
  if (!user) {
    return (
      <div className="mx-auto flex max-w-[30rem] flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="text-xl font-bold text-heading">
          측정 정보가 올바르지 않아요
        </p>
        <p className="text-[0.9375rem] leading-relaxed text-caption">
          결과를 계산하려면 측정값이 필요합니다. 측정 페이지에서 다시
          입력해주세요.
        </p>
        <ButtonLink href="/measure" variant="primary" className="mt-2">
          체력나이 측정하러 가기
        </ButtonLink>
      </div>
    );
  }

  // [KSPO 국민체력100 데이터 활용 지점 #4]
  // 사용자 입력을 국민체력100 기준분포와 비교해 체력나이·백분위를 산출한다.
  const result = computeFitnessAge(user);

  // [KSPO 국민체력100 데이터 활용 지점 #8]
  // 백분위 하위 약점 항목에 맞는 운동처방 영상 추천 (동영상 API 15108846)
  const weakItems = pickWeakItems(result.items);
  const videos = await getPrescriptionVideos(weakItems);

  const strengthText =
    result.strengths.length > 0
      ? `${result.strengths.map((k) => ITEM_LABELS[k]).join(", ")} 항목이 또래 평균을 넘습니다.`
      : null;

  const weaknessText =
    result.weaknesses.length > 0
      ? `${result.weaknesses.map((k) => ITEM_LABELS[k]).join(", ")} 항목이 또래 평균보다 낮습니다. 이 부분을 보완하면 체력나이가 내려갑니다.`
      : "모든 항목이 또래 평균 이상입니다. 지금 상태를 유지해보세요.";

  return (
    <div className="mx-auto w-full max-w-[30rem] space-y-5 px-4 py-8">
      <ResultHeroAge
        realAge={user.age}
        overallAge={result.overallAge}
        boundary={result.boundary}
      />

      <SectionCard
        title="항목별 위치"
        description="같은 성별·연령대의 국민체력100 측정자 분포와 비교한 백분위입니다."
        source="출처: 국민체력100 체력인증센터 측정결과 정보 (data.go.kr)"
      >
        <FitnessRadar items={result.items} />
        <div className="mt-5">
          <ItemBreakdown items={result.items} />
        </div>
      </SectionCard>

      <SectionCard title="강점과 보완점">
        {strengthText && (
          <p className="mb-2 text-[0.9375rem] leading-relaxed text-body">
            <span className="font-bold text-brand">강점</span> {strengthText}
          </p>
        )}
        <p className="text-[0.9375rem] leading-relaxed text-body">
          {result.weaknesses.length > 0 && (
            <span className="font-bold text-warn-deep">보완점 </span>
          )}
          {weaknessText}
        </p>
      </SectionCard>

      <PrescriptionVideos videos={videos} weakItems={weakItems} />

      <NearbyCenters />

      <ShareCard result={result} realAge={user.age} />

      <ButtonLink href="/measure" variant="ghost" className="w-full">
        다시 측정하기
        <ArrowRight size={17} strokeWidth={2.25} aria-hidden />
      </ButtonLink>
    </div>
  );
}
