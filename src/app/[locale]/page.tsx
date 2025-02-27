import { getTranslations } from 'next-intl/server';
import Builder from '@/features/builder';

type Params = {
  params: { locale: string };
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
      <Builder />
    </div>
  );
};

export default Home;
