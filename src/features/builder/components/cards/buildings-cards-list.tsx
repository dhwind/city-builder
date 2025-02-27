'use client';

import { House } from 'lucide-react';

import { useTranslations } from 'next-intl';
import BuildingsCardItem from './buildings-card-item';
import { useBuilderStore } from '@/store/builder';
import { Button } from '@/components/ui/button';
import { generateUUID } from '@/utils/uuid';
import { builderConfig } from '@/config/builder';
import LoaderLayout from '@/layouts/loader';

const BuildingsCardsList: React.FC = () => {
  const t = useTranslations('builder');

  const { buildings, pending, addBuilding } = useBuilderStore();

  console.log(addBuilding);

  const handleAddNewBuilding = () => {
    addBuilding({
      uuid: generateUUID('building'),
      name: `Building ${buildings ? buildings!.length + 1 : ''}`,
      type: builderConfig.defaultType,
      floors: [],
      color: builderConfig.defaultColor,
    });
  };

  return (
    <section id="buildings-cards" className="col-span-1">
      <div className="w-full max-h-[600px] h-[600px] border rounded flex flex-col">
        <div className="w-full bg-gray-100 px-6 py-3 font-bold">
          {t('buildings')}
        </div>
        <LoaderLayout isLoading={pending}>
          {buildings?.length > 0 ? (
            <ul>
              {buildings!.map(building => (
                <BuildingsCardItem key={building.uuid} building={building} />
              ))}
            </ul>
          ) : (
            <div className="flex text-center justify-center align-center px-6 py-3 ">
              {t('noBuildings')}
            </div>
          )}
        </LoaderLayout>
      </div>
      <div className="flex justify-center align-center mt-auto bg-gray-100 px-6 py-3 ">
        <Button variant="outline" onClick={handleAddNewBuilding}>
          <House size={24} />
          {t('add')}
        </Button>
      </div>
    </section>
  );
};

export default BuildingsCardsList;
