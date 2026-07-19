import type { ZodError } from "zod";

/** zod 이슈 목록을 { 필드명: 첫 에러 메시지 } 맵으로 변환 */
export function toFieldErrors(error: ZodError): Record<string, string> {
  return error.issues.reduce<Record<string, string>>((acc, issue) => {
    const field = String(issue.path[0] ?? "_");
    return field in acc ? acc : { ...acc, [field]: issue.message };
  }, {});
}

/** 빈 문자열 입력을 undefined로 바꿔 zod의 필수값 에러 메시지가 뜨게 한다 */
export function withEmptyAsUndefined<T extends Record<string, string>>(
  values: T,
): Record<string, string | undefined> {
  return Object.fromEntries(
    Object.entries(values).map(([k, v]) => [k, v === "" ? undefined : v]),
  );
}
