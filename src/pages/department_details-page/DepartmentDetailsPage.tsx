import { LoadingOutlined } from "@ant-design/icons"
import "./DepartmentDetailsPage.scss"
import TeacherListElement from "../../app/common/components/teacher-list-element/TeacherListElement"
import AddTeacherListItem from "../../app/common/components/add-teacher-list-item/AddTeacherListItem"
import { useContext, useEffect, useState } from "react";
import { TeacherApiContext } from "../../app/layout/app/App";
import { useSearchParams } from "react-router-dom";
import AddTeacherModal from "../../app/common/modals/add-teacher-modal/AddTeacherModal";
import { Teacher } from "../../models/Teacher";
import MainInfoCard from "./main-info-card/MainInfoCard";
import GradesChart from "../../app/common/components/grades-chart/GradesChart";
import { GradeCatetory } from "../../api/ITeachersApi";

export default function DepartmentDetailsPage(){
    const [searchParams, _] = useSearchParams();
    const [isAddTeacherModalOpen, setAddTeacherModalOpen] = useState(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const teacherApi = useContext(TeacherApiContext);
    const deptId = +(searchParams.get("id") ?? 0);

    const renderedTeachers = teachers
        .map(t => {
            const imgUrl = `${process.env.REACT_APP_IMAGE_SERVER_URL!}/${t.photoUrl}`;
            return (
                <TeacherListElement key={t.id} id={t.id} name={t.firstName + " " + t.lastName} photoUrl={imgUrl}/>
            )
        })

    useEffect(() => {
        if (!isAddTeacherModalOpen)
         teacherApi.getAllForDepartment(deptId)
             .then(res => {
                 if (res)
                     setTeachers(res);
             })
     }, [isAddTeacherModalOpen])

    return (
        <main className="page department-details-page">
           <div className="department-info-holder">
                <MainInfoCard departmentId={deptId}/>
                <div className="teachers-list">
                    {teachers ? renderedTeachers : <LoadingOutlined />}
                    <AddTeacherListItem setAddTeacherModalVisibility={setAddTeacherModalOpen}/>
                    <AddTeacherModal isOpen={isAddTeacherModalOpen} closeHandler={() => setAddTeacherModalOpen(false)} departmentId={deptId}/>
                </div>
           </div>
           <div className="grades-realtime-charts-section">
                {deptId ? (
                    <>
                        <GradesChart entityId={deptId} entity="department" gradeCategory={GradeCatetory.TeachingQuality}/>
                        <GradesChart entityId={deptId} entity="department" gradeCategory={GradeCatetory.StudentsSupport}/>
                        <GradesChart entityId={deptId} entity="department" gradeCategory={GradeCatetory.Communication}/>
                    </>
                ) : <LoadingOutlined />}
           </div>
        </main>
    )   
}