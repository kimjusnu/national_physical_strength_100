import { MOCK_MEASUREMENTS, type KspoMeasurementRecord } from "@/data/mockMeasurements";
import { MOCK_VIDEOS, type KspoVideoRecord } from "@/data/mockVideos";
import { MOCK_CENTERS, type KspoCenterRecord } from "@/data/mockCenters";
import { matchVideos } from "@/lib/videoMatch";
import { centersInRegion } from "@/lib/centers";
import type { FitnessItemKey } from "@/lib/types";

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

/**
 * 오픈API 엔드포인트.
 *
 * 아래 기본값은 KSPO 오픈API의 일반적인 주소 형식을 따른 것으로, 실제 주소는
 * 공공데이터포털의 각 데이터 상세 페이지(활용신청 후 제공되는 기술문서)에서
 * 확인해 .env.local의 환경변수로 지정해야 한다. 지정하지 않거나 주소가 틀리면
 * 호출이 실패하고 목업 데이터로 자동 fallback된다.
 */
const KSPO_MEASUREMENT_API =
  process.env.KSPO_MEASUREMENT_API_URL ??
  "https://apis.data.go.kr/B551014/SRVC_OD_API_FACIL_MESURE_RESULT/TODZ_API_MESURE_RESULT";
const KSPO_VIDEO_API =
  process.env.KSPO_VIDEO_API_URL ??
  "https://apis.data.go.kr/B551014/SRVC_OD_API_VIDEO_TRNG/TODZ_VDO_TRNG_VIDEO";
const KSPO_CENTER_API =
  process.env.KSPO_CENTER_API_URL ??
  "https://apis.data.go.kr/B551014/SRVC_OD_API_CNTER_MESURE_CO/TODZ_API_CNTER_MESURE_CO";
/** 실 API 호출 타임아웃 (ms) — 초과 시 목업 fallback */
const API_TIMEOUT_MS = 8000;

function isMockEnabled(): boolean {
  return process.env.USE_MOCK !== "false";
}

function serviceKey(): string {
  const key = process.env.DATA_GO_KR_SERVICE_KEY;
  if (!key) {
    throw new Error("DATA_GO_KR_SERVICE_KEY not configured");
  }
  return key;
}

async function fetchKspoItems<T>(baseUrl: string, params: Record<string, string>): Promise<T[]> {
  const url = new URL(baseUrl);
  url.searchParams.set("serviceKey", serviceKey());
  url.searchParams.set("resultType", "json");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const res = await fetch(url, {
    signal: AbortSignal.timeout(API_TIMEOUT_MS),
    next: { revalidate: 86400 },
  });
  if (!res.ok) {
    throw new Error(`KSPO API responded with ${res.status}`);
  }
  const json = await res.json();
  return (json?.response?.body?.items?.item ?? []) as T[];
}

export async function fetchMeasurements(params: {
  page?: number;
  perPage?: number;
}): Promise<KspoMeasurementRecord[]> {
  if (isMockEnabled()) {
    return MOCK_MEASUREMENTS;
  }

  try {
    return await fetchKspoItems<KspoMeasurementRecord>(KSPO_MEASUREMENT_API, {
      pageNo: String(params.page ?? 1),
      numOfRows: String(params.perPage ?? 100),
    });
  } catch (error) {
    console.error("KSPO measurement API failed, falling back to mock:", error);
    return MOCK_MEASUREMENTS;
  }
}

/**
 * [KSPO 국민체력100 데이터 활용 지점 #7 — 운동처방 영상 조회]
 * 약점 항목에 맞는 운동처방 영상을 동영상 API(15108846)에서 가져온다.
 * 목업 모드이거나 실 API 실패 시 목업 데이터로 graceful fallback.
 */
export async function getPrescriptionVideos(
  weakItems: FitnessItemKey[],
): Promise<KspoVideoRecord[]> {
  if (isMockEnabled()) {
    return matchVideos(MOCK_VIDEOS, weakItems);
  }

  try {
    const videos = await fetchKspoItems<KspoVideoRecord>(KSPO_VIDEO_API, {
      pageNo: "1",
      numOfRows: "200",
    });
    if (videos.length === 0) {
      throw new Error("KSPO video API returned no items");
    }
    return matchVideos(videos, weakItems);
  } catch (error) {
    console.error("KSPO video API failed, falling back to mock:", error);
    return matchVideos(MOCK_VIDEOS, weakItems);
  }
}

/**
 * [KSPO 국민체력100 데이터 활용 지점 #11 — 체력인증센터 조회]
 * 지역(시도)별 체력인증센터 목록을 측정건수 API(15114286)에서 가져온다.
 * 목업 모드이거나 실 API 실패 시 목업 데이터로 graceful fallback.
 */
export async function getCenters(sido?: string): Promise<KspoCenterRecord[]> {
  if (isMockEnabled()) {
    return centersInRegion(MOCK_CENTERS, sido);
  }

  try {
    const centers = await fetchKspoItems<KspoCenterRecord>(KSPO_CENTER_API, {
      pageNo: "1",
      numOfRows: "500",
    });
    if (centers.length === 0) {
      throw new Error("KSPO center API returned no items");
    }
    return centersInRegion(centers, sido);
  } catch (error) {
    console.error("KSPO center API failed, falling back to mock:", error);
    return centersInRegion(MOCK_CENTERS, sido);
  }
}
