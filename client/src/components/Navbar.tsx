import {Box, Link} from '@mui/material';

import { useAuth } from '../context/AuthContext.tsx';

import styles from '../assets/styles/components/navbar.module.css';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box className={styles.container}>
      <Box></Box>
      <Box>
        {
          !!user ? (
            <Link onClick={logout}>
              Logout
            </Link>
          ) : (
            <Link href="/auth/login">
              Login
            </Link>
          )
        }
      </Box>
    </Box>
  );
}

export default Navbar;
