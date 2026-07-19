import { expect, test } from "@playwright/test";

/** 결과별 동적 OG 이미지가 실제로 생성되고 메타에 연결되는지 검증 */

const RESULT_A =
  "g=M&age=35&h=174&w=72&grip=43&situp=30&jump=215&bodyfat=18&shuttle=36";
const RESULT_B = "g=F&age=45&h=162&w=60&grip=20&situp=8&jump=110&bodyfat=32";

test("결과가 다르면 OG 이미지도 다르게 생성된다", async ({ request }) => {
  const a = await request.get(`/api/og?${RESULT_A}`);
  const b = await request.get(`/api/og?${RESULT_B}`);

  expect(a.status()).toBe(200);
  expect(b.status()).toBe(200);
  expect(a.headers()["content-type"]).toContain("image/png");

  const bodyA = await a.body();
  const bodyB = await b.body();
  expect(bodyA.length).toBeGreaterThan(10_000);
  expect(bodyA.equals(bodyB), "두 결과의 OG 이미지가 동일하다").toBe(false);
});

test("측정값 없이 호출해도 이미지가 나온다", async ({ request }) => {
  const res = await request.get("/api/og");
  expect(res.status()).toBe(200);
  expect((await res.body()).length).toBeGreaterThan(5_000);
});

test("결과 페이지 메타가 동적 OG를 가리키고 체력나이를 담는다", async ({ page }) => {
  await page.goto(`/result?${RESULT_A}`);

  const ogImage = await page
    .locator('meta[property="og:image"]')
    .first()
    .getAttribute("content");
  expect(ogImage, "og:image 없음").toContain("/api/og");
  expect(ogImage).toContain("grip=43");

  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .first()
    .getAttribute("content");
  expect(ogTitle).toMatch(/내 체력나이는 \d+세/);

  const twitterCard = await page
    .locator('meta[name="twitter:card"]')
    .first()
    .getAttribute("content");
  expect(twitterCard).toBe("summary_large_image");
});
