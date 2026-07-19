"use client";

import { useEffect, useState } from "react";
import type { KspoCenterRecord } from "@/data/mockCenters";
import { SIDO_LIST } from "@/lib/centers";

/** 지역 선택 → 해당 시도 체력인증센터 안내 (온라인 측정 → 오프라인 인증 연계) */
export default function NearbyCenters() {
  const [sido, setSido] = useState<string>("서울");
  const [centers, setCenters] = useState<KspoCenterRecord[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/centers?sido=${encodeURIComponent(sido)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`centers API ${res.status}`);
        return res.json();
      })
      .then((data: KspoCenterRecord[]) => {
        if (!cancelled) setCenters(data);
      })
      .catch(() => {
        if (!cancelled) {
          setCenters([]);
          setFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [sido]);

  const handleSidoChange = (next: string) => {
    setSido(next);
    setCenters(null);
    setFailed(false);
  };

  return (
    <section className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-5">
      <h2 className="mb-1 text-lg font-bold">가까운 체력인증센터</h2>
      <p className="mb-3 text-xs text-neutral-500">
        오늘 결과는 간이 측정이에요. 인증센터에서 무료로 정식 측정하고 국가공인
        체력인증서를 받아보세요.
      </p>

      <label htmlFor="sido-select" className="mb-1 block text-sm font-medium">
        지역 선택
      </label>
      <select
        id="sido-select"
        value={sido}
        onChange={(e) => handleSidoChange(e.target.value)}
        className="mb-4 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-background px-4 py-3 text-base focus:border-emerald-500 focus:outline-none"
      >
        {SIDO_LIST.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {centers === null ? (
        <p className="py-4 text-center text-sm text-neutral-400">
          센터 정보를 불러오는 중…
        </p>
      ) : centers.length === 0 ? (
        <p className="py-4 text-center text-sm text-neutral-400">
          {failed
            ? "센터 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요."
            : "해당 지역의 센터 정보를 준비 중이에요."}
        </p>
      ) : (
        <ul className="space-y-3">
          {centers.map((center) => (
            <li
              key={center.CNTER_NM}
              className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm">{center.CNTER_NM}</p>
                <span className="flex-none rounded-full bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                  누적 측정 {center.MESURE_CO.toLocaleString()}건
                </span>
              </div>
              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(center.CNTER_NM)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-xs text-neutral-500 underline underline-offset-2 hover:text-emerald-600"
              >
                📍 {center.ROAD_NM_ADDR}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950 p-4 text-center">
        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
          실제 측정으로 정확히 인증받기
        </p>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
          전국 인증센터에서 전문 측정사가 무료로 측정해드려요. 오늘 결과를 들고
          방문해 비교해보세요!
        </p>
      </div>
      <p className="mt-3 text-right text-[11px] text-neutral-400">
        출처: 국민체력100 체력인증센터 측정건수 정보 (data.go.kr)
      </p>
    </section>
  );
}
