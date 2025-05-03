import { useState, useEffect } from 'react';

import { Container } from '@mui/material';

import { useSnackbar } from '../context/SnackbarContext.tsx';

import * as bookApi from '../features/book/book.api';

import Book from '../features/book/Book.tsx';

import { BookPreview } from '../features/book/book.model';

import styles from '../assets/styles/home-page.module.css';

function HomePage() {
  const { showSnackbar } = useSnackbar();

  const [books, setBooks] = useState<BookPreview[]>([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    bookApi.getBooks()
      .then(setBooks)
      .catch(() => {
        showSnackbar('Unable to get books. Please try again later!');
      });
  }, [trigger]);

  return (
    <Container className={styles.container}>
      {books.map((b) => (
        <Book
          key={b.id}
          book={b}
          loadBooks={() => { setTrigger(prevState => prevState + 1) }}
        />
      ))}
    </Container>
  );
}

export default HomePage;
