import { apiClient } from './api';
import type { Owner, CreateOwnerDto, UpdateOwnerDto } from '../types/Owner';

export const ownerService = {
  async getAll(): Promise<Owner[]> {
    return apiClient.get<Owner[]>('/owners');
  },

  async getById(id: string): Promise<Owner> {
    return apiClient.get<Owner>(`/owners/${id}`);
  },

  async create(data: CreateOwnerDto): Promise<Owner> {
    return apiClient.post<Owner>('/owners', data);
  },

  async update(id: string, data: UpdateOwnerDto): Promise<Owner> {
    return apiClient.patch<Owner>(`/owners/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/owners/${id}`);
  },
};
