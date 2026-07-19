/**
 * [KSPO 국민체력100 데이터 활용 지점 #9 — 체력인증센터 시드]
 *
 * "국민체력100 체력인증센터 측정건수 정보" 오픈API
 * (data.go.kr/data/15114286/openapi.do) 응답 필드를 반영한 목업.
 * 실 연동 시 전국 센터·측정건수가 이 형태로 채워진다.
 */

export interface KspoCenterRecord {
  /** 센터명 */
  CNTER_NM: string;
  /** 시도 */
  CTPRVN_NM: string;
  /** 시군구 */
  SIGNGU_NM: string;
  /** 도로명 주소 */
  ROAD_NM_ADDR: string;
  /** 누적 측정건수 */
  MESURE_CO: number;
}

export const MOCK_CENTERS: KspoCenterRecord[] = [
  { CNTER_NM: "송파 체력인증센터", CTPRVN_NM: "서울", SIGNGU_NM: "송파구", ROAD_NM_ADDR: "서울 송파구 올림픽로 424 (올림픽공원)", MESURE_CO: 18240 },
  { CNTER_NM: "노원 체력인증센터", CTPRVN_NM: "서울", SIGNGU_NM: "노원구", ROAD_NM_ADDR: "서울 노원구 공릉로 232", MESURE_CO: 12110 },
  { CNTER_NM: "마포 체력인증센터", CTPRVN_NM: "서울", SIGNGU_NM: "마포구", ROAD_NM_ADDR: "서울 마포구 월드컵로 240 (서울월드컵경기장)", MESURE_CO: 15870 },
  { CNTER_NM: "수원 체력인증센터", CTPRVN_NM: "경기", SIGNGU_NM: "수원시", ROAD_NM_ADDR: "경기 수원시 팔달구 경수대로 893", MESURE_CO: 16420 },
  { CNTER_NM: "고양 체력인증센터", CTPRVN_NM: "경기", SIGNGU_NM: "고양시", ROAD_NM_ADDR: "경기 고양시 일산서구 중앙로 1601", MESURE_CO: 9860 },
  { CNTER_NM: "인천 체력인증센터", CTPRVN_NM: "인천", SIGNGU_NM: "남동구", ROAD_NM_ADDR: "인천 남동구 매소홀로 618 (인천종합운동장)", MESURE_CO: 11930 },
  { CNTER_NM: "부산 사직 체력인증센터", CTPRVN_NM: "부산", SIGNGU_NM: "동래구", ROAD_NM_ADDR: "부산 동래구 사직로 45 (사직종합운동장)", MESURE_CO: 14520 },
  { CNTER_NM: "대구 체력인증센터", CTPRVN_NM: "대구", SIGNGU_NM: "수성구", ROAD_NM_ADDR: "대구 수성구 유니버시아드로 180", MESURE_CO: 10380 },
  { CNTER_NM: "광주 체력인증센터", CTPRVN_NM: "광주", SIGNGU_NM: "서구", ROAD_NM_ADDR: "광주 서구 금화로 240 (광주월드컵경기장)", MESURE_CO: 8760 },
  { CNTER_NM: "대전 체력인증센터", CTPRVN_NM: "대전", SIGNGU_NM: "유성구", ROAD_NM_ADDR: "대전 유성구 대덕대로 480", MESURE_CO: 9240 },
  { CNTER_NM: "울산 체력인증센터", CTPRVN_NM: "울산", SIGNGU_NM: "남구", ROAD_NM_ADDR: "울산 남구 문수로 44 (울산문수축구경기장)", MESURE_CO: 6810 },
  { CNTER_NM: "춘천 체력인증센터", CTPRVN_NM: "강원", SIGNGU_NM: "춘천시", ROAD_NM_ADDR: "강원 춘천시 스포츠타운길 113", MESURE_CO: 5420 },
  { CNTER_NM: "청주 체력인증센터", CTPRVN_NM: "충북", SIGNGU_NM: "청주시", ROAD_NM_ADDR: "충북 청주시 서원구 사직대로 229", MESURE_CO: 6120 },
  { CNTER_NM: "천안 체력인증센터", CTPRVN_NM: "충남", SIGNGU_NM: "천안시", ROAD_NM_ADDR: "충남 천안시 서북구 번영로 208", MESURE_CO: 7040 },
  { CNTER_NM: "전주 체력인증센터", CTPRVN_NM: "전북", SIGNGU_NM: "전주시", ROAD_NM_ADDR: "전북 전주시 덕진구 기린대로 451", MESURE_CO: 6530 },
  { CNTER_NM: "목포 체력인증센터", CTPRVN_NM: "전남", SIGNGU_NM: "목포시", ROAD_NM_ADDR: "전남 목포시 양을로 203", MESURE_CO: 4310 },
  { CNTER_NM: "포항 체력인증센터", CTPRVN_NM: "경북", SIGNGU_NM: "포항시", ROAD_NM_ADDR: "경북 포항시 남구 희망대로 468", MESURE_CO: 5980 },
  { CNTER_NM: "창원 체력인증센터", CTPRVN_NM: "경남", SIGNGU_NM: "창원시", ROAD_NM_ADDR: "경남 창원시 성산구 비음로 97", MESURE_CO: 7690 },
  { CNTER_NM: "제주 체력인증센터", CTPRVN_NM: "제주", SIGNGU_NM: "제주시", ROAD_NM_ADDR: "제주 제주시 서광로2길 24", MESURE_CO: 3870 },
  { CNTER_NM: "세종 체력인증센터", CTPRVN_NM: "세종", SIGNGU_NM: "세종시", ROAD_NM_ADDR: "세종 한누리대로 2130", MESURE_CO: 2950 },
];
