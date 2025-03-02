import { z } from 'zod';
import { builderConfig } from '@/config/builder';

const builderSchema = {
  name: z
    .string()
    .min(builderConfig.name.min.length, builderConfig.name.min.error)
    .max(builderConfig.name.max.length, builderConfig.name.max.error),
  office: z
    .number()
    .min(builderConfig.office.min.length, builderConfig.office.min.error)
    .max(builderConfig.office.max.length, builderConfig.office.max.error),

  apartments: z
    .number()
    .min(
      builderConfig.apartments.min.length,
      builderConfig.apartments.min.error,
    )
    .max(
      builderConfig.apartments.max.length,
      builderConfig.apartments.max.error,
    ),
  house: z
    .number()
    .min(builderConfig.house.min.length, builderConfig.house.min.error)
    .max(builderConfig.house.max.length, builderConfig.house.max.error),
};

export { builderSchema };
