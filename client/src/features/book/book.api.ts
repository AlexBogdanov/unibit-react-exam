import * as apiService from '../../services/api.service';

import { BookDTO, Book, BookPreview } from './book.model';

export const getBooks = (): Promise<Array<BookPreview>> =>
  apiService.get<Array<Book>>('book');

export const getBookById = (id: string): Promise<Book> =>
  apiService.get<Book>(`book/${id}`);

export const createBook = (dto: BookDTO): Promise<Book> =>
  apiService.post<BookDTO, Book>('book', dto);

export const updateBook = (id: string, dto: Partial<BookDTO>): Promise<Book> =>
  apiService.patch<Partial<BookDTO>, Book>(`book/${id}`, dto);

export const addReview = (id: string, review: string): Promise<Book> =>
  apiService.patch<string, Book>(`book/review/${id}`, review);

export const deleteBook = (id: string) =>
  apiService.del<void>(`book/${id}`);
