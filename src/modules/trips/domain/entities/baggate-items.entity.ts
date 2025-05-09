export class BaggageItems {
  name: string = '';
  description: string = '';

  public constructor(partial: Partial<BaggageItems>) {
    Object.assign(this, { ...partial });
  }
}
