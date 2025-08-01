import { Link, useNavigate } from "react-router-dom"
import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./Header.scss"
import { useContext } from "react";
import { AnalystApiContext, ReviewerApiContext, UserContext } from "../app/App";
import { notification } from "antd";

export default function MainHeader(){
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const reviewersApi = useContext(ReviewerApiContext);
    const analystsApi = useContext(AnalystApiContext);

    const handleDepartmentsNavigate: React.MouseEventHandler<HTMLAnchorElement> | undefined = async (e) => {
        e.preventDefault();

        await analystsApi.tryAccess()
            .then(() => navigate(FRONTEND_ROUTES.PAGES.DEPARTMENTS))
            .catch(e => {
                if (e.status === 401){
                    navigate("login");
                    return;
                } else if (e.status === 403){
                    api["error"]({
                        message: "You have no access to Departments page",
                        className: "error-notification-box"
                    });

                    return;
                }

                api["error"]({
                        message: "Unexpected error ocurred while verifying access to the Departments page",
                        className: "error-notification-box"
                    });
            });
    };

    const handleGeneratorNavigate: React.MouseEventHandler<HTMLAnchorElement> | undefined = async (e) => {
        e.preventDefault();

        await reviewersApi.tryAccess()
            .then(() => navigate(FRONTEND_ROUTES.PAGES.GENERATOR))
            .catch(e => {
                if (e.status === 401){
                    navigate("login");
                    return;
                } else if (e.status === 403){
                    api["error"]({
                        message: "You have no access to Generator page",
                        className: "error-notification-box"
                    });

                    return;
                }

                api["error"]({
                        message: "Unexpected error ocurred while verifying access to the Generators page",
                        className: "error-notification-box"
                    });
            });
    };
    
    return (
        <header>
            {contextHolder}
            <div className="main-links">
                <Link to={FRONTEND_ROUTES.BASE} >ReviewVisualizer</Link>
                {
                    userCtx?.user ? (
                        <>
                            <Link to={FRONTEND_ROUTES.PAGES.DEPARTMENTS} onClick={handleDepartmentsNavigate}>Departments</Link>
                            <Link to={FRONTEND_ROUTES.PAGES.GENERATOR} onClick={handleGeneratorNavigate}>Generator</Link>
                            <a href={"https://localhost:5002/hangfire"} target="_blank" rel="noreferrer">Processor</a>
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
            <div className="secondary-links">
                {
                    userCtx?.user ? (
                        <>
                            <div>Hello, {userCtx.user.userName}</div>
                            <a href="">Logout</a>
                        </>
                    ) : (
                        <>
                            <Link to={FRONTEND_ROUTES.PAGES.LOGIN} >Log In</Link>
                            <Link to={FRONTEND_ROUTES.PAGES.REGISTER} >Register</Link>
                        </>
                    )
                }
            </div>
        </header>
    )   
}