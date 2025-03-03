import { BuildingRes } from '@/config/builder';
import { Floor } from '@/types/builder';
import DynamicImage from '@/components/dynamic-image';

type ComponentProps = {
  floor: Floor;
  floorsCount: number;
  tiles: BuildingRes;
  buildingName: string;
};

const BuildingFloor: React.FC<ComponentProps> = ({
  floor,
  tiles,
  buildingName,
  floorsCount,
}) => {
  const floorTiles = tiles[floor.color];
  let tileRes = '';

  if (floor.order === 1) {
    tileRes = floorsCount > 1 ? floorTiles.initial : floorTiles.initial1Floor!;
  } else if (floor.order === floorsCount) {
    tileRes = floorTiles.roof;
  } else {
    tileRes = floorTiles.middle;
  }

  return (
    <div
      key={floor.uuid}
      className="px-4 flex justify-center w-auto h-auto min-w-[200px] cursor-pointer hover:bg-gray-100 hover:border-y"
    >
      <DynamicImage
        src={tileRes}
        width={tiles.tileImgWidth}
        className="hover:opacity-85"
        alt={`${buildingName} floor`}
      />
    </div>
  );
};

export default BuildingFloor;
