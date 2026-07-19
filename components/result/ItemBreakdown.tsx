import { ITEM_LABELS, ITEM_UNITS } from "@/data/normTables";
import type { ItemResult } from "@/lib/types";

interface ItemBreakdownProps {
  items: ItemResult[];
}

/** §4 Item Rows — 상위권 초록, 하위권 경고 오렌지, 그 사이는 중립 */
function barColor(percentile: number): string {
  if (percentile >= 60) return "bg-brand";
  if (percentile <= 40) return "bg-warn";
  return "bg-chart-2";
}

export default function ItemBreakdown({ items }: ItemBreakdownProps) {
  return (
    <ul className="border-t border-hairline">
      {items.map((item, i) => {
        const p = Math.round(item.percentile);
        return (
          <li key={item.key} className="border-b border-hairline py-3.5">
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-[0.9375rem] font-medium text-body">
                {ITEM_LABELS[item.key]}
                <span className="ml-2 font-bold text-heading">
                  {item.value}
                  <span className="ml-0.5 font-medium text-caption">
                    {ITEM_UNITS[item.key]}
                  </span>
                </span>
              </span>
              <span className="flex-none text-[0.8125rem] text-caption">
                상위 {100 - p}% · 체력나이 {Math.round(item.fitnessAge)}세
              </span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-sharp bg-surface-neutral">
              {/* §15 시그니처 모션 2 — 위에서 아래로 60ms stagger */}
              <div
                className={`animate-fill-bar h-full rounded-sharp ${barColor(p)}`}
                style={{
                  width: `${Math.max(p, 2)}%`,
                  animationDelay: `${i * 60}ms`,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
