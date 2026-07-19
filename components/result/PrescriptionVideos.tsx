import { ExternalLink } from "lucide-react";
import type { KspoVideoRecord } from "@/data/mockVideos";
import type { FitnessItemKey } from "@/lib/types";
import { ITEM_LABELS } from "@/data/normTables";
import { ITEM_TO_FT_CATEGORY, reasonFor } from "@/lib/videoMatch";
import { shortenVideoTitle } from "@/lib/videoTitle";
import { SectionCard } from "@/components/ui/Card";
import VideoThumbnail from "@/components/result/VideoThumbnail";

interface PrescriptionVideosProps {
  videos: KspoVideoRecord[];
  weakItems: FitnessItemKey[];
}

interface VideoGroup {
  key: string;
  /** 이 묶음의 추천 근거 (§12-1). 약점 항목이 아니면 카테고리 설명 */
  reason: string;
  videos: KspoVideoRecord[];
}

/**
 * 약점 항목별로 영상을 묶는다. 같은 근거 문장을 카드마다 반복하면
 * 정보가 아니라 노이즈가 되므로, 근거는 묶음당 한 번만 노출한다.
 */
function groupByReason(
  videos: KspoVideoRecord[],
  weakItems: FitnessItemKey[],
): VideoGroup[] {
  const categoryToWeakItem = new Map(
    weakItems.map((key) => [ITEM_TO_FT_CATEGORY[key], key]),
  );

  return videos.reduce<VideoGroup[]>((groups, video) => {
    const category = video.FT_ITEM_NM;
    const existing = groups.find((g) => g.key === category);
    if (existing) {
      return groups.map((g) =>
        g === existing ? { ...g, videos: [...g.videos, video] } : g,
      );
    }

    const weakKey = categoryToWeakItem.get(category);
    return [
      ...groups,
      {
        key: category,
        reason: weakKey ? reasonFor(weakKey) : `${category} 향상에 좋은 운동이에요`,
        videos: [video],
      },
    ];
  }, []);
}

export default function PrescriptionVideos({
  videos,
  weakItems,
}: PrescriptionVideosProps) {
  if (videos.length === 0) return null;

  const groups = groupByReason(videos, weakItems);
  let cardIndex = 0;

  return (
    <SectionCard
      title="맞춤 운동 처방"
      description={`${weakItems.map((k) => ITEM_LABELS[k]).join(", ")} 보완에 좋은 국민체력100 운동 영상입니다.`}
      source="출처: 국민체력100 동영상 정보 (data.go.kr)"
    >
      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.key}>
            {/* §12-1: 추천 근거는 묶음당 한 번 */}
            <p className="mb-2 border-l-2 border-brand pl-2.5 text-[0.8125rem] font-bold text-brand">
              {group.reason}
            </p>

            <ul className="space-y-2.5">
              {group.videos.map((video) => {
                const delay = cardIndex++ * 60;
                return (
                  <li key={video.VDO_TTL_NM}>
                    <a
                      href={video.VDO_LINK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={video.VDO_TTL_NM}
                      className="animate-arrive flex gap-3 rounded-sharp border border-hairline p-3 transition-colors hover:border-brand hover:bg-mint"
                      style={{ animationDelay: `${delay}ms` }}
                    >
                      <VideoThumbnail
                        src={video.IMG_FILE_URL}
                        category={video.FT_ITEM_NM}
                        alt=""
                      />
                      <div className="min-w-0 flex-1">
                        {/* 채널·시리즈 접두어를 걷어낸 표시용 제목 (원문은 title 속성) */}
                        <p className="line-clamp-2 text-[0.9375rem] font-bold leading-snug text-heading">
                          {shortenVideoTitle(video.VDO_TTL_NM)}
                        </p>
                        <p className="mt-1 line-clamp-2 text-[0.8125rem] leading-relaxed text-caption">
                          {video.VDO_DESC}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-[0.75rem] text-placeholder">
                          {video.TRGT_AGRDE_NM}
                          <span aria-hidden>·</span>
                          유튜브에서 보기
                          <ExternalLink size={11} strokeWidth={2} aria-hidden />
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
