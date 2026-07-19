/**
 * 보고서 삽입용 코드 캡처 생성.
 *
 * 실제 소스 파일에서 지정한 구간을 그대로 읽어 HTML로 렌더한 뒤 PNG로 저장한다.
 * 코드를 문서에 옮겨 적지 않고 원본을 읽으므로, 소스가 바뀌면 다시 실행만 하면
 * 캡처도 최신 상태가 된다.
 *
 * 사용법: npx tsx scripts/renderCodeShots.ts
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "docs", "report-images");

interface Excerpt {
  file: string;
  /** 1-based, 양끝 포함 */
  from: number;
  to: number;
}

interface Shot {
  out: string;
  title: string;
  subtitle: string;
  excerpts: Excerpt[];
}

const SHOTS: Shot[] = [
  {
    out: "code-01-norm-aggregate.png",
    title: "① 기준분포 집계 · 체력나이 산출",
    subtitle: "국민체력100 체력인증센터 측정결과 정보 (data.go.kr 15108938)",
    excerpts: [
      { file: "lib/normAggregate.ts", from: 100, to: 129 },
      { file: "lib/fitnessAge.ts", from: 48, to: 81 },
    ],
  },
  {
    out: "code-02-video-match.png",
    title: "② 약점 항목 기반 운동처방 영상 추천",
    subtitle: "국민체력100 동영상 정보 (data.go.kr 15108846)",
    excerpts: [
      { file: "lib/videoMatch.ts", from: 14, to: 30 },
      { file: "lib/videoMatch.ts", from: 36, to: 69 },
    ],
  },
  {
    out: "code-03-centers.png",
    title: "③ 체력인증센터 조회",
    subtitle: "국민체력100 체력인증센터 측정건수 정보 (data.go.kr 15114286)",
    excerpts: [
      { file: "lib/centers.ts", from: 28, to: 44 },
      { file: "lib/kspoApi.ts", from: 118, to: 141 },
      { file: "app/api/centers/route.ts", from: 1, to: 21 },
    ],
  },
];

const KEYWORDS =
  /\b(export|const|let|function|return|if|else|for|throw|new|await|async|try|catch|typeof|interface|type|import|from|number|string|boolean)\b/g;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** 주석 → 문자열 → 숫자 → 키워드 순으로 감싼다 (앞 단계 결과는 건드리지 않음) */
function highlight(line: string): string {
  const escaped = escapeHtml(line);

  const commentAt = escaped.search(/\/\/|\/\*|\*\s|\*\//);
  const isComment =
    /^\s*(\/\/|\/\*|\*)/.test(escaped) || escaped.trimStart().startsWith("*");

  if (isComment) return `<span class="c">${escaped}</span>`;

  let code = escaped;
  let trailing = "";
  if (commentAt > 0 && /\/\//.test(escaped.slice(commentAt))) {
    const idx = escaped.indexOf("//");
    code = escaped.slice(0, idx);
    trailing = `<span class="c">${escaped.slice(idx)}</span>`;
  }

  const out = code
    .replace(/(&quot;|&#39;|`)([^&`]*?)\1/g, '<span class="s">$1$2$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="n">$1</span>')
    .replace(KEYWORDS, '<span class="k">$&</span>');

  return out + trailing;
}

async function buildBlock(ex: Excerpt): Promise<string> {
  const abs = path.join(ROOT, ex.file);
  const lines = (await readFile(abs, "utf8")).split(/\r?\n/);
  const slice = lines.slice(ex.from - 1, ex.to);

  const rows = slice
    .map((line, i) => {
      const no = ex.from + i;
      return `<tr><td class="ln">${no}</td><td class="code">${highlight(line) || "&nbsp;"}</td></tr>`;
    })
    .join("");

  return `
    <section class="block">
      <div class="path">${escapeHtml(ex.file)}<span class="range">L${ex.from}–${ex.to}</span></div>
      <table>${rows}</table>
    </section>`;
}

async function buildHtml(shot: Shot): Promise<string> {
  const blocks = (await Promise.all(shot.excerpts.map(buildBlock))).join("");
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
  * { margin:0; padding:0; box-sizing:border-box; }
  /* 합자를 끈다 — >= 가 ≥ 로 보이면 보고서에서 실제 코드와 다르게 읽힌다 */
  code, td, .path { font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0; }
  body {
    width: 980px; padding: 32px; background: #ffffff;
    font-family: "Pretendard Variable", Pretendard, -apple-system, "Malgun Gothic", sans-serif;
  }
  header { margin-bottom: 20px; }
  h1 { font-size: 22px; font-weight: 700; color: #2b2b2b; letter-spacing: -0.5px; }
  .sub { margin-top: 5px; font-size: 13px; font-weight: 500; color: #04c584; }
  .block { margin-top: 16px; border: 1px solid #e1e1e1; border-radius: 2px; overflow: hidden; }
  .path {
    display:flex; justify-content:space-between; align-items:center;
    background: #f5f5f5; border-bottom: 1px solid #e1e1e1;
    padding: 8px 14px; font-size: 12.5px; font-weight: 700; color: #434444;
    font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  }
  .range { color: #7b7b7b; font-weight: 500; }
  table { width: 100%; border-collapse: collapse; background: #ffffff; }
  td { vertical-align: top; padding: 0; }
  .ln {
    width: 46px; text-align: right; padding: 1px 12px 1px 0;
    color: #b8b8b8; font-size: 12px; user-select: none;
    font-family: ui-monospace, Consolas, monospace;
    border-right: 1px solid #f0f0f0;
  }
  .code {
    padding: 1px 0 1px 14px; font-size: 12.5px; line-height: 1.65;
    white-space: pre-wrap; word-break: break-all; color: #2b2b2b;
    font-family: ui-monospace, "Cascadia Code", Consolas, monospace;
  }
  .k { color: #1c6c73; font-weight: 700; }
  .s { color: #04c584; }
  .n { color: #f56200; }
  .c { color: #9aa0a0; font-style: italic; }
  footer { margin-top: 16px; font-size: 11.5px; color: #7b7b7b; }
</style></head><body>
  <header>
    <h1>${escapeHtml(shot.title)}</h1>
    <p class="sub">${escapeHtml(shot.subtitle)}</p>
  </header>
  ${blocks}
  <footer>체력나이 (Fitness Age) · github.com/kimjusnu/national_physical_strength_100</footer>
</body></html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 2 });

  for (const shot of SHOTS) {
    const html = await buildHtml(shot);
    const tmp = path.join(OUT_DIR, `.${shot.out}.html`);
    await writeFile(tmp, html, "utf8");
    await page.goto(`file://${tmp.replace(/\\/g, "/")}`);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(OUT_DIR, shot.out), fullPage: true });
    console.log(`생성: docs/report-images/${shot.out}`);
  }

  await browser.close();
}

main().catch((error) => {
  console.error("코드 캡처 생성 실패:", error);
  process.exit(1);
});
