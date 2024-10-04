import { TrophyOutlined } from "@ant-design/icons"
import "./DepartmentDetailsPage.scss"
import TeacherListElement from "../../app/common/components/teacher-list-element/TeacherListElement"
import AddTeacherListItem from "../../app/common/components/add-teacher-list-item/AddTeacherListItem"
import { useState } from "react";

export default function DepartmentDetailsPage(){
    const [isAddTeacherModalOpen, setAddTeacherModalOpen] = useState(false);

    return (
        <main className="page department-details-page">
           <div className="department-info-holder">
                <div className="main-info">
                    <div className="dept-icon-holder">
                        <img className="dept-icon" src={`/icons/departments_1c54442b-c16a-4ee1-a8e3-271827ea30b9_ITRE.png`} alt="test"/>
                    </div>
                    <div className="text-holder dept-name">IKNI</div>
                    <div className="text-holder"><TrophyOutlined /> RATING : 100 <TrophyOutlined /></div>
                </div>
                <div className="teachers-list">
                    <TeacherListElement />
                    <TeacherListElement />
                    <TeacherListElement />
                    <TeacherListElement />
                    <AddTeacherListItem setAddTeacherModalVisibility={setAddTeacherModalOpen}/>
                </div>
           </div>
        </main>
    )   
}