import { ITEM_LABELS } from "@/data/normTables";
import type { FitnessAgeResult } from "@/lib/types";

/**
 * 결과 카드 공유 이미지 — 순수 모델(buildCardModel, 테스트 대상)과
 * 브라우저 canvas 렌더러(generateResultCard)를 분리했다.
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
  elite: "🏆 상위 1% 체력",
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
      ? `실제 나이보다 ${gap}세 젊어요!`
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

/** 세로형 결과 카드 이미지를 PNG Blob으로 생성 (브라우저 전용) */
export async function generateResultCard(model: ShareCardModel): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("canvas 2d context를 사용할 수 없습니다.");
  }

  drawBackground(ctx);
  drawHeader(ctx, model);
  drawItems(ctx, model);
  drawWatermark(ctx, model);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("이미지 생성에 실패했습니다."));
    }, "image/png");
  });
}

function drawBackground(ctx: CanvasRenderingContext2D) {
  const gradient = ctx.createLinearGradient(0, 0, 0, CARD_H);
  gradient.addColorStop(0, "#ecfdf5");
  gradient.addColorStop(0.45, "#ffffff");
  gradient.addColorStop(1, "#ffffff");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_W, CARD_H);

  ctx.strokeStyle = "#a7f3d0";
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, CARD_W - 48, CARD_H - 48);
}

function drawHeader(ctx: CanvasRenderingContext2D, model: ShareCardModel) {
  const centerX = CARD_W / 2;
  ctx.textAlign = "center";

  ctx.fillStyle = "#374151";
  ctx.font = "600 44px sans-serif";
  ctx.fillText("나의 체력나이는", centerX, 170);

  ctx.fillStyle = "#059669";
  ctx.font = "900 300px sans-serif";
  ctx.fillText(String(model.fitnessAge), centerX, 470);
  ctx.font = "700 80px sans-serif";
  ctx.fillText("세", centerX + measureHalf(ctx, model), 470);

  ctx.fillStyle = "#111827";
  ctx.font = "700 52px sans-serif";
  ctx.fillText(model.gapText, centerX, 580);

  ctx.fillStyle = "#6b7280";
  ctx.font = "400 36px sans-serif";
  ctx.fillText(`실제 나이 ${model.realAge}세 기준`, centerX, 640);

  if (model.badgeText) {
    drawBadge(ctx, model.badgeText, centerX, 700);
  }
}

/** "세" 글자를 숫자 오른쪽에 붙이기 위한 오프셋 계산 */
function measureHalf(ctx: CanvasRenderingContext2D, model: ShareCardModel): number {
  ctx.font = "900 300px sans-serif";
  return ctx.measureText(String(model.fitnessAge)).width / 2 + 60;
}

function drawBadge(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  y: number,
) {
  ctx.font = "700 40px sans-serif";
  const width = ctx.measureText(text).width + 80;
  ctx.fillStyle = "#fef3c7";
  drawRoundedRect(ctx, centerX - width / 2, y - 44, width, 72, 36);
  ctx.fill();
  ctx.fillStyle = "#b45309";
  ctx.fillText(text, centerX, y + 8);
}

function drawItems(ctx: CanvasRenderingContext2D, model: ShareCardModel) {
  const startY = model.badgeText ? 810 : 760;
  const barX = 400;
  const barMaxW = 520;
  const rowH = 78;

  model.items.forEach((item, i) => {
    const y = startY + i * rowH;

    ctx.textAlign = "left";
    ctx.fillStyle = "#374151";
    ctx.font = "600 36px sans-serif";
    ctx.fillText(item.label, 120, y + 12);

    ctx.fillStyle = "#e5e7eb";
    drawRoundedRect(ctx, barX, y - 14, barMaxW, 30, 15);
    ctx.fill();

    ctx.fillStyle = item.percentile >= 60 ? "#10b981" : item.percentile <= 40 ? "#fb923c" : "#9ca3af";
    drawRoundedRect(ctx, barX, y - 14, Math.max(barMaxW * (item.percentile / 100), 24), 30, 15);
    ctx.fill();

    ctx.textAlign = "right";
    ctx.fillStyle = "#6b7280";
    ctx.font = "400 32px sans-serif";
    ctx.fillText(`상위 ${100 - item.percentile}%`, CARD_W - 100, y + 10);
  });
}

function drawWatermark(ctx: CanvasRenderingContext2D, model: ShareCardModel) {
  ctx.textAlign = "center";
  ctx.fillStyle = "#059669";
  ctx.font = "700 40px sans-serif";
  ctx.fillText(model.watermark, CARD_W / 2, CARD_H - 100);
}

function drawRoundedRect(
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
