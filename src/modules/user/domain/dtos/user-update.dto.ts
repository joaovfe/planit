import { ERoleUserReference } from '@/modules/role/domain';
import { UserCreateDTO } from './user-create.dto';

export interface UserUpdateDTO extends Partial<UserCreateDTO> {
  name?: string;
  email?: string;
  password?: string;
  roleName?: ERoleUserReference;
}
