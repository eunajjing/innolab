export function safe<T>(f: () => T) {
  try {
    return f();
  } catch {
    return undefined;
  }
}