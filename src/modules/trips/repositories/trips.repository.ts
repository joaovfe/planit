import { Repository } from '@/core/http/repository';

import { ID, IPaginationResponse } from '@/shared/domain';
import { isArray } from '@/shared/utils';
import { CreateTripDto } from '../domain/dto/create-trip.dto';
import { TripUpdateDto } from '../domain/dto/trip-update.dto';
import { TripListDto } from '../domain/dto/trips-list.dto';
import { TripSuggestion } from '../domain/entities/trip-suggestion.entity';
import { Trips } from '../domain/entities/trip.entity';
import { DestinationDto } from '../domain/dto/destination.dto';
import { BaggageItems } from '../domain/entities/baggate-items.entity';
import { Destination } from '../domain/entities/destination.entity';
import { DestinationEntity } from '@/modules/home/destination/domain/entities/destination.entity';
import { BaggageItemDto } from '@/modules/baggage/domain/dto/baggage-item.dto';

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

  public async create(record: CreateTripDto): Promise<Trips> {
    const { status, data } = await this.http.post<Trips, CreateTripDto>('/novo', record);

    if (this.isOK(status)) return new Trips(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async suggestTrip(): Promise<TripSuggestion> {
    const { status, data } = await this.http.get<TripSuggestion>('/sugestao');

    console.log('data: ', data);

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: TripUpdateDto): Promise<Trips> {
    const { status, data } = await this.http.put<Trips, TripUpdateDto>(`/${id}`, record);

    if (this.isOK(status)) return new Trips(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async getProductionById(id: ID): Promise<Trips> {
    const { status, data } = await this.http.get<Trips>(`/${id}`);

    if (this.isOK(status)) return new Trips(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
  public async getBaggageItems(id: number): Promise<string[]> {
    try {
      const { status, data } = await this.http.get<BaggageItemDto>(`/baggage-items/${id}`);

      console.log('data: ', data);

      if (this.isOK(status)) {
        return data.description
          .split('\n')
          .map((item) => item.replace(/^- /, '').trim())
          .filter((item) => item.length > 0);
      }

      throw new Error('Ops, algo inesperado aconteceu!');
    } catch (error) {
      console.error('Erro ao buscar itens de bagagem:', error);
      throw new Error('Erro ao buscar itens de bagagem');
    }
  }
  public async createBaggageItems(destination: DestinationDto): Promise<Destination> {
    const { status, data } = await this.http.post<Destination, DestinationDto>(
      '/baggage-items/create',
      destination,
    );

    if (this.isOK(status)) return new Destination(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
