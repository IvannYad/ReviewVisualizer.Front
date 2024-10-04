import { Link } from "react-router-dom"
import "./DepartmentListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

type DepartmentListElementProps = {
    id: number,
    name: string,
    logoUrl: string,
}

export default function DepartmentListElement(props: DepartmentListElementProps){
    return (
        <Link to={`${FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}?id=${props.id}`} className="departments-list-element">
            <div className="green-circle">
                <img src={props.logoUrl} className="department-icon" alt={props.name}/>
            </div>
            <div className="caption-holder">
                {props.name}
            </div>
        </Link>
    )   
}