import ReviewerListElement from "../../app/common/components/reviewer-list-element/ReviewerListElement"
import ChooseTeachersForReviewModal from "../../app/common/modals/choose-teachers-for-review-modal/ChooseTeachersForReviewModal"
import "./GeneratorPage.scss"


export default function GeneratorPage(){
    return (
        <main className="page generator-page">
           <h1 className="title">Generator</h1>
           <div className="reviewers-holder">
                <ReviewerListElement id={1} name="sdfsd" reviewGenerationFrequensyMiliseconds={10}
                    studentsSupportMinGrage={20} studentsSupportMaxGrage={30}
                    communicationMinGrage={89} communicationMaxGrage={93}
                    teachingQualityMinGrage={10} teachingQualityMaxGrage={40}
                    isStopped={false}
                    teachers={[]}/>
           </div>
        </main>
    )   
}