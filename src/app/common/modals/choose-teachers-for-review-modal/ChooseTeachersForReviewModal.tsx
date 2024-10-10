import { Button, Modal } from "antd"
import "./ChooseTeachersForReviewModal.scss"
import DepartmentInfoHolder from "./department-info-holder/DepartmentInfoHolder"
import { useContext, useEffect, useState } from "react"
import { Department } from "../../../../models/Department";
import { DepartmentApiContext, ReviewerApiContext } from "../../../layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";
import { Teacher } from "../../../../models/Teacher";

type ChooseTeachersForReviewModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    teachersAlreadyUnderReview: Teacher[];
    reviewerId: number;
}

export default function ChooseTeachersForReviewModal(props: ChooseTeachersForReviewModalProps){
    const [selectedTeacherIds, setSelectedTeachersIds] = useState<number[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const departmentApi = useContext(DepartmentApiContext);
    const reviewerApi = useContext(ReviewerApiContext);

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
                teacherIds={selectedTeacherIds}
                alreadyExistingTeachersIds={props.teachersAlreadyUnderReview.map(t => t.id)}/>
        )
    })

    const addTeachersToReviewer: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void = (e) => {
        e.preventDefault();
        reviewerApi.addTeachers(props.reviewerId, selectedTeacherIds)
            .then(res => {
                if (res)
                    props.setTeachers([ ...props.teachersAlreadyUnderReview, ...res ]);
                close();
            });
    }

    const close = () => {
        setSelectedTeachersIds([]);
        props.closeHandler();
    }

    return (
        <Modal
            className="choose-teachers-for-review-modal"
            open={props.isOpen}
            centered={true}
            cancelText="Cancel"
            footer={[
                <Button className="button create-button" 
                    type="primary" 
                    htmlType="submit" 
                    disabled={selectedTeacherIds.length <= 0}
                    onClick={addTeachersToReviewer}>Select</Button>,
                <Button className="button cancel-button" onClick={close}>Cancel</Button>
            ]}
            >
                {departments && departments.length > 0 ? renderedDepartments() : <LoadingOutlined /> }
        </Modal>
    )   
}