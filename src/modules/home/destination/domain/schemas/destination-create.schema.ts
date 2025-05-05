import { z } from 'zod';

export const destinationCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome do destino é obrigatório!' })
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z
    .string({ required_error: 'Descrição do destino é obrigatória!' })
    .min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  type: z.object({
    id: z.number().int().positive(), // Garantindo que o id seja um número inteiro e positivo
    name: z.string().min(1, 'O nome do destino não pode ser vazio'), // Garantindo que o nome seja uma string não vazia
  }),
  //   status: z.nativeEnum(EDestinationType, { required_error: 'Status é obrigatório!' }),
});

export type DestinationCreateData = z.infer<typeof destinationCreateSchema>;
