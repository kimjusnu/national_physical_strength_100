import { describe, expect, it } from "vitest";
import {
  MIN_SAMPLES_PER_CELL,
  aggregateNormTables,
  mean,
  stdDev,
} from "@/lib/normAggregate";
import type { KspoMeasurementRecord } from "@/data/mockMeasurements";

function record(
  age: number,
  gender: "M" | "F",
  grip: number,
): KspoMeasurementRecord {
  return {
    MESURE_AGE_CO: age,
    SEXDSTN_FLAG_CD: gender,
    MESURE_IEM_001_VALUE: 170,
    MESURE_IEM_002_VALUE: 70,
    MESURE_IEM_003_VALUE: 20,
    MESURE_IEM_007_VALUE: grip,
    MESURE_IEM_012_VALUE: 30,
    MESURE_IEM_014_VALUE: 200,
  };
}

describe("mean / stdDev", () => {
  it("평균을 계산한다", () => {
    expect(mean([1, 2, 3, 4])).toBe(2.5);
  });

  it("표본표준편차를 계산한다", () => {
    expect(stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2.138, 2);
  });

  it("값이 1개 이하면 표준편차는 0", () => {
    expect(stdDev([5])).toBe(0);
    expect(stdDev([])).toBe(0);
  });
});

describe("aggregateNormTables", () => {
  it("성별×연령대별 평균/표준편차를 집계한다", () => {
    const records = [
      ...Array.from({ length: MIN_SAMPLES_PER_CELL }, () => record(35, "M", 40)),
      ...Array.from({ length: MIN_SAMPLES_PER_CELL }, () => record(35, "M", 44)),
    ];
    const { tables } = aggregateNormTables(records);
    const cell = tables.M.grip.cells.find((c) => c.ageMid === 34.5);
    expect(cell?.mean).toBeCloseTo(42, 5);
    expect(cell?.sd).toBeGreaterThan(0);
  });

  it("표본이 부족한 셀은 기존 기준값을 유지하고 경고를 남긴다", () => {
    const { tables, warnings } = aggregateNormTables([record(35, "M", 40)]);
    // 표본 1건 < MIN_SAMPLES_PER_CELL → 기존 목업 기준값(42) 유지
    const cell = tables.M.grip.cells.find((c) => c.ageMid === 34.5);
    expect(cell?.mean).toBe(42);
    expect(warnings.length).toBeGreaterThan(0);
    expect(warnings.some((w) => w.includes("표본"))).toBe(true);
  });

  it("빈 입력이면 기존 테이블을 그대로 돌려준다", () => {
    const { tables, warnings } = aggregateNormTables([]);
    expect(tables.M.grip.cells[0].mean).toBeGreaterThan(0);
    expect(warnings.length).toBeGreaterThan(0);
  });

  it("direction 등 테이블 구조를 보존한다", () => {
    const { tables } = aggregateNormTables([]);
    expect(tables.M.bodyfat.direction).toBe(-1);
    expect(tables.M.grip.direction).toBe(1);
    expect(tables.F.grip.cells).toHaveLength(7);
  });
});
