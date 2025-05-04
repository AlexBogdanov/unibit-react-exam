import { RequestHandler } from 'express';
import { Types, isValidObjectId } from 'mongoose';

import { CustomError } from '../middlewares/error.middleware';

import * as bookData from '../data/book.data';

import { UserDoc } from '../models/user.model';
import { IBook, BookResponse, Review, ReviewResponse } from '../models/book.model';

export default class BookController {

  #logContext = 'Book Controller';

  getBooks: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> getBooks()`;

    const books = await bookData.getBooks(
      {},
      logContext,
      ['title', 'description', 'imageSrc', 'ownerId'],
    );

    res.status(200).json(books);
  }

  getBookById: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> getBook()`;

    const id = req.params.id;

    if (!isValidObjectId(id)) {
      throw new CustomError(400, 'Invalid fields: id', logContext);
    }

    const book = await bookData.getBookById(
      id,
      logContext,
      {
        path: 'reviews.reviewerId',
        select: 'name',
      },
    );

    const reviewsResponse: Array<ReviewResponse> = book.reviews
      .map(r => ({
        reviewContent: r.reviewContent,
        reviewerId: (r.reviewerId as UserDoc).id,
        reviewer: (r.reviewerId as UserDoc).name,
      }));
    const response: BookResponse = {
      ...book.toJSON(),
      reviews: reviewsResponse,
    };

    res.status(200).json(response);
  }

  createBook: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> createBook()`;

    const body: Partial<IBook> = req.body;

    if (!body.title || !body.author || !body.description || !body.imageSrc) {
      throw new CustomError(400, 'Missing fields: title | author | description | imageSrc', logContext);
    }

    body.ownerId = new Types.ObjectId(req.user!.id!);

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

    const review: Review = {
      reviewerId: new Types.ObjectId(req.user!.id),
      reviewContent: body.review,
    };

    const reviews = [
      ...book.reviews,
      review,
    ];

    const updatedBook = await bookData.updateBook(id, { reviews }, logContext);

    res.status(200).json(updatedBook);
  };

  removeReview: RequestHandler = async (req, res) => {
    const logContext = `${this.#logContext} -> removeReview()`;

    const id = req.params.id;

    if (!isValidObjectId(id)) {
      throw new CustomError(400, 'Invalid fields: id', logContext);
    }

    const book = await bookData.getBookById(id, logContext);

    const reviews = [...book.reviews];
    const index = reviews.findIndex(r => r.reviewerId.toString() === req.user!.id);
    reviews.splice(index, 1);

    const updatedBook = await bookData.updateBook(id, { reviews }, logContext);

    res.status(200).json(updatedBook);
  }

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
