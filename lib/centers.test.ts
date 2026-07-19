import { describe, expect, it } from "vitest";
import { SIDO_LIST, centersInRegion, listSidos } from "@/lib/centers";
import { MOCK_CENTERS } from "@/data/mockCenters";
import type { KspoCenterRecord } from "@/data/mockCenters";

const sample: KspoCenterRecord[] = [
  { CNTER_NM: "A센터", CTPRVN_NM: "서울", SIGNGU_NM: "송파구", ROAD_NM_ADDR: "서울 송파구 1", MESURE_CO: 100 },
  { CNTER_NM: "B센터", CTPRVN_NM: "서울", SIGNGU_NM: "마포구", ROAD_NM_ADDR: "서울 마포구 2", MESURE_CO: 500 },
  { CNTER_NM: "C센터", CTPRVN_NM: "부산", SIGNGU_NM: "해운대구", ROAD_NM_ADDR: "부산 해운대구 3", MESURE_CO: 300 },
];

describe("centersInRegion", () => {
  it("해당 시도의 센터만 측정건수 내림차순으로 반환한다", () => {
    const result = centersInRegion(sample, "서울");
    expect(result.map((c) => c.CNTER_NM)).toEqual(["B센터", "A센터"]);
  });

  it("시도 미지정 시 전체를 측정건수 내림차순으로 반환한다", () => {
    const result = centersInRegion(sample);
    expect(result.map((c) => c.CNTER_NM)).toEqual(["B센터", "C센터", "A센터"]);
  });

  it("해당 지역 센터가 없으면 빈 배열", () => {
    expect(centersInRegion(sample, "제주")).toEqual([]);
  });

  it("입력 배열을 변형하지 않는다", () => {
    const before = structuredClone(sample);
    centersInRegion(sample, "서울");
    expect(sample).toEqual(before);
  });
});

describe("listSidos / SIDO_LIST", () => {
  it("중복 없이 시도 목록을 반환한다", () => {
    expect(listSidos(sample)).toEqual(["부산", "서울"]);
  });

  it("SIDO_LIST는 17개 시도를 포함한다", () => {
    expect(SIDO_LIST).toHaveLength(17);
    expect(SIDO_LIST).toContain("서울");
    expect(SIDO_LIST).toContain("제주");
  });

  it("목업 센터 데이터의 시도는 모두 SIDO_LIST에 속한다", () => {
    for (const center of MOCK_CENTERS) {
      expect(SIDO_LIST).toContain(center.CTPRVN_NM);
    }
  });
});
