import { apiClient } from './api';
import type { Animal, CreateAnimalDto, UpdateAnimalDto } from '../types/Animal';

export const animalService = {
  async getAll(): Promise<Animal[]> {
    return apiClient.get<Animal[]>('/animals');
  },

  async getById(id: string): Promise<Animal> {
    return apiClient.get<Animal>(`/animals/${id}`);
  },

  async create(data: CreateAnimalDto): Promise<Animal> {
    return apiClient.post<Animal>('/animals', data);
  },

  async update(id: string, data: UpdateAnimalDto): Promise<Animal> {
    return apiClient.patch<Animal>(`/animals/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/animals/${id}`);
  },

  async getByOwnerId(ownerId: string): Promise<Animal[]> {
    const animals = await this.getAll();
    return animals.filter(animal => animal.ownerId === ownerId);
  },
};
