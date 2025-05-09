export class Destination {
  type: { id: number; name: string } = { id: 0, name: '' };
  name: string = '';
  description: string = '';

  public constructor(partial: Partial<Destination>) {
    Object.assign(this, { ...partial });
  }
}
