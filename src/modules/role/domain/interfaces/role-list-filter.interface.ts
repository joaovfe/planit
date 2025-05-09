import { ERoleUserReference } from '../enums';

export interface IRoleListFilter {
  name?: any;
  reference?: ERoleUserReference;
  search?: string;
}
