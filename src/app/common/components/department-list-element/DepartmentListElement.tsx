import { Link } from "react-router-dom"
import "./DepartmentListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

type DepartmentListElementProps = {
    name: string,
    logoUrl: string,
}

export default function DepartmentListElement(props: DepartmentListElementProps){
    const imgFullPath = `${props.logoUrl}`;
    return (
        <Link to={`${FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}/`} className="departments-list-element">
            <div className="green-circle">
                <img src={imgFullPath} className="department-icon" alt="IKNI"/>
            </div>
            <div className="caption-holder">
                {props.name}
            </div>
        </Link>
    )   
}