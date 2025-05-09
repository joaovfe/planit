import { IPaginationRequest } from '@/shared/domain';
import { ERoleUserReference } from '../enums';

export interface RoleListFilterDTO {
  search?: string;
  name?: string;
  reference?: ERoleUserReference;
  companyId?: number;
}

export interface RoleListDTO {
  filter: RoleListFilterDTO;
  pagination: IPaginationRequest;
}
