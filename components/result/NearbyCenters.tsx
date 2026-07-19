"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import type { KspoCenterRecord } from "@/data/mockCenters";
import { SIDO_LIST } from "@/lib/centers";
import { SectionCard } from "@/components/ui/Card";

/** 지역 선택 → 해당 시도 체력인증센터 안내 (§12-10 온라인은 오프라인으로 이어진다) */
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
    <SectionCard
      title="가까운 체력인증센터"
      description="오늘 결과는 간이 측정입니다. 인증센터에서 무료로 정식 측정을 받고 국가공인 체력인증서를 받을 수 있습니다."
      source="출처: 국민체력100 체력인증센터 측정건수 정보 (data.go.kr)"
    >
      <label
        htmlFor="sido-select"
        className="mb-1.5 block text-[0.9375rem] font-bold text-heading"
      >
        지역
      </label>
      <select
        id="sido-select"
        value={sido}
        onChange={(e) => handleSidoChange(e.target.value)}
        className="mb-4 h-14 w-full rounded-sharp border border-hairline bg-white px-4 text-[1.0625rem] font-medium text-body focus:border-brand-hover focus:bg-mint focus:outline-none"
      >
        {SIDO_LIST.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {centers === null ? (
        <ul className="space-y-2.5" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <li key={i} className="skeleton h-[4.5rem] rounded-sharp" />
          ))}
        </ul>
      ) : centers.length === 0 ? (
        <p className="py-6 text-center text-[0.9375rem] text-caption">
          {failed
            ? "센터 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요."
            : "해당 지역의 센터 정보를 준비 중이에요."}
        </p>
      ) : (
        <ul className="space-y-2.5">
          {centers.map((center, i) => (
            <li
              key={center.CNTER_NM}
              className="animate-arrive rounded-sharp border border-hairline p-3.5"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-[0.9375rem] font-bold text-heading">
                  {center.CNTER_NM}
                </p>
                <span className="flex-none rounded-chip bg-mint px-2.5 py-1 text-[0.75rem] font-medium text-brand">
                  측정 {center.MESURE_CO.toLocaleString()}건
                </span>
              </div>
              <a
                href={`https://map.kakao.com/link/search/${encodeURIComponent(center.CNTER_NM)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-start gap-1 text-[0.8125rem] text-caption hover:text-brand"
              >
                <MapPin size={14} strokeWidth={2} className="mt-0.5 flex-none" aria-hidden />
                {center.ROAD_NM_ADDR}
              </a>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}
