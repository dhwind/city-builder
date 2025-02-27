import { getRequestConfig } from 'next-intl/server';

import { Language } from '@/types/i18n';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Language)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`~/messages/${locale}.json`)).default,
  };
});
