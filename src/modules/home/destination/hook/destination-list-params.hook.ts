import { create } from 'zustand';
import { IPaginationRequest } from '@/shared/domain';
import { DestinationFilterDto, DestinationListDTO } from '../domain/dto/destination-list.dto';

interface IDestinationListParams {
  params: DestinationListDTO;
  onChangeFilter: (filter: DestinationFilterDto) => void;
  onChangePagination: (pagination: IPaginationRequest) => void;
}

export const useDestinationListParams = create<IDestinationListParams>()((set) => ({
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
          level: filter.level || undefined,
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
