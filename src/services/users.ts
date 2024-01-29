import { User } from '@/interfaces/user.interface';
import api from './api';

const UsersService = {
  async get(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/usuarios');
      return response.data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },

  async getById(id: string): Promise<User> {
    try {
      const response = await api.get<User>(`/usuario/${id}`);
      return response.data;
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },

  async create(user: User): Promise<void> {
    try {
      await api.post<User>('/usuario', user);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },

  async update(user: User): Promise<void> {
    try {
      await api.put<User>('/usuario', user);
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },

  async delete(user: User): Promise<void> {
    try {
      await api.delete<User>('/usuario', { data: user });
    } catch {
      throw Error('Server unavailable, try again later');
    }
  },
};

export { UsersService };
