import { NextResponse } from "next/server";
import { getCenters } from "@/lib/kspoApi";

/**
 * 체력인증센터 조회 프록시 — 공공데이터포털 키를 서버에만 두고
 * 클라이언트는 이 Route Handler를 통해서만 접근한다.
 */
export async function GET(request: Request) {
  const sido = new URL(request.url).searchParams.get("sido") ?? undefined;

  try {
    const centers = await getCenters(sido);
    return NextResponse.json(centers);
  } catch (error) {
    console.error("centers route failed:", error);
    return NextResponse.json(
      { error: "센터 정보를 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
