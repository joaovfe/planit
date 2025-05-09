import { Climate } from '@/modules/climate/domain/entities/climate.entity';
import { Country } from '@/modules/country/domain/entities/country.entity';
import { Season } from '@/modules/season/domain/entities/season.entity';

export interface UserCreateDTO {
  name: string;
  email: string;
  password: string;
  countryDesired?: Country;
  climatePreference?: Climate;
  seasonPreference?: Season;
  role?: string;
  registration?: string | null;
}
