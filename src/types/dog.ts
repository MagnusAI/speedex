export type Breed = 'Jack Russell Terrier' | 'Norfolk Terrier';

export interface Dog {
  id: number;
  name: string;
  breed: Breed;
  description: string;
  images: string[];
  age?: number;
  gender?: 'male' | 'female';
  parents?: Dog[];
  siblings?: Dog[];
  offspring?: Dog[];
  achievements?: {
    title: string;
    date: string;
    description: string;
  }[];
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  competition?: string;
  placement?: string;
}

export interface Pedigree {
  father: string;
  mother: string;
  registrationNumber?: string;
  kennelClub?: string;
} 