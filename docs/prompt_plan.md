# 체력나이(Fitness Age) 웹앱 — 1차 구현 계획 (확정: 2026-07-19)

## 요구사항

국민체력100 공공데이터 분포와 비교해 "체력나이 OO세"를 산출하는 반응형 웹앱 (KSPO 경진대회 출품용).

1차 범위:
- Next.js(App Router) + TypeScript + Tailwind + recharts 스캐폴딩
- `.env.local` 설정 + `.gitignore` 확인 (서비스 키는 환경변수로만)
- 입력 위저드: 기본정보(성별·나이·키·몸무게) → 체력 항목(악력, 윗몸말아올리기, 제자리멀리뛰기, 체지방률, 선택: 왕복오래달리기) + 측정방법 안내 모달
- 체력나이 산출 로직 (`lib/fitnessAge.ts` 순수함수 + `data/normTables.ts`)
- 결과 화면: 체력나이 히어로, 항목별 백분위 레이더 차트, 강점/약점 요약
- 목업 데이터로 랜딩→측정→결과 전 과정 동작 (영상·센터·공유카드·실API는 2차)

## 확정된 가정

1. 결과 상태 전달: URL query string (`/result?g=M&age=35&...`) — 공유 가능, 심사위원 데모 URL 요건 충족
2. UI 언어: 한국어 단일
3. normTables: 국민체력100 공개 기준표 근사 목업 → 2차에서 실데이터 보정

## 구현 단계

- Phase 0: 스캐폴딩 + 보안 설정 (create-next-app, recharts/zod/vitest, .env.local, 문서 평문 키 제거, git init)
- Phase 1: 데이터 계층 (normTables.ts, mockMeasurements.ts, kspoApi.ts — USE_MOCK 전환 구조)
- Phase 2: 산출 로직 TDD (fitnessAge.ts — 백분위 환산 → 항목별 체력나이 역산 → 가중평균)
- Phase 3: 입력 위저드 (measure/page.tsx, StepBasicInfo, StepFitnessInputs, MeasureGuideModal, zod 검증)
- Phase 4: 결과 화면 (result/page.tsx, ResultHeroAge, FitnessRadar, 강점·약점 요약)
- Phase 5: 랜딩 + 접근성(BigTextToggle) + README + 빌드/테스트 검증

## 리스크

- MEDIUM: normTables 근사치 신뢰성 → 테이블 교체 가능 구조로 격리
- MEDIUM: 체력나이 역산 경계 → 15~80세 클램핑
- LOW: recharts SSR → 클라이언트 컴포넌트 격리
- LOW: 기존 md 파일과 create-next-app 충돌 → docs/ 폴더로 이동 후 스캐폴딩

## 2차 범위 (다음 단계)

운동처방 영상 추천(15108846), 체력인증센터 안내(15114286), 결과 카드 공유 이미지, 실 API 연동(15108938)
