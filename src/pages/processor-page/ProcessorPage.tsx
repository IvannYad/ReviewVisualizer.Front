import { useContext, useEffect, useState } from "react";
import "./ProcessorPage.scss"
import { AnalystApiContext } from "../../app/layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";
import QueueSizeChart from "./queue-size-chart/QueueSizeChart";
import AnalystListElement from "../../app/common/components/analyst-list-element/AnalystListElement";
import { Analyst } from "../../models/Analyst";
import AddAnalystButton from "./add-analyst-button/AddAnalystButton";
import AddAnalystModal from "../../app/common/modals/add-analyst-modal/AddAnalystModal";

export default function ProcessorPage(){
    const [isAddAnalystModalOpen, setAddAnalystModalOpen] = useState(false);
    const [analysts, setAnalysts] = useState<Analyst[] | null>(null);
    const analystApi = useContext(AnalystApiContext);

    useEffect(() => {
        if (!isAddAnalystModalOpen){
            analystApi.getAll()
            .then(res => {
                if(res){
                    setAnalysts([ ...res ])
                } else {
                    setAnalysts(null)
                };
            })
        }
         
    }, [isAddAnalystModalOpen])

    const deleteAnalyst = (analystId: number) => {
        analystApi
            .remove(analystId)
            .then(success => {
                if(success){
                    analystApi.getAll()
                    .then(res => {
                        if(res){
                            setAnalysts([ ...res ])
                        } else {
                            setAnalysts(null)
                        };
                    }) 
                }
            })
    }

    return (
        <main className="page processor-page">
            <h1 className="title">Processor</h1>
            <QueueSizeChart />
            <div className="analysts-holder">
                {analysts == null ? <LoadingOutlined /> : analysts
                                                                .map(a => {
                                                                    return (
                                                                        <AnalystListElement key={a.id} analyst={a} onDelete={deleteAnalyst}/>
                                                                    )
                                                                })
                }
                <AddAnalystButton setAddAnalystModalOpen={setAddAnalystModalOpen}/>
            </div>
            <AddAnalystModal isOpen={isAddAnalystModalOpen} closeHandler={() => setAddAnalystModalOpen(false)}/>
        </main>
    )   
}