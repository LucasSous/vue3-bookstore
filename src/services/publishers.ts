import { Publisher } from '@/interfaces/publisher.interface';
import api from './api';
import { formatException } from './utils/FormatException';

const PublishersService = {
  async get(): Promise<Publisher[]> {
    try {
      const response = await api.get<Publisher[]>('/editoras');
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async getById(id: string): Promise<Publisher> {
    try {
      const response = await api.get<Publisher>(`/editora/${id}`);
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async create(user: Publisher): Promise<void> {
    try {
      await api.post<Publisher>('/editora', user);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async update(user: Publisher): Promise<void> {
    try {
      await api.put<Publisher>('/editora', user);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async delete(user: Publisher): Promise<void> {
    try {
      await api.delete<Publisher>('/editora', { data: user });
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },
};

export { PublishersService };
