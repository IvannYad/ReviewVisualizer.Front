import BoardOfFameCard from "../../app/common/components/board-of-fame-card/BoardOfFameCard"
import RatingChart from "../../app/common/components/rating-chart/RatingChart"
import { RatingOptions } from "../../models/RatingOptions"
import "./MainPage.scss"

export default function MainPage(){
    return (
        <main className="page main-page">
            <div className="board-of-fame">
                <div className="board-of-fame-header">
                    Board of fame
                </div>
                <div className="board-of-fame-body">
                    <BoardOfFameCard entity="department"/>
                    <BoardOfFameCard entity="teacher"/>
                </div>
            </div>
            <div className="rating-charts-holder">
                <RatingChart scope={RatingOptions.Department_Global}/>
                <RatingChart scope={RatingOptions.Teacher_Global}/>
            </div>
        </main>
    )   
}