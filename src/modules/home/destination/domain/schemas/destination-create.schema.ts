import { z } from 'zod';
import { EDestinationType } from '../enums/destination-type.enum';

export const destinationCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome do destino é obrigatório!' })
    .min(3, 'Nome deve ter no mínimo 3 caracteres'),
  description: z
    .string({ required_error: 'Descrição do destino é obrigatória!' })
    .min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  type: z.nativeEnum(EDestinationType, { required_error: 'Tipo de destino é obrigatório!' }),
//   status: z.nativeEnum(EDestinationType, { required_error: 'Status é obrigatório!' }),
});

export type DestinationCreateData = z.infer<typeof destinationCreateSchema>;
