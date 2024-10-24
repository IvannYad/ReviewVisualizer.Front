import { Outlet, useLocation } from 'react-router';
import FRONTEND_ROUTES from '../../common/constants/frontend-routes.constants';
import './App.scss';
import MainPage from '../../../pages/main-page/MainPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import DepartmentApi from '../../../api/DepartmentsApi';
import IDepartmentApi from '../../../api/IDepartmentsApi';
import React from 'react';
import TeacherApi from '../../../api/TeachersApi';
import ITeacherApi from '../../../api/ITeachersApi';
import ReviewerApi from '../../../api/ReviewerApi';
import IReviewerApi from '../../../api/IReviewerApi';
import IAnalystApi from '../../../api/IAnalystApi';
import AnalystApi from '../../../api/AnalystApi';

export const DepartmentApiContext = React.createContext<IDepartmentApi>(new DepartmentApi(""));
export const TeacherApiContext = React.createContext<ITeacherApi>(new TeacherApi(""));
export const ReviewerApiContext = React.createContext<IReviewerApi>(new ReviewerApi(""));
export const AnalystApiContext = React.createContext<IAnalystApi>(new AnalystApi(""));

function App() {
  const departmentApi: IDepartmentApi = new DepartmentApi(`${process.env.REACT_APP_API_URL}/departments`);
  const teacherApi: ITeacherApi = new TeacherApi(`${process.env.REACT_APP_API_URL}/teachers`);
  const reviewerApi: IReviewerApi = new ReviewerApi(`${process.env.REACT_APP_GENERATOR_URL}/reviewers`);
  const analystApi: IAnalystApi = new AnalystApi(`${process.env.REACT_APP_API_URL}/analysts`);
  const { pathname } = useLocation();

  return (
    <DepartmentApiContext.Provider value={departmentApi}>
        <TeacherApiContext.Provider value={teacherApi}>
            <ReviewerApiContext.Provider value={reviewerApi}>
                <AnalystApiContext.Provider value={analystApi}>
                    <div>
                        <Header />
                        {(pathname !== FRONTEND_ROUTES.BASE) && (<Outlet />)}
                        {(pathname === FRONTEND_ROUTES.BASE) && (<MainPage />)}
                        <Footer />
                    </div>
                </AnalystApiContext.Provider>
            </ReviewerApiContext.Provider>
        </TeacherApiContext.Provider>
    </DepartmentApiContext.Provider>
  )
}

export default App
