import { useContext, useEffect, useState } from "react";
import ReviewerListElement from "../../app/common/components/reviewer-list-element/ReviewerListElement"
import AddReviewerModal from "../../app/common/modals/add-reviewer-modal/AddReviewerModal"
import "./GeneratorPage.scss"
import AddReviewerButton from "./add-reviewer-button/AddReviewerButton";
import { ReviewerApiContext } from "../../app/layout/app/App";
import { Reviewer } from "../../models/Reviewer";
import { LoadingOutlined } from "@ant-design/icons";
import ChooseTeachersForReviewModal from "../../app/common/modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal";


export default function GeneratorPage(){
    const [isAddReviewerModalOpen, setAddReviewerModalOpen] = useState(false);
    const [reviewers, setReviewers] = useState<Reviewer[] | null>(null);
    const reviewerApi = useContext(ReviewerApiContext);

    useEffect(() => {
        if (!isAddReviewerModalOpen){
            reviewerApi.getAll()
            .then(res => {
                if(res){
                    setReviewers([ ...res ])
                } else {
                    setReviewers(null)
                };
            })
        }
         
    }, [isAddReviewerModalOpen])

    const deleteReviewer = (reviewerId: number) => {
        reviewerApi
            .remove(reviewerId)
            .then(success => {
                if(success){
                    reviewerApi.getAll()
                    .then(res => {
                        if(res){
                            setReviewers([ ...res ])
                        } else {
                            setReviewers(null)
                        };
                    }) 
                }
            })
    }

    return (
        <main className="page generator-page">
           <h1 className="title">Generator</h1>
           <div className="reviewers-holder">
                {reviewers == null ? <LoadingOutlined /> : reviewers
                                                                .map(t => {
                                                                    return (
                                                                        <ReviewerListElement key={t.id} reviewer={t} onDelete={deleteReviewer}/>
                                                                    )
                                                                })
                }
                <AddReviewerButton setAddReviewerModalOpen={setAddReviewerModalOpen}/>
           </div>
           <AddReviewerModal isOpen={isAddReviewerModalOpen} closeHandler={() => setAddReviewerModalOpen(false)}/>
        </main>
    )   
}