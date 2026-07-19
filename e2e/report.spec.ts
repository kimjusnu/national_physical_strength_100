import { test, expect, type Page } from "@playwright/test";

/**
 * 활용사례 보고서 삽입용 캡처.
 * 결과 URL은 "대체로 양호하되 한 항목이 약점"인 시연 케이스로 고정한다 —
 * 강점(초록)·중간(틸)·약점(주황) 바가 모두 나타나 산출 로직이 한눈에 읽힌다.
 */
const DEMO_RESULT =
  "/result?g=M&age=35&h=174&w=72&grip=43&situp=30&jump=215&bodyfat=18&shuttle=36";

const DIR = "docs/report-images";

async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  // 이미지가 실제로 그려진 뒤에 찍어야 빈 자리로 캡처되지 않는다
  await page.waitForFunction(
    () =>
      Array.from(document.images).every((img) => img.complete && img.naturalWidth > 0),
    undefined,
    { timeout: 15000 },
  );
  await page.waitForFunction(
    () =>
      Array.from(
        document.querySelectorAll(".animate-arrive, .animate-fill-bar"),
      ).every((el) => el.getAnimations().every((a) => a.playState === "finished")),
    undefined,
    { timeout: 5000 },
  );
}

test("① 랜딩", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  await page.screenshot({ path: `${DIR}/01-landing.png`, fullPage: true });
});

test("② 측정 입력", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();

  // 실제 입력된 상태로 보여준다 (빈 폼은 보고서에서 미완성으로 읽힌다)
  await page.getByLabel("악력").fill("43");
  await page.getByLabel("윗몸말아올리기").fill("30");
  await page.getByLabel("제자리멀리뛰기").fill("215");
  await page.getByLabel("체지방률").fill("18");
  await page.getByLabel("왕복오래달리기").fill("36");
  await settle(page);
  await page.screenshot({ path: `${DIR}/02-measure.png`, fullPage: true });
});

test("②-b 측정 방법 안내 모달", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();
  await page.getByRole("button", { name: "측정 방법" }).first().click();
  await settle(page);
  await page.screenshot({ path: `${DIR}/02b-guide-modal.png` });
});

test("③ 결과 — 체력나이 + 차트", async ({ page }) => {
  await page.goto(DEMO_RESULT);
  await settle(page);

  const hero = page.locator("section").first();
  const chart = page.locator("section").filter({ hasText: "항목별 위치" });
  await expect(hero).toBeVisible();
  await expect(chart).toBeVisible();

  // 히어로 상단부터 차트 카드 하단까지를 하나의 이미지로
  const heroBox = await hero.boundingBox();
  const chartBox = await chart.boundingBox();
  if (!heroBox || !chartBox) throw new Error("결과 섹션을 찾지 못했습니다");

  await page.screenshot({
    path: `${DIR}/03-result-age-chart.png`,
    fullPage: true, // clip 좌표를 전체 페이지 기준으로 해석하게 한다
    clip: {
      x: 0,
      y: heroBox.y - 16,
      width: page.viewportSize()!.width,
      height: chartBox.y + chartBox.height - heroBox.y + 32,
    },
  });
});

test("④ 운동처방 + 센터", async ({ page }) => {
  await page.goto(DEMO_RESULT);
  await settle(page);

  const videos = page.locator("section").filter({ hasText: "맞춤 운동 처방" });
  const centers = page.locator("section").filter({ hasText: "가까운 체력인증센터" });
  await expect(videos).toBeVisible();
  await expect(centers).toBeVisible();

  const vBox = await videos.boundingBox();
  const cBox = await centers.boundingBox();
  if (!vBox || !cBox) throw new Error("추천/센터 섹션을 찾지 못했습니다");

  await page.screenshot({
    path: `${DIR}/04-prescription-centers.png`,
    fullPage: true, // clip 좌표를 전체 페이지 기준으로 해석하게 한다
    clip: {
      x: 0,
      y: vBox.y - 16,
      width: page.viewportSize()!.width,
      height: cBox.y + cBox.height - vBox.y + 32,
    },
  });
});

test("보너스 — 결과 전체 (한 장)", async ({ page }) => {
  await page.goto(DEMO_RESULT);
  await settle(page);
  await page.screenshot({ path: `${DIR}/05-result-full.png`, fullPage: true });
});
