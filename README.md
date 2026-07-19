# 체력나이 (Fitness Age)

국민체육진흥공단(KSPO) **국민체력100 공공데이터**를 활용해, 사용자의 체력 측정값으로부터 **"체력나이"** 를 산출하는 반응형 웹 서비스입니다.

- 악력·윗몸말아올리기·제자리멀리뛰기·체지방률(+선택: 왕복오래달리기)을 입력하면
- 같은 성별·연령대의 국민체력100 측정자 분포와 비교해 **항목별 백분위**와
- "이 성적이 평균이 되는 나이"를 역산한 **체력나이**를 보여줍니다.

## 데이터 출처

| 데이터 | 출처 | 활용 |
|---|---|---|
| 국민체력100 체력인증센터 측정결과 정보 | [data.go.kr/data/15108938](https://www.data.go.kr/data/15108938/openapi.do) | 성별×연령대×항목 기준분포 (체력나이 산출 핵심 로직) |
| 국민체력100 동영상 정보 | data.go.kr/data/15108846 | 맞춤 운동처방 영상 추천 (2차 예정) |
| 국민체력100 체력인증센터 측정건수 정보 | data.go.kr/data/15114286 | 가까운 인증센터 안내 (2차 예정) |

코드 내 데이터 활용 지점은 `[KSPO 국민체력100 데이터 활용 지점 #n]` 주석으로 표시되어 있습니다 (`data/normTables.ts`, `data/mockMeasurements.ts`, `lib/fitnessAge.ts`, `app/result/page.tsx`).

## 기술 스택

Next.js (App Router) · TypeScript · Tailwind CSS · recharts · zod · vitest

## 실행 방법

```bash
npm install
npm run dev   # http://localhost:3000
```

`.env.local` (프로젝트 루트에 생성):

```
DATA_GO_KR_SERVICE_KEY=(공공데이터포털에서 발급받은 디코딩 키)
USE_MOCK=true
```

- `USE_MOCK=true`(기본): 국민체력100 공개 기준을 근사한 목업 분포로 동작합니다.
- `USE_MOCK=false`: 공공데이터포털 오픈API를 서버사이드에서 호출합니다 (키 필수).

## 테스트 / 빌드

```bash
npm test        # 체력나이 산출 로직 단위 테스트 (vitest)
npm run build   # 프로덕션 빌드
```

## 배포 (Vercel)

1. GitHub 저장소를 Vercel에 연결
2. 환경변수 `DATA_GO_KR_SERVICE_KEY`, `USE_MOCK` 등록
3. `main` 브랜치 push 시 자동 배포

## 산출 로직 요약

1. **백분위 환산** — 사용자 값을 같은 성별·연령대 분포(평균·표준편차, 정규분포 가정)의 백분위로 환산
2. **항목별 체력나이 역산** — 연령별 평균 곡선에서 "내 성적이 평균이 되는 나이"를 선형 보간으로 역산 (15~80세 클램핑)
3. **종합 체력나이** — 항목별 체력나이의 가중평균 (가중치: `data/normTables.ts`의 `ITEM_WEIGHTS`)

로직은 `lib/fitnessAge.ts`에 순수함수로 분리되어 있고, 기준테이블(`data/normTables.ts`)만 실데이터 집계로 교체하면 정확도를 높일 수 있습니다.
