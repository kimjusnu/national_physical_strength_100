import {
  ITEM_WEIGHTS,
  NORM_TABLES,
  findCell,
  type ItemNorm,
} from "@/data/normTables";
import type {
  FitnessAgeResult,
  FitnessItemKey,
  ItemResult,
  UserMeasurement,
} from "@/lib/types";

/**
 * [KSPO 국민체력100 데이터 활용 지점 #3 — 체력나이 산출 로직]
 *
 * 국민체력100 기준분포(data/normTables.ts)를 사용해
 * ① 사용자 값을 성별·연령대 분포의 백분위로 환산하고
 * ② "이 성적이 평균이 되는 연령"을 역산해 항목별 체력나이를 구한 뒤
 * ③ 가중평균으로 종합 체력나이를 산출한다.
 */

/** 체력나이 클램핑 범위 — 극단값은 경계 뱃지(boundary)로 함께 표현한다 */
export const FITNESS_AGE_MIN = 20;
export const FITNESS_AGE_MAX = 70;
/** 종합 체력나이가 경계에서 이 이내면 극단값 뱃지를 띄운다 */
const BOUNDARY_MARGIN = 0.5;

const STRENGTH_PERCENTILE = 60;
const WEAKNESS_PERCENTILE = 40;

/** 표준정규분포 CDF (Abramowitz–Stegun 근사, 오차 < 7.5e-8) */
function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp((-z * z) / 2);
  const poly =
    t *
    (0.319381530 +
      t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const p = 1 - d * poly;
  return z >= 0 ? p : 1 - p;
}

function clampAge(age: number): number {
  return Math.min(FITNESS_AGE_MAX, Math.max(FITNESS_AGE_MIN, age));
}

/** 사용자 값을 같은 성별·연령대 분포 내 백분위(0~100, 높을수록 우수)로 환산 */
export function percentileFor(norm: ItemNorm, age: number, value: number): number {
  const cell = findCell(norm, age);
  const z = ((value - cell.mean) / cell.sd) * norm.direction;
  return Math.min(100, Math.max(0, normalCdf(z) * 100));
}

/**
 * "이 성적이 평균이 되는 연령"을 역산한다.
 * 평균 곡선은 연령에 대해 단조이므로 구간 선형 보간으로 유일해를 얻고,
 * 곡선 범위 밖 성적은 가장자리 구간 기울기로 외삽 후 15~80세로 클램핑한다.
 */
export function itemFitnessAge(norm: ItemNorm, value: number): number {
  const { cells } = norm;
  const first = cells[0];
  const last = cells[cells.length - 1];

  const segmentFor = (): [typeof first, typeof first] => {
    for (let i = 0; i < cells.length - 1; i++) {
      const [a, b] = [cells[i], cells[i + 1]];
      const [lo, hi] = a.mean < b.mean ? [a.mean, b.mean] : [b.mean, a.mean];
      if (value >= lo && value <= hi) return [a, b];
    }
    // 범위 밖: 젊은 쪽 또는 나이 든 쪽 가장자리 구간으로 외삽
    const beyondYoung =
      norm.direction === 1 ? value > first.mean : value < first.mean;
    return beyondYoung ? [cells[0], cells[1]] : [cells[cells.length - 2], last];
  };

  const [a, b] = segmentFor();
  const slope = (b.mean - a.mean) / (b.ageMid - a.ageMid);
  const age = a.ageMid + (value - a.mean) / slope;
  return clampAge(age);
}

/** 종합 체력나이 산출 (입력은 변형하지 않는다) */
export function computeFitnessAge(user: UserMeasurement): FitnessAgeResult {
  const norms = NORM_TABLES[user.gender];

  const items: ItemResult[] = (
    Object.entries(user.items) as Array<[FitnessItemKey, number | undefined]>
  )
    .filter((entry): entry is [FitnessItemKey, number] => entry[1] != null)
    .map(([key, value]) => ({
      key,
      value,
      percentile: percentileFor(norms[key], user.age, value),
      fitnessAge: itemFitnessAge(norms[key], value),
    }));

  const totalWeight = items.reduce((sum, i) => sum + ITEM_WEIGHTS[i.key], 0);
  const overallAge =
    items.reduce((sum, i) => sum + i.fitnessAge * ITEM_WEIGHTS[i.key], 0) /
    totalWeight;

  const byPercentileDesc = [...items].sort((x, y) => y.percentile - x.percentile);

  const boundary =
    overallAge <= FITNESS_AGE_MIN + BOUNDARY_MARGIN
      ? "elite"
      : overallAge >= FITNESS_AGE_MAX - BOUNDARY_MARGIN
        ? "needsImprovement"
        : null;

  return {
    overallAge,
    ageGap: user.age - overallAge,
    boundary,
    items,
    strengths: byPercentileDesc
      .filter((i) => i.percentile >= STRENGTH_PERCENTILE)
      .map((i) => i.key),
    weaknesses: byPercentileDesc
      .filter((i) => i.percentile <= WEAKNESS_PERCENTILE)
      .reverse()
      .map((i) => i.key),
  };
}
