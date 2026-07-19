export type Gender = "M" | "F";

/** 국민체력100 측정 항목 키 (1차 구현 범위) */
export type FitnessItemKey =
  | "grip" // 악력 (kg)
  | "situp" // 윗몸말아올리기 (회/분)
  | "jump" // 제자리멀리뛰기 (cm)
  | "bodyfat" // 체지방률 (%)
  | "shuttle"; // 왕복오래달리기 (회) — 선택 항목

export interface BasicInfo {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
}

/** 위저드에서 수집하는 체력 항목 입력값 (shuttle은 선택) */
export interface FitnessInputs {
  grip: number;
  situp: number;
  jump: number;
  bodyfat: number;
  shuttle?: number;
}

export interface UserMeasurement extends BasicInfo {
  items: FitnessInputs;
}

export interface ItemResult {
  key: FitnessItemKey;
  value: number;
  /** 같은 성별·연령대 분포 내 백분위 (0~100, 높을수록 우수) */
  percentile: number;
  /** 이 성적이 평균이 되는 연령 (역산 결과) */
  fitnessAge: number;
}

export interface FitnessAgeResult {
  /** 종합 체력나이 (항목별 가중평균) */
  overallAge: number;
  /** 실제나이 - 체력나이 (양수면 실제보다 젊음) */
  ageGap: number;
  items: ItemResult[];
  strengths: FitnessItemKey[];
  weaknesses: FitnessItemKey[];
}
