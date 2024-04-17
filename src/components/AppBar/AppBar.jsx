import { useSelector } from 'react-redux';
import { selectIsUserLoggedIn } from '../../redux/auth/selectors';

import { Navigation } from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';

import css from './AppBar.module.css';

const AppBar = () => {
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);

  return (
    <header className={css.header}>
      <Navigation />
      {isUserLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;