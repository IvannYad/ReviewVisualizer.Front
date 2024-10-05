import "./ReviewerListElement.scss"
import { Teacher } from "../../../../models/Teacher";
import { Slider } from "antd";
import { CaretRightOutlined, DeleteOutlined, EditOutlined, PauseOutlined } from "@ant-design/icons";
import SmallTeacherListElement from "../small-teacher-list-element/SmallTeacherListElement";

type ReviewerListElementProps = {
    id: number;
    name: string;
    reviewGenerationFrequensyMiliseconds: number;
    teachingQualityMinGrage: number;
    teachingQualityMaxGrage: number;
    studentsSupportMinGrage: number;
    studentsSupportMaxGrage: number;
    communicationMinGrage: number;
    communicationMaxGrage: number;
    isStopped: boolean;
    teachers: Teacher[];
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
    const teachingQualityRange = [props.teachingQualityMinGrage, props.teachingQualityMaxGrage];
    const studentSupportRange = [props.studentsSupportMinGrage, props.studentsSupportMaxGrage];
    const communicationRange = [props.communicationMinGrage, props.communicationMaxGrage];
    const stopResumeButtonClass = props.isStopped ? "stopped-button" : "running-button";

    console.log(teachingQualityRange);
    console.log(studentSupportRange);
    console.log(communicationRange);
    
    return (
        <div className="reviewer-list-element">
            <div className="info-holder-container">
                <div className="name-period-holder">
                    <div className="reviewer-name">{props.name}</div>
                    <div className="generation-period">Period: {props.reviewGenerationFrequensyMiliseconds} ms</div>
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
                    <SmallTeacherListElement id={1} name="ASDSDS" photoUrl="/"/>
                    <SmallTeacherListElement id={1} name="ASDSDS" photoUrl="/"/>
                    <SmallTeacherListElement id={1} name="ASDSDS" photoUrl="/"/>
                    <SmallTeacherListElement id={1} name="ASDSDS" photoUrl="/"/>
                    
                </div>
            </div>
            <div className="buttons-container">
                <div className={`${stopResumeButtonClass} button`}>
                    {props.isStopped ? <CaretRightOutlined /> : <PauseOutlined />}
                </div>
                <div className="edit-button button">
                    <EditOutlined />
                </div>
                <div className="delete-button button">
                    <DeleteOutlined />
                </div>
            </div>
        </div>
    )   
}