import { Link } from "react-router-dom"
import "./TeacherListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

type TeacherListElementProps = {
    id: number;
    name: string,
    photoUrl: string,
    className?: string,
}

export default function TeacherListElement(props: TeacherListElementProps){
    return (
        <Link to={`${FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}/`} className={`teachers-list-element ${props.className}`}>
            <div className="blue-circle">
                <img src={props.photoUrl} className="teacher-icon" alt={props.name} />
            </div>
            <div className="caption-holder">
                {props.name}
            </div>
        </Link>
    )   
}