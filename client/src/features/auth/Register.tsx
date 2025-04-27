import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, Link, TextField, Typography } from '@mui/material';

import { useSnackbar } from '../../context/SnackbarContext.tsx';

import * as authApi from './auth.api.ts';

import { RegisterBody } from './auth.model.ts';

import styles from '../../assets/styles/features/auth/auth.module.css';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof formSchema>;

function Register() {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    const { name, email, password } = data;

    const registerBody: RegisterBody = {
      name,
      email,
      password,
    };

    await authApi.register(registerBody)
      .catch(() => {
        showSnackbar('Unable to register');
      });

    navigate('/auth/login');
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h4">
          Sign Up
        </Typography>
        <TextField
          type="name"
          variant="outlined"
          { ...register("name") }
          placeholder="Name"
          className={styles.textField}
        />
        {errors.name && (
          <Typography variant="body2" component="p">
            { errors.name.message }
          </Typography>
        )}
        <TextField
          type="email"
          variant="outlined"
          { ...register("email") }
          placeholder="Email"
          className={styles.textField}
        />
        {errors.email && (
          <Typography variant="body2" component="p">
            { errors.email.message }
          </Typography>
        )}
        <TextField
          type="password"
          variant="outlined"
          { ...register('password') }
          placeholder="Password"
          className={styles.textField}
        />
        {errors.password && (
          <Typography variant="body2" component="p">
            { errors.password.message }
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </Button>

        <Link href="/auth/login">Login</Link>
      </form>
    </Box>
  );
}

export default Register;
