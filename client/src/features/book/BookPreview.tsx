import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Avatar, Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '../../context/AuthContext.tsx';
import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as bookApi from './book.api';

import { Book } from './book.model';

import styles from '../../assets/styles/book-preview.module.css';

const formSchema = z.object({
  review: z.string().min(1, 'Review is required'),
});
type FormData = z.infer<typeof formSchema>;

function BookPreview({ id }: { id: string }) {
  const navigate = useNavigate();

  const { getUser } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [book, setBook] = useState<Book>();
  const [trigger, setTrigger] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    bookApi.getBookById(id)
      .then(setBook)
      .catch(() => {
        showSnackbar('Unable to get book');
        navigate('/');
      });
  }, [trigger]);

  const canLeaveReview = () =>
    book?.ownerId !== getUser()?.id &&
    !book?.reviews.some(r => r.reviewerId === getUser()?.id);

  const removeReview = async () => {
    await bookApi.removeReview(id)
      .catch(() => {
        showSnackbar('Unable to remove review');
      });

    showSnackbar('Successfully removed review');
    setTrigger(prevState => prevState + 1);
  };

  const onReviewSubmit = async (data: FormData) => {
    const { review } = data;

    bookApi.addReview(id, review)
      .catch(() => {
        showSnackbar('Unable to add review');
      });

    showSnackbar('Successfully added review');
    setTrigger(prevState => prevState + 1);
  };

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
            {canLeaveReview() && (
              <form onSubmit={ handleSubmit(onReviewSubmit) }>
                <TextField
                  multiline
                  rows={6}
                  variant="outlined"
                  { ...register("review") }
                  placeholder="Leave a review"
                  className={styles.textField}
                />
                {errors.review && (
                  <Typography variant="body2" component="p">
                    { errors.review.message }
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  className={styles.submitButton}
                >
                  Add
                </Button>
              </form>
            )}
            {book?.reviews.length ? (
              <Box className={styles.reviews}>
                {book.reviews.map((r) => (
                  <Box>
                    <Typography variant="body1" component="p">
                      { r.reviewContent }
                    </Typography>
                    <Box className={styles.reviewer}>
                      {r.reviewerId === getUser()?.id ? (
                        <Button variant="outlined" onClick={removeReview}>
                          Remove
                        </Button>
                      ) : (
                        <Typography variant="body2" component="p">
                          { r.reviewer }
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" component="p">
                  There are no reviews yet
                </Typography>
              </Box>
            )}
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
