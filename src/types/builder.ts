export type Floor = {
  color: Color;
  uuid: string;
  name: string;
  order: number;
};

export type Color = 'orange' | 'red' | 'blue' | 'green' | 'yellow';

export type BuildingType = 'apartments' | 'house' | 'office';

export type Building = {
  color: Color;
  floors: Record<string, Floor>;
  uuid: string;
  name: string;
  type: BuildingType;
};
