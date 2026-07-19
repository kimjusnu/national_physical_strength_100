import { ITEM_LABELS, ITEM_UNITS } from "@/data/normTables";
import type { ItemResult } from "@/lib/types";

interface ItemBreakdownProps {
  items: ItemResult[];
}

function barColor(percentile: number): string {
  if (percentile >= 60) return "bg-emerald-500";
  if (percentile <= 40) return "bg-orange-400";
  return "bg-neutral-400";
}

/** 항목별 측정값·백분위·체력나이 상세 */
export default function ItemBreakdown({ items }: ItemBreakdownProps) {
  return (
    <ul className="space-y-4">
      {items.map((item) => {
        const p = Math.round(item.percentile);
        return (
          <li key={item.key}>
            <div className="mb-1 flex items-baseline justify-between text-sm">
              <span className="font-medium">
                {ITEM_LABELS[item.key]}
                <span className="ml-2 text-neutral-400">
                  {item.value}
                  {ITEM_UNITS[item.key]}
                </span>
              </span>
              <span className="text-xs text-neutral-500">
                상위 {100 - p}% · 체력나이 {Math.round(item.fitnessAge)}세
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className={`h-2.5 rounded-full ${barColor(p)}`}
                style={{ width: `${Math.max(p, 3)}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
