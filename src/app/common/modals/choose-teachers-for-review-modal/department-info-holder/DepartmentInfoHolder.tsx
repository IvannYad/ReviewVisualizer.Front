import { DownOutlined, LoadingOutlined, UpOutlined } from "@ant-design/icons"
import "./DepartmentInfoHolder.scss"
import { useContext, useEffect, useState } from "react";
import { Department } from "../../../../../models/Department";
import { Teacher } from "../../../../../models/Teacher";
import { TeacherApiContext } from "../../../../layout/app/App";
import DepartmentInfoTeacherListElementWrapper from "./teacher-list-element-wrapper/DepartmentInfoTeacherListElementWrapper";

type DepartmentInfoHolderProps = {
    department: Department;
    setSelectedTeachersIds: React.Dispatch<React.SetStateAction<number[]>>;
    teacherIds: number[];
    alreadyExistingTeachersIds: number[];
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

    const onClick = (id: number) => {
        if(props.teacherIds.includes(id)){
            const newTeacherIds = props.teacherIds.filter(t => t !== id);
            props.setSelectedTeachersIds([ ...newTeacherIds ]);
        } else{
            props.setSelectedTeachersIds([ ...props.teacherIds, id ]);
        }
    }
    const renderedTeachers = !teachers ? <LoadingOutlined /> : teachers.map(t => {
        const isActive = props.teacherIds.includes(t.id);
        return (
            <DepartmentInfoTeacherListElementWrapper id={t.id} 
                name={`${t.firstName} ${t.lastName}`} 
                photoUrl={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${t.photoUrl}`}
                isAlreadySelected={props.alreadyExistingTeachersIds.includes(t.id)}
                isActive={isActive}
                onClick={onClick}/>
        )
    })
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
                    {renderedTeachers}
                </div>
            )}
        </div>
    )   
}