import { describe, expect, it } from "vitest";
import { buildCardModel } from "@/lib/share";
import type { FitnessAgeResult } from "@/lib/types";

const baseResult: FitnessAgeResult = {
  overallAge: 32.4,
  ageGap: 2.6,
  boundary: null,
  items: [
    { key: "grip", value: 42, percentile: 71.2, fitnessAge: 30 },
    { key: "situp", value: 30, percentile: 33.8, fitnessAge: 40 },
  ],
  strengths: ["grip"],
  weaknesses: ["situp"],
};

describe("buildCardModel", () => {
  it("체력나이는 반올림, 실제나이 대비 문구를 만든다", () => {
    const model = buildCardModel(baseResult, 35);
    expect(model.fitnessAge).toBe(32);
    expect(model.realAge).toBe(35);
    // DESIGN.md §10: 일상 문구에 느낌표를 쓰지 않는다
    expect(model.gapText).toBe("실제 나이보다 3세 젊어요");
  });

  it("체력나이가 더 많으면 '많아요' 문구", () => {
    const model = buildCardModel({ ...baseResult, overallAge: 41.6 }, 35);
    expect(model.gapText).toBe("실제 나이보다 7세 많아요");
  });

  it("같으면 '같아요' 문구", () => {
    const model = buildCardModel({ ...baseResult, overallAge: 35.2 }, 35);
    expect(model.gapText).toBe("실제 나이와 같아요");
  });

  it("boundary가 elite면 뱃지 텍스트 포함", () => {
    const model = buildCardModel({ ...baseResult, boundary: "elite" }, 35);
    // DESIGN.md §7: UI에 이모지를 쓰지 않는다 (아이콘 라이브러리로 대체)
    expect(model.badgeText).toBe("상위 1% 체력");
  });

  it("boundary가 없으면 뱃지는 null", () => {
    expect(buildCardModel(baseResult, 35).badgeText).toBeNull();
  });

  it("항목은 한국어 라벨과 반올림된 백분위로 변환된다", () => {
    const model = buildCardModel(baseResult, 35);
    expect(model.items).toEqual([
      { label: "악력", percentile: 71 },
      { label: "윗몸말아올리기", percentile: 34 },
    ]);
  });

  it("워터마크에 서비스명이 들어간다", () => {
    expect(buildCardModel(baseResult, 35).watermark).toContain("체력나이");
  });
});
