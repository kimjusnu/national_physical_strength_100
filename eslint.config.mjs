import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 도구가 설치한 파일 (oh-my-design-cli) — 우리 소스가 아니다
    ".claude/**",
    ".agents/**",
    ".codex/**",
  ]),
]);

export default eslintConfig;
