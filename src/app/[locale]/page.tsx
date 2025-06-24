import { getTranslations } from 'next-intl/server';
import { BuilderContainer } from '@/features/builder/components';

type Params = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Params): Promise<{
  description: string;
  keywords: string;
  title: string;
}> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homepage.title'),
    description: t('homepage.description'),
    keywords: t('homepage.keywords'),
  };
}

const Home: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      <BuilderContainer />
    </div>
  );
};

export default Home;
