import { AncestryTree } from '../types/ancestry';

export const mockAncestryTree: AncestryTree = {
  mother: {
    id: 'DK123456/2020',
    name: 'Luna',
    registration_id: 'DK123456/2020',
    profile_image_url: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=500&h=500&fit=crop',
    champion_titles: ['Ch. Luna', 'Int. Ch. Luna'],
    relation: 'Mother'
  },
  father: {
    id: 'DK789012/2019',
    name: 'Max',
    registration_id: 'DK789012/2019',
    profile_image_url: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&h=500&fit=crop',
    champion_titles: ['Ch. Max', 'Int. Ch. Max'],
    relation: 'Father'
  },
  grandparents: {
    mothersMother: {
      id: 'DK345678/2018',
      name: 'Bella',
      registration_id: 'DK345678/2018',
      profile_image_url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&h=500&fit=crop',
      champion_titles: ['Ch. Bella'],
      relation: 'Maternal Grandmother'
    },
    mothersFather: {
      id: 'DK901234/2017',
      name: 'Rocky',
      registration_id: 'DK901234/2017',
      profile_image_url: 'https://images.unsplash.com/photo-1583512603806-077998240c7a?w=500&h=500&fit=crop',
      champion_titles: ['Ch. Rocky'],
      relation: 'Maternal Grandfather'
    },
    fathersMother: {
      id: 'DK567890/2018',
      name: 'Daisy',
      registration_id: 'DK567890/2018',
      profile_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
      champion_titles: ['Ch. Daisy'],
      relation: 'Paternal Grandmother'
    },
    fathersFather: {
      id: 'DK123890/2017',
      name: 'Charlie',
      registration_id: 'DK123890/2017',
      profile_image_url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&h=500&fit=crop',
      champion_titles: ['Ch. Charlie'],
      relation: 'Paternal Grandfather'
    }
  },
  greatGrandparents: {
    mothersMothersParents: {
      mother: {
        id: 'DK234567/2016',
        name: 'Molly',
        registration_id: 'DK234567/2016',
        profile_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Molly'],
        relation: 'Maternal Great Grandmother'
      },
      father: {
        id: 'DK890123/2015',
        name: 'Buddy',
        registration_id: 'DK890123/2015',
        profile_image_url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Buddy'],
        relation: 'Maternal Great Grandfather'
      }
    },
    mothersFathersParents: {
      mother: {
        id: 'DK456789/2016',
        name: 'Lucy',
        registration_id: 'DK456789/2016',
        profile_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Lucy'],
        relation: 'Maternal Great Grandmother'
      },
      father: {
        id: 'DK012345/2015',
        name: 'Cooper',
        registration_id: 'DK012345/2015',
        profile_image_url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Cooper'],
        relation: 'Maternal Great Grandfather'
      }
    },
    fathersMothersParents: {
      mother: {
        id: 'DK678901/2016',
        name: 'Sadie',
        registration_id: 'DK678901/2016',
        profile_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Sadie'],
        relation: 'Paternal Great Grandmother'
      },
      father: {
        id: 'DK234567/2015',
        name: 'Tucker',
        registration_id: 'DK234567/2015',
        profile_image_url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Tucker'],
        relation: 'Paternal Great Grandfather'
      }
    },
    fathersFathersParents: {
      mother: {
        id: 'DK890123/2016',
        name: 'Lola',
        registration_id: 'DK890123/2016',
        profile_image_url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Lola'],
        relation: 'Paternal Great Grandmother'
      },
      father: {
        id: 'DK456789/2015',
        name: 'Jack',
        registration_id: 'DK456789/2015',
        profile_image_url: 'https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?w=500&h=500&fit=crop',
        champion_titles: ['Ch. Jack'],
        relation: 'Paternal Great Grandfather'
      }
    }
  }
}; 