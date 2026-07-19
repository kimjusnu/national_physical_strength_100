"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Flame, HeartPulse, Timer, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/** 체력요인 카테고리 → 폴백 아이콘 (§7: 이모지 금지) */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  근력: Dumbbell,
  근지구력: Timer,
  순발력: Zap,
  유산소: Flame,
  심폐지구력: HeartPulse,
};

interface VideoThumbnailProps {
  /** 동영상 API의 IMG_FILE_URL 또는 로컬 생성 이미지 경로. 비어 있으면 아이콘 */
  src: string;
  category: string;
  alt: string;
}

/**
 * 영상 썸네일 — 이미지가 없거나 로드에 실패하면 카테고리 아이콘으로 폴백한다.
 * 실 API 연동 시 IMG_FILE_URL이 그대로 들어오고, 그전까지는 로컬 이미지를 쓴다.
 */
export default function VideoThumbnail({
  src,
  category,
  alt,
}: VideoThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const Icon = CATEGORY_ICON[category] ?? Dumbbell;

  if (!src || failed) {
    return (
      <span
        className="flex h-16 w-24 flex-none items-center justify-center rounded-sharp bg-surface-neutral text-chart-1"
        aria-hidden
      >
        <Icon size={26} strokeWidth={1.75} />
      </span>
    );
  }

  return (
    <span className="relative h-16 w-24 flex-none overflow-hidden rounded-sharp bg-surface-neutral">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="96px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
