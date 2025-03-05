import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const ClientTranslationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={pick(messages, 'builder', 'common', 'fields', 'weather')}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default ClientTranslationsProvider;
