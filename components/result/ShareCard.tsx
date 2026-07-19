"use client";

import { useState } from "react";
import { Download, Link2, Share2 } from "lucide-react";
import { buildCardModel, generateResultCard } from "@/lib/share";
import type { FitnessAgeResult } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/ui/Card";

interface ShareCardProps {
  result: FitnessAgeResult;
  realAge: number;
}

type Status = { kind: "idle" } | { kind: "busy" } | { kind: "done"; message: string };

/** 결과 카드 이미지 저장 · 링크 복사 · Web Share (§14 Success: 인라인 확인, 토스트 금지) */
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
      notify("이미지를 만들지 못했어요. 다시 시도해주세요.");
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("결과 링크를 복사했어요");
    } catch (error) {
      console.error("링크 복사 실패:", error);
      notify("링크를 복사하지 못했어요");
    }
  };

  const handleShare = async () => {
    setStatus({ kind: "busy" });
    try {
      const blob = await buildBlob();
      const file = new File([blob], "체력나이.png", { type: "image/png" });
      const payload = {
        title: "나의 체력나이",
        text: `제 체력나이는 ${Math.round(result.overallAge)}세입니다.`,
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
      if ((error as Error)?.name === "AbortError") {
        setStatus({ kind: "idle" });
        return;
      }
      console.error("공유 실패:", error);
      notify("공유하지 못했어요");
    }
  };

  const canWebShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <SectionCard
      title="결과 공유"
      description="결과 카드 이미지를 저장하거나 링크로 공유할 수 있습니다."
    >
      <div className="flex flex-col gap-2">
        <Button
          variant="primary"
          onClick={handleSaveImage}
          disabled={status.kind === "busy"}
          className="w-full"
        >
          <Download size={17} strokeWidth={2.25} aria-hidden />
          {status.kind === "busy" ? "만드는 중" : "이미지 저장"}
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleCopyLink} className="flex-1">
            <Link2 size={17} strokeWidth={2.25} aria-hidden />
            링크 복사
          </Button>
          {canWebShare && (
            <Button
              variant="neutral"
              onClick={handleShare}
              disabled={status.kind === "busy"}
              className="flex-1"
            >
              <Share2 size={17} strokeWidth={2.25} aria-hidden />
              공유
            </Button>
          )}
        </div>
      </div>

      <p
        className="mt-2 min-h-5 text-center text-[0.8125rem] font-medium text-brand"
        role="status"
        aria-live="polite"
      >
        {status.kind === "done" ? status.message : ""}
      </p>
    </SectionCard>
  );
}
