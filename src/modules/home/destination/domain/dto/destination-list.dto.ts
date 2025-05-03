import { IPaginationRequest } from '@/shared/domain';

export interface DestinationFilterDto {
  search?: string;
  level?: number;
}

export interface DestinationListDTO {
  filter: DestinationFilterDto;
  pagination: IPaginationRequest;
}
