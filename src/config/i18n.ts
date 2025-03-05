import { Language } from '@/types/i18n';

type LanguageConfig = {
  languages: Language[];
  defaultLanguage: Language;
};

const languagesConfig: LanguageConfig = {
  languages: ['en', 'bg', 'vn'],
  defaultLanguage: 'vn',
};

export { languagesConfig };
