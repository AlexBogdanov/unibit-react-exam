import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';

import { useAuth } from '../../context/AuthContext';
import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as bookApi from './book.api';

import { BookPreview } from './book.model';

function Book({ book, loadBooks }: { book: BookPreview, loadBooks: () => void }) {
  const navigate = useNavigate();

  const { getUser } = useAuth();
  const { showSnackbar } = useSnackbar();

  const getShortDescription = (description: string) =>
    description.length > 150 ? `${description.substring(0, 150)}...` : description;

  const onDelete = () => {
    bookApi.deleteBook(book.id)
      .then(() => {
        showSnackbar('Book successfully deleted');
        loadBooks();
      })
      .catch(() => {
        showSnackbar('Unable to delete book');
      });
  };

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={book.imageSrc}
        alt="Book cover"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          { book.title }
        </Typography>
        <Typography>
          { getShortDescription(book.description) }
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => navigate(`/book/${book.id}`)}>Details</Button>
        {getUser()?.id === book.ownerId && (
          <>
            {/*<Button>Edit</Button>*/}
            <Button onClick={onDelete}>Delete</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default Book;
