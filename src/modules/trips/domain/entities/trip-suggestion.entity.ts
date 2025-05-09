import { ParticipantsDto } from '../dto/participants.dto';

export class TripSuggestion {
  message: string = '';

  public constructor(partial: Partial<TripSuggestion>) {
    Object.assign(this, { ...partial });
  }
}
