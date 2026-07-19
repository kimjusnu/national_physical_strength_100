import { NORM_TABLES, type ItemNorm, type NormCell } from "@/data/normTables";
import type { KspoMeasurementRecord } from "@/data/mockMeasurements";
import type { FitnessItemKey, Gender } from "@/lib/types";

/**
 * [KSPO 국민체력100 데이터 활용 지점 #12 — 기준테이블 집계]
 *
 * 측정결과 API(15108938)의 원시 레코드를 성별×연령대×항목별
 * 평균·표준편차로 집계해 data/normTables.ts를 대체할 값을 만든다.
 *
 * 한계: 오픈API가 대량 원자료를 페이지 단위로만 제공하므로,
 * 표본이 MIN_SAMPLES_PER_CELL 미만인 셀은 기존 공개 기준값을 유지하고
 * 경고로 남긴다 (부족한 표본으로 기준선이 왜곡되는 것을 방지).
 */

/** 셀당 최소 표본 수 — 미만이면 기존 기준값 유지 */
export const MIN_SAMPLES_PER_CELL = 30;

/** 측정 항목 → API 응답 필드 */
const ITEM_TO_FIELD: Partial<
  Record<FitnessItemKey, keyof KspoMeasurementRecord>
> = {
  grip: "MESURE_IEM_007_VALUE",
  situp: "MESURE_IEM_012_VALUE",
  jump: "MESURE_IEM_014_VALUE",
  bodyfat: "MESURE_IEM_003_VALUE",
  // shuttle(왕복오래달리기)은 현재 API 응답에 포함되지 않아 기존 기준값 유지
};

export function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

/** 표본표준편차 (n-1) */
export function stdDev(values: number[]): number {
  if (values.length <= 1) return 0;
  const m = mean(values);
  const variance =
    values.reduce((sum, v) => sum + (v - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

export interface AggregateResult {
  tables: Record<Gender, Record<FitnessItemKey, ItemNorm>>;
  warnings: string[];
}

/** 원시 측정 레코드를 기준테이블 형태로 집계 (기존 테이블은 변형하지 않음) */
export function aggregateNormTables(
  records: KspoMeasurementRecord[],
): AggregateResult {
  const warnings: string[] = [];

  if (records.length === 0) {
    warnings.push(
      "측정 레코드가 0건이라 기존 기준테이블을 그대로 유지합니다.",
    );
  }

  const genders: Gender[] = ["M", "F"];
  const tables = Object.fromEntries(
    genders.map((gender) => [
      gender,
      aggregateForGender(gender, records, warnings),
    ]),
  ) as Record<Gender, Record<FitnessItemKey, ItemNorm>>;

  return { tables, warnings };
}

function aggregateForGender(
  gender: Gender,
  records: KspoMeasurementRecord[],
  warnings: string[],
): Record<FitnessItemKey, ItemNorm> {
  const genderRecords = records.filter((r) => r.SEXDSTN_FLAG_CD === gender);
  const baseTables = NORM_TABLES[gender];

  const entries = (
    Object.entries(baseTables) as Array<[FitnessItemKey, ItemNorm]>
  ).map(([itemKey, baseNorm]) => {
    const field = ITEM_TO_FIELD[itemKey];
    if (!field) {
      warnings.push(
        `${gender}/${itemKey}: API 응답에 해당 항목이 없어 기존 기준값을 유지합니다.`,
      );
      return [itemKey, baseNorm] as const;
    }

    const cells = baseNorm.cells.map((cell) =>
      aggregateCell(gender, itemKey, cell, genderRecords, field, warnings),
    );
    return [itemKey, { ...baseNorm, cells }] as const;
  });

  return Object.fromEntries(entries) as Record<FitnessItemKey, ItemNorm>;
}

function aggregateCell(
  gender: Gender,
  itemKey: FitnessItemKey,
  cell: NormCell,
  genderRecords: KspoMeasurementRecord[],
  field: keyof KspoMeasurementRecord,
  warnings: string[],
): NormCell {
  const values = genderRecords
    .filter(
      (r) => r.MESURE_AGE_CO >= cell.ageMin && r.MESURE_AGE_CO <= cell.ageMax,
    )
    .map((r) => Number(r[field]))
    .filter((v) => Number.isFinite(v) && v > 0);

  if (values.length < MIN_SAMPLES_PER_CELL) {
    warnings.push(
      `${gender}/${itemKey}/${cell.ageMin}-${cell.ageMax}세: 표본 ${values.length}건(<${MIN_SAMPLES_PER_CELL})으로 기존 기준값을 유지합니다.`,
    );
    return cell;
  }

  const sd = stdDev(values);
  return {
    ...cell,
    mean: Number(mean(values).toFixed(2)),
    // 표준편차가 0이면 백분위 계산이 불가하므로 기존값으로 대체
    sd: sd > 0 ? Number(sd.toFixed(2)) : cell.sd,
  };
}
