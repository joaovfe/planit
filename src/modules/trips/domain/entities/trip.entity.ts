import { ParticipantsDto } from '../dto/participants.dto';

export class Trips {
  id: number = 0;
  name: string = '';
  participants?: ParticipantsDto;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;

  public constructor(partial: Partial<Trips>) {
    Object.assign(this, { ...partial });
  }
}
