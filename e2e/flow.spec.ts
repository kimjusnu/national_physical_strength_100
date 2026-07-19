import { expect, test } from "@playwright/test";

/**
 * 전 플로우 브라우저 검증 — 단위 테스트로는 덮이지 않는 영역:
 * 위저드 실제 클릭, 공유 카드 canvas 실행, 센터 fetch, 큰 글씨 모드.
 */

test("랜딩 → 측정 위저드 → 결과까지 실제로 진행된다", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /어디쯤일까요/ }),
  ).toBeVisible();

  await page.getByRole("link", { name: "내 체력나이 측정하기" }).click();
  await expect(page).toHaveURL(/\/measure/);

  // 1단계: 기본 정보
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();

  // 2단계: 측정값 (악력·윗몸을 낮게 넣어 약점이 잡히게)
  await expect(
    page.getByRole("heading", { name: "측정한 값을 입력해주세요" }),
  ).toBeVisible();
  await page.getByLabel("악력").fill("30");
  await page.getByLabel("윗몸말아올리기").fill("15");
  await page.getByLabel("제자리멀리뛰기").fill("207");
  await page.getByLabel("체지방률").fill("19.5");
  await page.getByRole("button", { name: "결과 보기" }).click();

  // 결과
  await expect(page).toHaveURL(/\/result\?/);
  await expect(page.getByText("국민체력100 데이터와 비교한 나의 체력나이")).toBeVisible();
  await expect(page.getByRole("heading", { name: "맞춤 운동 처방" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "가까운 체력인증센터" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "결과 공유" })).toBeVisible();
});

test("입력 검증이 잘못된 값을 막는다", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "다음" }).click();
  await expect(page.getByText("성별을 선택해주세요")).toBeVisible();

  await page.getByRole("button", { name: "여성" }).click();
  await page.getByLabel("나이").fill("5");
  await page.getByRole("button", { name: "다음" }).click();
  await expect(page.getByText(/15세 이상/)).toBeVisible();
});

test("측정 방법 안내 모달이 열리고 닫힌다", async ({ page }) => {
  await page.goto("/measure");
  await page.getByRole("button", { name: "남성" }).click();
  await page.getByLabel("나이").fill("35");
  await page.getByLabel("키").fill("174");
  await page.getByLabel("몸무게").fill("72");
  await page.getByRole("button", { name: "다음" }).click();

  await page.getByRole("button", { name: "측정 방법" }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByText("악력 측정 방법")).toBeVisible();

  await page.getByRole("button", { name: "확인" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("결과 카드 canvas 이미지가 실제로 생성된다", async ({ page }) => {
  await page.goto(
    "/result?g=M&age=35&h=174&w=72&grip=30&situp=15&jump=207&bodyfat=19.5&shuttle=33",
  );

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "이미지 저장" }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toMatch(/체력나이-\d+세\.png/);
  await expect(page.getByText("이미지를 저장했어요")).toBeVisible();
});

test("센터 목록이 지역 변경에 반응한다", async ({ page }) => {
  await page.goto(
    "/result?g=M&age=35&h=174&w=72&grip=30&situp=15&jump=207&bodyfat=19.5",
  );

  await expect(page.getByText("송파 체력인증센터")).toBeVisible();

  await page.getByLabel("지역").selectOption("부산");
  await expect(page.getByText("부산 사직 체력인증센터")).toBeVisible();
  await expect(page.getByText("송파 체력인증센터")).toBeHidden();
});

test("큰 글씨 모드가 켜지고 새로고침 후에도 유지된다", async ({ page }) => {
  await page.goto("/");

  const html = page.locator("html");
  await expect(html).not.toHaveClass(/big-text/);

  await page.getByRole("button", { name: "큰 글씨" }).click();
  await expect(html).toHaveClass(/big-text/);

  await page.reload();
  await expect(html).toHaveClass(/big-text/);
});

test("잘못된 결과 접근은 안내 화면으로 처리된다", async ({ page }) => {
  await page.goto("/result?bad=1");
  await expect(page.getByText("측정 정보가 올바르지 않아요")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "체력나이 측정하러 가기" }),
  ).toBeVisible();
});
