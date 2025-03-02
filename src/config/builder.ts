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
export const MAX_OFFICE_FLOORS_LENGTH = 16;

export const MIN_APARTMENTS_FLOORS_LENGTH = 3;
export const MAX_APARTMENTS_FLOORS_LENGTH = 12;

export const MIN_HOUSE_FLOORS_LENGTH = 1;
export const MAX_HOUSE_FLOORS_LENGTH = 3;

export const builderConfig: BuilderConfig = {
  defaultType: 'house',
  defaultColor: 'green',
  colors: [
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
  ],
  types: [
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
  ],
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
