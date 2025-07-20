import "./ReviewerListElement.scss"
import { Button, Input, Slider, TimePicker } from "antd";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { Reviewer } from "../../../../models/Reviewer";
import { ReviewerApiContext } from "../../../layout/app/App";
import { MouseEventHandler, useContext, useState } from "react";
import { Teacher } from "../../../../models/Teacher";
import ChooseTeachersForReviewModal from "../../modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal";
import AddTeacherButton from "./add-teacher-button/AddTeacherButton";
import TeacherListElementWrapper from "./teacher-list-element-wrapper/TeacherListElementWrapper";
import { GeneratorType, generatorTypeLabels } from "../../../../models/GeneratorType";
import dayjs from "dayjs";

type ReviewerListElementProps = {
    reviewer: Reviewer
    onDelete: (reviewerId: number) => void,
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
    const [isChooseTeacherModalOpen, setChooseTeacherModalOpen] = useState(false);
    const [timeState, setTime] = useState<dayjs.Dayjs | null>(null);
    const teachingQualityRange = [props.reviewer.teachingQualityMinGrage, props.reviewer.teachingQualityMaxGrage];
    const studentSupportRange = [props.reviewer.studentsSupportMinGrage, props.reviewer.studentsSupportMaxGrage];
    const communicationRange = [props.reviewer.communicationMinGrage, props.reviewer.communicationMaxGrage];
    const reviewerApi = useContext(ReviewerApiContext);

    const deleteTeacher = (id: number) => {
        reviewerApi.removeTeachers(props.reviewer.id, [id])
            .then((res) => {
                if (res) {
                    // If there is no teachers assigned to the reviewer, stop the reviewer.
                    const teachersWithoutDeleted = teachers.filter(t => !res.includes(t.id));
                    setTeachers([ ...teachersWithoutDeleted ]);
                }
            })
            .catch((error) => console.log(error));
    }

    const deleteReviewer = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        props.onDelete(props.reviewer.id);
    };

    const onTimeChange = (time: dayjs.Dayjs, timeString: string | string[]) => {
        setTime(time);
    }

    const sendReviewGeneration: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault();

        if (props.reviewer.type === GeneratorType.FIRE_AND_FORGET){
            await reviewerApi.generateFireAndForget(props.reviewer.id);
            return;
        }

        if (timeState === null){
            console.log("Cannot send review generation request because time is not specified");
            return;
        }

        if (props.reviewer.type === GeneratorType.DELAYED){
            await reviewerApi.generateDelayed(props.reviewer.id, timeState);
            return;
        }

        await reviewerApi.generateRecurring(props.reviewer.id, timeState);
    }

    return (
        <div className="reviewer-list-element">
            <div className="info-holder-container">
                <div className="name-period-holder">
                    <div className="reviewer-type">{generatorTypeLabels[props.reviewer.type]}</div>
                    <div className="reviewer-name">{props.reviewer.name}</div>
                    {
                        props.reviewer.type !== GeneratorType.FIRE_AND_FORGET ?
                        <div className="time-holder">
                            {props.reviewer.type === GeneratorType.DELAYED ? "Delay" : "Inteval"}
                            <TimePicker onChange={onTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} required={true}/>
                        </div> :
                        <></>
                    }
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
                        <TeacherListElementWrapper key={t.id} id={t.id} name={`${t.firstName} ${t.lastName}`} 
                            photoUrl={`${process.env.REACT_APP_IMAGE_SERVER_URL!}/${t.photoUrl}`} deleteFunc={deleteTeacher}/>
                    ))}
                    <AddTeacherButton setAddTeacherModalVisibility={setChooseTeacherModalOpen}/>
                </div>
            </div>
            <div className="buttons-container">
                <Button disabled={teachers.length < 1}
                    className="send-button button" onClick={sendReviewGeneration}>
                    {props.reviewer.type === GeneratorType.RECURRING ? <EditOutlined /> : <SendOutlined />}
                </Button>
                <Button className="delete-button button" onClick={deleteReviewer}>
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