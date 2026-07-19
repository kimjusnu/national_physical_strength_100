/**
 * 국민체력100 측정결과 API(15108938)의 원자료를 집계해
 * data/normTables.generated.ts 를 생성하는 스크립트.
 *
 * 사용법:
 *   USE_MOCK=false npx tsx scripts/buildNormTables.ts [--pages 20]
 *
 * 생성된 파일의 GENERATED_NORM_TABLES를 검토한 뒤,
 * data/normTables.ts의 NORM_TABLES 값으로 옮기면 실데이터 기준선이 적용된다.
 *
 * 한계(공고용 메모):
 * - 오픈API가 페이지 단위로만 원자료를 제공하므로 전수가 아닌 표본 집계다.
 * - 셀당 표본이 MIN_SAMPLES_PER_CELL 미만이면 기존 공개 기준값을 유지하고
 *   경고로 남긴다. 실행 로그의 경고 수로 커버리지를 확인할 수 있다.
 * - 왕복오래달리기(shuttle)는 현재 API 응답 항목에 없어 기존 기준값을 유지한다.
 */

import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fetchMeasurements } from "../lib/kspoApi";
import { aggregateNormTables } from "../lib/normAggregate";
import type { KspoMeasurementRecord } from "../data/mockMeasurements";

const ROWS_PER_PAGE = 1000;
const DEFAULT_PAGES = 20;
const OUTPUT_PATH = path.join(process.cwd(), "data", "normTables.generated.ts");

function parsePages(argv: string[]): number {
  const index = argv.indexOf("--pages");
  if (index === -1) return DEFAULT_PAGES;
  const value = Number(argv[index + 1]);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : DEFAULT_PAGES;
}

async function collectRecords(pages: number): Promise<KspoMeasurementRecord[]> {
  const collected: KspoMeasurementRecord[] = [];

  for (let page = 1; page <= pages; page++) {
    const batch = await fetchMeasurements({ page, perPage: ROWS_PER_PAGE });
    console.log(`  page ${page}: ${batch.length}건`);
    collected.push(...batch);
    if (batch.length < ROWS_PER_PAGE) {
      console.log("  마지막 페이지에 도달했습니다.");
      break;
    }
  }

  return collected;
}

function renderFile(
  tables: unknown,
  warnings: string[],
  recordCount: number,
): string {
  return `/**
 * 자동 생성 파일 — scripts/buildNormTables.ts 실행 결과.
 * 직접 수정하지 말고 스크립트를 다시 실행하세요.
 *
 * 집계 표본: ${recordCount.toLocaleString()}건
 * 표본 부족으로 기존 기준값을 유지한 셀: ${warnings.length}개
 */

import type { ItemNorm } from "@/data/normTables";
import type { FitnessItemKey, Gender } from "@/lib/types";

export const GENERATED_NORM_TABLES: Record<
  Gender,
  Record<FitnessItemKey, ItemNorm>
> = ${JSON.stringify(tables, null, 2)};

export const GENERATION_WARNINGS: string[] = ${JSON.stringify(warnings, null, 2)};
`;
}

async function main() {
  const pages = parsePages(process.argv);
  const usingMock = process.env.USE_MOCK !== "false";

  console.log(
    `국민체력100 측정결과 수집 시작 (${usingMock ? "목업" : "실 API"}, 최대 ${pages}페이지)`,
  );
  if (usingMock) {
    console.warn(
      "⚠ USE_MOCK이 false가 아닙니다. 실데이터 집계를 원하면 USE_MOCK=false로 실행하세요.",
    );
  }

  const records = await collectRecords(pages);
  console.log(`총 ${records.length.toLocaleString()}건 수집 완료`);

  const { tables, warnings } = aggregateNormTables(records);
  await writeFile(
    OUTPUT_PATH,
    renderFile(tables, warnings, records.length),
    "utf8",
  );

  console.log(`✓ ${OUTPUT_PATH} 생성 완료`);
  if (warnings.length > 0) {
    console.log(`\n표본 부족 등으로 기존 기준값을 유지한 항목 ${warnings.length}건:`);
    for (const warning of warnings.slice(0, 10)) {
      console.log(`  - ${warning}`);
    }
    if (warnings.length > 10) {
      console.log(`  … 외 ${warnings.length - 10}건 (생성 파일의 GENERATION_WARNINGS 참고)`);
    }
  }
}

main().catch((error) => {
  console.error("기준테이블 생성 실패:", error);
  process.exit(1);
});
