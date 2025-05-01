import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, TextField, Typography } from '@mui/material';

import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as bookApi from './book.api.ts';

import {BookDTO} from './book.model.ts';

import styles from '../../assets/styles/form.module.css';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author is required'),
  description: z.string().min(1, 'Description is required'),
  imageSrc: z.string().url('Image src is supposed to be a url'),
});
type FormData = z.infer<typeof formSchema>;

function AddBook() {
  const navigate = useNavigate();

  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    const { title, author, description, imageSrc } = data;

    const dto: BookDTO = {
      title,
      author,
      description,
      imageSrc,
    };

    await bookApi.createBook(dto)
      .catch(() => {
        showSnackbar('Unable to create book');
      });

    showSnackbar('Successfully created new book');
    reset();
    navigate('/');
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h4">
          Add Book
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
          Add
        </Button>
      </form>
    </Box>
  );
}

export default AddBook;
