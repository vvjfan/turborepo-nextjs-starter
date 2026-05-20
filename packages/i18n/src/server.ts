import { createInstance } from "i18next";
import type { i18n as I18nInstance } from "i18next";
import { i18n } from "../next-i18next.config";

import enCommon from "../locales/en/common.json";
import zhCNCommon from "../locales/zh-CN/common.json";

const translations: Record<string, Record<string, string>> = {
  en: enCommon,
  "zh-CN": zhCNCommon,
};

const englishTranslations: Record<string, string> = enCommon;
const translationCache = new Map<string, Record<string, string>>();
const i18nInstanceCache = new Map<string, I18nInstance>();
const SUPPORTED_NAMESPACES = ["common"];

export function mergeWithEnglishFallback(
  localeTranslations: Record<string, string>,
): Record<string, string> {
  return { ...englishTranslations, ...localeTranslations };
}

export async function loadTranslations(
  _locale: string,
  _ns: string,
): Promise<Record<string, string>> {
  const normalized =
    _locale === "zh" ? "zh-CN" : _locale;
  const locale = (i18n.locales as readonly string[]).includes(normalized) ? normalized : "en";
  const ns = SUPPORTED_NAMESPACES.includes(_ns) ? _ns : "common";
  const cacheKey = `${locale}-${ns}`;

  const cached = translationCache.get(cacheKey);
  if (cached) return cached;

  if (locale === "en") {
    translationCache.set(cacheKey, englishTranslations);
    return englishTranslations;
  }

  const localeTranslations = translations[locale] ?? {};
  const merged = mergeWithEnglishFallback(localeTranslations);
  translationCache.set(cacheKey, merged);
  return merged;
}

export const getTranslation = async (locale: string, ns: string) => {
  const cacheKey = `${locale}-${ns}`;
  const cachedInstance = i18nInstanceCache.get(cacheKey);
  if (cachedInstance) {
    return cachedInstance.getFixedT(locale, ns);
  }

  const resources = await loadTranslations(locale, ns);
  const _i18n = createInstance();
  _i18n.init({
    lng: locale,
    resources: {
      [locale]: {
        [ns]: resources,
      },
    },
    fallbackLng: "en",
  });

  i18nInstanceCache.set(cacheKey, _i18n);
  return _i18n.getFixedT(locale, ns);
};
