import { useContext, useEffect, useState } from "react";
import "./ProcessorPage.scss"
import { ReviewerApiContext } from "../../app/layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";
import QueueSizeChart from "./queue-size-chart/QueueSizeChart";
import AnalystListElement from "../../app/common/components/analyst-list-element/AnalystListElement";
import { Analyst } from "../../models/Analyst";
import AddAnalystButton from "./add-analyst-button/AddAnalystButton";

export default function ProcessorPage(){
    const [isAddAnalystModalOpen, setAddAnalystModalOpen] = useState(false);
    const [analysts, setAnalysts] = useState<Analyst[] | null>(null);
    const reviewerApi = useContext(ReviewerApiContext);

    useEffect(() => {
        if (!isAddAnalystModalOpen){
            // reviewerApi.getAll()
            // .then(res => {
            //     if(res){
            //         setAnalysts([ ...res ])
            //     } else {
            //         setAnalysts(null)
            //     };
            // })
        }
         
    }, [isAddAnalystModalOpen])

    return (
        <main className="page processor-page">
            <h1 className="title">Processor</h1>
            <QueueSizeChart />
            <div className="analysts-holder">
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                <AnalystListElement key={1} analyst={{id: 1, name: "sada", processingInterval: 1000, isStopped: false}}/>
                {analysts == null ? <LoadingOutlined /> : analysts
                                                                .map(a => {
                                                                    return (
                                                                        <AnalystListElement key={a.id} analyst={a}/>
                                                                    )
                                                                })
                }
                <AddAnalystButton setAddAnalystModalOpen={setAddAnalystModalOpen}/>
            </div>
            {/* <AddReviewerModal isOpen={isAddReviewerModalOpen} closeHandler={() => setAddReviewerModalOpen(false)}/> */}
        </main>
    )   
}