import { Publisher } from './publisher.interface';

export interface Book {
  id: number;
  nome: string;
  autor: string;
  quantidade: number;
  lancamento: number;
  totalAlugado: number;
  editora: Publisher;
}
