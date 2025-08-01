import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import App from "../layout/app/App";
import FRONTEND_ROUTES from "../common/constants/frontend-routes.constants";
import MainPage from "../../pages/main-page/MainPage";
import DepartmentsPage from "../../pages/departments-page/DepartmentsPage";
import DepartmentDetailsPage from "../../pages/department_details-page/DepartmentDetailsPage";
import GeneratorPage from "../../pages/generator-page/GeneratorPage";
import TeacherDetailsPage from "../../pages/teacher_details-page/TeacherDetailsPage";
import ProcessorPage from "../../pages/processor-page/ProcessorPage";
import LoginPage from "../../pages/login-page/LoginPage";
import RegisterPage from "../../pages/register-page/RegisterPage";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={FRONTEND_ROUTES.BASE} element={<App />}>
        <Route
            path={FRONTEND_ROUTES.BASE}
            element={<MainPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.DEPARTMENTS}
            element={<DepartmentsPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}
            element={<DepartmentDetailsPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.GENERATOR}
            element={<GeneratorPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.TEACHER_DETAILS}
            element={<TeacherDetailsPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.PROCESSOR}
            element={<ProcessorPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.LOGIN}
            element={<LoginPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.REGISTER}
            element={<RegisterPage />}
        />
    </Route>,
));

export default router;