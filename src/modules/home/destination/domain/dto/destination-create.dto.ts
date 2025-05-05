import { EDestinationType } from './destination-type.dto';

export interface DestinationCreateDto {
  name: string;
  type?: EDestinationType;
  description: string;
}
