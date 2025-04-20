export interface Ancestor {
  id: string;
  name: string;
  registration_id: string;
  profile_image_url: string;
  champion_titles?: string[];
  relation?: string; // e.g., "mother", "grandmother", "father", etc.
}

export interface AncestryTree {
  mother?: Ancestor;
  father?: Ancestor;
  grandparents?: {
    mothersMother?: Ancestor;
    mothersFather?: Ancestor;
    fathersMother?: Ancestor;
    fathersFather?: Ancestor;
  };
  greatGrandparents?: {
    mothersMothersParents?: {
      mother?: Ancestor;
      father?: Ancestor;
    };
    mothersFathersParents?: {
      mother?: Ancestor;
      father?: Ancestor;
    };
    fathersMothersParents?: {
      mother?: Ancestor;
      father?: Ancestor;
    };
    fathersFathersParents?: {
      mother?: Ancestor;
      father?: Ancestor;
    };
  };
} 