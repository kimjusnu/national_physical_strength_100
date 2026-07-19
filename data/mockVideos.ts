/**
 * [KSPO 국민체력100 데이터 활용 지점 #5 — 운동처방 동영상 시드]
 *
 * "국민체력100 동영상 정보" 오픈API(data.go.kr/data/15108846/openapi.do)
 * 응답 필드를 반영한 시드 데이터.
 *
 * 영상은 전부 국민체육진흥공단 국민체력100 공식 유튜브 채널(@kspo100)의
 * 실제 게시물이며, 각 영상 ID는 YouTube oEmbed로 존재·채널을 검증했다
 * (검증일 2026-07-19). 썸네일은 유튜브가 제공하는 mqdefault(320×180)를 쓴다.
 *
 * 한계: 공식 채널 영상에는 API의 FT_ITEM_NM(체력요인) 메타데이터가 없어
 * 아래 카테고리 분류는 영상 주제에 따른 근사 매핑이다. 실 API를 연결하면
 * 공단이 부여한 체력요인 분류가 그대로 들어온다.
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

const watch = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const thumb = (id: string) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

interface VideoSeed {
  id: string;
  title: string;
  desc: string;
  training: string;
  factor: string;
  target: string;
}

const SEEDS: VideoSeed[] = [
  // 근력 — 악력 약점 대응
  {
    id: "qqY0_VKbe-4",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.08 손목&전완근 강화 운동",
    desc: "악력의 기초가 되는 손목과 전완근을 집중적으로 강화하는 운동입니다.",
    training: "손목·전완근 강화",
    factor: "근력",
    target: "전연령",
  },
  {
    id: "bQ7NNdUbLKs",
    title:
      "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.06 체력 관리 근력 강화 운동 상급",
    desc: "전신 근력을 끌어올리는 상급 단계 프로그램입니다.",
    training: "근력 강화 루틴",
    factor: "근력",
    target: "성인",
  },
  {
    id: "aq5ueMRx2Kg",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.06 팔꿈치 강화 운동",
    desc: "팔꿈치 주변 근육을 강화해 악력을 쓸 때의 부담을 줄입니다.",
    training: "팔꿈치 강화",
    factor: "근력",
    target: "전연령",
  },

  // 근지구력 — 윗몸말아올리기 약점 대응
  {
    id: "i8l72wdPPTY",
    title:
      "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.01 직장인 근골격계 관리 운동 초급",
    desc: "오래 앉아 있는 사람을 위한 체간 안정화 운동으로 시작해보세요.",
    training: "근골격계 관리 초급",
    factor: "근지구력",
    target: "성인",
  },
  {
    id: "K8XvZfufUzQ",
    title:
      "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.02 직장인 근골격계 관리 운동 상급",
    desc: "초급이 익숙해졌다면 강도를 올린 상급 루틴으로 넘어갑니다.",
    training: "근골격계 관리 상급",
    factor: "근지구력",
    target: "성인",
  },
  {
    id: "_jiP2nNBBsY",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.09 목 디스크 예방 운동",
    desc: "상체를 말아 올릴 때 목이 아닌 복부를 쓰도록 자세를 잡아줍니다.",
    training: "목·체간 안정화",
    factor: "근지구력",
    target: "전연령",
  },

  // 순발력 — 제자리멀리뛰기 약점 대응
  {
    id: "wD782Vst0_I",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.10 고관절 강화 운동",
    desc: "멀리뛰기의 힘이 나오는 고관절 주변을 강화합니다.",
    training: "고관절 강화",
    factor: "순발력",
    target: "전연령",
  },
  {
    id: "Tjz3cn9ixgA",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.02 종아리 강화 운동",
    desc: "발목과 종아리는 도약과 착지를 버티는 마지막 관절입니다.",
    training: "종아리 강화",
    factor: "순발력",
    target: "전연령",
  },
  {
    id: "CXxzq0XvwR4",
    title: "유치원생을 위한 운동 - 사이드 점프 #국민체력100",
    desc: "좌우로 뛰며 순발력과 균형 감각을 함께 기릅니다.",
    training: "사이드 점프",
    factor: "순발력",
    target: "유소년",
  },

  // 유산소 — 체지방률 대응
  {
    id: "DsA_DDepUPk",
    title:
      "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.03 효과적 다이어트 웜업 운동 초급",
    desc: "체지방 관리를 시작하는 사람을 위한 저강도 웜업 루틴입니다.",
    training: "다이어트 웜업 초급",
    factor: "유산소",
    target: "성인",
  },
  {
    id: "-V6EA4tJCc8",
    title:
      "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.04 효과적 다이어트 웜업 운동 상급",
    desc: "강도를 높여 운동 후에도 열량 소모가 이어지게 합니다.",
    training: "다이어트 웜업 상급",
    factor: "유산소",
    target: "성인",
  },
  {
    id: "Ct1JrKWlEoI",
    title:
      "체력관리 끝판왕 엄마TV에게 배우는 국민체력100 체력증진 프로그램 오.운.완 [오늘도 운동 완료!] #shorts",
    desc: "짧게 따라 할 수 있는 생활 속 체력 관리 루틴입니다.",
    training: "생활 체력 루틴",
    factor: "유산소",
    target: "전연령",
  },

  // 심폐지구력 — 왕복오래달리기 대응
  {
    id: "CsPUUJREJV8",
    title: "국민체력100 건강한 습관 만들기(1기) | EP.01 저강도 전신 순환 운동",
    desc: "숨이 덜 차는 강도부터 시작해 심폐 기초를 만듭니다.",
    training: "저강도 전신 순환",
    factor: "심폐지구력",
    target: "전연령",
  },
  {
    id: "HYl0oA1Ptyw",
    title: "[👩🏻‍🎓청소년] 중고등학생 체력향상 운동프로그램 (30min)",
    desc: "30분 구성으로 심폐지구력을 포함한 전반적 체력을 끌어올립니다.",
    training: "청소년 체력향상 30분",
    factor: "심폐지구력",
    target: "청소년",
  },
  {
    id: "TmVZ2gdZnQQ",
    title: "[👦🏻유소년] 성장기 학생들을 위한 운동체력향상 운동프로그램 (30min)",
    desc: "성장기에 맞춘 30분 운동체력 향상 프로그램입니다.",
    training: "유소년 운동체력향상 30분",
    factor: "심폐지구력",
    target: "유소년",
  },
];

export const MOCK_VIDEOS: KspoVideoRecord[] = SEEDS.map((s) => ({
  VDO_TTL_NM: s.title,
  VDO_DESC: s.desc,
  TRNG_NM: s.training,
  FT_ITEM_NM: s.factor,
  TRGT_AGRDE_NM: s.target,
  IMG_FILE_URL: thumb(s.id),
  VDO_LINK_URL: watch(s.id),
}));
