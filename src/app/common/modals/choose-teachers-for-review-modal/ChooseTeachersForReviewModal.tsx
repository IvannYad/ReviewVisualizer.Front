import { Button, Modal } from "antd"
import "./ChooseTeachersForReviewModal.scss"
import DepartmentInfoHolder from "./department-info-holder/DepartmentInfoHolder"
import { useContext, useEffect, useState } from "react"
import { Department } from "../../../../models/Department";
import { DepartmentApiContext, TeacherApiContext } from "../../../layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";
import { Teacher } from "../../../../models/Teacher";

type ChooseTeachersForReviewModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>,
    teachersAlreadyUnderReview: Teacher[]
}

export default function ChooseTeachersForReviewModal(props: ChooseTeachersForReviewModalProps){
    const [selectedTeacherIds, setSelectedTeachersIds] = useState<number[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const teacherApi = useContext(TeacherApiContext);
    const departmentApi = useContext(DepartmentApiContext);

    useEffect(() => {
        departmentApi.getAll(null)
            .then(res => {
                if (res) setDepartments([ ...res ]);
            });
    }, []);

    
    const renderedDepartments = () => departments.map(d => {
        return (
            <DepartmentInfoHolder key={d.id} 
                department={d} 
                setSelectedTeachersIds={setSelectedTeachersIds}
                teacherIds={selectedTeacherIds}/>
        )
    })

    console.log(departments);
    console.log(departments.length);
    return (
        <Modal
            className="choose-teachers-for-review-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[
                <Button className="button create-button" type="primary" htmlType="submit" disabled={selectedTeacherIds.length <= 0}>Select</Button>,
                <Button className="button cancel-button" onClick={async (e) => props.closeHandler()}>Cancel</Button>
            ]}
            >
                {departments && departments.length > 0 ? renderedDepartments() : <LoadingOutlined /> }
        </Modal>
    )   
}