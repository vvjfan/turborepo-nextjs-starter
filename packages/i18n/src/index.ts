export const locales = ["en", "zh-CN"] as const;
export const defaultLocale = "en";
export type Locale = (typeof locales)[number];
