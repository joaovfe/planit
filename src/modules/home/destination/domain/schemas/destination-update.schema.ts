import { z } from 'zod';

export const destinationUpdateSchema = z.object({
    name: z
    .string({ required_error: 'Nome do destino é obrigatório!' })
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z
    .string({ required_error: 'Descrição do destino é obrigatória!' })
    .min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  type: z.object({
    id: z.number().int().positive(), 
    name: z.string().min(1, 'O nome do destino não pode ser vazio'),
  }),
});

export type DestinationUpdateSchema = z.infer<typeof destinationUpdateSchema>;
