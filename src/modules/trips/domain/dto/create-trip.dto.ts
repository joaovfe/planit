import { DestinationDto } from './destination.dto';
import { ParticipantsDto } from './participants.dto';

export interface CreateTripDto {
  name?: string;
  country?: string | null;
  state?: string;
  city?: string;
  destination: DestinationDto;
  participants?: ParticipantsDto[];
  startDate?: Date | null;
  endDate?: Date | null;
}
