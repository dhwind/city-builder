'use client';

import { useLocale, useTranslations } from 'next-intl';
import DynamicImage from '../dynamic-image';
import { Language } from '@/types/i18n';
import SelectDropdown from '@/components/select-dropdown';
import { languagesConfig } from '@/config/i18n';
import { usePathname, useRouter } from '@/i18n/navigation';
import { SelectableDropdownItem } from '@/types/common';

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
  console.log(locationItems);

  const handleChangeLanguage = (value: string) => {
    const newLocale = value as Language;

    console.log(newLocale);

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-x-2">
      <span className="whitespace-nowrap text-sm">{t('selectLanguage')}</span>
      <SelectDropdown
        items={locationItems}
        defaultValue={currentLanguage}
        className={{ trigger: 'min-w-none', content: 'min-w-none' }}
        onSelect={handleChangeLanguage}
      />
    </div>
  );
};

export default LanguageSelector;
