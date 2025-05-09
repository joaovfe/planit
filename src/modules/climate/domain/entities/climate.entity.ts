export class Climate {
  id: number = 0;
  name: string = '';

  public constructor(partial: Partial<Climate>) {
    Object.assign(this, { ...partial });
  }
}
