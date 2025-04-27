import { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';

import { CustomError } from '../middlewares/error.middleware';

import * as bookData from '../data/book.data';

import { IBook } from '../models/book.model';

export default class BookController {

  #logContext = 'Book Controller';

  getBooks: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> getBooks()`;

    const books = await bookData.getBooks({}, logContext);

    res.status(200).json(books);
  }

  createBook: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> createBook()`;

    const body: Partial<IBook> = req.body;

    if (!body.title || !body.author || !body.description || !body.imageSrc) {
      throw new CustomError(400, 'Missing fields: title | author | description | imageSrc', logContext);
    }

    const book = await bookData.createBook(body, logContext);

    res.status(201).json(book);
  }

  updateBook: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> updateBook()`;

    const id = req.params.id;
    const body: Partial<IBook> = req.body;

    if (!isValidObjectId(id)) {
      throw new CustomError(400, 'Invalid fields: id', logContext);
    }

    const book = await bookData.updateBook(id, body, logContext);

    res.status(200).json(book);
  }

  addReview: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> addReview()`;

    const id = req.params.id;
    const body: { review: string } = req.body;

    if (!isValidObjectId(id)) {
      throw new CustomError(400, 'Invalid fields: id', logContext);
    }

    if (!body.review) {
      throw new CustomError(400, 'Missing fields: review', logContext);
    }

    const book = await bookData.getBookById(id, logContext);

    const review = `${req.user!.name}: ${body.review}`;
    const reviews = [
      ...book.reviews,
      review,
    ];

    const updatedBook = await bookData.updateBook(id, { reviews }, logContext);

    res.status(200).json(updatedBook);
  };

  deleteBook: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> deleteBook()`;

    const id = req.params.id;

    if (!isValidObjectId(id)) {
      throw new CustomError(400, 'Invalid fields: id', logContext);
    }

    await bookData.deleteBook(id, logContext);

    res.status(200).json({});
  }

}
