import { DestinationType } from '../dto/destination-type.dto';

export class DestinationEntity {
  id: number = 0;
  name: string = '';
  description: string = '';
  type?: DestinationType;
  constructor(partial: Partial<DestinationEntity>) {
    Object.assign(this, { ...partial });
  }
}
