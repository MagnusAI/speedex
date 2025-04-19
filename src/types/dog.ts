import { Breed } from './breed';

export interface Dog {
  id: string;
  name: string;
  nickname?: string;
  breed: Breed;
  image: string;
}
