import { expect, test } from "@playwright/test";

/** 유튜브 썸네일이 실제로 로드되고 링크가 특정 영상을 가리키는지 검증 */
test("영상 썸네일이 로드되고 링크가 실제 영상을 가리킨다", async ({ page }) => {
  const failedImages: string[] = [];
  page.on("response", (res) => {
    if (res.url().includes("/_next/image") && !res.ok()) {
      failedImages.push(`${res.status()} ${res.url()}`);
    }
  });

  await page.goto(
    "/result?g=M&age=35&h=174&w=72&grip=43&situp=30&jump=215&bodyfat=18&shuttle=36",
  );
  await page.evaluate(() => document.fonts.ready);

  const section = page.locator("section").filter({ hasText: "맞춤 운동 처방" });
  const images = section.locator("img");
  await expect(images.first()).toBeVisible();

  const count = await images.count();
  expect(count).toBeGreaterThanOrEqual(3);

  // 모든 썸네일이 실제 픽셀을 그렸는지 (깨진 이미지는 naturalWidth 0)
  await page.waitForFunction(
    () => {
      const imgs = Array.from(
        document.querySelectorAll("img"),
      ) as HTMLImageElement[];
      return imgs.length > 0 && imgs.every((img) => img.complete);
    },
    undefined,
    { timeout: 15000 },
  );

  const naturals = await images.evaluateAll((els) =>
    els.map((el) => (el as HTMLImageElement).naturalWidth),
  );
  expect(naturals.filter((w) => w === 0), `깨진 썸네일: ${naturals}`).toHaveLength(0);
  expect(failedImages, `이미지 요청 실패: ${failedImages.join(", ")}`).toHaveLength(0);

  // 링크가 검색이 아니라 특정 영상을 가리키는지
  const hrefs = await section.locator("a").evaluateAll((els) =>
    els.map((el) => (el as HTMLAnchorElement).href),
  );
  for (const href of hrefs) {
    expect(href).toMatch(/youtube\.com\/watch\?v=[\w-]{11}/);
    expect(href).not.toContain("search_query");
  }
});
