import "./SmallTeacherListElement.scss"

type TeacherListElementProps = {
    id: number;
    name: string,
    photoUrl: string,
    className?: string,
    isAlreadySelected?: boolean;
}

export default function SmallTeacherListElement(props: TeacherListElementProps){
    return (
        <div className={`small-teacher-list-element ${props.className}`}>
            <img src={props.photoUrl} className="teacher-icon" alt={props.name} />
            <div className="caption-holder">
                {props.name}
            </div>
        </div>
    )
}