import { Dog } from '../types/dog';

export const mockDogs: Dog[] = [
  {
    id: '1',
    name: 'Rusty',
    breed: 'Jack Russell Terrier',
    gender: 'Male',
    birthDate: '2020-05-15',
    description: 'Energetic and playful, Rusty is a champion in agility competitions.',
    images: ['/images/dogs/rusty-1.jpg', '/images/dogs/rusty-2.jpg'],
    achievements: [
      {
        id: '1',
        title: 'Agility Champion',
        date: '2023-06-10',
        description: 'First place in regional agility competition',
        competition: 'Regional Agility Championship',
        placement: '1st Place'
      }
    ],
    pedigree: {
      father: 'Max',
      mother: 'Luna',
      registrationNumber: 'JRT123456',
      kennelClub: 'FCI'
    }
  },
  {
    id: '2',
    name: 'Bella',
    breed: 'Norfolk Terrier',
    gender: 'Female',
    birthDate: '2021-03-22',
    description: 'Gentle and affectionate, Bella excels in conformation shows.',
    images: ['/images/dogs/bella-1.jpg', '/images/dogs/bella-2.jpg'],
    achievements: [
      {
        id: '1',
        title: 'Best in Show',
        date: '2023-09-15',
        description: 'Awarded Best in Show at National Terrier Championship',
        competition: 'National Terrier Championship',
        placement: 'Best in Show'
      }
    ],
    pedigree: {
      father: 'Charlie',
      mother: 'Daisy',
      registrationNumber: 'NT789012',
      kennelClub: 'FCI'
    }
  }
]; 