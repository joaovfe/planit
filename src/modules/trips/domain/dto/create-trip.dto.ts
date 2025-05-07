import { ParticipantsDto } from './participants.dto';

export interface CreateTripDto {
  name: string;
  country?: string | null;
  state?: string;
  city?: string;
  destination?: {
    type: { id: number; name: string };
    name?: string;
    description?: string;
  };
  participants?: ParticipantsDto[];
  startDate?: Date | null;
  endDate?: Date | null;
}
