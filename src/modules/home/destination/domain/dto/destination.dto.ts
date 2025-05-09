import { DestinationType } from './destination-type.dto';

export interface DestinationDto {
  id: number;
  name: string;
  description: string;
  type?: DestinationType;
}
