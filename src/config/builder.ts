import { BuildingType, Color } from '@/types/builder';

type FloorsRange = {
  MAX_FLOORS: number;
  MIN_FLOORS: number;
};

type BuilderConfig = {
  defaultType: BuildingType;
  defaultColor: Color;
  office: FloorsRange;
  apartments: FloorsRange;
  house: FloorsRange;
};

export const builderConfig: BuilderConfig = {
  defaultType: 'house',
  defaultColor: 'green',
  office: {
    MAX_FLOORS: 24,
    MIN_FLOORS: 3,
  },
  apartments: {
    MAX_FLOORS: 12,
    MIN_FLOORS: 2,
  },
  house: {
    MAX_FLOORS: 3,
    MIN_FLOORS: 1,
  },
};
