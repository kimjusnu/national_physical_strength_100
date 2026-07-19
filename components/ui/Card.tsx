import type { ReactNode } from "react";

/** DESIGN.md §4 Cards — 흰 배경, 1px hairline, 2px radius, 중립 단일 그림자 */

interface SectionCardProps {
  title: string;
  description?: string;
  /** §12-6: 데이터 출처는 카드 안에 고정 렌더. 푸터로 밀지 않는다 */
  source?: string;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  source,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-sharp border border-hairline bg-white px-5 py-5 shadow-[0_2px_5px_rgba(0,0,0,0.12)] ${className}`}
    >
      <h2 className="text-xl font-bold text-heading">{title}</h2>
      {description && (
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-caption">
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
      {source && (
        <p className="mt-4 border-t border-hairline pt-3 text-[0.6875rem] text-caption">
          {source}
        </p>
      )}
    </section>
  );
}
