import type { KspoVideoRecord } from "@/data/mockVideos";
import type { FitnessItemKey, ItemResult } from "@/lib/types";

/**
 * [KSPO 국민체력100 데이터 활용 지점 #6 — 약점 항목→운동처방 영상 매핑]
 *
 * 결과의 항목별 백분위에서 약점 1~2개를 뽑아, 동영상 API(15108846)의
 * 체력요인 카테고리와 매칭해 맞춤 운동처방 영상을 추천한다.
 */

export const RECOMMEND_MIN = 3;
export const RECOMMEND_MAX = 5;
const WEAK_ITEM_COUNT = 2;

/** 측정 항목 → 동영상 API 체력요인 카테고리 */
export const ITEM_TO_FT_CATEGORY: Record<FitnessItemKey, string> = {
  grip: "근력",
  situp: "근지구력",
  jump: "순발력",
  bodyfat: "유산소",
  shuttle: "심폐지구력",
};

const REASONS: Record<FitnessItemKey, string> = {
  grip: "악력이 또래보다 아쉬워요 — 전완·상체 근력 운동으로 보완해요",
  situp: "복부 근지구력이 또래보다 아쉬워요 — 코어 운동으로 보완해요",
  jump: "하체 순발력이 또래보다 아쉬워요 — 점프·하체 운동으로 보완해요",
  bodyfat: "체지방률 관리가 필요해요 — 유산소 운동으로 보완해요",
  shuttle: "심폐지구력이 또래보다 아쉬워요 — 유산소 지구력 운동으로 보완해요",
};

export function reasonFor(key: FitnessItemKey): string {
  return REASONS[key];
}

/** 백분위 하위 1~2개 항목을 약한 순서로 반환 (입력은 변형하지 않음) */
export function pickWeakItems(
  items: ItemResult[],
  count: number = WEAK_ITEM_COUNT,
): FitnessItemKey[] {
  return [...items]
    .sort((a, b) => a.percentile - b.percentile)
    .slice(0, count)
    .map((i) => i.key);
}

/**
 * 약점 카테고리 영상을 우선 배치하고, 부족하면 다른 카테고리로
 * 최소 개수(RECOMMEND_MIN)를 채워 3~5개를 반환한다.
 */
export function matchVideos(
  videos: KspoVideoRecord[],
  weakItems: FitnessItemKey[],
): KspoVideoRecord[] {
  const weakCategories = weakItems.map((key) => ITEM_TO_FT_CATEGORY[key]);

  const matched = videos.filter((v) => weakCategories.includes(v.FT_ITEM_NM));
  // 약점 순서(더 약한 항목 먼저)대로 정렬
  const ordered = [...matched].sort(
    (a, b) =>
      weakCategories.indexOf(a.FT_ITEM_NM) - weakCategories.indexOf(b.FT_ITEM_NM),
  );

  const fillers = videos.filter((v) => !weakCategories.includes(v.FT_ITEM_NM));
  return [...ordered, ...fillers].slice(
    0,
    Math.max(RECOMMEND_MIN, Math.min(RECOMMEND_MAX, ordered.length)),
  );
}
