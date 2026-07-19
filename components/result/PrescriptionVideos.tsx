import { Dumbbell, ExternalLink, Flame, HeartPulse, Timer, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { KspoVideoRecord } from "@/data/mockVideos";
import type { FitnessItemKey } from "@/lib/types";
import { ITEM_LABELS } from "@/data/normTables";
import { ITEM_TO_FT_CATEGORY, reasonFor } from "@/lib/videoMatch";
import { SectionCard } from "@/components/ui/Card";

interface PrescriptionVideosProps {
  videos: KspoVideoRecord[];
  weakItems: FitnessItemKey[];
}

/** 체력요인 카테고리 → 아이콘 (§7: 이모지 금지, lucide 스트로크 아이콘) */
const CATEGORY_ICON: Record<string, LucideIcon> = {
  근력: Dumbbell,
  근지구력: Timer,
  순발력: Zap,
  유산소: Flame,
  심폐지구력: HeartPulse,
};

export default function PrescriptionVideos({
  videos,
  weakItems,
}: PrescriptionVideosProps) {
  if (videos.length === 0) return null;

  const categoryToWeakItem = new Map(
    weakItems.map((key) => [ITEM_TO_FT_CATEGORY[key], key]),
  );

  return (
    <SectionCard
      title="맞춤 운동 처방"
      description={`${weakItems.map((k) => ITEM_LABELS[k]).join(", ")} 보완에 좋은 국민체력100 운동 영상입니다.`}
      source="출처: 국민체력100 동영상 정보 (data.go.kr)"
    >
      <ul className="space-y-2.5">
        {videos.map((video, i) => {
          const weakKey = categoryToWeakItem.get(video.FT_ITEM_NM);
          const Icon = CATEGORY_ICON[video.FT_ITEM_NM] ?? Dumbbell;
          return (
            <li key={video.VDO_TTL_NM}>
              <a
                href={video.VDO_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-arrive flex gap-3 rounded-sharp border border-hairline p-3 transition-colors hover:border-brand hover:bg-mint"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span
                  className="flex h-16 w-24 flex-none items-center justify-center rounded-sharp bg-surface-neutral text-chart-1"
                  aria-hidden
                >
                  <Icon size={26} strokeWidth={1.75} />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 truncate text-[0.9375rem] font-bold text-heading">
                    {video.VDO_TTL_NM}
                    <ExternalLink
                      size={13}
                      strokeWidth={2}
                      className="flex-none text-placeholder"
                      aria-hidden
                    />
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[0.8125rem] text-caption">
                    {video.VDO_DESC}
                  </p>
                  {/* §12-1: 모든 추천에는 한 문장 근거가 붙는다 */}
                  <p className="mt-1 text-[0.8125rem] font-medium text-brand">
                    {weakKey
                      ? reasonFor(weakKey)
                      : `${video.FT_ITEM_NM} 향상 · ${video.TRGT_AGRDE_NM}`}
                  </p>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
