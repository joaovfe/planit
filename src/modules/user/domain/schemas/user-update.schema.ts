import { ERoleUserReference, Role } from '@/modules/role/domain';
import { z } from 'zod';

export const countrySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const climateSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const seasonSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const userUpdateSchema = z.object({
  name: z.string().optional(),
  email: z.string({ required_error: 'Campo obrigatório!' }).email('Email inválido!'),
  password: z
    .string({ required_error: 'Campo obrigatório!' })
    .min(8, 'Senha deve ter pelo menos 8 caracteres!'),
  countryDesired: countrySchema.optional(),
  climatePreference: climateSchema.optional(),
  seasonPreference: seasonSchema.optional(),
  role: z.instanceof(Role).optional().nullable(),
  registration: z.string().nullable().optional(),
});

export type UserUpdateData = z.infer<typeof userUpdateSchema>;
