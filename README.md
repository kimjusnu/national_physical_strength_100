# 체력나이 (Fitness Age)

**서비스 URL: https://national-physical-strength-100.vercel.app**

국민체육진흥공단(KSPO) **국민체력100 공공데이터**를 활용해, 사용자의 체력 측정값으로부터 **"체력나이"** 를 산출하는 반응형 웹 서비스입니다.

> 결과 화면 바로 보기: [35세 남성 사례](https://national-physical-strength-100.vercel.app/result?g=M&age=35&h=174&w=72&grip=30&situp=15&jump=207&bodyfat=19.5&shuttle=33)

- 악력·윗몸말아올리기·제자리멀리뛰기·체지방률(+선택: 왕복오래달리기)을 입력하면
- 같은 성별·연령대의 국민체력100 측정자 분포와 비교해 **항목별 백분위**와
- "이 성적이 평균이 되는 나이"를 역산한 **체력나이**를 보여주고
- 약점 항목에 맞는 **운동처방 영상**, 지역별 **체력인증센터**, **결과 카드 공유**까지 이어집니다.

## 주요 기능

| 기능 | 설명 |
|---|---|
| 체력나이 산출 | 성별×연령대 분포 기준 백분위 → 연령 역산 → 가중평균 (20~70세, 경계 시 "상위 1% 체력"/"체력 개선 필요" 뱃지) |
| 항목별 분석 | 레이더 차트 + 백분위 바, 강점·보완점 요약 |
| 운동처방 영상 | 백분위 하위 1~2개 약점 항목에 맞는 국민체력100 영상 3~5개 추천 |
| 체력인증센터 안내 | 17개 시도 선택 → 측정건수순 센터 목록, 지도 링크, 오프라인 정식 측정 유도 |
| 결과 공유 | 세로형 카드 이미지(canvas) 저장 · 링크 복사 · Web Share API |
| 접근성 | 큰 글씨 토글, 모바일 우선 반응형, 다크모드 |

## 데이터 출처

| 데이터 | 출처 | 활용 |
|---|---|---|
| 국민체력100 체력인증센터 측정결과 정보 | [data.go.kr/data/15108938](https://www.data.go.kr/data/15108938/openapi.do) | 성별×연령대×항목 기준분포 (체력나이 산출 핵심 로직) |
| 국민체력100 동영상 정보 | [data.go.kr/data/15108846](https://www.data.go.kr/data/15108846/openapi.do) | 약점 항목 기반 맞춤 운동처방 영상 추천 |
| 국민체력100 체력인증센터 측정건수 정보 | [data.go.kr/data/15114286](https://www.data.go.kr/data/15114286/openapi.do) | 지역별 인증센터 안내 (온·오프라인 연계) |

코드 내 데이터 활용 지점은 `[KSPO 국민체력100 데이터 활용 지점 #n]` 주석 12곳으로 표시되어 있습니다 (`data/normTables.ts`, `data/mockMeasurements.ts`, `data/mockVideos.ts`, `data/mockCenters.ts`, `lib/fitnessAge.ts`, `lib/videoMatch.ts`, `lib/centers.ts`, `lib/kspoApi.ts`, `lib/normAggregate.ts`, `app/result/page.tsx`).

## 기술 스택

Next.js (App Router) · TypeScript · Tailwind CSS · recharts · zod · vitest

## 실행 방법

```bash
npm install
npm run dev   # http://localhost:3000
```

`.env.local` (프로젝트 루트에 생성 — `.env.example` 참고):

```
DATA_GO_KR_SERVICE_KEY=(공공데이터포털에서 발급받은 디코딩 키)
USE_MOCK=true
```

- `USE_MOCK=true`(기본): 국민체력100 공개 기준을 근사한 목업 분포로 동작합니다.
- `USE_MOCK=false`: 공공데이터포털 오픈API를 서버사이드에서 호출합니다.
  - 인증키는 Route Handler(`app/api/centers`)와 서버 컴포넌트에서만 사용되며 클라이언트에 노출되지 않습니다.
  - **엔드포인트 주소는 각 데이터의 기술문서를 확인해 `KSPO_*_API_URL` 환경변수로 지정하세요.** 코드의 기본 주소는 형식만 맞춘 추정값이라 그대로 두면 호출이 실패합니다.
  - 호출 실패·타임아웃(8초) 시 **목업 데이터로 자동 fallback**하므로 심사위원 접속 시에도 화면이 항상 정상 표출됩니다.

## 테스트 / 빌드

```bash
npm test          # 단위 테스트 (vitest, 46개)
npm run build     # 프로덕션 빌드
npm run build:norms   # 실 API 원자료 → 기준테이블 집계 (아래 참고)
```

### 기준테이블 실데이터 집계

```bash
USE_MOCK=false npx tsx scripts/buildNormTables.ts --pages 20
```

측정결과 API의 원자료를 성별×연령대×항목별 평균·표준편차로 집계해 `data/normTables.generated.ts`를 만듭니다. 검토 후 `data/normTables.ts`의 값으로 옮기면 실데이터 기준선이 적용됩니다.

- 셀당 표본이 30건 미만이면 기존 공개 기준값을 유지하고 경고로 남깁니다(부족한 표본에 의한 기준선 왜곡 방지).
- 왕복오래달리기는 현재 API 응답 항목에 없어 기존 기준값을 유지합니다.

## 배포 (Vercel)

1. GitHub 저장소를 Vercel에 연결
2. 환경변수 `DATA_GO_KR_SERVICE_KEY`, `USE_MOCK`(+ 필요 시 `KSPO_*_API_URL`) 등록
3. `main` 브랜치 push 시 자동 배포

## 프로젝트 구조

```
app/
  page.tsx              랜딩
  measure/page.tsx      입력 위저드 (기본정보 → 체력 항목)
  result/page.tsx       결과 (체력나이·차트·영상·센터·공유)
  api/centers/route.ts  센터 조회 프록시 (인증키 서버 보관)
components/
  BigTextToggle.tsx
  measure/  StepBasicInfo · StepFitnessInputs · MeasureGuideModal · NumberField
  result/   ResultHeroAge · FitnessRadar · ItemBreakdown · PrescriptionVideos
            NearbyCenters · ShareCard
lib/
  fitnessAge.ts    체력나이 산출 (순수함수)
  videoMatch.ts    약점 항목 → 운동 카테고리 매핑
  centers.ts       센터 지역 필터/정렬
  share.ts         결과 카드 모델 + canvas 렌더링
  normAggregate.ts 실데이터 → 기준테이블 집계
  kspoApi.ts       데이터 계층 (mock ↔ real, fallback)
  schemas.ts       zod 입력·쿼리 검증
data/
  normTables.ts · mockMeasurements.ts · mockVideos.ts · mockCenters.ts
scripts/
  buildNormTables.ts
```

## 산출 로직 요약

1. **백분위 환산** — 사용자 값을 같은 성별·연령대 분포(평균·표준편차, 정규분포 가정)의 백분위로 환산
2. **항목별 체력나이 역산** — 연령별 평균 곡선에서 "내 성적이 평균이 되는 나이"를 선형 보간으로 역산 (15~80세 클램핑)
3. **종합 체력나이** — 항목별 체력나이의 가중평균 (가중치: `data/normTables.ts`의 `ITEM_WEIGHTS`)

로직은 `lib/fitnessAge.ts`에 순수함수로 분리되어 있고, 기준테이블(`data/normTables.ts`)만 실데이터 집계로 교체하면 정확도를 높일 수 있습니다.
