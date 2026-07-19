import { describe, expect, it } from "vitest";
import { shortenVideoTitle } from "@/lib/videoTitle";
import { MOCK_VIDEOS } from "@/data/mockVideos";

describe("shortenVideoTitle", () => {
  it("중복되는 '국민체력100' 접두어를 걷어낸다", () => {
    expect(
      shortenVideoTitle("국민체력100 건강한 습관 만들기(1기) | EP.08 손목&전완근 강화 운동"),
    ).toBe("건강한 습관 만들기 EP.08 · 손목&전완근 강화 운동");
  });

  it("'체력증진 운동 프로그램' 같은 군더더기도 걷어낸다", () => {
    expect(
      shortenVideoTitle(
        "국민체력100 체력증진 운동 프로그램 오.운.완 ㅣ EP.01 직장인 근골격계 관리 운동 초급",
      ),
    ).toBe("오.운.완 EP.01 · 직장인 근골격계 관리 운동 초급");
  });

  it("해시태그와 이모지를 제거한다", () => {
    expect(shortenVideoTitle("유치원생을 위한 운동 - 사이드 점프 #국민체력100")).toBe(
      "유치원생을 위한 운동 - 사이드 점프",
    );
    expect(shortenVideoTitle("[👩🏻‍🎓청소년] 중고등학생 체력향상 운동프로그램 (30min)")).toBe(
      "[청소년] 중고등학생 체력향상 운동프로그램 (30min)",
    );
  });

  it("걷어낼 것이 없으면 원문을 그대로 둔다", () => {
    expect(shortenVideoTitle("종아리 강화 운동")).toBe("종아리 강화 운동");
  });

  it("모든 시드 제목이 40자 이내로 줄어든다", () => {
    for (const video of MOCK_VIDEOS) {
      const short = shortenVideoTitle(video.VDO_TTL_NM);
      expect(short.length, `너무 김: ${short}`).toBeLessThanOrEqual(40);
      expect(short.length).toBeGreaterThan(0);
    }
  });

  it("입력 문자열을 변형하지 않는다 (순수함수)", () => {
    const original = "국민체력100 건강한 습관 만들기(1기) | EP.02 종아리 강화 운동";
    const copy = String(original);
    shortenVideoTitle(original);
    expect(original).toBe(copy);
  });
});
