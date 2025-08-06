import { useContext, useEffect, useState } from "react";
import ReviewerListElement from "../../app/common/components/reviewer-list-element/ReviewerListElement"
import AddReviewerModal from "../../app/common/modals/add-reviewer-modal/AddReviewerModal"
import "./GeneratorPage.scss"
import AddReviewerButton from "./add-reviewer-button/AddReviewerButton";
import { ApisContext, NotificationApiContext } from "../../app/layout/app/App";
import { Reviewer } from "../../models/Reviewer";
import { LoadingOutlined } from "@ant-design/icons";
import ChooseTeachersForReviewModal from "../../app/common/modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal";
import { useNavigate } from "react-router";
import { GeneratorType, generatorTypeLabels } from "../../models/GeneratorType";


export default function GeneratorPage(){
    const [isAddReviewerModalOpen, setAddReviewerModalOpen] = useState(false);
    const [reviewers, setReviewers] = useState<Reviewer[] | null>(null);
    const { reviewerApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)
    const navigate = useNavigate();
    

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

    const deleteReviewer = (reviewerId: number, type: GeneratorType) => {
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
            .catch(error => {
                if (error.status === 401){
                    navigate("/login");
                    return;
                } else if (error.status === 403){
                    notificationAPi && notificationAPi["error"]({
                        message: `You have no access to delete "${generatorTypeLabels[type]}" reviewer`,
                        className: "error-notification-box"
                    });
                    return;
                }

                notificationAPi && notificationAPi["error"]({
                        message: `Unexpected error ocurred while delete "${generatorTypeLabels[type]}" reviewer`,
                        className: "error-notification-box"
                    });
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