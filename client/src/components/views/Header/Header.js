import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';
const Header = () => {
  return (
    <nav>
      <div className={styles.nav_wrapper}>
        <NavLink to="/" className={styles.logo}>
          <h2>Bulletin Board</h2>
        </NavLink>
        <ul className={styles.nav_list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
              }
              to="/login"
            >
              Sign in
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
              }
              to="/register"
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
              }
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
