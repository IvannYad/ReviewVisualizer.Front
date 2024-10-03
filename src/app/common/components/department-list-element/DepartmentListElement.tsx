import { Link } from "react-router-dom"
import "./DepartmentListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

export default function DepartmentListElement(){
    return (
        <Link to={`${FRONTEND_ROUTES.BASE}/`} className="departments-list-element">
            <div className="green-circle">
                <img src="departments-icons/INEM.png" className="department-icon" alt="IKNI"/>
            </div>
            <div className="caption-holder">
                Sample Text
            </div>
        </Link>
    )   
}