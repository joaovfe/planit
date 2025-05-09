import { Repository } from '@/core/http/repository';

import { ID } from '@/shared/domain';
import { DestinationCreateDto } from '../domain/dto/destination-create.dto';
import { DestinationDto } from '../domain/dto/destination.dto';
import { DestinationEntity } from '../domain/entities/destination.entity';

export class DestinationRepository extends Repository {
  static instance: DestinationRepository;

  constructor() {
    super('destino');

    if (DestinationRepository.instance) {
      return DestinationRepository.instance;
    }

    DestinationRepository.instance = this;
  }
  public async list(): Promise<DestinationDto[]> {
    const { status, data } = await this.http.get('');

    if (this.isOK(status)) return data as DestinationDto[];

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: ID): Promise<DestinationEntity> {
    const { status, data } = await this.http.get<DestinationEntity>(`/${id}`);

    if (this.isOK(status)) return new DestinationEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: DestinationCreateDto): Promise<DestinationEntity> {
    const { status, data } = await this.http.post<DestinationEntity, DestinationCreateDto>(
      '/create',
      record,
    );

    if (this.isOK(status)) return new DestinationEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: DestinationDto): Promise<DestinationEntity> {
    const { status, data } = await this.http.put<DestinationEntity, DestinationDto>(
      `/update/${id}`,
      record,
    );

    if (this.isOK(status)) return new DestinationEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<DestinationEntity> {
    const { status, data } = await this.http.delete<DestinationEntity>(`/delete/${id}`);

    if (this.isOK(status)) return new DestinationEntity(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  // public async updateStatus(id: ID, record: EStatus): Promise<void> {
  //   const { status } = await this.http.patch(`/${id}`, { status: record });

  //   if (this.isOK(status)) return;

  //   throw new Error('Ops, algo inesperado aconteceu!');
  // }

  // public async delete(id: ID): Promise<void> {
  //   const { status } = await this.http.delete(`/${id}`);

  //   if (this.isOK(status)) return;

  //   throw new Error('Ops, algo inesperado aconteceu!');
  // }

  //   public async updateItself(dto: UserUpdateSelfDto): Promise<User> {
  //     const { status, data: response } = await this.http.put<User, UserUpdateSelfDto>(`/self`, dto);

  //     if (this.isOK(status)) return new User(response);

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }

  //   public async saveAvatar(form: FormData): Promise<string> {
  //     const { status, data } = await this.http.post<string, FormData>(`/avatar`, form);

  //     if (this.isOK(status)) return data;

  //     throw new Error('Ops, algo inesperado aconteceu!');
  //   }
}
