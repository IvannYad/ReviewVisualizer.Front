import { DeleteOutlined } from "@ant-design/icons";
import SmallTeacherListElement from "../../small-teacher-list-element/SmallTeacherListElement";
import "./TeacherListElementWrapper.scss";

type TeacherListElementWrapperProps = {
    id: number;
    name: string,
    photoUrl: string,
    className?: string
    deleteFunc: (id: number) => void;
}

export default function TeacherListElementWrapper(props: TeacherListElementWrapperProps){
    return (
        <div className="list-element-holder">
            <SmallTeacherListElement id={props.id} name={props.name} photoUrl={props.photoUrl} className={props.className} />
            <div className="delete-teacher-btn" onClick={(e) => {
                e.preventDefault();
                props.deleteFunc(props.id);
            }}>
                <DeleteOutlined />
            </div>
        </div>
    )   
}