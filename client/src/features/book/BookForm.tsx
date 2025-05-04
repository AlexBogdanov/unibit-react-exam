import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';

import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as bookApi from './book.api.ts';

import { Book, BookDTO } from './book.model.ts';

import styles from '../../assets/styles/form.module.css';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  imageSrc: z.string().url('Image src is supposed to be a url'),
});
type FormData = z.infer<typeof formSchema>;

function BookForm({ id }: { id?: string }) {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [bookId, setBookId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setBookId(id);
    setIsEdit(true);

    bookApi.getBookById(id)
      .then((book) => {
        reset({
          title: book.title,
          author: book.author,
          description: book.description,
          imageSrc: book.imageSrc,
        });
      })
      .catch(() => {
        showSnackbar('Unable to get book');
        navigate('/');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const onSubmit = async (data: FormData) => {
    const { title, author, description, imageSrc } = data;

    const dto: BookDTO = {
      title,
      author,
      description,
      imageSrc,
    };

    let request: Promise<Book>;

    if (isEdit) {
      request = bookApi.updateBook(bookId!, dto);
    } else {
      request = bookApi.createBook(dto);
    }

    await request.catch(() => {
      showSnackbar(isEdit ? 'Unable to edit book' : 'Unable to create book');
    });

    showSnackbar(isEdit ? 'Successfully edited book' : 'Successfully created new book');
    reset();
    navigate('/');
  };

  if (isLoading) {
    return (
      <Box className={styles.container}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h4">
          { isEdit ? "Edit Book" : "Add Book" }
        </Typography>
        <TextField
          variant="outlined"
          { ...register("title") }
          placeholder="Title"
          className={styles.textField}
        />
        {errors.title && (
          <Typography variant="body2" component="p">
            { errors.title.message }
          </Typography>
        )}
        <TextField
          variant="outlined"
          { ...register("author") }
          placeholder="Author"
          className={styles.textField}
        />
        {errors.author && (
          <Typography variant="body2" component="p">
            { errors.author.message }
          </Typography>
        )}
        <TextField
          multiline
          rows={4}
          variant="outlined"
          { ...register("description") }
          placeholder="Description"
          className={styles.textField}
        />
        {errors.description && (
          <Typography variant="body2" component="p">
            { errors.description.message }
          </Typography>
        )}
        <TextField
          variant="outlined"
          { ...register("imageSrc") }
          placeholder="Image src"
          className={styles.textField}
        />
        {errors.imageSrc && (
          <Typography variant="body2" component="p">
            { errors.imageSrc.message }
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          { isEdit ? "Edit" : "Add" }
        </Button>
      </form>
    </Box>
  );
}

export default BookForm;
