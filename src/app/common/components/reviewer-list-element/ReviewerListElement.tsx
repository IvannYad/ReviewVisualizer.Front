import "./ReviewerListElement.scss"
import { Button, Input, Slider, TimePicker } from "antd";
import { DeleteOutlined, EditOutlined, SendOutlined } from "@ant-design/icons";
import { Reviewer } from "../../../../models/Reviewer";
import { ApisContext, NotificationApiContext } from "../../../layout/app/App";
import { MouseEventHandler, useContext, useState } from "react";
import { Teacher } from "../../../../models/Teacher";
import ChooseTeachersForReviewModal from "../../modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal";
import AddTeacherButton from "./add-teacher-button/AddTeacherButton";
import TeacherListElementWrapper from "./teacher-list-element-wrapper/TeacherListElementWrapper";
import { GeneratorType, generatorTypeLabels } from "../../../../models/GeneratorType";
import dayjs from "dayjs";
import cronValidate from "cron-validate"
import { useNavigate } from "react-router";

type ReviewerListElementProps = {
    reviewer: Reviewer
    onDelete: (reviewerId: number, type: GeneratorType) => void,
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

function isValidHangfireCron(expression: string): boolean {
    const result = cronValidate(expression, {
        preset: 'default', // for 5-field: minute hour day month day-of-week
        override: {
            useSeconds: true, // Hangfire supports 6-field (with seconds)
        },
    });

    return result.isValid();
}

export default function ReviewerListElement(props: ReviewerListElementProps){
    const [teachers, setTeachers] = useState<Teacher[]>(props.reviewer.teachers);
    const [isChooseTeacherModalOpen, setChooseTeacherModalOpen] = useState(false);
    const [delay, setDelay] = useState<string | null>(null);
    const [cronExpression, setCronExpression] = useState<string>();
    const [timeCronErrorMessage, setTimeCronErrorMessage] = useState<string | undefined>();
    const teachingQualityRange = [props.reviewer.teachingQualityMinGrage, props.reviewer.teachingQualityMaxGrage];
    const studentSupportRange = [props.reviewer.studentsSupportMinGrage, props.reviewer.studentsSupportMaxGrage];
    const communicationRange = [props.reviewer.communicationMinGrage, props.reviewer.communicationMaxGrage];
    const { reviewerApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)
    const navigate = useNavigate();

    const deleteTeacher = async (id: number) => {
        await reviewerApi.removeTeachers(props.reviewer.id, [id])
            .then((res) => {
                if (res) {
                    // If there is no teachers assigned to the reviewer, stop the reviewer.
                    const teachersWithoutDeleted = teachers.filter(t => !res.includes(t.id));
                    setTeachers([ ...teachersWithoutDeleted ]);
                }
            })
            .catch((error) => {
                if (error.status === 401){
                    navigate("/login");
                    return;
                } else if (error.status === 403){
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no access to delete teacher from "${generatorTypeLabels[props.reviewer.type]}" reviewer`,
                        className: "error-notification-box"
                    });
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                    message: `Unexpected error ocurred while deleting teacher from "${generatorTypeLabels[props.reviewer.type]}" reviewer`,
                    className: "error-notification-box"
                });
            });
    }

    const deleteReviewer = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        props.onDelete(props.reviewer.id, props.reviewer.type);
    };

    const onTimeChange = (_: dayjs.Dayjs, timeString: string | string[]) => {
        if (typeof timeString !== 'string') return;
        console.log(timeString);
        setDelay(timeString);
    }

    const onCronExpressionChange: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
        e.preventDefault();
        setCronExpression(e.target.value);
    }

    const handleErrorSendingReview = (error: any) => {
        if (error.status === 401){
            navigate("/login");
            return;
        } else if (error.status === 403){
            notificationAPi && notificationAPi["error"]({
                message: `You have no access to send "${generatorTypeLabels[props.reviewer.type]}" review`,
                className: "error-notification-box"
            });
            return;
        }

        notificationAPi && notificationAPi["error"]({
            message: `Unexpected error ocurred while sending "${generatorTypeLabels[props.reviewer.type]}" job for registration`,
            className: "error-notification-box"
        });
    }

    const sendReviewGeneration: MouseEventHandler<HTMLElement> = async (e) => {
        e.preventDefault();

        if (props.reviewer.type === GeneratorType.FIRE_AND_FORGET){
            await reviewerApi.generateFireAndForget(props.reviewer.id)
                .then(() => {
                    notificationAPi && notificationAPi.info({
                        message: "\"Fire And Forget\" job is sent for registration",
                        placement: "topLeft"
                    });
                })
                .catch(error => {
                    handleErrorSendingReview(error);
                })
            
            return;
        }

        if (props.reviewer.type === GeneratorType.DELAYED){
            if (delay === null){
                console.log("Cannot send review generation request because delay time is not specified");
                setTimeCronErrorMessage("Please specify delay time");
                return;
            }

            setTimeCronErrorMessage(undefined);
            await reviewerApi.generateDelayed(props.reviewer.id, delay)
                .then(() => {
                    notificationAPi && notificationAPi.info({
                        message: `"Delayed" job is sent for registration. Delay: ${delay}`,
                        placement: "topLeft"
                    });
                })
                .catch(error => {
                    handleErrorSendingReview(error);
                })
            
            return;
        }

        if (!cronExpression){
            console.log("Cannot send recurring review generation request because cron expression is not specified");
            setTimeCronErrorMessage("Please specify cron expression");
            return;
        }

        if (!isValidHangfireCron(cronExpression!)){
            console.log("Cannot send recurring review generation request because cron expression is not in correct format");
            setTimeCronErrorMessage("Cron expression is not in correct format");
            return;
        }

        setTimeCronErrorMessage(undefined);
        await reviewerApi.generateRecurring(props.reviewer.id, cronExpression)
            .then(() => {
                notificationAPi && notificationAPi.info({
                    message: `"Recurring" job is sent for registration. Cron expression: ${cronExpression}`,
                    placement: "topLeft"
                });
            })
            .catch(error => {
                handleErrorSendingReview(error);
            })
        
    }

    return (
        <div className="reviewer-list-element">
            <div className="info-holder-container">
                <div className="name-period-holder">
                    <div className="reviewer-type">{generatorTypeLabels[props.reviewer.type]}</div>
                    <div className="reviewer-name">{props.reviewer.name}</div>
                    {
                        props.reviewer.type === GeneratorType.DELAYED ?
                        <div className="time-holder">
                            Delay
                            <TimePicker onChange={onTimeChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} required={true}/>
                            <span className="error-message">{timeCronErrorMessage}</span>
                        </div> : (
                            props.reviewer.type === GeneratorType.RECURRING ?
                            <div className="time-holder">
                                Cron expression
                                <Input onChange={onCronExpressionChange} required={true}/>
                                <span className="error-message">{timeCronErrorMessage}</span>
                            </div> : <></>
                        )
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
                reviewerId={props.reviewer.id}
                reviewerType={props.reviewer.type}/>
        </div>
    )   
}