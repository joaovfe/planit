import { EDestinationType } from '../enums/destination-type.enum';

export interface DestinationCreateDto {
  name: string;
  type?: EDestinationType;
  description: string;
}
