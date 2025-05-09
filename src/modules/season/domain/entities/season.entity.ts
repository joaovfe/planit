export class Season {
    id: number = 0;
    name: string = '';
  
    public constructor(partial: Partial<Season>) {
      Object.assign(this, { ...partial });
    }
  }
  