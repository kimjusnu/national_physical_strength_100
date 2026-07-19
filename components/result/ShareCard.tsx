"use client";

import { useState } from "react";
import { buildCardModel, generateResultCard } from "@/lib/share";
import type { FitnessAgeResult } from "@/lib/types";

interface ShareCardProps {
  result: FitnessAgeResult;
  realAge: number;
}

type Status = { kind: "idle" } | { kind: "busy" } | { kind: "done"; message: string };

/** 결과 카드 이미지 저장 · 링크 복사 · Web Share (SNS 바이럴) */
export default function ShareCard({ result, realAge }: ShareCardProps) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const notify = (message: string) => {
    setStatus({ kind: "done", message });
    window.setTimeout(() => setStatus({ kind: "idle" }), 2500);
  };

  const buildBlob = () => generateResultCard(buildCardModel(result, realAge));

  const handleSaveImage = async () => {
    setStatus({ kind: "busy" });
    try {
      const blob = await buildBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `체력나이-${Math.round(result.overallAge)}세.png`;
      link.click();
      URL.revokeObjectURL(url);
      notify("이미지를 저장했어요");
    } catch (error) {
      console.error("결과 카드 생성 실패:", error);
      notify("이미지 저장에 실패했어요");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("결과 링크를 복사했어요");
    } catch (error) {
      console.error("링크 복사 실패:", error);
      notify("링크 복사에 실패했어요");
    }
  };

  const handleShare = async () => {
    setStatus({ kind: "busy" });
    try {
      const blob = await buildBlob();
      const file = new File([blob], "체력나이.png", { type: "image/png" });
      const payload = {
        title: "나의 체력나이",
        text: `제 체력나이는 ${Math.round(result.overallAge)}세예요! 당신도 측정해보세요.`,
        url: window.location.href,
      };

      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ ...payload, files: [file] });
      } else {
        await navigator.share(payload);
      }
      setStatus({ kind: "idle" });
    } catch (error) {
      // 사용자가 공유 시트를 닫은 경우는 오류가 아니다
      if ((error as Error)?.name !== "AbortError") {
        console.error("공유 실패:", error);
        notify("공유에 실패했어요");
      } else {
        setStatus({ kind: "idle" });
      }
    }
  };

  const canWebShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <section className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5">
      <h2 className="mb-1 text-lg font-bold">결과 공유하기</h2>
      <p className="mb-4 text-xs text-neutral-500">
        결과 카드 이미지를 저장하거나 링크로 친구에게 자랑해보세요.
      </p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={handleSaveImage}
          disabled={status.kind === "busy"}
          className="flex-1 rounded-xl bg-emerald-600 py-3.5 font-bold text-white hover:bg-emerald-700 disabled:opacity-60 transition-colors"
        >
          {status.kind === "busy" ? "만드는 중…" : "🖼 이미지 저장"}
        </button>
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex-1 rounded-xl border border-emerald-600 py-3.5 font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-colors"
        >
          🔗 링크 복사
        </button>
        {canWebShare && (
          <button
            type="button"
            onClick={handleShare}
            disabled={status.kind === "busy"}
            className="flex-1 rounded-xl border border-neutral-300 dark:border-neutral-700 py-3.5 font-bold hover:border-emerald-400 disabled:opacity-60 transition-colors"
          >
            📤 공유
          </button>
        )}
      </div>

      <p
        className="mt-2 min-h-5 text-center text-xs text-emerald-600 dark:text-emerald-400"
        role="status"
        aria-live="polite"
      >
        {status.kind === "done" ? status.message : ""}
      </p>
    </section>
  );
}
