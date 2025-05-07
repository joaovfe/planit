import { RoleListFilterDTO } from '@/modules/role/domain/dto';
import { IPaginationRequest } from '@/shared/domain';
import { create } from 'zustand';
import { TripListDto } from '../domain/dto/trips-list.dto';

interface ITripsListParams {
  params: TripListDto;
  onChangeFilter: (filter: RoleListFilterDTO) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useTripsListParams = create<ITripsListParams>()((set) => ({
  params: {
    filter: {},
    pagination: {
      take: 10,
      skip: 1,
    },
  },

  onChangeFilter: (filter) =>
    set(({ params: prev }) => ({
      params: {
        filter: {
          ...prev.filter,
          search: filter.search || undefined,
          name: filter.name || undefined,
          reference: filter.reference || undefined,
          companyId: filter.companyId || undefined,
        },
        pagination: {
          ...prev.pagination,
          skip: 1,
        },
      },
    })),

  onChangePagination: (pagination) =>
    set(({ params: prev }) => ({
      params: {
        ...prev,
        pagination: {
          ...prev.pagination,
          ...pagination,
        },
      },
    })),
}));
