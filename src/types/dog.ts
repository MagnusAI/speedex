export type Breed = 'Jack Russell Terrier' | 'Norfolk Terrier';

export type Gender = 'Male' | 'Female';

export interface Dog {
  id: string;
  name: string;
  breed: Breed;
  gender: Gender;
  birthDate: string;
  description: string;
  images: string[];
  achievements: Achievement[];
  pedigree: Pedigree;
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