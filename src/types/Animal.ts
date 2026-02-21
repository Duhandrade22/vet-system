import type { Owner } from "./Owner";
import type { Record } from "./Record";

export interface Animal {
  id: string;
  name: string;
  species: string;
  breed?: string;
  ownerId: string;
  owner?: Owner;
  records?: Record[];
  createdAt: string;
}

export interface CreateAnimalDto {
  name: string;
  species: string;
  breed?: string;
  ownerId: string;
  customSpecies?: string;
}

export interface UpdateAnimalDto extends Partial<
  Omit<CreateAnimalDto, "ownerId">
> {}
