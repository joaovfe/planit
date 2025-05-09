import { z } from 'zod';
import { Ability } from '../entities';
import { ERoleUserReference } from '../enums';

export const roleUpdateSchema = z.object({
  name: z.string().min(5, 'Nome do perfil obrigatório!'),
  reference: z.nativeEnum(ERoleUserReference, {
    required_error: 'Precisa selecionar um perfil de referência!',
    invalid_type_error: 'Perfil de referência inválido!',
  }),
  baseProfile: z.boolean().optional(),
  permissions: z
    .array(z.instanceof(Ability))
    .min(1, 'É necessário ao menos uma permissão para o perfil.'),
});

export type RoleUpdateData = z.infer<typeof roleUpdateSchema>;
