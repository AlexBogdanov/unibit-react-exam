import passport from 'passport';
import { Router } from 'express';

import { getUseCatch } from '../utils/catch.util';

import BookController from '../controllers/book.controller';

const useCatch = getUseCatch();
const bookController = new BookController();

const BookRouter = Router();

BookRouter.get('/', useCatch(bookController.getBooks));
BookRouter.get('/:id', useCatch(bookController.getBookById));

BookRouter.post('/', passport.authenticate('bearer', { session: false }), useCatch(bookController.createBook));

BookRouter.patch('/:id', passport.authenticate('bearer', { session: false }), useCatch(bookController.updateBook));
BookRouter.patch('/review/:id', passport.authenticate('bearer', { session: false }), useCatch(bookController.addReview));
BookRouter.patch('/review/remove/:id', passport.authenticate('bearer', { session: false }), useCatch(bookController.removeReview));

BookRouter.delete('/:id', passport.authenticate('bearer', { session: false }), useCatch(bookController.deleteBook));

export default BookRouter;
