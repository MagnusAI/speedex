import { Breed } from './breed';

export interface Dog {
  id: string;
  name: string;
  nickname?: string;
  breed: string;
  image: string;
  breeder: string;
  created_at?: string;
  updated_at?: string;
}
