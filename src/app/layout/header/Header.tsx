import { Link } from "react-router-dom"
import FRONTEND_ROUTES from "../../common/constants/frontend-routes.constants"
import "./Header.scss"

export default function MainHeader(){
    return (
        <header>
            <Link to={FRONTEND_ROUTES.BASE} >ReviewVisualizer</Link>
            <Link to={FRONTEND_ROUTES.PAGES.DEPARTMENTS} >Departments</Link>
        </header>
    )   
}