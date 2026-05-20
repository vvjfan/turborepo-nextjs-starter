import "server-only";
import { hasLocale } from "@repo/i18n";
import type { Locale } from "@repo/i18n";

const dictionaries = {
  en: () => import("./en.json").then((m) => m.default),
  "zh-CN": () => import("./zh-CN.json").then((m) => m.default),
} as const;

export interface WebDictionary {
  greeting: string;
  welcome: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  settings: string;
  language: string;
  english: string;
  chinese: string;
  loading: string;
  error_occurred: string;
  try_again: string;
  not_found: string;
  go_home: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  sign_in: string;
  sign_up: string;
  sign_in_error: string;
  sign_up_error: string;
  or_continue_with: string;
  github: string;
  google: string;
  posts: string;
  create_post: string;
}

export async function getDictionary(locale: Locale): Promise<WebDictionary> {
  return dictionaries[locale]();
}

export { hasLocale };
export type { Locale };
