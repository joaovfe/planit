import { ERoleUserReference } from '../enums';

export interface RoleCreateDTO {
  name: string;
  reference: ERoleUserReference;
  companyId?: number | null;
  permissionsIds: number[];
}
