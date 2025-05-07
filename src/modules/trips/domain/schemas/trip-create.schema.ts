import { z } from 'zod';

export const participantSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
});
export const destinationSchema = z.object({
  // type: z.object({
  //   id: z.number().int().positive(),
  //   name: z.string().min(1, 'O nome do destino não pode ser vazio'),
  // }),
  description: z.string().optional(),
  name: z.string().optional(),
});

export const tripCreateSchema = z.object({
  name: z.string().min(5, 'Nome da viagem obrigatório!'),
  country: z.string().optional(),
  state: z.string().optional(),
  destination: z
    .object({
      description: z.string().optional(),
      name: z.string().optional(),
      type: z.object({
        id: z.number().int().positive(),
        name: z.string().min(1, 'O nome do destino não pode ser vazio'),
      }),
    })
    .optional(),
  city: z.string().min(1, 'Campo Obrigatório'),
  participants: z.array(participantSchema).optional(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
});

export type TripCreateData = z.infer<typeof tripCreateSchema>;
