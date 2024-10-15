import { useContext, useEffect, useState } from "react";
import { Teacher } from "../../models/Teacher";
import "./TeacherDetailsPage.scss"
import { useSearchParams } from "react-router-dom";
import { TeacherApiContext } from "../../app/layout/app/App";
import TeacherInfoCard from "./teacher-info-card/TeacherInfoCard";
import TeacherRatingCard from "./teacher-rating-card/TeacherRatingCard";
import GradesChart from "../../app/common/components/grades-chart/GradesChart";
import { GradeCatetory } from "../../api/ITeachersApi";
import { LoadingOutlined } from "@ant-design/icons";
import DeleteButton from "../../app/common/components/delete-button/DeleteButton";

export default function TeacherDetailsPage(){
    const [searchParams, _] = useSearchParams();
    const [teacher, setTeacher] = useState<Teacher>();
    const [departmentId, setDepartmentId] = useState<number>();
    const teacherApi = useContext(TeacherApiContext);
   
    useEffect(() => {
        const id = +(searchParams.get("id") ?? 0);
        teacherApi.get(id).then(res => {
            if (res){
                setTeacher({ ...res });
                setDepartmentId(res.departmentId);
            }
        })
    }, [])

    const deleteTeacher = () => {
        teacherApi
            .remove(teacher!.id)
            .then(res => {
                if(res){
                    window.location.replace(`/department_details?id=${departmentId}`);
                }
            })
    }

    return (
        <main className="page teacher-details-page">
           <div className="teacher-main-info-section">
                <TeacherInfoCard teacherId={teacher?.id}/>
                <TeacherRatingCard id={teacher?.id}/>
                {teacher ? <DeleteButton className={"main-delete-teacher-btn"} onClick={deleteTeacher}/> : <LoadingOutlined />}
           </div>
           <div className="grades-realtime-charts-section">
                {teacher ? (
                    <>
                        <GradesChart entityId={teacher.id} entity="teacher" gradeCategory={GradeCatetory.TeachingQuality}/>
                        <GradesChart entityId={teacher.id} entity="teacher" gradeCategory={GradeCatetory.StudentsSupport}/>
                        <GradesChart entityId={teacher.id} entity="teacher" gradeCategory={GradeCatetory.Communication}/>
                    </>
                ) : <LoadingOutlined />}
           </div>
           <div className="adjustable-chart-section">

           </div>
        </main>
    )   
}