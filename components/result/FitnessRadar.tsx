"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { ITEM_LABELS } from "@/data/normTables";
import type { ItemResult } from "@/lib/types";

interface FitnessRadarProps {
  items: ItemResult[];
}

/** 항목별 백분위 레이더 차트 (같은 성별·연령대 내 상대 위치) */
export default function FitnessRadar({ items }: FitnessRadarProps) {
  const data = items.map((item) => ({
    label: ITEM_LABELS[item.key],
    percentile: Math.round(item.percentile),
  }));

  return (
    <div className="h-72 w-full" role="img" aria-label="항목별 백분위 레이더 차트">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="70%">
          <PolarGrid stroke="#d4d4d4" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "currentColor", fontSize: 12 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            dataKey="percentile"
            stroke="#059669"
            fill="#10b981"
            fillOpacity={0.45}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
