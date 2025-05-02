import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardMedia, CardContent, Typography } from '@mui/material';

import { useAuth } from '../../context/AuthContext';

import { BookPreview } from './book.model';

function Book({ book }: { book: BookPreview }) {
  const navigate = useNavigate();

  const { getUser } = useAuth();

  const getShortDescription = (description: string) =>
    description.length > 150 ? `${description.substring(0, 150)}...` : description;

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
            <Button>Edit</Button>
            <Button>Delete</Button>
          </>
        )}
      </CardActions>
    </Card>
  );
}

export default Book;
