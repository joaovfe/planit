import { ERoleUserReference } from '../enums';

export class Role {
  id: number = 0;
  roleName: ERoleUserReference = ERoleUserReference.USER;

  public constructor(partial: Partial<Role>) {
    Object.assign(this, { ...partial });
  }
}
