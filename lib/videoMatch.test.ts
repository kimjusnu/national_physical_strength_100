import { describe, expect, it } from "vitest";
import {
  ITEM_TO_FT_CATEGORY,
  RECOMMEND_MAX,
  RECOMMEND_MIN,
  matchVideos,
  pickWeakItems,
  reasonFor,
} from "@/lib/videoMatch";
import { MOCK_VIDEOS } from "@/data/mockVideos";
import type { FitnessItemKey, ItemResult } from "@/lib/types";

function item(key: FitnessItemKey, percentile: number): ItemResult {
  return { key, value: 0, percentile, fitnessAge: 40 };
}

describe("pickWeakItems", () => {
  it("백분위 하위 2개 항목을 약한 순서로 반환한다", () => {
    const items = [
      item("grip", 80),
      item("situp", 10),
      item("jump", 55),
      item("bodyfat", 30),
    ];
    expect(pickWeakItems(items)).toEqual(["situp", "bodyfat"]);
  });

  it("항목이 1개면 1개만 반환한다", () => {
    expect(pickWeakItems([item("grip", 90)])).toEqual(["grip"]);
  });

  it("입력 배열을 변형하지 않는다", () => {
    const items = [item("grip", 80), item("situp", 10)];
    const before = structuredClone(items);
    pickWeakItems(items);
    expect(items).toEqual(before);
  });
});

describe("matchVideos", () => {
  it("약점 카테고리 영상을 우선으로 3~5개 추천한다", () => {
    const videos = matchVideos(MOCK_VIDEOS, ["situp", "bodyfat"]);
    expect(videos.length).toBeGreaterThanOrEqual(RECOMMEND_MIN);
    expect(videos.length).toBeLessThanOrEqual(RECOMMEND_MAX);
    const weakCategories = [
      ITEM_TO_FT_CATEGORY.situp,
      ITEM_TO_FT_CATEGORY.bodyfat,
    ];
    expect(weakCategories).toContain(videos[0].FT_ITEM_NM);
  });

  it("약점 카테고리 영상이 부족하면 다른 영상으로 최소 개수를 채운다", () => {
    const onlyOneGripVideo = MOCK_VIDEOS.filter(
      (v) => v.FT_ITEM_NM === ITEM_TO_FT_CATEGORY.grip,
    ).slice(0, 1);
    const others = MOCK_VIDEOS.filter(
      (v) => v.FT_ITEM_NM !== ITEM_TO_FT_CATEGORY.grip,
    );
    const videos = matchVideos([...onlyOneGripVideo, ...others], ["grip"]);
    expect(videos.length).toBeGreaterThanOrEqual(RECOMMEND_MIN);
    expect(videos[0].FT_ITEM_NM).toBe(ITEM_TO_FT_CATEGORY.grip);
  });

  it("모든 항목 키에 카테고리와 추천 사유가 정의되어 있다", () => {
    const keys: FitnessItemKey[] = ["grip", "situp", "jump", "bodyfat", "shuttle"];
    for (const key of keys) {
      expect(ITEM_TO_FT_CATEGORY[key]).toBeTruthy();
      expect(reasonFor(key)).toBeTruthy();
    }
  });
});
