import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import App from "../layout/app/App";
import FRONTEND_ROUTES from "../common/constants/frontend-routes.constants";
import MainPage from "../../pages/main-page/MainPage";
import DepartmentsPage from "../../pages/departments-page/DepartmentsPage";
import DepartmentDetailsPage from "../../pages/department_details-page/DepartmentDetailsPage";
import GeneratorPage from "../../pages/generator-page/GeneratorPage";
import TeacherDetailsPage from "../../pages/teacher_details-page/TeacherDetailsPage";
import LoginPage from "../../pages/login-page/LoginPage";
import RegisterPage from "../../pages/register-page/RegisterPage";
import ProtectedComponent from "../common/components/protected-component/ProtectedComponent";
import ProcessorPage from "../../pages/processor-page/ProcessorPage";
import OwnerPage from "../../pages/owner-page/OwnerPage";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={FRONTEND_ROUTES.BASE} element={<App />}>
        <Route
            path={FRONTEND_ROUTES.BASE}
            element={<MainPage />}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.DEPARTMENTS}
            element={
                <ProtectedComponent pageName="Departments" pageRoute={FRONTEND_ROUTES.PAGES.DEPARTMENTS}>
                    <DepartmentsPage />
                </ProtectedComponent>}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}
            element={
                <ProtectedComponent pageName="Department Details" pageRoute={FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}>
                    <DepartmentDetailsPage />
                </ProtectedComponent>}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.GENERATOR}
            element={
                <ProtectedComponent pageName="Generator" pageRoute={FRONTEND_ROUTES.PAGES.GENERATOR}>
                    <GeneratorPage />
                </ProtectedComponent>}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.PROCESSOR}
            element={
                <ProtectedComponent pageName="Processor" pageRoute={FRONTEND_ROUTES.PAGES.PROCESSOR}>
                    <ProcessorPage />
                </ProtectedComponent>}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.TEACHER_DETAILS}
            element={
                <ProtectedComponent pageName="Teacher Details" pageRoute={FRONTEND_ROUTES.PAGES.TEACHER_DETAILS}>
                    <TeacherDetailsPage />
                </ProtectedComponent>}
        />
        <Route
            path={FRONTEND_ROUTES.PAGES.OWNER}
            element={
                <ProtectedComponent pageName="Owner Page" pageRoute={FRONTEND_ROUTES.PAGES.OWNER}>
                    <OwnerPage />
                </ProtectedComponent>}
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