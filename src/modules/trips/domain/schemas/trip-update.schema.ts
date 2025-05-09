import { z } from 'zod';
import { tripCreateSchema } from './trip-create.schema';

export const tripUpdateSchema = tripCreateSchema.extend({});

export type TripUpdateSchema = z.infer<typeof tripUpdateSchema>;
