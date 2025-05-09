import { Repository } from '@/core/http/repository';
import { Season } from '../domain/entities/season.entity';

export class SeasonRepository extends Repository {
  static instance: SeasonRepository;

  constructor() {
    super('estacoes');

    if (SeasonRepository.instance) {
      return SeasonRepository.instance;
    }

    SeasonRepository.instance = this;
  }

  public async list(): Promise<Season[]> {
    const { status, data } = await this.http.get<Season[]>(``);

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
