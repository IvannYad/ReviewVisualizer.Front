import RatingChart from "../../app/common/components/rating-chart/RatingChart"
import { RatingOptions } from "../../models/RatingOptions"
import "./MainPage.scss"

export default function MainPage(){
    return (
        <main className="page main-page">
            <div className="board-of-fame">

            </div>
            <div className="rating-charts-holder">
                <RatingChart scope={RatingOptions.Department_Global}/>
                <RatingChart scope={RatingOptions.Teacher_Global}/>
            </div>
        </main>
    )   
}