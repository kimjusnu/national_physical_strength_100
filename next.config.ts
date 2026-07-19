import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
