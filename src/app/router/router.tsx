import { createRoutesFromElements, Route, createBrowserRouter } from "react-router-dom";
import App from "../layout/app/App";
import FRONTEND_ROUTES from "../common/constants/frontend-routes.constants";
import MainPage from "../../pages/main-page/MainPage";
import DepartmentsPage from "../../pages/departments-page/DepartmentsPage";

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
    </Route>,
));

export default router;