import "./ReviewerListElement.scss"
import { Button, Slider } from "antd";
import { CaretRightOutlined, DeleteOutlined, EditOutlined, PauseOutlined } from "@ant-design/icons";
import SmallTeacherListElement from "../small-teacher-list-element/SmallTeacherListElement";
import { Reviewer } from "../../../../models/Reviewer";
import { ReviewerApiContext } from "../../../layout/app/App";
import { useContext, useState } from "react";
import { Teacher } from "../../../../models/Teacher";
import ChooseTeachersForReviewModal from "../../modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal";
import AddTeacherButton from "./add-teacher-button/AddTeacherButton";
import TeacherListElementWrapper from "./teacher-list-element-wrapper/TeacherListElementWrapper";

type ReviewerListElementProps = {
    reviewer: Reviewer
}

function getGradientColor(percentage: number) {
    const endColor = [40, 255, 10];
    const startColor = [255, 40, 10];
  
    const midColor = startColor.map((start, i) => {
      const end = endColor[i];
      const delta = end - start;
      return (start + delta * percentage).toFixed(0);
    });
  
    return `rgb(${midColor.join(',')})`;
}

export default function ReviewerListElement(props: ReviewerListElementProps){
    const [teachers, setTeachers] = useState<Teacher[]>(props.reviewer.teachers);
    const [isStopped, setIsStopped] = useState(props.reviewer.isStopped);
    const [isChooseTeacherModalOpen, setChooseTeacherModalOpen] = useState(false);
    const teachingQualityRange = [props.reviewer.teachingQualityMinGrage, props.reviewer.teachingQualityMaxGrage];
    const studentSupportRange = [props.reviewer.studentsSupportMinGrage, props.reviewer.studentsSupportMaxGrage];
    const communicationRange = [props.reviewer.communicationMinGrage, props.reviewer.communicationMaxGrage];
    const reviewerApi = useContext(ReviewerApiContext);

    const startReviewer = () => {
        reviewerApi.startReviewer(props.reviewer.id)
            .then(res => {
                if (typeof res == "boolean" && res) setIsStopped(false);
            })
    }

    const stopReviewer = () => {
        reviewerApi.stopReviewer(props.reviewer.id)
            .then(res => {
                if (typeof res == "boolean" && res) setIsStopped(true);
            })
    }

    const deleteFunc = (id: number) => {
        reviewerApi.removeTeachers(props.reviewer.id, [id])
            .then((res) => {
                if (res) {
                    const teachersWithoutDeleted = teachers.filter(t => !res.includes(t.id));
    
                    setTeachers([ ...teachersWithoutDeleted ]);
                }
            })
            .catch((error) => console.log(error));
    }

    const stopResumeButtonClass = teachers.length < 1 ? "disabled-button" : isStopped ? "stopped-button" : "running-button";
    
    return (
        <div className="reviewer-list-element">
            <div className="info-holder-container">
                <div className="name-period-holder">
                    <div className="reviewer-name">{props.reviewer.name}</div>
                    <div className="generation-period">Period: {props.reviewer.reviewGenerationFrequensyMiliseconds} ms</div>
                </div>
                <div className="grades-holder">
                    <div>
                        Teaching Quality range
                        <Slider
                        disabled
                        range
                        defaultValue={teachingQualityRange}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(teachingQualityRange[0]  / 100)} 0%, ${getGradientColor(
                                teachingQualityRange[1]  / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                    <div>
                        Student Support range
                        <Slider
                        disabled
                        range
                        defaultValue={studentSupportRange}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(studentSupportRange[0] / 100)} 0%, ${getGradientColor(
                                studentSupportRange[1] / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                    <div>
                        Communication range
                        <Slider
                        disabled
                        range
                        defaultValue={communicationRange}
                        styles={{
                            track: {
                            background: 'transparent',
                            },
                            tracks: {
                            background: `linear-gradient(to right, ${getGradientColor(communicationRange[0] / 100)} 0%, ${getGradientColor(
                                communicationRange[1] / 100,
                            )} 100%)`,
                            },
                        }}
                    />
                    </div>
                </div>
            </div>
            <div className="teachers-list-container">
                <div className="teachers-list-holder">
                    {teachers && teachers.map(t => (
                        <TeacherListElementWrapper id={t.id} name={`${t.firstName} ${t.lastName}`} 
                            photoUrl={`${process.env.REACT_APP_IMAGE_SERVER_URL!}/${t.photoUrl}`} deleteFunc={deleteFunc}/>
                    ))}
                    <AddTeacherButton setAddTeacherModalVisibility={setChooseTeacherModalOpen}/>
                </div>
            </div>
            <div className="buttons-container">
                <Button disabled={teachers.length < 1}
                    className={`${stopResumeButtonClass} button`} onClick={(e) => {
                    e.preventDefault();
                    if (isStopped){
                        startReviewer();
                    } else{
                        stopReviewer();
                    }
                }}>
                    {isStopped ? <CaretRightOutlined /> : <PauseOutlined />}
                </Button>
                <Button className="edit-button button">
                    <EditOutlined />
                </Button>
                <Button className="delete-button button">
                    <DeleteOutlined />
                </Button>
            </div>
            <ChooseTeachersForReviewModal isOpen={isChooseTeacherModalOpen}
                closeHandler={() => setChooseTeacherModalOpen(false)}
                setTeachers={setTeachers}
                teachersAlreadyUnderReview={teachers}
                reviewerId={props.reviewer.id}/>
        </div>
    )   
}