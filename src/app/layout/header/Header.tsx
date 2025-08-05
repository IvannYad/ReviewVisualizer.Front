import { Link, useNavigate } from "react-router-dom"
import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./Header.scss"
import { useContext, useEffect } from "react";
import { ApisContext, UserContext } from "../app/App";
import { notification } from "antd";
import Cookies from 'js-cookie';

export default function MainHeader(){
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const { authApi } = useContext(ApisContext);

    const handleLogoff: React.MouseEventHandler<HTMLAnchorElement> | undefined = async (e) => {
        e.preventDefault();
        if (!userCtx?.user) return;

        await authApi.logoffAsync({ username: userCtx!.user!.userName })
            .then(() => {
                userCtx.setUser(null);
            })
            .catch((e) => {
                api["error"]({
                        message: `Error while logging off`,
                        className: "error-notification-box"
                    });
            });
    }

    useEffect(() => {
        const userName = Cookies.get('UserName');
        console.log(userName);
        if (userName && userCtx)
            userCtx.setUser({ userName })
    }, [])
    
    return (
        <header>
            {contextHolder}
            <div className="main-links">
                <Link to={FRONTEND_ROUTES.BASE} >ReviewVisualizer</Link>
                {
                    userCtx?.user ? (
                        <>
                            <Link to={FRONTEND_ROUTES.PAGES.DEPARTMENTS} >Departments</Link>
                            <Link to={FRONTEND_ROUTES.PAGES.GENERATOR} >Generator</Link>
                            <Link to={FRONTEND_ROUTES.PAGES.PROCESSOR} >Processor</Link>
                            <Link to={FRONTEND_ROUTES.PAGES.OWNER} >Owner</Link>
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
                            <a onClick={handleLogoff}>Logout</a>
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