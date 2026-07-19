import { z } from "zod";
import type { BasicInfo, FitnessInputs, UserMeasurement } from "@/lib/types";

export const basicInfoSchema = z.object({
  gender: z.enum(["M", "F"], { error: "성별을 선택해주세요" }),
  age: z.coerce
    .number({ error: "나이를 입력해주세요" })
    .int("정수로 입력해주세요")
    .min(15, "15세 이상부터 측정할 수 있어요")
    .max(84, "84세 이하만 측정할 수 있어요"),
  heightCm: z.coerce
    .number({ error: "키를 입력해주세요" })
    .min(100, "키를 다시 확인해주세요 (100~220cm)")
    .max(220, "키를 다시 확인해주세요 (100~220cm)"),
  weightKg: z.coerce
    .number({ error: "몸무게를 입력해주세요" })
    .min(25, "몸무게를 다시 확인해주세요 (25~200kg)")
    .max(200, "몸무게를 다시 확인해주세요 (25~200kg)"),
});

export const fitnessInputsSchema = z.object({
  grip: z.coerce
    .number({ error: "악력을 입력해주세요" })
    .min(5, "악력 값을 다시 확인해주세요 (5~90kg)")
    .max(90, "악력 값을 다시 확인해주세요 (5~90kg)"),
  situp: z.coerce
    .number({ error: "윗몸말아올리기 횟수를 입력해주세요" })
    .int("횟수는 정수로 입력해주세요")
    .min(0, "0회 이상 입력해주세요")
    .max(100, "횟수를 다시 확인해주세요 (0~100회)"),
  jump: z.coerce
    .number({ error: "제자리멀리뛰기 기록을 입력해주세요" })
    .min(30, "기록을 다시 확인해주세요 (30~330cm)")
    .max(330, "기록을 다시 확인해주세요 (30~330cm)"),
  bodyfat: z.coerce
    .number({ error: "체지방률을 입력해주세요" })
    .min(3, "체지방률을 다시 확인해주세요 (3~60%)")
    .max(60, "체지방률을 다시 확인해주세요 (3~60%)"),
  shuttle: z.coerce
    .number()
    .int("횟수는 정수로 입력해주세요")
    .min(0, "0회 이상 입력해주세요")
    .max(150, "횟수를 다시 확인해주세요 (0~150회)")
    .optional(),
});

/** /result 쿼리스트링 스키마 (짧은 키: g, age, h, w + 항목 키) */
const resultQuerySchema = z.object({
  g: basicInfoSchema.shape.gender,
  age: basicInfoSchema.shape.age,
  h: basicInfoSchema.shape.heightCm,
  w: basicInfoSchema.shape.weightKg,
  grip: fitnessInputsSchema.shape.grip,
  situp: fitnessInputsSchema.shape.situp,
  jump: fitnessInputsSchema.shape.jump,
  bodyfat: fitnessInputsSchema.shape.bodyfat,
  shuttle: fitnessInputsSchema.shape.shuttle,
});

/** 측정 완료 시 결과 페이지로 넘길 쿼리스트링 생성 */
export function toResultQuery(basic: BasicInfo, items: FitnessInputs): string {
  const params = new URLSearchParams({
    g: basic.gender,
    age: String(basic.age),
    h: String(basic.heightCm),
    w: String(basic.weightKg),
    grip: String(items.grip),
    situp: String(items.situp),
    jump: String(items.jump),
    bodyfat: String(items.bodyfat),
  });
  if (items.shuttle != null) {
    params.set("shuttle", String(items.shuttle));
  }
  return params.toString();
}

/** 결과 페이지 쿼리 파싱 — 잘못된 접근이면 null */
export function parseResultQuery(
  searchParams: Record<string, string | string[] | undefined>,
): UserMeasurement | null {
  const parsed = resultQuerySchema.safeParse(searchParams);
  if (!parsed.success) return null;

  const { g, age, h, w, grip, situp, jump, bodyfat, shuttle } = parsed.data;
  return {
    gender: g,
    age,
    heightCm: h,
    weightKg: w,
    items: { grip, situp, jump, bodyfat, ...(shuttle != null ? { shuttle } : {}) },
  };
}
