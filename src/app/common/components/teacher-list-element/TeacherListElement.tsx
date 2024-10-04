import { Link } from "react-router-dom"
import "./TeacherListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

type DepartmentListElementProps = {
    name: string,
    logoUrl: string,
}

export default function TeacherListElement(){
    return (
        <Link to={`${FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}/`} className="teachers-list-element">
            <div className="blue-circle">
                <img src={`/icons/departments_1c54442b-c16a-4ee1-a8e3-271827ea30b9_ITRE.png`} className="department-icon" alt="IKNI"/>
            </div>
            <div className="caption-holder">
                asdasdasdasd
            </div>
        </Link>
    )   
}