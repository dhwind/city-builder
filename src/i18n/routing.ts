import { defineRouting } from 'next-intl/routing';
import { languagesConfig } from '@/i18n/config';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: languagesConfig.languages,

  // Used when no locale matches
  defaultLocale: languagesConfig.defaultLanguage,
});
