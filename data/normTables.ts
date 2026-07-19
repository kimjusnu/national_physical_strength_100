import type { FitnessItemKey, Gender } from "@/lib/types";

/**
 * [KSPO 국민체력100 데이터 활용 지점 #1 — 체력 기준분포 테이블]
 *
 * 성별×연령대×항목별 분포(평균·표준편차)로, 사용자의 백분위 환산과
 * 체력나이 역산의 기준선이 된다.
 *
 * 현재 값은 국민체력100 체력측정 공개 기준을 근사한 목업이며,
 * 실 연동 시 "국민체력100 체력인증센터 측정결과 정보" 오픈API
 * (data.go.kr/data/15108938/openapi.do)의 원시 측정치를 집계해
 * 이 테이블만 교체하면 된다 (구조는 동일).
 *
 * 주의: 체력나이 역산이 유일해를 갖도록 항목별 평균 곡선은
 * 연령에 대해 단조(체력 항목은 감소, 체지방률은 증가)로 구성한다.
 */

export interface NormCell {
  ageMin: number;
  ageMax: number;
  /** 연령대 대표 나이 (곡선 보간용 중앙값) */
  ageMid: number;
  mean: number;
  sd: number;
}

export interface ItemNorm {
  /** 1: 값이 클수록 우수 (악력 등), -1: 값이 작을수록 우수 (체지방률) */
  direction: 1 | -1;
  cells: NormCell[];
}

/** 체력나이 산출 결과의 클램핑 범위 */
export const FITNESS_AGE_MIN = 15;
export const FITNESS_AGE_MAX = 80;

const AGE_BANDS: Array<[number, number, number]> = [
  [15, 19, 17],
  [20, 29, 24.5],
  [30, 39, 34.5],
  [40, 49, 44.5],
  [50, 59, 54.5],
  [60, 69, 64.5],
  [70, 84, 77],
];

function cells(means: number[], sd: number): NormCell[] {
  return AGE_BANDS.map(([ageMin, ageMax, ageMid], i) => ({
    ageMin,
    ageMax,
    ageMid,
    mean: means[i],
    sd,
  }));
}

export const NORM_TABLES: Record<
  Gender,
  Record<FitnessItemKey, ItemNorm>
> = {
  M: {
    grip: { direction: 1, cells: cells([43.5, 43, 42, 40, 37, 33.5, 29], 6.5) },
    situp: { direction: 1, cells: cells([44, 42, 36, 30, 24, 17, 11], 10) },
    jump: { direction: 1, cells: cells([228, 222, 207, 191, 172, 151, 130], 25) },
    bodyfat: {
      direction: -1,
      cells: cells([15.0, 17.0, 19.5, 21.0, 22.0, 22.8, 23.5], 5.0),
    },
    shuttle: { direction: 1, cells: cells([46, 41, 33, 26, 20, 14, 9], 12) },
  },
  F: {
    grip: { direction: 1, cells: cells([26, 25.5, 25, 24, 22.5, 20.5, 17.5], 4.5) },
    situp: { direction: 1, cells: cells([32, 29, 24, 19, 14, 9, 5], 8) },
    jump: { direction: 1, cells: cells([168, 161, 150, 138, 124, 108, 92], 22) },
    bodyfat: {
      direction: -1,
      cells: cells([24.0, 25.5, 27.0, 28.5, 29.8, 30.8, 31.5], 5.5),
    },
    shuttle: { direction: 1, cells: cells([29, 25, 20, 16, 12, 8, 5], 8) },
  },
};

/** 종합 체력나이 가중치 (합 1이 아니어도 가중평균 시 정규화됨) */
export const ITEM_WEIGHTS: Record<FitnessItemKey, number> = {
  grip: 1,
  situp: 1,
  jump: 1,
  bodyfat: 1,
  shuttle: 1,
};

export const ITEM_LABELS: Record<FitnessItemKey, string> = {
  grip: "악력",
  situp: "윗몸말아올리기",
  jump: "제자리멀리뛰기",
  bodyfat: "체지방률",
  shuttle: "왕복오래달리기",
};

export const ITEM_UNITS: Record<FitnessItemKey, string> = {
  grip: "kg",
  situp: "회/분",
  jump: "cm",
  bodyfat: "%",
  shuttle: "회",
};

export function findCell(norm: ItemNorm, age: number): NormCell {
  const found = norm.cells.find((c) => age >= c.ageMin && age <= c.ageMax);
  if (found) return found;
  return age < norm.cells[0].ageMin
    ? norm.cells[0]
    : norm.cells[norm.cells.length - 1];
}
