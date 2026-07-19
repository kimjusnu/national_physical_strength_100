"use client";

const STORAGE_KEY = "fitness-age-big-text";

/**
 * 큰 글씨 모드 토글 — html의 .big-text 클래스로 전체 글자 크기를 키운다.
 * 저장된 설정은 layout의 인라인 스크립트가 첫 페인트 전에 적용하고,
 * 켜짐/꺼짐 라벨은 CSS(html.big-text 선택자)로 전환해 React 상태가 필요 없다.
 */
export default function BigTextToggle() {
  const toggle = () => {
    const next = !document.documentElement.classList.contains("big-text");
    document.documentElement.classList.toggle("big-text", next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // 사생활 보호 모드 등 저장 불가 환경에서는 이번 방문에만 적용
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-sm text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
    >
      <span className="big-text-label-off">가 큰 글씨</span>
      <span className="big-text-label-on">가 큰 글씨 끄기</span>
    </button>
  );
}
