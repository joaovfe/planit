import { Repository } from '@/core/http/repository';

import { ID, IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { TripListDto } from '../domain/dto/trips-list.dto';
import { Trips } from '../domain/entities/trip.entity';
import { CreateTripDto } from '../domain/dto/create-trip.dto';

export class TripRepository extends Repository {
  static instance: TripRepository;

  constructor() {
    super('viagens');

    if (TripRepository.instance) {
      return TripRepository.instance;
    }

    TripRepository.instance = this;
  }

  public async list(params?: TripListDto): Promise<IPaginationResponse<Trips>> {
    const { status, data: response } = await this.http.get<IPaginationResponse<Trips>>('', {
      params: {
        ...params?.pagination,
        ...params?.filter,
      },
    });

    if (this.isOK(status)) {
      const { pages, total, data } = response;

      return {
        pages: pages ?? 1,
        total: total ?? 0,
        data: isArray(data) ? data.map((item) => new Trips(item)) : ([] as Array<Trips>),
      };
    }

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  //   public async listAllAbilities(): Promise<any> {
  //     const { status, data } = await this.http.get<Role>(`/1`);

  //     if (this.isOK(status)) return new Role(data).reference;

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  //   public async get(id: ID): Promise<Role> {
  //     const { status, data } = await this.http.get<Role>(`/${id}`);

  //     if (this.isOK(status)) return new Role(data);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  public async create(record: CreateTripDto): Promise<Trips> {
    const { status, data } = await this.http.post<Trips, CreateTripDto>('/', record);

    if (this.isOK(status)) return new Trips(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  //   public async update(id: ID, record: RoleUpdateDTO): Promise<Role> {
  //     const { status, data } = await this.http.patch<Role, RoleUpdateDTO>(`/${id}`, record);

  //     if (this.isOK(status)) return new Role(data);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  //   public async delete(id: ID): Promise<void> {
  //     const { status } = await this.http.delete(`/${id}`);

  //     if (this.isOK(status)) return;

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }
}
