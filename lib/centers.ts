import type { KspoCenterRecord } from "@/data/mockCenters";

/**
 * [KSPO 국민체력100 데이터 활용 지점 #10 — 센터 지역 필터/정렬]
 * 측정건수 API(15114286) 데이터를 지역별로 필터링·정렬해
 * 온라인 측정 → 오프라인 정식 인증으로 연계한다.
 */

export const SIDO_LIST = [
  "서울",
  "부산",
  "대구",
  "인천",
  "광주",
  "대전",
  "울산",
  "세종",
  "경기",
  "강원",
  "충북",
  "충남",
  "전북",
  "전남",
  "경북",
  "경남",
  "제주",
] as const;

/** 시도별 센터 필터 + 측정건수 내림차순 정렬 (입력은 변형하지 않음) */
export function centersInRegion(
  centers: KspoCenterRecord[],
  sido?: string,
): KspoCenterRecord[] {
  return centers
    .filter((c) => !sido || c.CTPRVN_NM === sido)
    .sort((a, b) => b.MESURE_CO - a.MESURE_CO);
}

/** 데이터에 존재하는 시도 목록 (중복 제거, 가나다순) */
export function listSidos(centers: KspoCenterRecord[]): string[] {
  return [...new Set(centers.map((c) => c.CTPRVN_NM))].sort((a, b) =>
    a.localeCompare(b, "ko"),
  );
}
