import { apiClient } from './api';
import type { Record, CreateRecordDto, UpdateRecordDto } from '../types/Record';

export const recordService = {
  async getAll(): Promise<Record[]> {
    return apiClient.get<Record[]>('/records');
  },

  async getById(id: string): Promise<Record> {
    return apiClient.get<Record>(`/records/${id}`);
  },

  async create(data: CreateRecordDto): Promise<Record> {
    return apiClient.post<Record>('/records', data);
  },

  async update(id: string, data: UpdateRecordDto): Promise<Record> {
    return apiClient.patch<Record>(`/records/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/records/${id}`);
  },

  async getByAnimalId(animalId: string): Promise<Record[]> {
    const records = await this.getAll();
    return records
      .filter(record => record.animalId === animalId)
      .sort((a, b) => new Date(b.attendedAt).getTime() - new Date(a.attendedAt).getTime());
  },
};
