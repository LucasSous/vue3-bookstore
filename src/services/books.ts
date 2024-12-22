import { Book } from '@/interfaces/book.interface';
import api from './api';
import { formatException } from './utils/FormatException';

const BooksService = {
  async get(): Promise<Book[]> {
    try {
      const response = await api.get<Book[]>('/livros');
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async getById(id: string): Promise<Book> {
    try {
      const response = await api.get<Book>(`/livro/${id}`);
      return response.data;
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async create(book: Book): Promise<void> {
    try {
      await api.post<Book>('/livro', book);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async update(book: Book): Promise<void> {
    try {
      await api.put<Book>('/livro', book);
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },

  async delete(book: Book): Promise<void> {
    try {
      await api.delete<Book>('/livro', { data: book });
    } catch (error) {
      const responseError = formatException(error) as string;
      throw new Error(responseError);
    }
  },
};

export { BooksService };
