import { MOCK_MEASUREMENTS, type KspoMeasurementRecord } from "@/data/mockMeasurements";

/**
 * KSPO 공공데이터 접근 계층.
 *
 * USE_MOCK=true (기본): 목업 데이터 반환.
 * USE_MOCK=false: 공공데이터포털 오픈API를 서버사이드에서 호출
 * (키는 DATA_GO_KR_SERVICE_KEY 환경변수, Route Handler 프록시 경유).
 *
 * 실 연동 대상 API:
 * - 측정결과 정보: data.go.kr/data/15108938/openapi.do
 * - 측정건수/센터 정보: 15114286 (2차)
 * - 동영상 정보: 15108846 (2차)
 */

const KSPO_MEASUREMENT_API =
  "https://apis.data.go.kr/B551014/SRVC_OD_API_FACIL_MESURE_RESULT/TODZ_API_MESURE_RESULT";

function useMock(): boolean {
  return process.env.USE_MOCK !== "false";
}

function serviceKey(): string {
  const key = process.env.DATA_GO_KR_SERVICE_KEY;
  if (!key) {
    throw new Error("DATA_GO_KR_SERVICE_KEY not configured");
  }
  return key;
}

export async function fetchMeasurements(params: {
  page?: number;
  perPage?: number;
}): Promise<KspoMeasurementRecord[]> {
  if (useMock()) {
    return MOCK_MEASUREMENTS;
  }

  const url = new URL(KSPO_MEASUREMENT_API);
  url.searchParams.set("serviceKey", serviceKey());
  url.searchParams.set("pageNo", String(params.page ?? 1));
  url.searchParams.set("numOfRows", String(params.perPage ?? 100));
  url.searchParams.set("resultType", "json");

  try {
    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      throw new Error(`KSPO API responded with ${res.status}`);
    }
    const json = await res.json();
    return (json?.response?.body?.items?.item ?? []) as KspoMeasurementRecord[];
  } catch (error) {
    console.error("KSPO measurement API failed:", error);
    throw new Error("국민체력100 측정결과 데이터를 불러오지 못했습니다.");
  }
}
