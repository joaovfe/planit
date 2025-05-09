export class Country {
  id: number = 0;
  name: string = '';

  public constructor(partial: Partial<Country>) {
    Object.assign(this, { ...partial });
  }
}
