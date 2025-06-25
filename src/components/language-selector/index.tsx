'use client';

import { useLocale, useTranslations } from 'next-intl';
import DynamicImage from '../dynamic-image';
import SelectDropdown from '@/components/select-dropdown';
import { languagesConfig } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';
import { SelectableDropdownItem } from '@/types';
import { Language } from '@/i18n/types';

const LanguageSelector: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const t = useTranslations('languageSelector');
  const currentLanguage = useLocale() as Language;

  const languages: Language[] = languagesConfig.languages;

  const locationItems: SelectableDropdownItem[] = languages.map(language => ({
    value: language,
    label: t(`languages.${language}`),
    icon: (
      <DynamicImage
        src={`languages/flags/${language}.svg`}
        alt={language}
        width={30}
        height={20}
      />
    ),
  }));

  const handleChangeLanguage = (value: string) => {
    const newLocale = value as Language;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex flex-col gap-2 md:items-center md:flex-row">
      <span className="whitespace-nowrap text-sm">{t('selectLanguage')}</span>
      <SelectDropdown
        items={locationItems}
        defaultValue={currentLanguage}
        className={{
          trigger: 'max-w-32 min-w-none',
          content: 'max-w-32 min-w-none',
        }}
        onSelect={handleChangeLanguage}
      />
    </div>
  );
};

export default LanguageSelector;
