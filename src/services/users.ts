import { User } from '@/interfaces/user.interface';
import api from './api';
import { formatException } from './utils/FormatException';

const UsersService = {
  async get(): Promise<User[]> {
    try {
      const response = await api.get<User[]>('/usuarios');
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async getById(id: string): Promise<User> {
    try {
      const response = await api.get<User>(`/usuario/${id}`);
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async create(user: User): Promise<void> {
    try {
      await api.post<User>('/usuario', user);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async update(user: User): Promise<void> {
    try {
      await api.put<User>('/usuario', user);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async delete(user: User): Promise<void> {
    try {
      await api.delete<User>('/usuario', { data: user });
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },
};

export { UsersService };
