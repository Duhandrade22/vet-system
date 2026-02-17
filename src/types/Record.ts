import type { Animal } from './Animal';

export interface Record {
  id: string;
  weight: string;
  medications: string;
  dosage: string;
  notes: string;
  attendedAt: string;
  animalId: string;
  animal?: Animal;
  createdAt: string;
}

export interface CreateRecordDto {
  weight: string;
  medications: string;
  dosage: string;
  notes: string;
  attendedAt: string;
  animalId: string;
}

export interface UpdateRecordDto extends Partial<Omit<CreateRecordDto, 'animalId'>> {}
