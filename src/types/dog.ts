export interface FamilyTree {
  father: string | null;
  mother: string | null;
}

export interface Dog {
  id: string;
  name: string;
  breed: string;
  gender: string;
  color: string;
  birth_date: string;
  image_url: string | null;
  description: string | null;
  family_tree: FamilyTree;
  created_at: string;
  updated_at: string;
}

export interface DogFormData {
  name: string;
  breed: string;
  gender: string;
  color: string;
  birth_date: string;
  image_url: string | null;
  description: string | null;
  family_tree: FamilyTree;
} 