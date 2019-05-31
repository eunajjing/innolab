export function safe<T>(f: () => T) {
  try {
    return f();
  } catch {
    return undefined;
  }
}
// 해당 값이 없을 때 에러가 아니라 언디파운드로 처리가 되도록 설정
