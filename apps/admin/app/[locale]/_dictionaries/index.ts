import "server-only";
import { hasLocale } from "@repo/i18n";
import type { Locale } from "@repo/i18n";

const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  "zh-CN": () => import("./zh-CN.json").then((m) => m.default),
} as const;

export interface AdminDictionary {
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  settings: string;
  loading: string;
  email: string;
  password: string;
  name: string;
  sign_in: string;
  sign_up: string;
  sign_in_error: string;
  sign_up_error: string;
}

export async function getDictionary(locale: Locale): Promise<AdminDictionary> {
  return dictionaries[locale]();
}

export { hasLocale };
export type { Locale };
