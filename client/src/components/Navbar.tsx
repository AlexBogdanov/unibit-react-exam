import { Box, Link } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

import { useAuth } from '../context/AuthContext.tsx';

import styles from '../assets/styles/navbar.module.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Box className={styles.container}>
      <Box className={styles.wrapper}>
        <Box className={styles.left}>
          <MenuBookIcon className={styles.icon} />
          <Link href="/">Books</Link>
          <Link href="/book">Add Book</Link>
        </Box>
        <Box>
          {
            isAuthenticated() ? (
              <Link onClick={logout}>Logout</Link>
            ) : (
              <Link href="/auth/login">Login</Link>
            )
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
