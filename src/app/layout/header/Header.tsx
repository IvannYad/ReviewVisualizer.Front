import { Link } from "react-router-dom"
import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./Header.scss"

export default function MainHeader(){
    return (
        <header>
            <div className="main-links">
                <Link to={FRONTEND_ROUTES.BASE} >ReviewVisualizer</Link>
                <Link to={FRONTEND_ROUTES.PAGES.DEPARTMENTS} >Departments</Link>
                <Link to={FRONTEND_ROUTES.PAGES.GENERATOR} >Generator</Link>
                <Link to={"https://localhost:5002/hangfire"} >Processor</Link>
            </div>
            <div className="secondary-links">
                <Link to={FRONTEND_ROUTES.PAGES.LOGIN} >Log In</Link>
                <Link to={FRONTEND_ROUTES.PAGES.LOGIN} >Register</Link>
            </div>
        </header>
    )   
}