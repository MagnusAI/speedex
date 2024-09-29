import { Dog, DogBreed, Sex } from "../dog";

export const Jason: Dog = {
  registrationId: "DK15064/2022",
  nickname: "Jason",
  name: "Soldier Of Love",
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("02.07.2022").toLocaleDateString(),
  image: "./images/jason.png",
  kennel: "Kajsenborg",
  kennelOwner: "Tenna Grenaae",
  sex: Sex.Male,
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Nuella: Dog = {
  registrationId: "DK16190/2021",
  name: "Nuella",
  breed: DogBreed.JackRussellTerrier,
  sex: Sex.Female,
  dob: new Date("23.06.2021").toLocaleDateString(),
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  family: {
    sire: undefined,
    dam: undefined,
  },
  image: "./images/nuella.png",
};

export const Gordon: Dog = {
  registrationId: "DK 11387/2019",
  name: "Gordon",
  nickname: "Gordon",
  sex: Sex.Male,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("04.10.2019").toLocaleDateString(),
  kennel: "Jackart",
  kennelOwner: "Ekaterina Kumakova",
  image: "./images/gordon.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Siri: Dog = {
  registrationId: "DK 11387/2019",
  name: "In your Eyes",
  nickname: "Siri",
  kennel: "Inlovewith",
  kennelOwner: "Diana Birkmane",
  sex: Sex.Female,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("20.01.2019").toLocaleDateString(),
  image: "./images/siri.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Rita: Dog = {
  registrationId: "DK 11387/2019",
  name: "Attention Please",
  nickname: "Rita",
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  sex: Sex.Female,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("18.02.2017").toLocaleDateString(),
  image: "./images/rita.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Fie: Dog = {
  registrationId: "DK18312/2007",
  name: "Sex Bomb",
  nickname: "Fie",
  kennel: "Kanix",
  kennelOwner: "Ulf Bråthen",
  sex: Sex.Female,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("19.08.2007").toLocaleDateString(),
  image: "./images/fie.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
  death: new Date("02.03.2021").toLocaleDateString(),
};

export const Donna: Dog = {
  registrationId: "DK09098/2023",
  name: "Prima Donna",
  nickname: "Donna",
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  sex: Sex.Female,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("19.05.2023").toLocaleDateString(),
  image: "./images/donna.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Balder: Dog = {
  registrationId: "DK09096/2023",
  name: "Prince Balder",
  nickname: "Balder",
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  sex: Sex.Male,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("19.05.2023").toLocaleDateString(),
  image: "./images/balder.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const Vinnie: Dog = {
  registrationId: "DK16043/2011",
  name: "Corvina",
  nickname: "Vinnie",
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  sex: Sex.Female,
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("06.09.2011").toLocaleDateString(),
  image: "./images/vinnie.png",
  family: {
    sire: undefined,
    dam: undefined,
  },
};
