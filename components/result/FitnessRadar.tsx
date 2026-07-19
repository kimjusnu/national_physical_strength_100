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

/**
 * 항목별 백분위 레이더 — DESIGN.md §12-8.
 * 또래 평균(50%)은 중립 틸-슬레이트, 내 값만 브랜드 그린.
 */
export default function FitnessRadar({ items }: FitnessRadarProps) {
  const data = items.map((item) => ({
    label: ITEM_LABELS[item.key],
    mine: Math.round(item.percentile),
    peer: 50,
  }));

  return (
    <div
      className="h-64 w-full"
      role="img"
      aria-label={`항목별 백분위: ${data.map((d) => `${d.label} 상위 ${100 - d.mine}%`).join(", ")}`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#e1e1e1" />
          <PolarAngleAxis
            dataKey="label"
            tick={{ fill: "#7b7b7b", fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          {/* 또래 평균이 먼저 그려지고, 내 값이 마지막에 얹힌다 — §15 시그니처 모션 3 */}
          <Radar
            name="또래 평균"
            dataKey="peer"
            stroke="#a7c7cf"
            strokeDasharray="3 3"
            fill="#a7c7cf"
            fillOpacity={0.25}
            isAnimationActive={false}
          />
          <Radar
            name="내 값"
            dataKey="mine"
            stroke="#04c584"
            strokeWidth={2}
            fill="#04c584"
            fillOpacity={0.4}
            animationDuration={600}
            animationBegin={200}
          />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-1 flex justify-center gap-4 text-[0.75rem] text-caption">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4 bg-brand" aria-hidden />내 값
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-0.5 w-4 bg-chart-4"
            aria-hidden
          />
          또래 평균
        </span>
      </div>
    </div>
  );
}
