import { LoadingOutlined, StarOutlined, TrophyOutlined } from "@ant-design/icons"
import "./DepartmentDetailsPage.scss"
import TeacherListElement from "../../app/common/components/teacher-list-element/TeacherListElement"
import AddTeacherListItem from "../../app/common/components/add-teacher-list-item/AddTeacherListItem"
import { useContext, useEffect, useState } from "react";
import { DepartmentApiContext, TeacherApiContext } from "../../app/layout/app/App";
import { useSearchParams } from "react-router-dom";
import AddTeacherModal from "../../app/common/modals/add-teacher-modal/AddTeacherModal";
import { Teacher } from "../../models/Teacher";
import { Department } from "../../models/Department";

export default function DepartmentDetailsPage(){
    const [searchParams, _] = useSearchParams();
    const [isAddTeacherModalOpen, setAddTeacherModalOpen] = useState(false);
    const [dept, setDept] = useState<Department>();
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const teacherApi = useContext(TeacherApiContext);
    const departmentApi = useContext(DepartmentApiContext);

    const renderedTeachers = teachers
        .map(t => {
            const imgUrl = `${process.env.REACT_APP_IMAGE_SERVER_URL!}/${t.photoUrl}`;
            return (
                <TeacherListElement key={t.id} id={t.id} name={t.firstName + " " + t.lastName} photoUrl={imgUrl}/>
            )
        })

    useEffect(() => {
        const id = +(searchParams.get("id") ?? 0);
        departmentApi.get(id).then(res => {
            if (res){
                setDept({ ...res });
            }
        })
    }, [])

    useEffect(() => {
        if (!isAddTeacherModalOpen && dept)
         teacherApi.getAllForDepartment(dept.id)
             .then(res => {
                 if (res)
                     setTeachers(res);
             })
     }, [isAddTeacherModalOpen, dept])

    return (
        <main className="page department-details-page">
           <div className="department-info-holder">
                <div className="main-info">
                    <div className="dept-icon-holder">
                        {dept ? <img className="dept-icon" src={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${dept?.logoUrl}`} alt={dept.name}/>
                            : <LoadingOutlined />}
                    </div>
                    <div className="text-holder dept-name">{dept?.name ?? <LoadingOutlined/>}</div>
                    <div className="text-holder"><StarOutlined /> RATING : {dept?.rating ?? <LoadingOutlined/>} <StarOutlined /></div>
                </div>
                <div className="teachers-list">
                    {teachers ? renderedTeachers : <LoadingOutlined />}
                    <AddTeacherListItem setAddTeacherModalVisibility={setAddTeacherModalOpen}/>
                    {dept ? <AddTeacherModal isOpen={isAddTeacherModalOpen} closeHandler={() => setAddTeacherModalOpen(false)} departmentId={dept.id}/> : null}
                </div>
           </div>
        </main>
    )   
}