export enum DogBreed {
  JackRussellTerrier = "Jack Russell Terrier",
}

export enum Sex {
  Male = "Male",
  Female = "Female",
}

export type Dog = {
  registrationId?: string;
  name: string;
  breed: DogBreed;
  dob: string;
  image?: string;
  kennel: string;
  kennelOwner?: string;
  nickname?: string;
  sex: Sex;
  family: {
    sire?: Dog;
    dam?: Dog;
    siblings?: Dog[];
  };
  death?: string;
};
