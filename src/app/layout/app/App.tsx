import { Outlet, useLocation } from 'react-router';
import FRONTEND_ROUTES from '../../common/constants/frontend-routes.constants';
import './App.scss';
import MainPage from '../../../pages/main-page/MainPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DepartmentApi from '../../../api/DepartmentsApi';
import IDepartmentApi from '../../../api/IDepartmentsApi';
import React, { useState } from 'react';
import TeacherApi from '../../../api/TeachersApi';
import ITeacherApi from '../../../api/ITeachersApi';
import ReviewerApi from '../../../api/ReviewerApi';
import IReviewerApi from '../../../api/IReviewerApi';
import IAnalystApi from '../../../api/IAnalystApi';
import AnalystApi from '../../../api/AnalystApi';
import IAuthApi from '../../../api/IAuthApi';
import AuthApi from '../../../api/AuthApi';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';
import IUserAPi from '../../../api/IUserApi';
import UserApi from '../../../api/UserAPi';
import { User } from '../../../models/User';

export type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
}

export type Apis = {
    departmentApi: IDepartmentApi;
    teacherApi: ITeacherApi;
    reviewerApi: IReviewerApi;
    analystApi: IAnalystApi;
    authApi: IAuthApi;
    userApi: IUserAPi;
}

export const ApisContext = React.createContext<Apis>({
    departmentApi: new DepartmentApi(""),
    teacherApi: new TeacherApi(""),
    reviewerApi: new ReviewerApi(""),
    analystApi: new AnalystApi(""),
    authApi: new AuthApi(""),
    userApi: new UserApi(""),
});

export const UserContext = React.createContext<AuthContextType | undefined>(undefined);
export const NotificationApiContext = React.createContext<NotificationInstance | undefined>(undefined);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const apis: Apis = {
    departmentApi: new DepartmentApi(`${process.env.REACT_APP_API_URL}/departments`),
    teacherApi: new TeacherApi(`${process.env.REACT_APP_API_URL}/teachers`),
    reviewerApi: new ReviewerApi(`${process.env.REACT_APP_GENERATOR_URL}/reviewers`),
    analystApi: new AnalystApi(`${process.env.REACT_APP_API_URL}/analysts`),
    authApi: new AuthApi(`${process.env.REACT_APP_API_URL}/auth`),
    userApi: new UserApi(`${process.env.REACT_APP_API_URL}/users`),
  }

  const { pathname } = useLocation();
  const [api, contextHolder] = notification.useNotification();


  return (
    <ApisContext.Provider value={apis}>
        <NotificationApiContext.Provider value={api}>
            <UserContext.Provider value={{user, setUser}}>
                <div>
                    <Header />
                    {contextHolder}
                    {(pathname !== FRONTEND_ROUTES.BASE) && (<Outlet />)}
                    {(pathname === FRONTEND_ROUTES.BASE) && (<MainPage />)}
                    <Footer />
                </div>
        </UserContext.Provider>
        </NotificationApiContext.Provider>
    </ApisContext.Provider>
  )
}

export default App
