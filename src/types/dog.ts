export interface FamilyTree {
  father: string | null;
  mother: string | null;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  gender: 'male' | 'female';
  color: string;
  fur_type: string;
  birth_date: string;
  image_url: string | null;
  description: string | null;
  father_id: string | null;
  mother_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DogFormData {
  name: string;
  breed: string;
  gender: 'male' | 'female';
  color: string;
  fur_type: string;
  birth_date: string;
  image_url: string | null;
  description: string | null;
  father_id: string | null;
  mother_id: string | null;
} 