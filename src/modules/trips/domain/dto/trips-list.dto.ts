import { IPaginationRequest } from '@/shared/domain';

export interface TripListFilterDto {
  search?: string;
  name?: string;
}

export interface TripListDto {
  filter: TripListFilterDto;
  pagination: IPaginationRequest;
}
