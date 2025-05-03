import { EDestinationType } from "../enums/destination-type.enum";

export interface DestinationDto {
  id: number;
  name: string;
  description: string;
  type: EDestinationType;
  status: 'active' | 'inactive'; 
  createdAt: string;
  updatedAt: string;
}
