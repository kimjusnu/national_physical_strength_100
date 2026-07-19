"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { FitnessItemKey } from "@/lib/types";
import { ITEM_LABELS } from "@/data/normTables";
import { Button } from "@/components/ui/Button";

interface GuideContent {
  steps: string[];
  tip: string;
}

/** 국민체력100 표준 측정 절차를 요약한 자가측정 안내 */
const GUIDES: Record<FitnessItemKey, GuideContent> = {
  grip: {
    steps: [
      "악력계를 손 크기에 맞게 조절하고, 팔을 몸통에서 15도 정도 벌린 채 똑바로 섭니다.",
      "숨을 내쉬면서 5초간 최대한 힘껏 쥡니다.",
      "좌우 각 2회씩 측정해 가장 높은 값을 kg 단위로 입력합니다.",
    ],
    tip: "악력계가 없다면 체력인증센터에서 잰 최근 기록을 입력해도 됩니다.",
  },
  situp: {
    steps: [
      "매트에 등을 대고 누워 무릎을 90도로 세웁니다.",
      "양손을 허벅지 위에 올리고, 손끝이 무릎에 닿을 때까지 상체를 말아 올렸다 내립니다.",
      "1분 동안 실시한 횟수를 입력합니다.",
    ],
    tip: "목이 아닌 복부의 힘으로 올라온 동작만 횟수로 인정합니다.",
  },
  jump: {
    steps: [
      "출발선에 두 발을 모으고 섭니다.",
      "팔 반동을 이용해 제자리에서 최대한 멀리 뜁니다.",
      "출발선에서 뒤쪽 발뒤꿈치까지의 거리를 cm로 입력합니다. 2회 중 최고 기록을 씁니다.",
    ],
    tip: "미끄럽지 않은 바닥에서 주변 공간을 확보하고 측정하세요.",
  },
  bodyfat: {
    steps: [
      "체성분 측정기로 측정한 체지방률(%)을 입력합니다.",
      "최근 건강검진 결과의 체지방률을 사용해도 됩니다.",
    ],
    tip: "측정기가 없다면 보건소·체력인증센터에서 측정할 수 있습니다.",
  },
  shuttle: {
    steps: [
      "20m 거리를 오디오 신호에 맞춰 왕복하여 달립니다.",
      "신호를 두 번 연속 따라가지 못할 때까지의 총 왕복 횟수를 입력합니다.",
      "심폐지구력 항목으로, 생략해도 체력나이는 산출됩니다.",
    ],
    tip: "공간이 없다면 생략하고 체력인증센터에서 정식 측정을 받으세요.",
  },
};

interface MeasureGuideModalProps {
  itemKey: FitnessItemKey | null;
  onClose: () => void;
}

export default function MeasureGuideModal({
  itemKey,
  onClose,
}: MeasureGuideModalProps) {
  useEffect(() => {
    if (!itemKey) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [itemKey, onClose]);

  if (!itemKey) return null;
  const guide = GUIDES[itemKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div
        className="w-full max-w-md rounded-t-sharp bg-white p-6 shadow-[0_17px_50px_rgba(0,0,0,0.19)] sm:rounded-sharp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="guide-title" className="text-xl font-bold text-heading">
            {ITEM_LABELS[itemKey]} 측정 방법
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="-m-1 p-1 text-caption hover:text-heading"
          >
            <X size={20} strokeWidth={2} aria-hidden />
          </button>
        </div>

        <ol className="mb-4 space-y-3">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-body">
              <span className="flex size-6 flex-none items-center justify-center rounded-sharp bg-mint text-[0.8125rem] font-bold text-brand">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <p className="mb-5 rounded-sharp bg-surface-alt p-3.5 text-[0.8125rem] leading-relaxed text-caption">
          {guide.tip}
        </p>

        <Button variant="primary" onClick={onClose} className="w-full">
          확인
        </Button>
      </div>
    </div>
  );
}
