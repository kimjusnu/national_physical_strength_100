import { ITEM_LABELS } from "@/data/normTables";
import type { FitnessAgeResult } from "@/lib/types";

/**
 * 결과 카드 공유 이미지 — 순수 모델(buildCardModel, 테스트 대상)과
 * 브라우저 canvas 렌더러(generateResultCard)를 분리했다.
 * 시각 스펙은 DESIGN.md §2 색상 · §5 radius 2px · §7 그래디언트 금지를 따른다.
 */

export interface ShareCardModel {
  fitnessAge: number;
  realAge: number;
  gapText: string;
  badgeText: string | null;
  items: Array<{ label: string; percentile: number }>;
  watermark: string;
}

const BADGE_TEXTS = {
  elite: "상위 1% 체력",
  needsImprovement: "체력 개선 필요",
} as const;

/** 카드에 그릴 내용을 순수 데이터로 구성 */
export function buildCardModel(
  result: FitnessAgeResult,
  realAge: number,
): ShareCardModel {
  const fitnessAge = Math.round(result.overallAge);
  const gap = realAge - fitnessAge;
  const gapText =
    gap > 0
      ? `실제 나이보다 ${gap}세 젊어요`
      : gap < 0
        ? `실제 나이보다 ${-gap}세 많아요`
        : "실제 나이와 같아요";

  return {
    fitnessAge,
    realAge,
    gapText,
    badgeText: result.boundary ? BADGE_TEXTS[result.boundary] : null,
    items: result.items.map((item) => ({
      label: ITEM_LABELS[item.key],
      percentile: Math.round(item.percentile),
    })),
    watermark: "체력나이 · 국민체력100 데이터 기반",
  };
}

/* ---------- 이하 브라우저 전용 canvas 렌더링 ---------- */

const CARD_W = 1080;
const CARD_H = 1350;
const PAD = 80;
const RADIUS = 2;

const C = {
  canvas: "#ffffff",
  mint: "#f3fdfa",
  brand: "#04c584",
  heading: "#2b2b2b",
  body: "#434444",
  caption: "#7b7b7b",
  hairline: "#e1e1e1",
  neutral: "#f5f5f5",
  warn: "#fd8700",
  chart2: "#5c818a",
} as const;

const FONT = `Pretendard Variable, Pretendard, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif`;

const font = (weight: number, size: number) => `${weight} ${size}px ${FONT}`;

/** 세로형 결과 카드 이미지를 PNG Blob으로 생성 (브라우저 전용) */
export async function generateResultCard(model: ShareCardModel): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas 2d context를 사용할 수 없습니다.");
  }

  // Pretendard가 로드된 뒤에 그려야 폴백 폰트로 렌더되지 않는다
  await document.fonts?.ready;

  ctx.fillStyle = C.canvas;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  const heroBottom = drawHero(ctx, model);
  drawItems(ctx, model, heroBottom + 72);
  drawFooter(ctx, model);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("이미지 생성에 실패했습니다."));
    }, "image/png");
  });
}

/** 민트 틴트 히어로 블록. 반환값은 블록 하단 y좌표 */
function drawHero(ctx: CanvasRenderingContext2D, model: ShareCardModel): number {
  const top = PAD;
  const height = model.badgeText ? 560 : 480;
  const centerX = CARD_W / 2;

  ctx.fillStyle = C.mint;
  roundedRect(ctx, PAD, top, CARD_W - PAD * 2, height, RADIUS);
  ctx.fill();
  ctx.strokeStyle = C.hairline;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.textAlign = "center";

  ctx.fillStyle = C.body;
  ctx.font = font(500, 34);
  ctx.fillText("국민체력100 데이터와 비교한 나의 체력나이", centerX, top + 76);

  // 숫자와 "세"를 하나의 베이스라인에 정렬
  const ageText = String(model.fitnessAge);
  ctx.font = font(800, 240);
  const ageWidth = ctx.measureText(ageText).width;
  ctx.font = font(700, 64);
  const suffixWidth = ctx.measureText("세").width;
  const totalWidth = ageWidth + 12 + suffixWidth;
  const startX = centerX - totalWidth / 2;
  const baseline = top + 290;

  ctx.textAlign = "left";
  ctx.fillStyle = C.brand;
  ctx.font = font(800, 240);
  ctx.fillText(ageText, startX, baseline);
  ctx.font = font(700, 64);
  ctx.fillText("세", startX + ageWidth + 12, baseline);

  ctx.textAlign = "center";
  ctx.fillStyle = C.heading;
  ctx.font = font(700, 46);
  ctx.fillText(model.gapText, centerX, baseline + 78);

  ctx.fillStyle = C.caption;
  ctx.font = font(500, 28);
  ctx.fillText(`실제 나이 ${model.realAge}세 기준`, centerX, baseline + 124);

  if (model.badgeText) {
    drawBadge(ctx, model, centerX, baseline + 200);
  }

  return top + height;
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  model: ShareCardModel,
  centerX: number,
  y: number,
) {
  const isElite = model.badgeText === BADGE_TEXTS.elite;
  const color = isElite ? C.brand : C.warn;

  ctx.font = font(700, 32);
  const width = ctx.measureText(model.badgeText ?? "").width + 64;
  const height = 62;

  ctx.fillStyle = C.canvas;
  roundedRect(ctx, centerX - width / 2, y - height / 2, width, height, RADIUS);
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(model.badgeText ?? "", centerX, y + 1);
  ctx.textBaseline = "alphabetic";
}

/** 항목별 백분위 바. 반환값은 마지막 행 하단 y좌표 */
function drawItems(
  ctx: CanvasRenderingContext2D,
  model: ShareCardModel,
  top: number,
): number {
  const barX = PAD + 300;
  const barW = CARD_W - PAD * 2 - 300 - 190;
  const rowH = 74;

  ctx.textAlign = "left";
  ctx.fillStyle = C.heading;
  ctx.font = font(700, 34);
  ctx.fillText("항목별 위치", PAD, top);

  const listTop = top + 46;

  model.items.forEach((item, i) => {
    const y = listTop + i * rowH;

    ctx.strokeStyle = C.hairline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(PAD, y - 26);
    ctx.lineTo(CARD_W - PAD, y - 26);
    ctx.stroke();

    ctx.textAlign = "left";
    ctx.fillStyle = C.body;
    ctx.font = font(500, 30);
    ctx.fillText(item.label, PAD, y + 12);

    ctx.fillStyle = C.neutral;
    roundedRect(ctx, barX, y - 6, barW, 20, RADIUS);
    ctx.fill();

    ctx.fillStyle =
      item.percentile >= 60 ? C.brand : item.percentile <= 40 ? C.warn : C.chart2;
    roundedRect(
      ctx,
      barX,
      y - 6,
      Math.max(barW * (item.percentile / 100), 8),
      20,
      RADIUS,
    );
    ctx.fill();

    ctx.textAlign = "right";
    ctx.fillStyle = C.caption;
    ctx.font = font(500, 26);
    ctx.fillText(`상위 ${100 - item.percentile}%`, CARD_W - PAD, y + 12);
  });

  const bottom = listTop + model.items.length * rowH;
  ctx.strokeStyle = C.hairline;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(PAD, bottom - 26);
  ctx.lineTo(CARD_W - PAD, bottom - 26);
  ctx.stroke();

  return bottom;
}

function drawFooter(ctx: CanvasRenderingContext2D, model: ShareCardModel) {
  ctx.textAlign = "center";
  ctx.fillStyle = C.brand;
  ctx.font = font(700, 34);
  ctx.fillText(model.watermark, CARD_W / 2, CARD_H - 100);

  ctx.fillStyle = C.caption;
  ctx.font = font(500, 24);
  ctx.fillText(
    "간이 측정 결과이며 정식 체력인증을 대체하지 않습니다",
    CARD_W / 2,
    CARD_H - 60,
  );
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}
