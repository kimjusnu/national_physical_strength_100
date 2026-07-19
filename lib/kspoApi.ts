import { MOCK_MEASUREMENTS, type KspoMeasurementRecord } from "@/data/mockMeasurements";
import { MOCK_VIDEOS, type KspoVideoRecord } from "@/data/mockVideos";
import { matchVideos } from "@/lib/videoMatch";
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

const KSPO_MEASUREMENT_API =
  "https://apis.data.go.kr/B551014/SRVC_OD_API_FACIL_MESURE_RESULT/TODZ_API_MESURE_RESULT";
const KSPO_VIDEO_API =
  "https://apis.data.go.kr/B551014/SRVC_OD_API_VIDEO_TRNG/TODZ_VDO_TRNG_VIDEO";

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

export async function fetchMeasurements(params: {
  page?: number;
  perPage?: number;
}): Promise<KspoMeasurementRecord[]> {
  if (isMockEnabled()) {
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
    const url = new URL(KSPO_VIDEO_API);
    url.searchParams.set("serviceKey", serviceKey());
    url.searchParams.set("pageNo", "1");
    url.searchParams.set("numOfRows", "200");
    url.searchParams.set("resultType", "json");

    const res = await fetch(url, { next: { revalidate: 86400 } });
    if (!res.ok) {
      throw new Error(`KSPO video API responded with ${res.status}`);
    }
    const json = await res.json();
    const videos = (json?.response?.body?.items?.item ??
      []) as KspoVideoRecord[];
    if (videos.length === 0) {
      throw new Error("KSPO video API returned no items");
    }
    return matchVideos(videos, weakItems);
  } catch (error) {
    console.error("KSPO video API failed, falling back to mock:", error);
    return matchVideos(MOCK_VIDEOS, weakItems);
  }
}
