"use client";

import { Type } from "lucide-react";

const STORAGE_KEY = "fitness-age-big-text";

/**
 * 큰 글씨 모드 토글 — DESIGN.md §14 Big Text Mode.
 * 저장된 설정은 layout의 인라인 스크립트가 첫 페인트 전에 적용하고,
 * 라벨 전환은 CSS(html.big-text)로 처리해 React 상태가 필요 없다.
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
      className="inline-flex items-center gap-1.5 rounded-sharp border border-hairline px-3 py-2 text-[0.8125rem] font-bold text-body transition-colors hover:border-brand hover:text-brand"
    >
      <Type size={15} strokeWidth={2.25} aria-hidden />
      <span className="big-text-label-off">큰 글씨</span>
      <span className="big-text-label-on">큰 글씨 끄기</span>
    </button>
  );
}
