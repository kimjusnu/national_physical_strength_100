import { defineConfig, devices } from "@playwright/test";

const PORT = 3210;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    // 모바일 우선 서비스이므로 모바일 뷰포트를 기본으로 검증
    { name: "mobile", use: { ...devices["Pixel 7"] }, testIgnore: /report\.spec\.ts/ },
    { name: "desktop", use: { ...devices["Desktop Chrome"] }, testIgnore: /report\.spec\.ts/ },
    // 보고서 삽입용 — 인쇄 품질(2x)로 캡처
    {
      name: "report",
      testMatch: /report\.spec\.ts/,
      use: {
        viewport: { width: 430, height: 932 },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    port: PORT,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
