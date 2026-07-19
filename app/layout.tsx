import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import BigTextToggle from "@/components/BigTextToggle";

const SITE_NAME = "체력나이";
const SITE_DESCRIPTION =
  "KSPO 국민체력100 공공데이터 분포와 비교해 나의 체력나이를 측정하고, 약점에 맞는 운동과 가까운 체력인증센터를 안내받으세요.";

export const metadata: Metadata = {
  metadataBase: new URL("https://national-physical-strength-100.vercel.app"),
  title: `${SITE_NAME} — 국민체력100 데이터로 알아보는 내 몸의 나이`,
  description: SITE_DESCRIPTION,
  // app/opengraph-image.png 를 넣으면 Next.js가 자동으로 og:image에 연결한다
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 내 체력은 또래 중에 어디쯤일까요?`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — 내 체력은 또래 중에 어디쯤일까요?`,
    description: SITE_DESCRIPTION,
  },
};

/** 저장된 큰 글씨 설정을 첫 페인트 전에 적용 (깜빡임 방지) */
const APPLY_BIG_TEXT_SCRIPT = `try{if(localStorage.getItem("fitness-age-big-text")==="1")document.documentElement.classList.add("big-text")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-canvas">
        <script dangerouslySetInnerHTML={{ __html: APPLY_BIG_TEXT_SCRIPT }} />

        <header className="sticky top-0 z-10 border-b border-surface-neutral bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-[30rem] items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-bold tracking-[-0.5px] text-brand">
              체력나이
            </Link>
            <BigTextToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col">{children}</main>

        <footer className="border-t border-surface-neutral py-5">
          <p className="mx-auto max-w-[30rem] px-4 text-center text-[0.6875rem] leading-relaxed text-caption">
            데이터 출처: 국민체육진흥공단 국민체력100
            <br />
            공공데이터포털(data.go.kr) 개방 데이터를 활용한 서비스입니다.
          </p>
        </footer>
      </body>
    </html>
  );
}
