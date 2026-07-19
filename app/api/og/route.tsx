import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { computeFitnessAge } from "@/lib/fitnessAge";
import { parseResultQuery } from "@/lib/schemas";
import { ITEM_LABELS } from "@/data/normTables";
import type { UserMeasurement } from "@/lib/types";

/**
 * 결과 공유용 동적 OG 이미지.
 *
 * 링크를 공유했을 때 미리보기에 그 사람의 체력나이가 찍히도록 요청 시점에
 * 렌더한다. Next.js의 opengraph-image 규약은 라우트 단위라 쿼리스트링을
 * 받지 못하므로(정적 생성) Route Handler로 구현했다.
 *
 * Pretendard OTF를 파일에서 읽으므로 Node 런타임을 쓴다
 * (폰트 포함 설정: next.config.ts outputFileTracingIncludes).
 *
 * satori 제약: div에 자식이 둘 이상이면 display를 명시해야 한다.
 * 아래 JSX는 모든 div에 display를 붙여 그 제약을 항상 만족시킨다.
 */
export const runtime = "nodejs";

const SIZE = { width: 1200, height: 630 };

const C = {
  canvas: "#ffffff",
  mint: "#f3fdfa",
  brand: "#04c584",
  heading: "#2b2b2b",
  body: "#434444",
  caption: "#7b7b7b",
  chart2: "#5c818a",
} as const;

async function loadFont(file: string): Promise<ArrayBuffer> {
  const buf = await readFile(path.join(process.cwd(), "assets", "fonts", file));
  return Uint8Array.from(buf).buffer;
}

/** 측정값 없이 접근한 경우 — 서비스 소개형 */
function IntroCard() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 90px",
        background: C.canvas,
        fontFamily: "Pretendard",
      }}
    >
      <div style={{ display: "flex", fontSize: 34, fontWeight: 500, color: C.body }}>
        국민체력100 공공데이터 기반
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontWeight: 700,
          color: C.heading,
          marginTop: 18,
          letterSpacing: -2,
        }}
      >
        내 체력은 또래 중에
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 82,
          fontWeight: 700,
          color: C.brand,
          letterSpacing: -2,
        }}
      >
        어디쯤일까요?
      </div>
    </div>
  );
}

function ResultCard({ user }: { user: UserMeasurement }) {
  const result = computeFitnessAge(user);
  const fitnessAge = Math.round(result.overallAge);
  const gap = user.age - fitnessAge;
  const gapText =
    gap > 0
      ? `실제 나이보다 ${gap}세 젊어요`
      : gap < 0
        ? `실제 나이보다 ${-gap}세 많아요`
        : "실제 나이와 같아요";

  const bars = result.items.map((item) => ({
    label: ITEM_LABELS[item.key],
    percentile: Math.round(item.percentile),
  }));

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: C.canvas,
        fontFamily: "Pretendard",
      }}
    >
      {/* 좌측 — 체력나이 */}
      <div
        style={{
          display: "flex",
          width: 700,
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 70px",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, fontWeight: 500, color: C.body }}>
          국민체력100 데이터와 비교한 나의 체력나이
        </div>

        <div style={{ display: "flex", alignItems: "baseline", marginTop: 6 }}>
          <div
            style={{
              display: "flex",
              fontSize: 200,
              fontWeight: 700,
              color: C.brand,
              letterSpacing: -8,
              lineHeight: 1,
            }}
          >
            {fitnessAge}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 700,
              color: C.brand,
              marginLeft: 10,
              lineHeight: 1,
            }}
          >
            세
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 46,
            fontWeight: 700,
            color: C.heading,
            marginTop: 18,
          }}
        >
          {gapText}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontWeight: 500,
            color: C.caption,
            marginTop: 12,
          }}
        >
          {`실제 나이 ${user.age}세 기준 · 체력나이`}
        </div>
      </div>

      {/* 우측 — 항목별 위치 */}
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          paddingRight: 70,
        }}
      >
        {bars.map((bar) => (
          <div
            key={bar.label}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 500,
                color: C.caption,
                marginBottom: 7,
              }}
            >
              {bar.label}
            </div>
            <div
              style={{
                display: "flex",
                width: 340,
                height: 18,
                background: C.mint,
                borderRadius: 2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: Math.max((340 * bar.percentile) / 100, 8),
                  height: "100%",
                  background: bar.percentile >= 60 ? C.brand : C.chart2,
                  borderRadius: 2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function GET(request: Request) {
  // 폰트 읽기만 감싼다. ImageResponse는 즉시 렌더하지 않으므로
  // 렌더 단계 오류는 try/catch로 잡히지 않는다.
  let fonts;
  try {
    const [bold, medium] = await Promise.all([
      loadFont("Pretendard-Bold.otf"),
      loadFont("Pretendard-Medium.otf"),
    ]);
    fonts = [
      { name: "Pretendard", data: bold, weight: 700 as const, style: "normal" as const },
      {
        name: "Pretendard",
        data: medium,
        weight: 500 as const,
        style: "normal" as const,
      },
    ];
  } catch (error) {
    console.error("OG 폰트 로딩 실패:", error);
    // 미리보기가 깨지는 것보다 정적 기본 이미지로 넘기는 편이 낫다
    return Response.redirect(new URL("/opengraph-image.png", request.url), 302);
  }

  const params = Object.fromEntries(new URL(request.url).searchParams);
  const user = parseResultQuery(params);

  return new ImageResponse(user ? <ResultCard user={user} /> : <IntroCard />, {
    ...SIZE,
    fonts,
  });
}
