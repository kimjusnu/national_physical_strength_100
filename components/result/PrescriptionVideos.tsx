import type { KspoVideoRecord } from "@/data/mockVideos";
import type { FitnessItemKey } from "@/lib/types";
import { ITEM_LABELS } from "@/data/normTables";
import { ITEM_TO_FT_CATEGORY, reasonFor } from "@/lib/videoMatch";

interface PrescriptionVideosProps {
  videos: KspoVideoRecord[];
  weakItems: FitnessItemKey[];
}

const CATEGORY_EMOJI: Record<string, string> = {
  근력: "💪",
  근지구력: "🧘",
  순발력: "⚡",
  유산소: "🔥",
  심폐지구력: "🏃",
};

/** 약점 항목 기반 맞춤 운동처방 영상 카드 리스트 */
export default function PrescriptionVideos({
  videos,
  weakItems,
}: PrescriptionVideosProps) {
  if (videos.length === 0) return null;

  const categoryToWeakItem = new Map(
    weakItems.map((key) => [ITEM_TO_FT_CATEGORY[key], key]),
  );

  return (
    <section className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5">
      <h2 className="mb-1 text-lg font-bold">맞춤 운동처방 영상</h2>
      <p className="mb-4 text-xs text-neutral-500">
        {weakItems.map((k) => ITEM_LABELS[k]).join(", ")} 보완에 좋은 국민체력100
        운동 영상이에요.
      </p>
      <ul className="space-y-3">
        {videos.map((video) => {
          const weakKey = categoryToWeakItem.get(video.FT_ITEM_NM);
          return (
            <li key={video.VDO_TTL_NM}>
              <a
                href={video.VDO_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3 hover:border-emerald-400 transition-colors"
              >
                <span
                  className="flex h-16 w-24 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900 dark:to-teal-900 text-3xl"
                  aria-hidden
                >
                  {CATEGORY_EMOJI[video.FT_ITEM_NM] ?? "🎬"}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-sm">
                    {video.VDO_TTL_NM}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                    {video.VDO_DESC}
                  </p>
                  <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
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
      <p className="mt-3 text-right text-[11px] text-neutral-400">
        출처: 국민체력100 동영상 정보 (data.go.kr)
      </p>
    </section>
  );
}
