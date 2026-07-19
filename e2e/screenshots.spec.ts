import { test, type Page } from "@playwright/test";

/** 디자인 육안 검증용 스크린샷 캡처 (검증 도구, 회귀 테스트 아님) */

const RESULT_URL =
  "/result?g=M&age=35&h=174&w=72&grip=30&situp=15&jump=207&bodyfat=19.5&shuttle=33";

const DIR = "e2e/__shots__";

/**
 * 헤드리스 브라우저는 프레임을 요청받을 때만 렌더하므로, 단순 대기로는
 * 애니메이션 중간 상태가 찍힌다. 폰트와 모든 애니메이션 완료를 명시적으로 기다린다.
 */
async function settle(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(
    () =>
      Array.from(
        document.querySelectorAll(".animate-arrive, .animate-fill-bar"),
      ).every((el) => el.getAnimations().every((a) => a.playState === "finished")),
    undefined,
    { timeout: 5000 },
  );
}

test("랜딩", async ({ page }) => {
  await page.goto("/");
  await settle(page);
  await page.screenshot({ path: `${DIR}/01-landing.png`, fullPage: true });
});

test("위저드 1단계", async ({ page }) => {
  await page.goto("/measure");
  await settle(page);
  await page.screenshot({ path: `${DIR}/02-wizard-basic.png`, fullPage: true });
});

test("위저드 2단계 + 안내 모달", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();
  await settle(page);
  await page.screenshot({ path: `${DIR}/03-wizard-items.png`, fullPage: true });

  await page.getByRole("button", { name: "측정 방법" }).first().click();
  await page.screenshot({ path: `${DIR}/04-guide-modal.png` });
});

test("결과 전체", async ({ page }) => {
  await page.goto(RESULT_URL);
  await settle(page);
  await page.screenshot({ path: `${DIR}/05-result.png`, fullPage: true });
});

test("결과 - 상위 1% 뱃지", async ({ page }) => {
  await page.goto(
    "/result?g=M&age=45&h=174&w=72&grip=55&situp=48&jump=230&bodyfat=14&shuttle=60",
  );
  await settle(page);
  await page.screenshot({ path: `${DIR}/06-result-elite.png` });
});

test("결과 - 큰 글씨 모드", async ({ page }) => {
  await page.goto(RESULT_URL);
  await settle(page);
  await page.getByRole("button", { name: "큰 글씨" }).click();
  await page.screenshot({ path: `${DIR}/07-result-bigtext.png` });
});
