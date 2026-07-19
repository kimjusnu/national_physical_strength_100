/**
 * [KSPO 국민체력100 데이터 활용 지점 #5 — 운동처방 동영상 시드]
 *
 * "국민체력100 동영상 정보" 오픈API(data.go.kr/data/15108846/openapi.do)
 * 응답 필드를 반영한 목업. 실 연동 시 VDO_LINK_URL·IMG_FILE_URL이
 * 공단 CDN의 실제 영상/썸네일 주소로 채워진다.
 * (목업에서는 재생 링크로 국민체력100 유튜브 검색 URL을 사용)
 */

export interface KspoVideoRecord {
  /** 영상 제목 */
  VDO_TTL_NM: string;
  /** 영상 설명 */
  VDO_DESC: string;
  /** 운동명 */
  TRNG_NM: string;
  /** 개선 체력요인 (근력/근지구력/순발력/유산소/심폐지구력) */
  FT_ITEM_NM: string;
  /** 대상 */
  TRGT_AGRDE_NM: string;
  /** 썸네일 URL. 비우면 카테고리 아이콘으로 폴백 (VideoThumbnail) */
  IMG_FILE_URL: string;
  /** 재생 URL */
  VDO_LINK_URL: string;
}

function ytSearch(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`국민체력100 ${query}`)}`;
}

export const MOCK_VIDEOS: KspoVideoRecord[] = [
  // 근력 (악력)
  { VDO_TTL_NM: "손목·전완 강화 운동", VDO_DESC: "수건 짜기와 손목 굽히기로 악력의 기초인 전완근을 키워요.", TRNG_NM: "전완근 강화", FT_ITEM_NM: "근력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("악력 전완 운동") },
  { VDO_TTL_NM: "덤벨 없이 하는 상체 근력 루틴", VDO_DESC: "집에서 맨몸으로 하는 푸시업 변형 상체 근력 운동입니다.", TRNG_NM: "맨몸 상체 근력", FT_ITEM_NM: "근력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("상체 근력 운동") },
  { VDO_TTL_NM: "시니어 악력·팔 근력 지키기", VDO_DESC: "고무공 쥐기 등 어르신도 안전하게 따라 하는 근력 운동.", TRNG_NM: "시니어 근력", FT_ITEM_NM: "근력", TRGT_AGRDE_NM: "어르신", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("시니어 악력 운동") },
  // 근지구력 (윗몸말아올리기)
  { VDO_TTL_NM: "코어 기초: 데드버그와 플랭크", VDO_DESC: "허리 부담 없이 복부 근지구력을 키우는 대표 코어 운동.", TRNG_NM: "코어 안정화", FT_ITEM_NM: "근지구력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("플랭크 코어 운동") },
  { VDO_TTL_NM: "윗몸말아올리기 정복 4주 루틴", VDO_DESC: "단계별 크런치 진행으로 윗몸말아올리기 횟수를 늘려요.", TRNG_NM: "크런치 루틴", FT_ITEM_NM: "근지구력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("윗몸말아올리기 크런치") },
  { VDO_TTL_NM: "하루 10분 복부 근지구력 챌린지", VDO_DESC: "레그레이즈·마운틴클라이머로 복부 지구력을 강화합니다.", TRNG_NM: "복부 서킷", FT_ITEM_NM: "근지구력", TRGT_AGRDE_NM: "성인", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("복부 운동 10분") },
  // 순발력 (제자리멀리뛰기)
  { VDO_TTL_NM: "점프력 키우는 플라이오메트릭 입문", VDO_DESC: "스쿼트 점프·박스 점프로 하체 순발력을 폭발적으로.", TRNG_NM: "플라이오메트릭", FT_ITEM_NM: "순발력", TRGT_AGRDE_NM: "성인", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("점프력 플라이오메트릭") },
  { VDO_TTL_NM: "하체 파워 스쿼트 루틴", VDO_DESC: "멀리뛰기의 엔진인 둔근·대퇴를 강화하는 스쿼트 변형.", TRNG_NM: "스쿼트 루틴", FT_ITEM_NM: "순발력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("스쿼트 하체 운동") },
  { VDO_TTL_NM: "제자리멀리뛰기 자세 교정", VDO_DESC: "팔 스윙과 착지 자세만 고쳐도 기록이 10cm 늘어요.", TRNG_NM: "멀리뛰기 기술", FT_ITEM_NM: "순발력", TRGT_AGRDE_NM: "청소년", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("제자리멀리뛰기 자세") },
  // 유산소 (체지방률)
  { VDO_TTL_NM: "지방 태우는 홈트 유산소 20분", VDO_DESC: "층간소음 없는 저충격 유산소로 체지방을 줄여요.", TRNG_NM: "저충격 유산소", FT_ITEM_NM: "유산소", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("홈트 유산소 20분") },
  { VDO_TTL_NM: "걷기 운동 제대로 하는 법", VDO_DESC: "심박수 존2 걷기로 꾸준히 체지방을 관리하는 방법.", TRNG_NM: "파워워킹", FT_ITEM_NM: "유산소", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("걷기 운동 방법") },
  { VDO_TTL_NM: "초보자 인터벌 트레이닝", VDO_DESC: "짧고 굵은 인터벌로 운동 후에도 지방 연소가 이어져요.", TRNG_NM: "인터벌", FT_ITEM_NM: "유산소", TRGT_AGRDE_NM: "성인", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("초보 인터벌 트레이닝") },
  // 심폐지구력 (왕복오래달리기)
  { VDO_TTL_NM: "심폐지구력 기초 만들기", VDO_DESC: "제자리 뛰기·스텝박스로 숨차지 않는 몸을 만들어요.", TRNG_NM: "유산소 기초", FT_ITEM_NM: "심폐지구력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("심폐지구력 운동") },
  { VDO_TTL_NM: "달리기 입문 4주 프로그램", VDO_DESC: "걷기-뛰기 반복으로 왕복오래달리기 단계를 올립니다.", TRNG_NM: "러닝 입문", FT_ITEM_NM: "심폐지구력", TRGT_AGRDE_NM: "성인", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("달리기 입문") },
  { VDO_TTL_NM: "버피 없는 전신 컨디셔닝", VDO_DESC: "무릎 부담을 줄인 전신 유산소 서킷 트레이닝.", TRNG_NM: "전신 서킷", FT_ITEM_NM: "심폐지구력", TRGT_AGRDE_NM: "전연령", IMG_FILE_URL: "", VDO_LINK_URL: ytSearch("전신 서킷 트레이닝") },
];
