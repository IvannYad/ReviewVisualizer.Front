import { Button } from "antd";
import "./AnalystListElement.scss"
import { Analyst } from "../../../../models/Analyst";
import { useContext, useState } from "react";
import { CaretRightOutlined, DeleteOutlined, PauseOutlined } from "@ant-design/icons";
import { ApisContext } from "../../../layout/app/App";

type AnalystListElementProps = {
    analyst: Analyst;
    onDelete: (reviewerId: number) => void;
}

export default function AnalystListElement(props: AnalystListElementProps){
    const [isStopped, setIsStopped] = useState(props.analyst.isStopped);
    const { analystApi } = useContext(ApisContext);

    const startReviewer = () => {
        analystApi.startAnalyst(props.analyst.id)
            .then(res => {
                if (typeof res == "boolean" && res) setIsStopped(false);
            })
    }

    const stopReviewer = () => {
        analystApi.stopAnalyst(props.analyst.id)
            .then(res => {
                if (typeof res == "boolean" && res) setIsStopped(true);
            })
    }

    const deleteAnalyst = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.preventDefault();
        props.onDelete(props.analyst.id);
    };

    const stopResumeButtonClass = isStopped ? "stopped-button" : "running-button";
    return (
        <div className="analyst-list-element">
            <div className="info-holder">
                <div className="analyst-name">{props.analyst.name}</div>
                <div className="processing-interval">{props.analyst.processingDurationMiliseconds} ms</div>
            </div>
            <div className="buttons-container">
                <Button className={`${stopResumeButtonClass} button`} onClick={(e) => {
                    e.preventDefault();
                    if (isStopped){
                        startReviewer();
                    } else{
                        stopReviewer();
                    }
                }}>
                    {isStopped ? <CaretRightOutlined /> : <PauseOutlined />}
                </Button>
                <Button className="delete-button button" onClick={deleteAnalyst}>
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    )
}