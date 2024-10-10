import { Link } from "react-router-dom"
import "./SmallTeacherListElement.scss"
import FRONTEND_ROUTES from "../../constants/frontend-routes.constants"

type TeacherListElementProps = {
    id: number;
    name: string,
    photoUrl: string,
    className?: string,
    isAlreadySelected?: boolean;
}

export default function SmallTeacherListElement(props: TeacherListElementProps){
    return (
        <div className="list-element-holder">
            <Link to={`${FRONTEND_ROUTES.PAGES.DEPARTMENT_DETAILS}/`} 
                className={`small-teacher-list-element ${props.className}`}>
                <img src={props.photoUrl} className="teacher-icon" alt={props.name} />
                <div className="caption-holder">
                    {props.name}
                </div>
            </Link>
            {!props.isAlreadySelected ? null : (
                <div className="selected-curtain"></div>
            )}
        </div>
    )   
}