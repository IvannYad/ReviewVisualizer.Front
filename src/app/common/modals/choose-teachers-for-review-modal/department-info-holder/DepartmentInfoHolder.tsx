import { ApiFilled, DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons"
import "./DepartmentInfoHolder.scss"
import { useContext, useEffect, useState } from "react";
import { Department } from "../../../../../models/Department";
import { Teacher } from "../../../../../models/Teacher";
import SmallTeacherListElement from "../../../components/small-teacher-list-element/SmallTeacherListElement";
import { TeacherApiContext } from "../../../../layout/app/App";

type DepartmentInfoHolderProps = {
    department: Department;
    teachers: Teacher[];
}

export default function DepartmentInfoHolder(props: DepartmentInfoHolderProps){
    const [isExpanded, setIsExpanded] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const teacherApi = useContext(TeacherApiContext);

    useEffect(() => {
        teacherApi.getAllForDepartment(props.department.id)
            .then(res => {
                if (res)
                    setTeachers([ ...res ]);
            });
    }, [])

    return (
        <div className="department-info-element">
            <div className="element">
                <div className="department-info-holder">
                    <img className="department-icon" alt={props.department.name} 
                        src={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${props.department.logoUrl}`} />
                    <div className="department-name">
                        {props.department.name} 
                    </div>
                </div>
                <div className="expander" onClick={() => setIsExpanded((prev) => !prev)}>
                    {!isExpanded ? <DownOutlined className="arrow"/> : 
                        <UpOutlined className="arrow" />}
                </div>
            </div>
            {!isExpanded ? null : (
                <div className="teachers-holder">
                    {!teachers ? <LoadingOutlined /> : teachers.map(t => (
                        <SmallTeacherListElement id={t.id} name={`${t.firstName} ${t.lastName}`} photoUrl={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${t.photoUrl}`}/>
                    ))}
                </div>
            )}
        </div>
    )   
}