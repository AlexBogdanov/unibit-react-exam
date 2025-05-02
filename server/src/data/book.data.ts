import mongoose, { FilterQuery, UpdateQuery, PopulateOptions } from 'mongoose';

import { CustomError } from '../middlewares/error.middleware';

import { Book, BookDoc, IBook } from '../models/book.model';

const LOG_CONTEXT = 'Book Data';

export const getBookById = async (id: string | mongoose.Types.ObjectId, logContext: string, populate?: PopulateOptions): Promise<BookDoc> => {
  logContext += ` -> ${LOG_CONTEXT} -> getBookById() | id: ${id}`;

  const query = Book.findById(id);

  if (populate) {
    query.populate(populate);
  }

  const book = await query.catch(err => {
    throw new CustomError(500, err.message, logContext);
  });

  if (!book) {
    throw new CustomError(404, 'Book not found', logContext);
  }

  return book;
};

export const getBooks = async (filter: FilterQuery<IBook>, logContext: string, select?: Array<string>): Promise<BookDoc[]> => {
  logContext += ` -> ${LOG_CONTEXT} -> getBooks() | filter: ${JSON.stringify(filter)}`;

  let query = Book.find(filter);

  if (select) {
    query.select(select);
  }

  return await query.catch(err => {
    throw new CustomError(500, err.message, logContext);
  });
}

export const createBook = async (book: Partial<IBook>, logContext: string): Promise<BookDoc> => {
  logContext += ` -> ${LOG_CONTEXT} -> createBook() | book: ${JSON.stringify(book)}`;

  return await Book.create(book)
    .catch(err => {
      throw new CustomError(500, err.message, logContext);
    });
};

export const updateBook = async (id: string | mongoose.Types.ObjectId, update: UpdateQuery<IBook>, logContext: string): Promise<BookDoc> => {
  logContext += ` -> ${LOG_CONTEXT} -> updateBook() | id: ${id}, update: ${JSON.stringify(update)}`;

  const book = await Book.findByIdAndUpdate(id, update, { new: true })
    .catch(err => {
      throw new CustomError(500, err.message, logContext);
    });

  if (!book) {
    throw new CustomError(404, 'Book not found', logContext);
  }

  return book;
};

export const deleteBook = async (id: string | mongoose.Types.ObjectId, logContext: string): Promise<void> => {
  logContext += ` -> ${LOG_CONTEXT} -> deleteBook() | id: ${id}`;

  await Book.findByIdAndDelete(id)
    .catch(err => {
      throw new CustomError(500, err.message, logContext);
    });
};
