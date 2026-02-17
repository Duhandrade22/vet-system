import type { Animal } from './Animal';

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  userId: string;
  animals?: Animal[];
  createdAt: string;
}

export interface CreateOwnerDto {
  name: string;
  phone: string;
  email?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface UpdateOwnerDto extends Partial<CreateOwnerDto> {}
