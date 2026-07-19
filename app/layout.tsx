import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import BigTextToggle from "@/components/BigTextToggle";

/** 저장된 큰 글씨 설정을 첫 페인트 전에 적용 (깜빡임 방지) */
const APPLY_BIG_TEXT_SCRIPT = `try{if(localStorage.getItem("fitness-age-big-text")==="1")document.documentElement.classList.add("big-text")}catch(e){}`;

export const metadata: Metadata = {
  title: "체력나이 — 국민체력100 데이터로 알아보는 내 몸의 나이",
  description:
    "KSPO 국민체력100 공공데이터 분포와 비교해 나의 체력나이를 측정하고, 맞춤 운동을 추천받아 보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: APPLY_BIG_TEXT_SCRIPT }} />
        <header className="w-full border-b border-emerald-100 dark:border-emerald-950 bg-background/80 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg text-emerald-700 dark:text-emerald-400">
              체력나이
            </Link>
            <BigTextToggle />
          </div>
        </header>
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-emerald-100 dark:border-emerald-950 py-4 text-center text-xs text-neutral-500">
          데이터 출처: 국민체육진흥공단 국민체력100 (공공데이터포털 data.go.kr)
        </footer>
      </body>
    </html>
  );
}
