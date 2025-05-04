import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Button, Link, TextField, Typography } from '@mui/material';

import { useAuth } from '../../context/AuthContext.tsx';
import { useSnackbar } from '../../context/SnackbarContext.tsx';

import styles from '../../assets/styles/form.module.css';

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
type FormData = z.infer<typeof formSchema>;

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const { showSnackbar } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    await login(email, password)
      .catch(() => {
        showSnackbar('Unable to login');
      });

    reset();
    navigate('/');
  };

  return (
    <Box className={styles.container}>
      <form className={styles.form} onSubmit={ handleSubmit(onSubmit) }>
        <Typography variant="h4">
          Sign In
        </Typography>
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
          Login
        </Button>

        <Link href="/auth/register">Register</Link>
      </form>
    </Box>
  );
}

export default Login;
