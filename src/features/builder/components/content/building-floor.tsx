import { memo } from 'react';
import { Floor } from '@/types/builder';
import DynamicImage from '@/components/dynamic-image';

type ComponentProps = {
  floor: Floor;
  tileRes: string;
  tileImgWidth: number;
  buildingName: string;
};

const BuildingFloor: React.FC<ComponentProps> = ({
  floor,
  tileRes,
  buildingName,
  tileImgWidth,
}) => {
  return (
    <div
      key={floor.uuid}
      className="px-4 flex justify-center w-auto h-auto min-w-[200px] cursor-pointer hover:bg-gray-100 hover:border-y"
    >
      <DynamicImage
        src={tileRes}
        width={tileImgWidth}
        className="hover:opacity-85"
        alt={`${buildingName} floor`}
      />
    </div>
  );
};

export default memo(BuildingFloor);
