import "./DepartmentInfoTeacherListElementWrapper.scss";
import SmallTeacherListElement from "../../../../components/small-teacher-list-element/SmallTeacherListElement"

type DepartmentInfoTeacherListElementWrapperProps = {
    id: number;
    name: string;
    photoUrl: string;
    className?: string;
    isActive: boolean;
    isAlreadySelected?: boolean;
    onClick: (id: number) => void;
}

export default function DepartmentInfoTeacherListElementWrapper(props: DepartmentInfoTeacherListElementWrapperProps){
    return (
        <div className={`list-element-holder ${props.isAlreadySelected ? "disabled" : "" }`} onClick={(e) => {
            e.preventDefault();
            props.onClick(props.id);
        }}>
            <SmallTeacherListElement id={props.id} name={props.name} photoUrl={props.photoUrl} className={props.className}/>
            {!props.isAlreadySelected ? null : (
                <div className="selected-curtain"></div>
            )}
            {!props.isActive ? null : (
                <div className="active-selected"></div>
            )}
        </div>
    )   
}