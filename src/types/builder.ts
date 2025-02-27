export type Floor = {
  color: Color;
  uuid: number;
  order: number;
};

export type Color = 'orange' | 'red' | 'blue' | 'green' | 'yellow';

export type BuildingType = 'apartments' | 'house' | 'office';

export type Building = {
  color: Color;
  floors: Floor[];
  uuid: string;
  name: string;
  type: BuildingType;
};
