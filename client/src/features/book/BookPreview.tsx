import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Card, CardContent, Container, Typography } from '@mui/material';

import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as bookApi from './book.api';

import { Book } from './book.model';

import styles from '../../assets/styles/book-preview.module.css';

function BookPreview({ id }: { id: string }) {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const [book, setBook] = useState<Book>();

  useEffect(() => {
    bookApi.getBookById(id)
      .then(setBook)
      .catch(() => {
        showSnackbar('Unable to get book');
        navigate('/');
      });
  }, []);

  return (
    <Container className={styles.container}>
      <Box className={styles.left}>
        <Card className={styles.card}>
          <CardContent>
            <Box>
              <Typography variant="h3" component="h3" className={styles.title}>
                {book?.title}
              </Typography>
              <Typography variant="body1" component="p">
                {book?.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h4" component="h4">
              Reviews
            </Typography>
            <Typography variant="h5" component="h5">
              Coming soon...
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box className={styles.right}>
        <Card className={styles.card}>
          <CardContent>
            <Avatar
              variant="rounded"
              src={book?.imageSrc}
              alt="Book cover"
              className={styles.cover}
            />
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent>
            <Typography variant="h5" component="h5">
              Author:
            </Typography>
            <Typography variant="h4" component="h4">
              {book?.author}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default BookPreview;
