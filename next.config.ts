import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 동적 OG 이미지가 런타임에 폰트 파일을 읽는다 — 배포 번들에 포함시킨다
  outputFileTracingIncludes: {
    "/result/opengraph-image": ["./assets/fonts/**"],
  },
  images: {
    remotePatterns: [
      // 국민체력100 공식 유튜브 영상 썸네일 (data/mockVideos.ts)
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
      // 실 API 연동 시 공단 CDN 썸네일
      { protocol: "https", hostname: "**.kspo.or.kr" },
    ],
  },
};

export default nextConfig;
