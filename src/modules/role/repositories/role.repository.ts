import { Repository } from '@/core/http/repository';

import { ID } from '@/shared/domain';

import { Role } from '../domain';
import { RoleCreateDTO, RoleUpdateDTO } from '../domain/dto';

export class RoleRepository extends Repository {
  static instance: RoleRepository;

  constructor() {
    super('roles');

    if (RoleRepository.instance) {
      return RoleRepository.instance;
    }

    RoleRepository.instance = this;
  }

  public async list(): Promise<Role[]> {
    const { status, data } = await this.http.get<Role[]>(``);

    if (this.isOK(status)) return data;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
  public async listAllAbilities(): Promise<any> {
    const { status, data } = await this.http.get<Role>(`/1`);

    if (this.isOK(status)) return new Role(data).roleName;

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async get(id: ID): Promise<Role> {
    const { status, data } = await this.http.get<Role>(`/${id}`);

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async create(record: RoleCreateDTO): Promise<Role> {
    const { status, data } = await this.http.post<Role, RoleCreateDTO>('/', record);

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async update(id: ID, record: RoleUpdateDTO): Promise<Role> {
    const { status, data } = await this.http.patch<Role, RoleUpdateDTO>(`/${id}`, record);

    if (this.isOK(status)) return new Role(data);

    throw new Error('Ops, algo inesperado aconteceu!');
  }

  public async delete(id: ID): Promise<void> {
    const { status } = await this.http.delete(`/${id}`);

    if (this.isOK(status)) return;

    throw new Error('Ops, algo inesperado aconteceu!');
  }
}
