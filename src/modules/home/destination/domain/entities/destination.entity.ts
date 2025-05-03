
export class DestinationEntity {
  id: number = 0;
  nome: string = '';
  nroForno: number = 0;
  situacao?: string | null = null;

  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  constructor(partial: Partial<DestinationEntity>) {
    Object.assign(this, { ...partial });
  }
}
