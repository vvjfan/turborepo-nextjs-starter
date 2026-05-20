import type { InitOptions } from "i18next";
import { locales, defaultLocale } from "./src/index";

export const i18nConfig: InitOptions = {
  supportedLngs: locales,
  fallbackLng: defaultLocale,
  defaultNS: "common",
  returnObjects: true,
};

export const i18n = {
  defaultLocale,
  locales: [...locales],
};
