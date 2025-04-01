import { Dog, DogBreed, Sex } from "../dog";
import jasonImage from "./images/jason.png";
import nuellaImage from "./images/nuella.png";
import gordonImage from "./images/gordon.png";
import siriImage from "./images/siri.png";
import ritaImage from "./images/rita.png";
import fieImage from "./images/fie.png";
import donnaImage from "./images/donna.png";
import balderImage from "./images/balder.png";
import vinnieImage from "./images/vinnie.png";

export const Jason: Dog = {
  registrationId: "DK15064/2022",
  nickname: "Jason",
  name: "Soldier Of Love",
  breed: DogBreed.JackRussellTerrier,
  dob: new Date("02.07.2022").toLocaleDateString(),
  image: jasonImage,
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
  nickname: "Ella",
  breed: DogBreed.JackRussellTerrier,
  sex: Sex.Female,
  dob: new Date("23.06.2021").toLocaleDateString(),
  kennel: "Speedex",
  kennelOwner: "Tine Arnild",
  family: {
    sire: undefined,
    dam: undefined,
  },
  image: nuellaImage,
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
  image: gordonImage,
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
  image: siriImage,
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
  image: ritaImage,
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
  image: fieImage,
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
  image: donnaImage,
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
  image: balderImage,
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
  image: vinnieImage,
  family: {
    sire: undefined,
    dam: undefined,
  },
};

export const dogData = [
  Jason,
  Nuella,
  Gordon,
  Siri,
  Rita,
  Fie,
  Donna,
  Balder,
  Vinnie,
];
