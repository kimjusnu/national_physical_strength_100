"use client";

import type { FitnessItemKey } from "@/lib/types";
import { ITEM_LABELS } from "@/data/normTables";

interface GuideContent {
  steps: string[];
  tip: string;
}

/** 국민체력100 표준 측정 절차를 요약한 자가측정 안내 */
const GUIDES: Record<FitnessItemKey, GuideContent> = {
  grip: {
    steps: [
      "악력계를 손 크기에 맞게 조절하고, 팔을 몸통에서 살짝(15도) 벌린 채 똑바로 섭니다.",
      "숨을 내쉬면서 5초간 최대한 힘껏 쥡니다.",
      "좌우 각 2회씩 측정해 가장 높은 값을 kg 단위로 입력합니다.",
    ],
    tip: "악력계가 없다면 가까운 체력인증센터(무료 측정)의 최근 기록을 입력해도 좋아요.",
  },
  situp: {
    steps: [
      "매트에 등을 대고 누워 무릎을 90도로 세웁니다.",
      "양손을 허벅지 위에 올리고, 손끝이 무릎에 닿을 때까지 상체를 말아 올렸다 내립니다.",
      "1분 동안 실시한 횟수를 입력합니다.",
    ],
    tip: "목이 아닌 복부의 힘으로 올라온 동작만 횟수로 인정해요.",
  },
  jump: {
    steps: [
      "출발선에 두 발을 모으고 섭니다.",
      "팔 반동을 이용해 제자리에서 최대한 멀리 뜁니다.",
      "출발선에서 착지 지점(뒤쪽 발뒤꿈치)까지의 거리를 cm로 입력합니다. 2회 중 최고 기록을 사용하세요.",
    ],
    tip: "미끄럽지 않은 바닥에서, 주변 공간을 확보하고 안전하게 측정하세요.",
  },
  bodyfat: {
    steps: [
      "체성분 측정기(인바디 등)로 측정한 체지방률(%)을 입력합니다.",
      "최근 건강검진 결과의 체지방률을 사용해도 됩니다.",
    ],
    tip: "측정기가 없다면 보건소·헬스장·체력인증센터에서 측정할 수 있어요.",
  },
  shuttle: {
    steps: [
      "20m 거리를 오디오 신호에 맞춰 왕복하여 달립니다.",
      "신호를 두 번 연속 따라가지 못할 때까지의 총 왕복 횟수를 입력합니다.",
      "심폐지구력 항목으로, 생략해도 체력나이 산출이 가능합니다.",
    ],
    tip: "공간이 없다면 생략하고, 나중에 체력인증센터에서 정식 측정을 받아보세요.",
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
  if (!itemKey) return null;
  const guide = GUIDES[itemKey];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-title"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-background p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="guide-title" className="text-lg font-bold mb-4">
          {ITEM_LABELS[itemKey]} 측정 방법
        </h2>
        <ol className="space-y-3 mb-4">
          {guide.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed">
              <span className="flex-none flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-emerald-50 dark:bg-emerald-950 p-3 text-xs text-emerald-800 dark:text-emerald-300 mb-4">
          💡 {guide.tip}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700 transition-colors"
        >
          확인
        </button>
      </div>
    </div>
  );
}
