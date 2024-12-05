import { dogData } from "@/data/dogs";

export function getDogs() {
  return dogData;
}

export function getDog(name: string) {
  return dogData.find((dog) => dog.name.includes(name));
}
