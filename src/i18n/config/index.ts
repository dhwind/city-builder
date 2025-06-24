import { Language } from '../types';

type LanguageConfig = {
  languages: Language[];
  defaultLanguage: Language;
};

const languagesConfig: LanguageConfig = {
  languages: ['en', 'bg', 'vn'],
  defaultLanguage: 'vn',
};

export { languagesConfig };
