import { Outlet, useLocation } from 'react-router';
import FRONTEND_ROUTES from '../../common/constants/frontend-routes.constants';
import './App.scss';
import MainPage from '../../../pages/main-page/MainPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';

function App() {
  const { pathname } = useLocation();
  return (
    <div>
        <Header />
        {(pathname !== FRONTEND_ROUTES.BASE) && (<Outlet />)}
        {(pathname === FRONTEND_ROUTES.BASE) && (<MainPage />)}
        <Footer />
      </div>
  )
}

export default App
