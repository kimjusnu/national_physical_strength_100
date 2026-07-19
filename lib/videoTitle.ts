/**
 * 공단 영상 제목은 채널명·시리즈 설명이 앞에 길게 붙어 있어서, 카드에서
 * 정작 구분되는 부분(EP 번호·운동명)이 잘려 나간다. 표시용으로만 군더더기를
 * 걷어낸다 — 원문은 title 속성에 그대로 남기고 링크도 실제 영상을 가리킨다.
 */

/**
 * 걷어낼 군더더기 (긴 것부터 — 부분 매칭 방지).
 * 채널명이 제목 중간에 들어간 영상도 있어 위치를 가리지 않고 제거한다.
 */
const REDUNDANT_PHRASES = [
  "국민체력100 체력증진 운동 프로그램 ",
  "국민체력100 체력증진 대국민 프로그램 ",
  "국민체력100 체력증진 프로그램 ",
  "국민체력100 ",
];

/** 시리즈명과 에피소드를 잇는 구분자 (반각·전각 파이프, 'ㅣ'(한글 이) 포함) */
const SERIES_SEPARATOR = /\s*[|｜ㅣ]\s*/;

/** "(1기)" 같은 기수 표기 */
const COHORT = /\(\d+기\)/g;

/** 끝에 붙는 해시태그 */
const TRAILING_HASHTAGS = /(\s*#[^\s#]+)+\s*$/;

/** 이모지·변형 선택자·ZWJ */
const EMOJI =
  /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]/gu;

export function shortenVideoTitle(title: string): string {
  // 해시태그를 먼저 떼야 "#국민체력100"이 문구 제거에 걸리지 않는다
  let out = title.replace(TRAILING_HASHTAGS, "");

  for (const phrase of REDUNDANT_PHRASES) {
    out = out.split(phrase).join("");
  }

  out = out.replace(COHORT, "").replace(EMOJI, "");

  // "시리즈명 | EP.08 운동명" → "시리즈명 EP.08 · 운동명"
  const [series, ...rest] = out.split(SERIES_SEPARATOR);
  if (rest.length > 0) {
    const tail = rest.join(" ").trim();
    const episode = tail.match(/^(EP\.?\s*\d+)\s*(.*)$/i);
    out = episode
      ? `${series.trim()} ${episode[1].replace(/\s+/g, "")} · ${episode[2].trim()}`
      : `${series.trim()} · ${tail}`;
  }

  return out.replace(/\s{2,}/g, " ").trim();
}
