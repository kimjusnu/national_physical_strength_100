import Link from "next/link";
import { computeFitnessAge } from "@/lib/fitnessAge";
import { parseResultQuery } from "@/lib/schemas";
import { getPrescriptionVideos } from "@/lib/kspoApi";
import { pickWeakItems } from "@/lib/videoMatch";
import { ITEM_LABELS } from "@/data/normTables";
import ResultHeroAge from "@/components/result/ResultHeroAge";
import FitnessRadar from "@/components/result/FitnessRadar";
import ItemBreakdown from "@/components/result/ItemBreakdown";
import PrescriptionVideos from "@/components/result/PrescriptionVideos";

interface ResultPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const user = parseResultQuery(await searchParams);

  if (!user) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <p className="text-lg font-semibold">측정 정보가 올바르지 않아요</p>
        <p className="text-sm text-neutral-500">
          측정 페이지에서 다시 입력해주세요.
        </p>
        <Link
          href="/measure"
          className="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700 transition-colors"
        >
          체력나이 측정하러 가기
        </Link>
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

  const summaryText =
    result.weaknesses.length > 0
      ? `${result.weaknesses.map((k) => ITEM_LABELS[k]).join(", ")} 항목이 또래 평균보다 아쉬워요. 이 부분을 보완하면 체력나이를 더 낮출 수 있어요.`
      : "모든 항목이 또래 평균 이상이에요. 지금 체력을 꾸준히 유지해보세요!";

  return (
    <div className="mx-auto w-full max-w-md space-y-6 px-4 py-8">
      <ResultHeroAge
        realAge={user.age}
        overallAge={result.overallAge}
        boundary={result.boundary}
      />

      <section className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5">
        <h2 className="mb-2 text-lg font-bold">항목별 위치</h2>
        <p className="mb-2 text-xs text-neutral-500">
          같은 성별·연령대의 국민체력100 측정자 분포와 비교한 백분위입니다.
        </p>
        <FitnessRadar items={result.items} />
        <ItemBreakdown items={result.items} />
      </section>

      <section className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5">
        <h2 className="mb-3 text-lg font-bold">강점과 보완점</h2>
        {result.strengths.length > 0 && (
          <p className="mb-2 text-sm leading-relaxed">
            💪 <strong>강점:</strong>{" "}
            {result.strengths.map((k) => ITEM_LABELS[k]).join(", ")}
          </p>
        )}
        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {summaryText}
        </p>
      </section>

      <PrescriptionVideos videos={videos} weakItems={weakItems} />

      <div className="flex flex-col gap-3">
        <Link
          href="/measure"
          className="rounded-xl border border-emerald-600 py-4 text-center font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
        >
          다시 측정하기
        </Link>
        <p className="text-center text-xs text-neutral-400">
          가까운 체력인증센터 안내와 결과 카드 공유가 곧 추가됩니다.
        </p>
      </div>
    </div>
  );
}
