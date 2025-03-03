import { BuildingType, Color } from '@/types/builder';
import { SelectableItem } from '@/types/common';

type ConfigField = {
  min: {
    length: number;
    error: string;
  };
  max: {
    length: number;
    error: string;
  };
};

type BuilderConfig = {
  defaultType: BuildingType;
  defaultColor: Color;
  colors: SelectableItem<Color>[];
  types: SelectableItem<BuildingType>[];
  name: ConfigField;
  office: ConfigField;
  apartments: ConfigField;
  house: ConfigField;
};

export const MIN_NAME_LENGTH = 3;
export const MAX_NAME_LENGTH = 50;

export const MIN_OFFICE_FLOORS_LENGTH = 3;
export const MAX_OFFICE_FLOORS_LENGTH = 20;

export const MIN_APARTMENTS_FLOORS_LENGTH = 3;
export const MAX_APARTMENTS_FLOORS_LENGTH = 12;

export const MIN_HOUSE_FLOORS_LENGTH = 1;
export const MAX_HOUSE_FLOORS_LENGTH = 3;

export const HOUSE_TILE_IMG_WIDTH = 150;
export const APARTMENTS_TILE_IMG_WIDTH = 200;
export const OFFICE_TILE_IMG_WIDTH = 200;

const availableColors: SelectableItem<Color>[] = [
  {
    label: 'color.labels.orange',
    value: 'orange',
  },
  {
    label: 'color.labels.red',
    value: 'red',
  },
  {
    label: 'color.labels.blue',
    value: 'blue',
  },
  {
    label: 'color.labels.green',
    value: 'green',
  },
  {
    label: 'color.labels.yellow',
    value: 'yellow',
  },
];

const availableTypes: SelectableItem<BuildingType>[] = [
  {
    label: 'type.labels.apartments',
    value: 'apartments',
  },
  {
    label: 'type.labels.house',
    value: 'house',
  },
  {
    label: 'type.labels.office',
    value: 'office',
  },
];

export const builderConfig: BuilderConfig = {
  defaultType: 'house',
  defaultColor: 'orange',
  colors: availableColors,
  types: availableTypes,
  name: {
    min: {
      length: MIN_NAME_LENGTH,
      error: 'name.error.min',
    },
    max: {
      length: MAX_NAME_LENGTH,
      error: 'name.error.max',
    },
  },
  office: {
    min: {
      length: MIN_OFFICE_FLOORS_LENGTH,
      error: 'floor.error.min',
    },
    max: {
      length: MAX_OFFICE_FLOORS_LENGTH,
      error: 'floor.error.max',
    },
  },
  apartments: {
    min: {
      length: MIN_APARTMENTS_FLOORS_LENGTH,
      error: 'floor.error.min',
    },
    max: {
      length: MAX_APARTMENTS_FLOORS_LENGTH,
      error: 'floor.error.max',
    },
  },
  house: {
    min: {
      length: MIN_HOUSE_FLOORS_LENGTH,
      error: 'floor.error.min',
    },
    max: {
      length: MAX_HOUSE_FLOORS_LENGTH,
      error: 'floor.error.max',
    },
  },
};

type BuildingColorRes = {
  initial: string;
  initial1Floor: string;
  middle: string;
  roof: string;
};

export type BuildingRes = {
  tileImgWidth: number;
  orange: BuildingColorRes;
  red: BuildingColorRes;
  blue: BuildingColorRes;
  green: BuildingColorRes;
  yellow: BuildingColorRes;
};

type BuildingFloorsResConfig = {
  house: BuildingRes;
  apartments: BuildingRes;
  office: BuildingRes;
};

const ASSETS_FOLDER = 'city';

const resources = [
  {
    id: 'initial',
    file: 'initial',
  },
  {
    id: 'initial1Floor',
    file: 'initial-1-floor',
  },
  {
    id: 'middle',
    file: 'middle',
  },
  {
    id: 'roof',
    file: 'roof',
  },
];

const generateBuildingFloorsTilesRes = (): BuildingFloorsResConfig => {
  const result: Partial<BuildingFloorsResConfig> = {};

  availableTypes.forEach(type => {
    const colorRes: Partial<BuildingRes> = {};

    availableColors.forEach(color => {
      const res: Partial<BuildingColorRes> = {};

      resources.forEach(resource => {
        res[resource.id as keyof BuildingColorRes] =
          `${ASSETS_FOLDER}/${type.value}/${color.value}/${resource.file}.png`;
      });

      colorRes[color.value] = res as BuildingColorRes;
    });

    let tileImgWidth = 0;

    if (type.value === 'apartments') {
      tileImgWidth = APARTMENTS_TILE_IMG_WIDTH;
    } else if (type.value === 'office') {
      tileImgWidth = OFFICE_TILE_IMG_WIDTH;
    } else {
      tileImgWidth = HOUSE_TILE_IMG_WIDTH;
    }

    result[type.value] = {
      ...(colorRes as BuildingRes),
      tileImgWidth,
    };
  });

  return result as BuildingFloorsResConfig;
};

export const buildingFloorsTilesRes: BuildingFloorsResConfig =
  generateBuildingFloorsTilesRes();
