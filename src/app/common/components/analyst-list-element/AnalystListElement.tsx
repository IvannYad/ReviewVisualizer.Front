import { Button } from "antd";
import "./AnalystListElement.scss"
import { Analyst } from "../../../../models/Analyst";
import { useState } from "react";
import { CaretRightOutlined, DeleteOutlined, EditOutlined, PauseOutlined } from "@ant-design/icons";

type AnalystListElementProps = {
    analyst: Analyst;
}

export default function AnalystListElement(props: AnalystListElementProps){
    const [isStopped, setIsStopped] = useState(props.analyst.isStopped);

    const startReviewer = () => {
        // reviewerApi.startReviewer(props.reviewer.id)
        //     .then(res => {
        //         if (typeof res == "boolean" && res) setIsStopped(false);
        //     })
    }

    const stopReviewer = () => {
        // reviewerApi.stopReviewer(props.reviewer.id)
        //     .then(res => {
        //         if (typeof res == "boolean" && res) setIsStopped(true);
        //     })
    }

    const stopResumeButtonClass = isStopped ? "stopped-button" : "running-button";
    return (
        <div className="analyst-list-element">
            <div className="info-holder">
                <div className="analyst-name">{props.analyst.name}</div>
                <div className="processing-interval">{props.analyst.processingInterval} ms</div>
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
                <Button className="edit-button button">
                    <EditOutlined />
                </Button>
                <Button className="delete-button button">
                    <DeleteOutlined />
                </Button>
            </div>
        </div>
    )
}