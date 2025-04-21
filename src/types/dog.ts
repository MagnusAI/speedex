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

export interface DogAncestryTree {
    mother: AncestorNode;
    father: AncestorNode;
}

export interface AncestorNode {
    id: string;
    name: string;
    profile_image_url: string | null;
    champion_titles: string[];
    mother?: AncestorNode;
    father?: AncestorNode;
}
