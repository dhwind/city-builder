type Floor = {
  color: Color;
  uuid: string;
  name: string;
  order: number;
};

type Color = 'orange' | 'red' | 'blue' | 'green' | 'yellow';

type BuildingType = 'apartments' | 'house' | 'office';

type Building = {
  color: Color;
  floors: Record<string, Floor>;
  uuid: string;
  name: string;
  type: BuildingType;
};

export type { Floor, Color, BuildingType, Building };
