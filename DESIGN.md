---
omd: 0.1
brand: 체력나이 (Fitness Age)
bootstrapped_from: banksalad
bootstrapped_at: 2026-07-19
tokens:
  colors:
    primary: "#04c584"
    primary-hover: "#10df99"
    brand: "#04c584"
    canvas: "#ffffff"
    foreground: "#2b2b2b"
    muted: "#7b7b7b"
    on-primary: "#ffffff"
    surface-alt: "#fbfbfb"
    surface-neutral: "#f5f5f5"
    body: "#434444"
    placeholder: "#999999"
    disabled: "#acacac"
    hairline: "#e1e1e1"
    mint-tint: "#f3fdfa"
    error: "#fe493d"
    error-soft: "#ff8a84"
    warning: "#fd8700"
    warning-deep: "#f56200"
    info: "#0099ff"
    success: "#04c584"
    chart-1: "#34464b"
    chart-2: "#5c818a"
    chart-3: "#1c6c73"
    chart-4: "#a7c7cf"
  typography:
    family: { sans: "Pretendard" }
    hero-display:     { size: 52, weight: 700, lineHeight: 1.23, tracking: -1, use: "Largest landing headline" }
    display-lg:       { size: 48, weight: 700, lineHeight: 1.2, tracking: -1, use: "Secondary hero" }
    display:          { size: 44, weight: 700, lineHeight: 1.25, tracking: -1, use: "Section-opening figures (체력나이, 백분위)" }
    section-heading:  { size: 36, weight: 700, lineHeight: 1.3, tracking: -0.5, use: "Marketing section titles" }
    h1:               { size: 28, weight: 700, lineHeight: 1.14, use: "In-app section titles" }
    h2:               { size: 24, weight: 700, lineHeight: 1.17, use: "Card titles, panel headings" }
    h3:               { size: 20, weight: 700, lineHeight: 1.2, use: "Sub-card headings" }
    subhead:          { size: 18, weight: 700, lineHeight: 1.3, use: "Featured-button text, key callouts" }
    body-lg:          { size: 17, weight: 500, lineHeight: 1.5, use: "Standard reading text (전 연령 기준 16→17)" }
    body:             { size: 15, weight: 500, lineHeight: 1.4, use: "Default body text; 500 not 400 (14→15)" }
    body-tight:       { size: 14, weight: 500, lineHeight: 1.4, use: "Compact labels" }
    caption:          { size: 13, weight: 500, lineHeight: 1.4, use: "Metadata, helper text" }
    caption-sm:       { size: 11, weight: 500, lineHeight: 1.2, use: "Disclosures, smallest labels" }
    button:           { size: 17, weight: 700, lineHeight: 1, tracking: -0.5, use: "All CTAs are 700" }
    measure-figure:   { size: 24, weight: 700, lineHeight: 1, use: "Measured values; unit follows in 500" }
  spacing: { xs: 4, sm: 8, md: 16, base: 16, lg: 24, xl: 32, xxl: 48, section: 64 }
  rounded: { sm: 2, md: 4, lg: 8, full: 9999 }
  shadow:
    soft: "rgba(0,0,0,0.08) 0px 1px 1px 0px"
    standard: "rgba(0,0,0,0.12) 0px 2px 5px 0px"
    elevated: "rgba(0,0,0,0.15) 0px 4px 9px 0px"
    modal: "rgba(0,0,0,0.19) 0px 17px 50px 0px"
---

# Design System of 체력나이 (Fitness Age)

## 1. Visual Theme & Atmosphere

체력나이는 **데이터로 말하는 체력 코치**의 디자인 언어다. 시중 피트니스 앱이 동기부여 구호와 불타는 그래디언트로 사용자를 밀어붙이는 자리에서, 체력나이는 *정확한 수치를, 그 수치가 나온 이유와 함께* 보여주는 것이 실제 제품 약속이라고 본다. 화면은 흰 캔버스(`#ffffff`/`#fbfbfb`)에 따뜻한 근사 검정(`#2b2b2b` 헤딩, `#434444` 본문 — 절대 순수 `#000` 아님)으로 열리고, 모든 상호작용은 채도 높은 민트그린 `#04c584`이 담당한다. 이 초록은 건강·측정·통과를 동시에 연상시키되, 병원의 임상 블루도 헬스장의 형광 라임도 아닌 자리에 있다.

가장 두드러진 기하학적 선택은 radius 스케일이다. 시스템은 **2px 라운드를 압도적 기본값**으로 쓰고 8px는 소프트 마케팅 카드에만, 4px는 소형 배지에만 허용한다. 체력나이는 **거의 평면**이다. 2px는 모서리의 날카로움만 걷어낼 뿐 무엇도 "앱스럽게" 말랑하게 만들지 않는다. 이것은 소비자 피트니스 앱의 12–16px 관용구에 대한 의도적 거부다. 사용자에게 이렇게 말한다: 이건 장난감이 아니라 측정 결과다.

타이포그래피는 **Pretendard** 단일 패밀리로 간다. 기본 굵기는 **700** — 체력나이 숫자와 헤딩은 자신 있고 두툼하며, 500이 본문 강조의 보조 굵기다. 다만 레퍼런스 대비 본문 크기를 한 단계 올렸다(14→15px, 16→17px). 청소년부터 시니어까지 같은 화면을 보는 서비스이므로, 밀도는 유지하되 글자는 키운다. 큰 글씨 모드는 여기서 다시 120%를 얹는다.

**Key Characteristics:**
- Pretendard + Apple SD Gothic Neo + Noto Sans KR 스택 — 한국어 우선 타이포그래피
- 시그니처 그린 `#04c584` — 모든 상호작용 순간에만
- Hover/focus 그린 `#10df99` (한 단계 밝음) — 상호작용은 어둡게가 아니라 *밝게*
- 2px radius 지배 — 측정 도구로 읽히지, 소비자 앱으로 읽히지 않음
- 따뜻한 근사 검정 `#2b2b2b`/`#434444`
- 민트 틴트 `#f3fdfa` — 시스템 유일의 브랜드 배경 틴트
- 헤딩·측정값 기본 700, 본문 강조 500
- 단일 레이어 중립 그림자 `0 2px 5px rgba(0,0,0,.12)` — 절대 컬러 그림자 없음
- 틸-슬레이트 데이터 팔레트(`#34464b`/`#5c818a`/`#1c6c73`/`#a7c7cf`) — 차트는 차갑게, 내 값만 초록

## 2. Color Palette & Roles

### Primary
- **Fitness Green** (`#04c584`): 브랜드 기본색, CTA 배경, 링크, 강조 규칙, "내 값" 표시. 흰 배경에서 가독성 있고 활기차되 유치하지 않다.
- **Hover Green** (`#10df99`): hover·focus 테두리에 적용되는 더 밝은 민트. 체력나이는 상호작용 시 밝아진다(관례적 darken의 반대).
- **Mint Tint** (`#f3fdfa`): 입력 focus 배경, 성공 서피스 채움. 시스템 유일의 브랜드 틴트.

### Heading & Body
- **Heading** (`#2b2b2b`): 헤드라인, 주요 라벨, 측정 수치. 절대 `#000` 아님.
- **Body** (`#434444`): 기본 읽기 텍스트, 입력 채움 텍스트.
- **Body Light** (`#7b7b7b`): 캡션, 보조 설명.
- **Placeholder** (`#999999`): 입력 플레이스홀더, 흐린 메타데이터.
- **Disabled** (`#acacac`): 비활성 텍스트·아이콘.

### Surface & Border
- **Page** (`#ffffff`): 기본 캔버스.
- **Surface Light** (`#fbfbfb`): 부드러운 서피스 교대, 패널 채움.
- **Surface Neutral** (`#f5f5f5`): 구분선, 콘텐츠 선반 채움.
- **Border Input** (`#e1e1e1`): 기본 입력 테두리, 구분선.
- **Surface Mint** (`#f3fdfa`): 성공 상태 서피스.

### Data / Chart Palette (teal-slate family)
- **Teal-Slate 800** (`#34464b`): 1차 차트 시리즈, 테이블 헤더.
- **Teal-Gray 500** (`#5c818a`): 2차 시리즈, 범례.
- **Teal 600** (`#1c6c73`): 강조 데이터 포인트.
- **Pale Teal** (`#a7c7cf`): 차트 밴드 배경 채움 — 또래 분포대(percentile band).

틸-슬레이트 계열은 브랜드 그린보다 **의도적으로 차갑다**. 차트 시리즈가 브랜드 서피스가 아니라 중립 데이터로 읽히게 하기 위함이다. 초록은 상호작용과 내 값을 위한 것이고, 틸-슬레이트는 또래 분포를 위한 것이다.

### Semantic
- **Error Red** (`#fe493d`): 입력 검증 실패, 차단성 오류.
- **Error Soft** (`#ff8a84`): 약한 오류 틴트.
- **Warning Orange** (`#fd8700`): 주의 강조 — 약점 항목 표시.
- **Warning Deep** (`#f56200`): 최고 심각도 — 체력나이가 실제 나이를 크게 상회할 때.
- **Info Blue** (`#0099ff`): 외부 링크(공공데이터포털, 영상), 정보 고지. 절제해서 사용 — 기본 링크색은 초록.
- **Success Green** (`#04c584`): 성공은 브랜드 그린을 쓴다. 별도 성공 색상 없음.

## 3. Typography Rules

### Font Family
- **Primary**: `Pretendard, -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif`
- 가변축 Pretendard가 400/500/700/800을 공급. 서브셋 woff2를 preload.

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Hero Display | Pretendard | 52px | 700 | 1.23 | -1px | 랜딩 최상단 헤드라인 |
| Display Large | Pretendard | 48px | 700 | 1.2 | -1px | 보조 히어로 |
| Display | Pretendard | 38–44px | 700 | 1.25 | -1px | 섹션 여는 수치 |
| Section Heading | Pretendard | 32–36px | 700 | 1.3 | -0.5px | 마케팅 섹션 제목 |
| Heading 1 | Pretendard | 28px | 700 | 1.14 | normal | 인앱 섹션 제목 |
| Heading 2 | Pretendard | 22–24px | 700 | 1.17 | normal | 카드 제목, 패널 헤딩 |
| Heading 3 | Pretendard | 20px | 700 | 1.2 | normal | 서브카드 헤딩 |
| Subhead | Pretendard | 18px | 700 | 1.3 | normal | 강조 버튼 텍스트, 핵심 콜아웃 |
| Body Large | Pretendard | 17px | 500 | 1.5 | normal | 데이터 화면 기본 읽기 텍스트 |
| Body | Pretendard | 15px | 500 | 1.4 | normal | 기본 본문; 400 아님 |
| Body Tight | Pretendard | 14px | 500 | 1.4 | normal | 압축 라벨 |
| Caption | Pretendard | 13px | 500 | 1.4 | normal | 메타데이터, 도움말 |
| Caption Small | Pretendard | 11px | 500 | 1.2 | normal | 고지, 최소 라벨 |
| Button | Pretendard | 17–18px | 700 | tight | -0.5px | 모든 CTA는 700 |
| Measure Figure | Pretendard | 20–36px | 700 | 1 | normal | 측정값; 단위는 뒤에 500으로 |
| Fitness Age Hero | Pretendard | 96–120px | 800 | 1 | -3px | 결과 화면 체력나이 단일 숫자 |

### Principles
- **중요한 모든 것의 기본은 700이다.** 헤딩, CTA, 측정 수치. 500은 본문. 400은 드물다. "400 헤드라인"은 없다.
- **Pretendard 단일 패밀리.** 다른 산세리프를 섞지 않는다.
- **한글과 라틴은 동등하다.** Pretendard의 광학 정렬이 `42kg`와 `악력`을 한 줄로 읽히게 한다. 영어가 우선이라고 가정하지 않는다.
- **디스플레이는 좁은 자간.** 히어로 헤드라인과 18px+ CTA는 `-0.5 ~ -1px` 자간으로 압축한다.
- **숫자가 헤딩이다.** 측정값 20–36px/700은 본문이 아니라 헤딩으로 취급한다. 체력나이 단일 숫자는 96px+/800으로 페이지에서 가장 큰 요소가 된다.
- **본문 경량 금지.** 300은 히어로 디스플레이 크기에서만. 본문에는 절대 없다.
- **본문은 레퍼런스보다 한 단계 크다.** 14→15px, 16→17px. 전 연령 서비스이므로 밀도가 아니라 글자에서 양보한다.

## 4. Component Stylings

### Buttons

**Primary CTA (Fitness Green)**
- Background: `#04c584` / Text: `#ffffff` / Border: none / Radius: 2px
- Padding: 14px 24px · Height: 48px · Font: 17px / 700
- Hover: `#10df99` (밝아짐)
- Use: 위저드 다음 단계, 결과 액션 (`다음`, `이미지 저장`)

**Primary CTA — Large Display**
- Background: `#04c584` / Text: `#ffffff` / Radius: 2px
- Padding: 18px 32px · Height: 60px · Font: 18px / 700 · tracking -0.5px
- Use: 랜딩 히어로 CTA (`내 체력나이 측정하기`)

**Ghost / Outlined**
- Background: `#ffffff` / Text: `#04c584` / Border: 1px solid `#04c584` / Radius: 2px
- Padding: 14px 24px · Font: 17px / 700 · Hover: bg `#f3fdfa`
- Use: Primary와 짝지어지는 보조 액션 (`링크 복사`, `다시 측정하기`)

**Neutral / Cancel**
- Background: `#f5f5f5` / Text: `#434444` / Radius: 2px · Hover: `#e1e1e1`
- Use: `이전`, 취소·닫기

**Disabled**
- Background: `#e1e1e1` / Text: `#acacac` / Radius: 2px / cursor: not-allowed

**Segmented Choice (성별 선택)**
- Unselected: bg `#ffffff`, text `#434444`, border 1px `#e1e1e1`, radius 2px, height 56px, 17px/700
- Selected: bg `#04c584`, text `#ffffff`, border none
- Use: 2지선다 이상의 배타 선택. 드롭다운보다 우선 — 탭 한 번이 스크롤 두 번보다 낫다.

### Cards & Containers

**Data Card (Default)**
- Background: `#ffffff` / Border: 1px solid `#e1e1e1` / Radius: 2px
- Padding: 20px 24px · Shadow: `0 2px 5px rgba(0,0,0,.12)`
- Use: 결과 섹션 카드, 영상 추천 행, 센터 행

**Card — Highlight (Selected / Recommended)**
- Background: `#f3fdfa` / Border: 1px solid `#10df99` / Radius: 2px
- Use: 추천 1순위 영상, 선택된 지역의 센터

**Hero Result Panel**
- Background: 흰 캔버스 위 `#f3fdfa` 민트 틴트 / Border: 1px solid `#e1e1e1` / Radius: 2px
- Padding: 40px 24px · 중앙 정렬
- Use: 체력나이 단일 숫자를 담는 결과 최상단 패널. 그래디언트 금지 — 틴트는 평면이다.

### Inputs & Forms

**Text Input (Default)**
- Background: `#ffffff` / Text: `#434444` (placeholder `#999999`)
- Border: 1px solid `#e1e1e1` / Radius: 2px / Height: 56px / Padding: 0 16px / Font: 17px / 500

**Text Input — Focus**
- Background: `#f3fdfa` / Border: 1px solid `#10df99`
- 시스템 유일의 브랜드 배경 채움.

**Text Input — Error**
- Border: 1px solid `#fe493d` / 아래 오류 메시지 13px / 500 / `#fe493d`

**Measure Input (측정값 전용)**
- Background: `#ffffff` / Text: `#2b2b2b` / Border: 2px solid `#f5f5f5` / Radius: 2px
- Height: 60px / Font: 22px / 700 (우측 정렬) / 단위는 오른쪽 고정 15px / 500 `#7b7b7b`
- Focus: border `#10df99` + bg `#f3fdfa`
- Use: 악력·윗몸말아올리기 등 측정 수치 입력. 측정값을 폼 필드가 아니라 헤딩으로 취급한다.

### Badges & Tags

**Status Pill (Brand)**
- Background: `#f3fdfa` / Text: `#04c584` / Radius: 41px / Padding: 5px 12px / Font: 13px / 500
- Use: 지역 칩, 데이터 출처 칩

**Badge — Strength (강점)**
- Background: `#ffffff` / Text: `#04c584` / Border: 1px solid `#04c584` / Radius: 2px / 13px / 700

**Badge — Weakness (약점)**
- Background: `#ffffff` / Text: `#f56200` / Border: 1px solid `#fd8700` / Radius: 2px / 13px / 700

**Badge — Elite / Needs Improvement (경계 뱃지)**
- Elite: bg `#f3fdfa`, text `#04c584`, border 1px `#04c584`, radius 2px, 15px / 700
- Needs Improvement: bg `#ffffff`, text `#f56200`, border 1px `#fd8700`
- Use: 체력나이가 산출 범위 경계(20세/70세)에 닿았을 때. 숫자를 대체하지 않고 **옆에 붙는다**.

### Item Rows (측정 항목 상세)

- Background: `#ffffff` (`#fbfbfb`와 교대) / Border-bottom: 1px solid `#e1e1e1` / Padding: 14px 16px
- 항목명 15px / 500 `#434444` · 측정값 15px / 700 `#2b2b2b` 우측 정렬
- 백분위 바: 높이 10px, radius 2px, 트랙 `#f5f5f5`
  - 상위권(백분위 ≥60): `#04c584` · 중간: `#5c818a` · 하위(≤40): `#fd8700`

### Charts & Data Viz

**Chart Series Tokens**
- 또래 분포 밴드: `#a7c7cf` · 평균선: `#5c818a` (1px dashed)
- **내 값: `#04c584`** — 항상 사용자 자신의 데이터에만 예약
- 축 라벨: 12px / 500 `#7b7b7b` (모바일 11px)
- 그리드라인: 1px dashed `#e1e1e1`
- 레이더 차트: 격자 `#e1e1e1`, 채움 `#04c584` at 40% opacity, 스트로크 `#04c584` 2px

### Navigation

- Header: sticky 흰 배경, rest 상태 그림자 없음, 하단 1px `#f5f5f5`
- 로고: 좌측, 워드마크 `#04c584` 20px / 700
- 우측 유틸리티(큰 글씨 토글): ghost 스타일, 14px / 500

### Shadows

| Level | Treatment | Use |
|---|---|---|
| Flat | none | 페이지 배경, 인라인 요소 |
| Soft (L1) | `0 1px 1px rgba(0,0,0,.08)` | 미세한 행 구분 |
| Standard (L2) | `0 2px 5px rgba(0,0,0,.12)` | 기본 카드 — 가장 흔함 |
| Elevated (L3) | `0 4px 9px rgba(0,0,0,.15)` | 드롭다운, 팝오버 |
| Modal (L5) | `0 17px 50px rgba(0,0,0,.19)` | 측정 방법 안내 모달 |
| Inset | `inset 0 1px 1px rgba(0,0,0,.12)` | 눌린 버튼 |

## 5. Layout Principles

### Spacing System
- 기본 단위: 4px
- 스케일: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64
- 카드 내부 패딩: 20 / 24px
- 항목 행 세로 패딩: 14px (레퍼런스 12px에서 완화 — 전 연령 터치)

### Grid & Container
- 모바일 우선. 콘텐츠 최대 폭 480px(단일 플로우), 랜딩은 1080px까지 확장
- 앱 서피스: 16px 좌우 거터
- 결과 카드: 모바일 단일 컬럼, 태블릿 이상에서도 단일 컬럼 유지(읽는 순서가 곧 서사)

### Whitespace Philosophy
- **비교 가능성이 밀도의 목적이다.** 항목별 백분위 다섯 줄이 스크롤 없이 한눈에 들어와야 강점과 약점이 *비교*된다. 한 줄씩 흩뿌리면 데이터가 아니라 카드 더미가 된다.
- **섹션 리듬은 서피스 채움으로.** 흰색과 오프화이트가 조용히 교대하며 dense한 데이터를 스캔 가능한 밴드로 묶는다.
- **안은 좁게, 밖은 넉넉히.** 카드 안 행 간격 12px, 카드 사이 24–32px. 그룹의 위계를 간격 크기만으로 전달한다.

### Border Radius Scale
- **2px (지배적)**: 버튼, 입력, 카드, 배지, 배너. 시그니처.
- 4px: 소형 배지, 인라인 필.
- 8px: 소프트 마케팅 카드 (드묾).
- 41px: 필터 칩, 태그 칩.
- 50%: 아바타, 아이콘 배경.

12px 이상의 radius는 소비자 앱 관용구이며, 명시적 마케팅 온기 맥락에만 예약한다.

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat (L0) | 그림자 없음 | 페이지 배경, 인라인 요소 |
| Soft (L1) | `0 1px 1px rgba(0,0,0,.08)` | 리스트 항목 구분 |
| Standard (L2) | `0 2px 5px rgba(0,0,0,.12)` | 기본 카드 — 압도적 다수 |
| Elevated (L3) | `0 4px 9px rgba(0,0,0,.15)` | 드롭다운, hover 상승 카드 |
| Modal (L5) | `0 17px 50px rgba(0,0,0,.19)` | 측정 안내 모달 |
| Inset (L-1) | `inset 0 1px 1px rgba(0,0,0,.12)` | 눌린 버튼 |

**그림자 철학.** 그림자는 **항상 중립이고 단일 레이어**다. 컬러 그림자 없음, 시차 스택 없음. 카드가 표면에서 떠오를 만큼은 보이되, 눈이 머무는 곳은 그 안의 데이터여야 할 만큼 절제한다.

## 7. Do's and Don'ts

### Do
- 모든 상호작용 순간에 `#04c584`를 쓴다 — CTA, 링크, focus, 차트의 "내 값"
- hover에 `#10df99`를 쓴다 (더 *밝다* — 체력나이는 상호작용 시 밝아진다)
- 입력 focus 배경에 `#f3fdfa` 민트 틴트를 쓴다 — 시스템 유일의 브랜드 서피스 틴트
- 버튼·입력·카드·배지의 radius를 2px로 유지한다 — 시스템의 기하학적 서명
- Pretendard를 전체 한국어 폴백 스택과 함께 쓴다; 헤딩·CTA 기본 굵기 700
- 타입에 `#2b2b2b`/`#434444` 따뜻한 근사 검정을 쓴다
- 차트 시리즈에 틸-슬레이트 계열을 쓴다 — 브랜드 그린보다 의도적으로 차갑게
- `#04c584`는 차트에서 "내 값"에만 쓴다 — 일반 데이터 채움으로 절대 쓰지 않는다
- 측정값을 15px에서도 700 굵기로 쓴다
- 모든 추천 옆에 한 문장 이유를 붙인다 (`윗몸말아올리기가 또래보다 아쉬워요`)
- 데이터 출처(국민체력100)를 카드 안에 렌더한다 — 푸터로 밀지 않는다

### Don't
- 12px+ 둥근 모서리를 쓰지 않는다 — 2px이 시스템이고 8px가 소프트 마케팅 예외다
- 그래디언트 배경을 쓰지 않는다 — 민트 틴트는 평면이다
- 이모지를 UI에 쓰지 않는다 — 아이콘은 라이브러리(lucide-react) 스트로크 아이콘으로
- 본문에 400 굵기를 쓰지 않는다 — 본문 굵기는 500이다
- 컬러 그림자(초록·파랑)를 적용하지 않는다 — 그림자는 항상 중립 검정
- 차트 시리즈에 브랜드 그린을 흩뿌리지 않는다 — 초록은 상호작용과 내 값
- 측정값을 근사치로 표기하지 않는다 (`약 40kg`) — 정확한 값이 있으면 정확히 쓴다
- `#0099ff` 인포 블루를 기본 링크색으로 쓰지 않는다 — 기본 링크는 초록, 파랑은 *외부* 참조 전용
- 성취를 과장하는 카피를 쓰지 않는다 (`대단해요!`, `놀라운 결과`)
- 체력나이가 높게 나온 사용자를 질책하지 않는다 — 사실 + 다음 한 걸음

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|---|---|---|
| Mobile | <600px | 단일 컬럼, 16px 거터, 히어로 숫자 96px |
| Tablet | 600–1024px | 20px 거터, 콘텐츠 480px 중앙 |
| Desktop | 1024–1280px | 랜딩 3열 피처 그리드, 앱 서피스는 단일 컬럼 유지 |
| Large | >1280px | 콘텐츠 최대 폭 1080px 중앙 |

### Touch Targets
- 버튼 최소 48px 높이 (히어로 CTA 60px) — 레퍼런스 42px에서 상향, 전 연령 기준
- 항목 행 최소 48px
- 필터 칩: 32–36px
- 입력 최소 56px, 측정값 입력 60px

### Collapsing Strategy
- 히어로: 52px → 36px (모바일), 굵기 700 유지
- 체력나이 숫자: 120px → 96px (모바일)
- 랜딩 3열 피처 그리드 → 단일 컬럼
- 레이더 차트: 폭 100%, 종횡비 유지, 축 라벨 12px → 11px
- 지역 칩 행: 모바일에서 가로 스크롤(줄바꿈 없음)

### Image Behavior
- 영상 썸네일: 96×64px 고정 프레임, 카드 좌측
- 결과 공유 카드: 1080×1350 세로형 고정 출력
- 장식 일러스트: 없음 — 데이터가 곧 비주얼이다

## 9. Agent Prompt Guide

### Quick Color Reference
- Primary CTA: `#04c584` · Hover: `#10df99`
- 배경: `#ffffff` · 서피스 대체: `#fbfbfb` · 중립 서피스: `#f5f5f5`
- 헤딩: `#2b2b2b` · 본문: `#434444` · 캡션: `#7b7b7b` · 플레이스홀더: `#999999`
- 테두리: `#e1e1e1` · focus 틴트: `#f3fdfa`
- 차트: `#34464b` / `#5c818a` / `#1c6c73` / `#a7c7cf` · 내 값: `#04c584`
- 오류: `#fe493d` · 경고: `#fd8700` / `#f56200`

### Example Component Prompts
- "체력나이 히어로 패널: `#f3fdfa` 민트 틴트 배경, 1px `#e1e1e1` 테두리, 2px radius, 40px 24px 패딩. 숫자는 Pretendard 120px/800 `#04c584`, 자간 -3px. 아래에 실제나이 대비 문구 22px/700 `#2b2b2b`. 그래디언트 금지."
- "측정값 입력: 2px 테두리 `#f5f5f5`, focus 시 `#10df99` 테두리 + `#f3fdfa` 배경. 텍스트 22px/700 우측 정렬 `#2b2b2b`, 단위는 오른쪽 고정 15px/500 `#7b7b7b`. 높이 60px."
- "항목 백분위 행: 항목명 15px/500 `#434444` 좌측, 측정값 15px/700 `#2b2b2b`. 아래 10px 높이 바, 트랙 `#f5f5f5`, 채움은 백분위 60 이상 `#04c584` / 40 이하 `#fd8700` / 그 사이 `#5c818a`. radius 2px."
- "운동 추천 카드: 흰 배경, 1px `#e1e1e1`, 2px radius, 16px 패딩, 그림자 `0 2px 5px rgba(0,0,0,.12)`. 좌측 96×64 썸네일, 제목 15px/700 `#2b2b2b`, 추천 이유 한 줄 13px/500 `#04c584`."
- "레이더 차트: 흰 배경, 격자 `#e1e1e1`, 축 라벨 12px/500 `#7b7b7b`. 또래 평균 밴드 `#a7c7cf` 채움, 내 값 `#04c584` 2px 스트로크 + 40% 채움."

### Iteration Guide
1. **기본 radius는 2px.** 12px/16px 모서리가 나오면 반려 — 그건 다른 브랜드다.
2. **중요한 것의 기본 굵기는 700.** 헤딩, CTA, 측정값. 본문 500. 본문 400 금지.
3. **초록은 상호작용 전용.** 장식 채움이나 배경으로 쓰지 않는다. 항상 "탭할 수 있다" 또는 "이건 당신의 데이터다"를 의미한다.
4. **hover는 밝아진다.** `#04c584` → `#10df99`. 시그니처.
5. **그림자는 중립 단일 레이어.**
6. **차트 시리즈는 틸-슬레이트.** 초록은 내 값에만.
7. **Pretendard 필수.** 전체 한국어 폴백 스택 포함.
8. **이모지 대신 아이콘 라이브러리.** lucide-react 스트로크 아이콘, 기본 1.75 stroke-width.

## 10. Voice & Tone

체력나이는 **측정 결과를 읽어주는 코치**처럼 말한다 — 차분하고 사실적이며, 피트니스 앱이 기본값으로 쓰는 "할 수 있어요!" 응원 목소리가 아니다. 다른 앱이 *"오늘도 파이팅!"* 이라고 할 때, 체력나이는 *"윗몸말아올리기가 또래 평균보다 낮아요. 복부 근지구력을 올리면 체력나이가 2–3세 내려갑니다."* 라고 말한다. 숫자가 왜 그렇게 나왔는지를 설명하지, 숫자만 던지지 않는다. 한국어가 기본 레지스터다.

| Context | Tone |
|---|---|
| CTAs | 명령형, 구체적 결과. `내 체력나이 측정하기`, `이미지 저장`. 화살표 장식(`시작하기 →`) 금지. |
| 섹션 헤드라인 | 사실 진술, 후킹 아님. `항목별 위치` — `당신의 체력, 어디쯤일까요?` 아님. |
| 추천 | 근거 필수. 모든 추천 영상 옆에 한 문장 이유(`복부 근지구력이 또래보다 아쉬워요`). 근거 없는 순위 목록은 브랜드 위반. |
| 측정 수치 | 단위 붙은 정확한 값. `42kg`, `상위 32%`. 근사치(`약 40kg`) 금지. |
| 결과 통보 | 사실 + 맥락 한 줄. `실제 나이보다 3세 젊어요` + 그 근거가 된 항목. 느낌표 최소. |
| 오류 / 검증 | 구체적 원인 + 한 줄 조치. `악력 값을 다시 확인해주세요 (5~90kg)`. `오류가 발생했습니다` 금지. |
| 빈 상태 | *왜* 비었는지 설명 후 다음 한 걸음. `해당 지역의 센터 정보를 준비 중이에요.` |
| 데이터 출처 | 카드 안에 고정. 푸터 뒷전이 아니라 제품의 일부. `출처: 국민체력100 (data.go.kr)` |
| 낮은 결과 | 질책 금지, 사실 + 개선 경로. `체력 개선이 필요해요` + 약점 항목 + 추천 영상. |

**금지 표현.** `오류가 발생했습니다`, `Oops`, `대단해요!`, `놀라운`, `최고의`, `놓치지 마세요`, 일상 CTA의 느낌표, UI 이모지, 측정값 근사(`약 ~kg`), 사용자 신체를 평가하는 표현(`저질 체력`, `심각한`). 체력나이의 목소리는 클릭베이트의 반대다 — 사용자는 자기 몸을 진지하게 생각하러 왔고, 제품은 그 진지함을 존중해야 한다.

## 11. Brand Narrative

체력나이는 **2026년 7월 개발을 시작한 국민체육진흥공단(KSPO) 공공데이터 활용 경진대회 출품작**이다. 출발점이 된 관찰은 구체적이다: 국민체력100 체력인증센터는 전국에 있고 측정은 무료지만, 자기 체력이 또래 대비 어디쯤인지 알려면 **일단 센터에 가야 한다**. 그 물리적 문턱 앞에서 대부분의 사람은 자기 체력 수준을 영영 모른 채 산다.

제품의 명제는 한 문장이다 — **"인증센터에 가야만 알 수 있던 내 체력을, 집에서 먼저 알게 한다."** 집에서 잰 네 가지 값(악력·윗몸말아올리기·제자리멀리뛰기·체지방률)을 국민체력100 측정결과 공공데이터의 성별×연령대 분포와 대조해 백분위를 내고, 그 성적이 평균이 되는 나이를 역산해 **"당신의 체력나이는 OO세"** 로 환산한다. 건강검진 결과지의 "혈관나이"가 혈압 수치보다 잘 읽히는 것과 같은 이유로, 백분위보다 나이가 잘 읽힌다.

디자인 언어는 이 명제에서 곧바로 따라 나온다. 서비스의 신뢰는 공공데이터에서 오므로 **데이터 출처와 산출 근거가 화면에서 숨겨지지 않아야** 하고, 결과가 나이라는 단일 숫자로 압축되므로 **그 숫자는 페이지에서 가장 큰 요소**여야 하며, 사용자가 청소년부터 시니어까지 걸쳐 있으므로 **글자는 크고 터치 타깃은 넉넉해야** 한다. 온라인 측정은 정식 인증을 대체하지 않으므로, 결과 화면은 언제나 가까운 체력인증센터로 이어진다 — 이 제품은 오프라인 인프라를 대체하는 것이 아니라 그리로 데려가는 다리다.

체력나이가 거부하는 것: 피트니스 앱의 응원 목소리(체력나이는 설명한다, 격려하지 않는다), 헬스장 마케팅의 불타는 그래디언트와 대비 강한 다크 UI, 신체를 평가하고 수치심을 동력으로 삼는 카피, 그리고 근거 없이 순위만 나열하는 추천. 체력나이는 좁은 가운데 자리에 있다 — 공공기관 데이터를 다룰 만큼 진지하되, 결과를 친구에게 공유하고 싶을 만큼 선명한 자리.

## 12. Principles

1. **숫자를 보여준 다음, 이유를 보여준다.** 모든 추천 영상과 결과 문구에는 한 문장 근거가 붙는다. 근거 없는 순위 목록은 브랜드 위반이다. UI 함의: 모든 추천 카드는 컴포넌트 계약에 "근거 슬롯"을 갖는다.
2. **비교 가능성이 밀도의 목적이다.** 항목 다섯 줄이 한 화면에 들어와야 강점과 약점이 비교된다. 여백은 사치가 아니라 비교를 방해하는 비용이다. UI 함의: 카드 패딩 20–24px, 32px+ 아님. 항목은 리스트로 출하하지, 카드 더미로 흩지 않는다.
3. **초록은 상호작용이지 장식이 아니다.** `#04c584`은 사용자가 행동할 수 있는 곳(CTA·링크·focus·선택) 또는 사용자 자신의 데이터가 표시되는 곳("내 값", "내 체력나이")에만 나타난다. UI 함의: hover에 반응하지 않는 채움에 브랜드 그린을 쓰지 않는다.
4. **2px는 철학적 약속이다.** 날카로운 모서리는 측정 도구로 읽히고, 12–16px는 소비자 장난감으로 읽힌다. 체력나이는 설계된 것처럼 보이기를 택한다. UI 함의: 둥근 모서리의 외부 컴포넌트를 그대로 가져오지 말고 2px로 다시 깎는다.
5. **숫자가 헤딩이다.** 측정값 20px+ 는 페이지 제목과 같은 위계(700)로 조판한다. 체력나이 단일 숫자는 96px+/800으로 페이지 최대 요소가 된다. UI 함의: 수치는 헤딩 클래스 토큰을 쓴다.
6. **데이터 출처는 제품의 일부다.** 국민체력100 출처 표기와 산출 근거는 법적 푸터가 아니라 결과 카드 안, 결과와 같은 시각적 프레임에 고정된다. UI 함의: 데이터 기반 컴포넌트는 항상 렌더되는 `source` 슬롯을 예약한다(접힘 기본값 금지).
7. **한글과 라틴 숫자는 정렬되어야 한다.** `42kg`와 `악력`이 한 줄에서 두 개의 문자체계로 다투면 안 된다. UI 함의: 수치 표시에 라틴 전용 폰트를 대입하지 않는다. Pretendard가 둘 다 처리한다.
8. **차트의 들판은 틸-슬레이트, 내 위치만 초록.** 또래 분포를 중립색으로 두어야 사용자 자신의 위치가 즉시 읽힌다. UI 함의: 차트 기본 시리즈는 `[#a7c7cf, #5c818a, #34464b]`, 사용자 시리즈는 `#04c584`.
9. **근사는 배신이다.** 정확한 값이 있는데 `약 40kg`이라고 쓰는 것은 제품이 실제로 그 숫자를 모른다고 말하는 것이다. UI 함의: 측정값 컴포넌트는 반올림 플래그를 받지 않는다. 단, 체력나이 자체는 정수로 반올림한다 — 이건 근사가 아니라 단위다.
10. **온라인은 오프라인으로 이어진다.** 간이 측정 결과는 정식 인증을 대체한다고 말하지 않는다. 모든 결과 화면은 가까운 체력인증센터 경로를 포함한다. UI 함의: 결과 서피스는 센터 안내 섹션을 선택 요소로 취급하지 않는다.
11. **평가하지 않고 측정한다.** 체력이 낮게 나온 사용자에게 수치심을 주지 않는다. 사실을 말하고 다음 한 걸음을 제시한다. UI 함의: 낮은 결과의 시각 언어는 경고 오렌지(`#fd8700`)까지이며, 오류 레드(`#fe493d`)는 입력 검증에만 쓴다.

## 13. Personas

*아래 페르소나는 국민체력100 이용자 통계와 이 서비스의 타깃 정의에서 도출한 가상의 원형이며, 특정 개인을 가리키지 않는다.*

**김서연, 34, 서울.** 사무직 5년 차. 건강검진에서 체지방률이 올랐다는 말을 듣고 검색하다 링크를 눌러 들어왔다. 헬스장 등록은 세 번 실패했다. 결과 화면에서 "체력나이 39세"를 보고 실제 나이보다 5세 많다는 사실에 처음으로 구체적인 위기감을 느꼈고, 약점으로 표시된 항목의 추천 영상을 저장했다. 응원 문구에는 반응하지 않지만 자기 백분위 숫자는 캡처해서 친구에게 보냈다. 근거 없이 "운동하세요"라고만 하는 화면이었다면 닫았을 것이다.

**박준호, 17, 대전.** 고등학교 2학년. 체육 수행평가 전에 자기 기록이 또래 대비 어느 정도인지 궁금해 접속했다. 제자리멀리뛰기 백분위가 상위 15%로 나온 것을 확인하고 결과 카드를 저장해 SNS에 올렸다. 측정 방법 안내 모달을 실제로 읽고 따라 했다 — 절차가 애매했다면 대충 입력하고 결과를 믿지 않았을 것이다.

**이정숙, 63, 부산.** 은퇴 후 복지관 프로그램에 다닌다. 글자가 작으면 화면을 닫는다. 큰 글씨 모드를 켜고 나서야 끝까지 진행했고, 악력 값을 몰라 복지관에서 잰 기록을 찾아 입력했다. 결과보다 "가까운 체력인증센터" 섹션을 오래 봤다 — 무료로 정식 측정을 받을 수 있다는 정보가 이 사람에게는 결과 숫자보다 실질적인 가치였다. 주소를 눌러 지도로 이동했다.

**정민우, 41, 경기.** 주 3회 러닝을 하는 중급자. 자기 체력이 또래 상위권일 거라 확신하고 접속했고, 실제로 체력나이 34세를 받았다. 다만 악력만 평균 이하로 나온 것이 의외여서 그 항목의 백분위 바와 추천 영상을 확인했다. 이 사람이 서비스를 신뢰한 이유는 결과가 좋아서가 아니라, **한 항목만 다르게 나왔고 그 근거가 표시됐기** 때문이다. 모든 항목이 뭉뚱그려 "좋음"으로 나왔다면 측정을 믿지 않았을 것이다.

## 14. States

| State | Treatment |
|---|---|
| **Empty (측정 전 결과 접근)** | 흰 캔버스. `#434444` 본문 한 문단으로 왜 비었는지 설명(`측정 정보가 올바르지 않아요. 측정 페이지에서 다시 입력해주세요.`). Primary CTA 하나(`체력나이 측정하러 가기`). 일러스트 없음. |
| **Empty (해당 지역 센터 없음)** | `#7b7b7b` 캡션 한 줄(`해당 지역의 센터 정보를 준비 중이에요.`). CTA 없음 — 사용자가 지역을 바꾼다. |
| **Loading (센터 조회)** | `#f5f5f5` 스켈레톤 블록, 최종 레이아웃과 정확히 같은 치수, 2px radius. 1s shimmer. 측정 수치 자리는 스켈레톤 바가 아니라 `--` 로 표시 — 바가 숫자로 바뀌면 혼란스럽다. |
| **Loading (결과 산출)** | 산출은 즉시(클라이언트 순수 계산)이므로 로딩 없음. 영상·센터만 스켈레톤. |
| **Error (입력 검증)** | 입력에 `#fe493d` 1px 테두리, 아래 13px `#fe493d` 500 오류 문구. 실행 가능한 한 문장(`악력 값을 다시 확인해주세요 (5~90kg)`). |
| **Error (센터 조회 실패)** | 섹션 내부 인라인 배너. `#fe493d` 좌측 테두리, 흰 배경, 15px `#434444` 텍스트 + `다시 시도` 버튼. 토스트 금지. |
| **Error (공공 API 지연/실패)** | 사용자에게 오류를 노출하지 않는다 — 목업으로 graceful fallback 하고 데이터 출처 캡션에 기준 시점을 표기. 심사·시연 중 화면이 비는 것이 가장 큰 실패다. |
| **Success (이미지 저장/링크 복사)** | 버튼 하단 인라인 확인 문구 13px / 500 `#04c584`, 2.5s 후 자동 소멸. 토스트·모달 금지. |
| **Skeleton** | `#f5f5f5` 블록, 최종 치수, 2px radius. 1s shimmer. |
| **Disabled** | 배경 `#e1e1e1`, 텍스트 `#acacac`, 2px radius 유지. cursor `not-allowed`. 활성 상태와 기하가 동일해 재활성 시 레이아웃이 흔들리지 않는다. |
| **Pressed (button)** | `inset 0 1px 1px rgba(0,0,0,.12)` + 약 5% 어두워짐. 놓으면 즉시 복귀(스프링 없음). |
| **Big Text Mode** | `html.big-text`에서 루트 폰트 120%. 모든 치수가 rem 기반이라 레이아웃이 비례 확대된다. 결과 공유 카드는 고정 픽셀 출력이므로 영향받지 않는다. |

## 15. Motion & Easing

**Durations:**

| Token | Value | Use |
|---|---|---|
| `motion-instant` | 0ms | 상태 커밋, 체크박스, focus 링 |
| `motion-fast` | 150ms | hover, focus, 버튼 press |
| `motion-standard` | 250ms | 카드 확장, 모달 열림, 단계 전환 |
| `motion-slow` | 400ms | 페이지 수준 전환, 추천 카드 등장 |
| `motion-data` | 600ms | 차트 시리즈 draw-in, 체력나이 count-up — 사용자가 숫자를 읽을 시간이 필요하므로 느리다 |

**Easings:**

| Token | Curve | Use |
|---|---|---|
| `ease-enter` | `cubic-bezier(0.0, 0.0, 0.2, 1)` | 도착 — 모달, 드롭다운 |
| `ease-exit` | `cubic-bezier(0.4, 0.0, 1, 1)` | 소멸 |
| `ease-standard` | `cubic-bezier(0.4, 0.0, 0.2, 1)` | 양방향 전환, 차트 draw-in |
| `ease-data` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | 체력나이 count-up — 최종값이 차분한 안착점이 되도록 서서히 감속 |

**명시적 금지.** 스프링 오버슈트 없음. 바운스 없음. 중간 제어점이 `1.0`을 넘는 `cubic-bezier` 없음. 체력나이의 목소리는 *코치*이지 *연출가*가 아니다 — 스프링 이징은 측정 결과를 축하하는 소비자 앱으로 읽히며, 이는 브랜드 약속의 반대다.

**시그니처 모션.**

1. **체력나이 count-up.** 결과 화면 진입 시 실제 나이에서 산출된 체력나이로 `motion-data`(600ms) `ease-data`로 카운트한다. 시작점이 실제 나이라는 점이 핵심이다 — 숫자가 올라가는지 내려가는지가 곧 결과의 의미다. 느린 속도는 의도된 것으로, 사용자는 변화를 읽어야지 스쳐 봐서는 안 된다.
2. **백분위 바 채우기.** 항목별 바는 0에서 자기 백분위까지 `motion-data`로 `ease-standard` 채워진다. 위에서 아래로 60ms씩 stagger — 항목이 순서대로 읽히게 한다.
3. **레이더 차트 draw-in.** 또래 분포 밴드가 먼저 그려지고, 사용자 자신의 다각형(`#04c584`)이 **마지막에** 그려진다. 주변 분포가 확립된 뒤에 눈이 자기 데이터에 안착하도록.
4. **추천 카드 등장.** 신규 추천 세트는 `opacity: 0; translateY(4px)`에서 `motion-standard / ease-enter`로 페이드인. 이동거리는 의도적으로 작다(4px, 20px 아님) — 카드는 도착하는 것이지 날아오는 것이 아니다.
5. **Reduce motion.** `prefers-reduced-motion: reduce`에서 모든 `motion-*` 토큰은 `motion-instant`로 붕괴한다. count-up은 즉시 값 교체, 차트 draw-in은 최종 상태 즉시 렌더. 제품은 완전히 사용 가능하게 유지되며, 정보가 모션에 의존하는 곳은 어디에도 없다.

<!--
OmD v0.1 — 체력나이 DESIGN.md

Base reference: banksalad (.claude/data/references/banksalad/DESIGN.md, verified 2026-05-15)
- 토큰(색·radius·그림자·모션)은 레퍼런스 canonical 값 보존
- delta_set.axes { density.shift: -1 } 적용 지점:
  · 본문 타이포 14→15px, 16→17px
  · 버튼 최소 높이 42→48px, 입력 48→56px, 항목 행 12→14px 패딩
  · 정보 밀도(비교 가능성)는 레퍼런스대로 유지 — §5 Whitespace Philosophy, §12-2 참조
- §11–13은 이 프로젝트의 실제 사실(2026년 7월 개발 시작, KSPO 경진대회 출품,
  국민체력100 공공데이터 기반, 전 연령 타깃)에 기반해 작성. 페르소나는 §13 서두에
  명시한 대로 가상 원형이며 실존 인물이 아니다.
- 레퍼런스의 BM JUA 디스플레이 폰트는 채택하지 않음 — 마케팅 온기보다 측정 도구의
  일관성을 우선. Pretendard 단일 패밀리.
-->
