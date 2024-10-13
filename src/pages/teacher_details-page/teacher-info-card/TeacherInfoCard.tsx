import "./TeacherInfoCard.scss"
import { AcademicDegree, AcademicRank, Teacher } from "../../../models/Teacher";
import { LoadingOutlined, StarOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { TeacherApiContext } from "../../../app/layout/app/App";

type TeacherInfoCardProps = {
    teacherId?: number
}

export default function TeacherInfoCard(props: TeacherInfoCardProps){
    const [highlight, setHighlight] = useState(false);
    const [teacher, setTeacher] = useState<Teacher>();
    const teacherApi = useContext(TeacherApiContext);
   
    const getTeacher = () => {
        teacherApi.get(props.teacherId!).then(res => {
            if (res){
                setTeacher({ ...res });
            }
        })
    };

    useEffect(() => {
        if (props?.teacherId){
            getTeacher();

            const intervalId = setInterval(() => {
                getTeacher();
            }, 5000);

            return () => {
                clearInterval(intervalId);
            }
        };
    }, [props.teacherId])

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 500);
        return () => clearTimeout(timeout);
    }, [teacher])

    const fullName = `${teacher?.firstName} ${teacher?.lastName}`;
    return (
        <div className="teacher-info-card">
            <div className="photo-rating-info">
                <div className="teacher-icon-holder">
                    {props.teacherId ? <img className="teacher-icon" src={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${teacher?.photoUrl}`} alt={fullName}/>
                        : <LoadingOutlined />}
                </div>
                <div className="text-holder">
                    <StarOutlined />
                        RATING : {teacher ? <text className={`${highlight ? "highlight": ""}`}>{teacher.rating ?? "N/A"}</text>: <LoadingOutlined/>}
                    <StarOutlined />
                </div>
            </div>
            <div className="other-info">
                {!teacher ? <LoadingOutlined /> : (
                    <>
                        <div className="text-holder name">{fullName}</div>
                        <div className="label">Academic degree: <text className="text-holder">{AcademicDegree[teacher.academicDegree]}</text></div>
                        <div className="label">Academic rank: <text className="text-holder">{AcademicRank[teacher.academicRank]}</text></div>
                    </>
                )}
            </div>
        </div>
    )   
}