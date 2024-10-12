import { LoadingOutlined, TrophyOutlined } from "@ant-design/icons"
import "./TeacherRatingCard.scss"
import { useContext, useEffect, useState } from "react";
import { TeacherApiContext } from "../../../app/layout/app/App";

type TeacherRatingCardProps = {
    id?: number
}

type NumberWrapper = {
    value: number;
}
export default function TeacherRatingCard(props: TeacherRatingCardProps){
    const [highlight, setHighlight] = useState(false);
    const [globalRank, setGlobalRank] = useState<NumberWrapper>({ value: -1});
    const [departmentRank, setDepartmentRank] = useState<NumberWrapper>({ value: -1});
    const teacherApi = useContext(TeacherApiContext);

    const getGlobalRank = () => 
        teacherApi.getGlobalRank(props?.id ?? 0)
            .then(res => {
                if (res) {
                    setGlobalRank({ value: res });
                }
            });

    const getDepartmentRank = () => 
        teacherApi.getDepartmentRank(props?.id ?? 0)
            .then(res => {
                if (res) {
                    setDepartmentRank({ value: res });
                }
            });

    useEffect(() => {
        if (props?.id){
            getGlobalRank();
            getDepartmentRank();

            const intervalId = setInterval(() => {
                getDepartmentRank();
                getGlobalRank();
            }, 5000);

            return () => {
                clearInterval(intervalId);
            }
        };
    }, [props.id])

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 500);
        return () => {
            clearTimeout(timeout);
        };
    }, [globalRank, departmentRank])
    
    
    const globalRankRendered = globalRank.value === -1 ? <LoadingOutlined /> : (
        <>{globalRank.value === 1 ? (
            <text className={`${highlight ? "highlight": ""}`}>
                <TrophyOutlined /> {globalRank.value} <TrophyOutlined />
            </text>
        ) : <text className={`${highlight ? "highlight": ""}`}>{globalRank.value}</text>}</>
    );

    const departmentRankRendered = departmentRank.value === -1 ? <LoadingOutlined /> : (
        <>{departmentRank.value === 1 ? (
            <text className={`${highlight ? "highlight": ""}`}>
                <TrophyOutlined /> {departmentRank.value} <TrophyOutlined />
            </text>
        ) : <text className={`${highlight ? "highlight": ""}`}>{departmentRank.value}</text>}</>
    );
    
    return (
        <div className="teacher-rating-card">
            <div className="label"><text className="global-rank-text">Global rank: </text><text className="rank-number">{globalRankRendered}</text></div>
            <div className="label">Department rank: <text className="rank-number">{departmentRankRendered}</text></div>
        </div>
    )   
}