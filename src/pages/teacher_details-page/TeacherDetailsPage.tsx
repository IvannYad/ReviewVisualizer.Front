import { useContext, useEffect, useState } from "react";
import { Teacher } from "../../models/Teacher";
import "./TeacherDetailsPage.scss"
import { useNavigate, useSearchParams } from "react-router-dom";
import TeacherInfoCard from "./teacher-info-card/TeacherInfoCard";
import TeacherRatingCard from "./teacher-rating-card/TeacherRatingCard";
import GradesChart from "../../app/common/components/grades-chart/GradesChart";
import { GradeCatetory } from "../../api/ITeachersApi";
import { LoadingOutlined } from "@ant-design/icons";
import DeleteButton from "../../app/common/components/delete-button/DeleteButton";
import { ApisContext, NotificationApiContext } from "../../app/layout/app/App";

export default function TeacherDetailsPage(){
    const [searchParams, _] = useSearchParams();
    const [teacher, setTeacher] = useState<Teacher>();
    const [departmentId, setDepartmentId] = useState<number>();
    const { teacherApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)
    const navigate = useNavigate();
   
    useEffect(() => {
        const id = +(searchParams.get("id") ?? 0);
        teacherApi.get(id).then(res => {
            if (res){
                setTeacher({ ...res });
                setDepartmentId(res.departmentId);
            }
        })
    }, [])

    const deleteTeacher = async () => {
        await teacherApi
            .remove(teacher!.id)
            .then(res => {
                if(res){
                    window.location.replace(`/department_details?id=${departmentId}`);
                }
            })
            .catch(e => {
                if (e.status === 401){
                    navigate("/login");
                    return;
                } else if (e.status === 403){
                    console.log("notification api: " + notificationAPi)
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no "Analyst" access to perform following operation`,
                        className: "error-notification-box"
                    });
                    
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                        message: `Unexpected error ocurred while verifying creating teacher`,
                        className: "error-notification-box"
                    });
            });
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