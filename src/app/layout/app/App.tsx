import { Outlet, useLocation } from 'react-router';
import FRONTEND_ROUTES from '../../common/constants/frontend-routes.constants';
import './App.scss';
import MainPage from '../../../pages/main-page/MainPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DepartmentApi from '../../../api/DepartmentsApi';
import IDepartmentApi from '../../../api/IDepartmentsApi';
import React from 'react';

export const DepartmentApiContext = React.createContext<IDepartmentApi>(new DepartmentApi(""));

function App() {
  const departmentApi: IDepartmentApi = new DepartmentApi(`${process.env.REACT_APP_API_URL}/departments`);
  const { pathname } = useLocation();

  return (
    <DepartmentApiContext.Provider value={departmentApi}>
      <div>
          <Header />
          {(pathname !== FRONTEND_ROUTES.BASE) && (<Outlet />)}
          {(pathname === FRONTEND_ROUTES.BASE) && (<MainPage />)}
          <Footer />
        </div>
    </DepartmentApiContext.Provider>
  )
}

export default App
