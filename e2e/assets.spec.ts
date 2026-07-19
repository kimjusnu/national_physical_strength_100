import { expect, test } from "@playwright/test";

/** 아이콘·OG·측정 안내 그림이 실제로 서빙되고 렌더되는지 검증 */

test("파비콘·앱아이콘·OG 이미지가 서빙된다", async ({ page, request }) => {
  await page.goto("/");

  // Next.js가 app/ 규약 파일을 메타 태그로 연결했는지
  const iconHref = await page
    .locator('link[rel="icon"]')
    .first()
    .getAttribute("href");
  expect(iconHref, "favicon link 없음").toBeTruthy();

  const appleHref = await page
    .locator('link[rel="apple-touch-icon"]')
    .first()
    .getAttribute("href");
  expect(appleHref, "apple-touch-icon link 없음").toBeTruthy();

  const ogImage = await page
    .locator('meta[property="og:image"]')
    .first()
    .getAttribute("content");
  expect(ogImage, "og:image 메타 없음").toBeTruthy();

  // og:image는 metadataBase 때문에 프로덕션 절대주소다 —
  // 로컬 검증에서는 경로만 떼어 현재 서버로 조회한다
  const toLocalPath = (href: string) =>
    href.startsWith("http") ? new URL(href).pathname + new URL(href).search : href;

  for (const href of [iconHref!, appleHref!, ogImage!]) {
    const url = toLocalPath(href);
    const res = await request.get(url);
    expect(res.status(), `${url} 응답 오류`).toBe(200);
    expect(Number(res.headers()["content-length"] ?? 1)).toBeGreaterThan(0);
  }
});

test("OG 이미지 크기가 소셜 미리보기 규격이다", async ({ page }) => {
  await page.goto("/");
  const w = await page
    .locator('meta[property="og:image:width"]')
    .first()
    .getAttribute("content");
  const h = await page
    .locator('meta[property="og:image:height"]')
    .first()
    .getAttribute("content");
  expect(w).toBe("1200");
  expect(h).toBe("630");
});

test("측정 방법 안내 그림이 모달에 표시된다", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("172");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByRole("button", { name: "측정 방법" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const img = dialog.locator("img");
  await expect(img).toBeVisible();
  await expect(img).toHaveAttribute("alt", /악력 측정 자세/);

  await page.waitForFunction(
    () => {
      const el = document.querySelector('[role="dialog"] img') as HTMLImageElement;
      return el?.complete;
    },
    undefined,
    { timeout: 10000 },
  );
  const natural = await img.evaluate(
    (el) => (el as HTMLImageElement).naturalWidth,
  );
  expect(natural, "안내 그림이 로드되지 않음").toBeGreaterThan(0);
});

test("5개 측정 항목 모두 안내 그림이 있다", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();

  const labels = ["악력", "윗몸말아올리기", "제자리멀리뛰기", "체지방률", "왕복오래달리기"];
  for (let i = 0; i < labels.length; i++) {
    await page.getByRole("button", { name: "측정 방법" }).nth(i).click();
    const img = page.getByRole("dialog").locator("img");
    await expect(img, `${labels[i]} 안내 그림 없음`).toBeVisible();
    await page.waitForFunction(
      () => {
        const el = document.querySelector(
          '[role="dialog"] img',
        ) as HTMLImageElement;
        return el?.complete && el.naturalWidth > 0;
      },
      undefined,
      { timeout: 10000 },
    );
    await page.getByRole("button", { name: "확인" }).click();
  }
});
