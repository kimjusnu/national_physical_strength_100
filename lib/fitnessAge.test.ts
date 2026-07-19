import { describe, expect, it } from "vitest";
import {
  FITNESS_AGE_MAX,
  FITNESS_AGE_MIN,
  computeFitnessAge,
  itemFitnessAge,
  percentileFor,
} from "@/lib/fitnessAge";
import { NORM_TABLES } from "@/data/normTables";
import type { UserMeasurement } from "@/lib/types";

const avg30sMale: UserMeasurement = {
  gender: "M",
  age: 35,
  heightCm: 174,
  weightKg: 72,
  // 남성 30대 평균치 그대로 입력 → 체력나이 ≈ 실제나이(34.5±α)
  items: { grip: 42, situp: 36, jump: 207, bodyfat: 19.5, shuttle: 33 },
};

describe("percentileFor", () => {
  it("평균값이면 백분위 50", () => {
    const p = percentileFor(NORM_TABLES.M.grip, 35, 42);
    expect(p).toBeCloseTo(50, 0);
  });

  it("높을수록 우수한 항목: 평균보다 높으면 백분위 > 50", () => {
    expect(percentileFor(NORM_TABLES.M.grip, 35, 50)).toBeGreaterThan(60);
  });

  it("낮을수록 우수한 항목(체지방률): 평균보다 낮으면 백분위 > 50", () => {
    expect(percentileFor(NORM_TABLES.M.bodyfat, 35, 14)).toBeGreaterThan(60);
  });

  it("백분위는 0~100 범위", () => {
    expect(percentileFor(NORM_TABLES.M.grip, 35, 999)).toBeLessThanOrEqual(100);
    expect(percentileFor(NORM_TABLES.M.grip, 35, -999)).toBeGreaterThanOrEqual(0);
  });
});

describe("itemFitnessAge", () => {
  it("연령대 평균과 같은 값이면 그 연령대 대표나이를 돌려준다", () => {
    // 남성 악력 40kg = 40대(대표 44.5세) 평균
    expect(itemFitnessAge(NORM_TABLES.M.grip, 40)).toBeCloseTo(44.5, 1);
  });

  it("두 연령대 사이 값은 선형 보간된다", () => {
    // 남성 악력 38.5kg: 40대(40kg)와 50대(37kg) 사이
    const age = itemFitnessAge(NORM_TABLES.M.grip, 38.5);
    expect(age).toBeGreaterThan(44.5);
    expect(age).toBeLessThan(54.5);
  });

  it("최상위 성적은 하한(20세)으로 클램핑", () => {
    expect(itemFitnessAge(NORM_TABLES.M.grip, 80)).toBe(FITNESS_AGE_MIN);
  });

  it("최하위 성적은 상한(70세)으로 클램핑", () => {
    expect(itemFitnessAge(NORM_TABLES.M.grip, 5)).toBe(FITNESS_AGE_MAX);
  });

  it("체지방률(증가 곡선)도 역산된다: 낮으면 젊게", () => {
    const young = itemFitnessAge(NORM_TABLES.M.bodyfat, 15.5);
    const old = itemFitnessAge(NORM_TABLES.M.bodyfat, 23.2);
    expect(young).toBeLessThan(25);
    expect(old).toBeGreaterThan(60);
  });
});

describe("computeFitnessAge", () => {
  it("전 항목 평균치 입력 시 체력나이 ≈ 실제 연령대 대표나이", () => {
    const r = computeFitnessAge(avg30sMale);
    expect(r.overallAge).toBeGreaterThan(31);
    expect(r.overallAge).toBeLessThan(38);
  });

  it("ageGap = 실제나이 - 체력나이", () => {
    const r = computeFitnessAge(avg30sMale);
    expect(r.ageGap).toBeCloseTo(avg30sMale.age - r.overallAge, 5);
  });

  it("shuttle 미입력 시에도 나머지 4개 항목으로 산출된다", () => {
    const r = computeFitnessAge({
      ...avg30sMale,
      items: { grip: 42, situp: 36, jump: 207, bodyfat: 19.5 },
    });
    expect(r.items).toHaveLength(4);
    expect(r.overallAge).toBeGreaterThan(31);
    expect(r.overallAge).toBeLessThan(38);
  });

  it("항목 결과에 백분위와 항목별 체력나이가 포함된다", () => {
    const r = computeFitnessAge(avg30sMale);
    for (const item of r.items) {
      expect(item.percentile).toBeGreaterThanOrEqual(0);
      expect(item.percentile).toBeLessThanOrEqual(100);
      expect(item.fitnessAge).toBeGreaterThanOrEqual(FITNESS_AGE_MIN);
      expect(item.fitnessAge).toBeLessThanOrEqual(FITNESS_AGE_MAX);
    }
  });

  it("강점은 백분위 상위, 약점은 하위 항목이다", () => {
    const strongGrip: UserMeasurement = {
      ...avg30sMale,
      items: { ...avg30sMale.items, grip: 55, situp: 20 },
    };
    const r = computeFitnessAge(strongGrip);
    expect(r.strengths).toContain("grip");
    expect(r.weaknesses).toContain("situp");
  });

  it("입력을 변형하지 않는다 (불변성)", () => {
    const input = structuredClone(avg30sMale);
    computeFitnessAge(input);
    expect(input).toEqual(avg30sMale);
  });

  it("전 항목 최상위 성적이면 boundary가 elite", () => {
    const elite = computeFitnessAge({
      ...avg30sMale,
      items: { grip: 80, situp: 90, jump: 320, bodyfat: 5, shuttle: 120 },
    });
    expect(elite.overallAge).toBe(FITNESS_AGE_MIN);
    expect(elite.boundary).toBe("elite");
  });

  it("전 항목 최하위 성적이면 boundary가 needsImprovement", () => {
    const low = computeFitnessAge({
      ...avg30sMale,
      items: { grip: 6, situp: 0, jump: 31, bodyfat: 55, shuttle: 0 },
    });
    expect(low.overallAge).toBe(FITNESS_AGE_MAX);
    expect(low.boundary).toBe("needsImprovement");
  });

  it("평균권 성적이면 boundary가 null", () => {
    expect(computeFitnessAge(avg30sMale).boundary).toBeNull();
  });

  it("여성 데이터도 동일하게 동작한다", () => {
    const f: UserMeasurement = {
      gender: "F",
      age: 28,
      heightCm: 162,
      weightKg: 55,
      // 여성 20대 평균치
      items: { grip: 25.5, situp: 29, jump: 161, bodyfat: 25.5, shuttle: 25 },
    };
    const r = computeFitnessAge(f);
    expect(r.overallAge).toBeGreaterThan(21);
    expect(r.overallAge).toBeLessThan(28);
  });
});
