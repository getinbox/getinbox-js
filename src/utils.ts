export const safeJsonParse = <T = any>(text: string) => {
  try {
    return JSON.parse(text) as T;
  } catch {
    return undefined;
  }
};
