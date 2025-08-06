import { Button, Modal } from "antd"
import "./ChooseTeachersForReviewModal.scss"
import DepartmentInfoHolder from "./department-info-holder/DepartmentInfoHolder"
import { useContext, useEffect, useState } from "react"
import { Department } from "../../../../models/Department";
import { ApisContext, NotificationApiContext } from "../../../layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";
import { Teacher } from "../../../../models/Teacher";
import { useNavigate } from "react-router";
import { GeneratorType, generatorTypeLabels } from "../../../../models/GeneratorType";

type ChooseTeachersForReviewModalProps = {
    isOpen: boolean;
    closeHandler: () => void;
    setTeachers: React.Dispatch<React.SetStateAction<Teacher[]>>;
    teachersAlreadyUnderReview: Teacher[];
    reviewerId: number;
    reviewerType: GeneratorType;
}

export default function ChooseTeachersForReviewModal(props: ChooseTeachersForReviewModalProps){
    const [selectedTeacherIds, setSelectedTeachersIds] = useState<number[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const { departmentApi, reviewerApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)
    const navigate = useNavigate();
    

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

    const addTeachersToReviewer: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void = async (e) => {
        e.preventDefault();
        await reviewerApi.addTeachers(props.reviewerId, selectedTeacherIds)
            .then(res => {
                if (res)
                    props.setTeachers([ ...props.teachersAlreadyUnderReview, ...res ]);
                close();
            })
            .catch(error => {
                if (error.status === 401){
                    navigate("/login");
                    return;
                } else if (error.status === 403){
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no access to add teacher to "${generatorTypeLabels[props.reviewerType]}" reviewer`,
                        className: "error-notification-box"
                    });
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                    message: `Unexpected error ocurred while adding teacher to "${generatorTypeLabels[props.reviewerType]}" reviewer`,
                    className: "error-notification-box"
                });
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