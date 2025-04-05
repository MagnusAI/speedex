import { Dog } from '../types/dog';

export const mockDogs: Dog[] = [
  {
    id: 1,
    name: 'Rusty',
    breed: 'Jack Russell Terrier',
    description: 'A lively and intelligent Jack Russell Terrier with a lot of energy.',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww'
    ],
    age: 3,
    parents: [
      {
        id: 2,
        name: 'Max',
        breed: 'Jack Russell Terrier',
        description: 'Father of Rusty',
        images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww'],
        age: 5
      },
      {
        id: 3,
        name: 'Bella',
        breed: 'Jack Russell Terrier',
        description: 'Mother of Rusty',
        images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww'],
        age: 4
      }
    ],
    achievements: [
      {
        title: 'Best in Show',
        date: '2023-06-15',
        description: 'Won first place in the regional dog show'
      },
      {
        title: 'Obedience Training Certificate',
        date: '2023-03-20',
        description: 'Completed advanced obedience training'
      }
    ]
  },
  {
    id: 2,
    name: 'Max',
    breed: 'Jack Russell Terrier',
    description: 'A seasoned show dog with multiple championships.',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww'
    ],
    age: 5,
    gender: 'male',
    achievements: [
      {
        title: 'National Champion',
        date: '2022-11-10',
        description: 'Won the national championship'
      }
    ]
  },
  {
    id: 3,
    name: 'Bella',
    breed: 'Norfolk Terrier',
    description: 'A beautiful and graceful female with excellent pedigree.',
    images: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amFjayUyMHJ1c3NlbGwlMjB0ZXJyaWVyfGVufDB8fDB8fHww'
    ],
    age: 4,
    gender: 'female',
    achievements: [
      {
        title: 'Best Female',
        date: '2022-09-05',
        description: 'Awarded best female in her category'
      }
    ]
  }
]; 