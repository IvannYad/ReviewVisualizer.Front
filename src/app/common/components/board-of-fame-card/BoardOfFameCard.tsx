import { useContext, useEffect, useState } from "react";
import "./BoardOfFameCard.scss"
import { ApisContext } from "../../../layout/app/App";
import { LoadingOutlined, StarOutlined } from "@ant-design/icons";

type BoardOfFameCardProps = {
    entity: 'teacher' | 'department';
}

type Entity = {
    name: string;
    photoUrl: string;
    rating: number;
}

export default function BoardOfFameCard(props: BoardOfFameCardProps){
    const { departmentApi, teacherApi } = useContext(ApisContext);
    const [highlight, setHighlight] = useState(false);
    const [entity, setEntity] = useState<Entity>();

    const getEntity = () => {
        if (props.entity === 'department'){
            departmentApi.getBest()
                .then(res => {
                    if (res){
                        const entity: Entity = { name: res.name, photoUrl: res.logoUrl, rating: res.rating };
                        setEntity(entity);
                    }

                    setInterval(() => {
                        getEntity();
                    }, 5000);
                })
        } else{
            teacherApi.getBest()
                .then(res => {
                    if (res){
                        const entity: Entity = { name: `${res.firstName} ${res.lastName}`, photoUrl: res.photoUrl, rating: res.rating };
                        setEntity(entity);
                    }

                    setInterval(() => {
                        getEntity();
                    }, 5000);
                })
        }
    };

    useEffect(() => {
        getEntity();
    }, [props.entity])

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 500);
        return () => clearTimeout(timeout);
    }, [entity])

    const customClass = props.entity === 'teacher' ? "teacher-card" : "department-card";
    return (
        <div className={`board-of-fame-card ${customClass}`}>
            <div className="teacher-icon-holder">
                <div className="circle-border">
                    {entity ? <img className="teacher-icon" src={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${entity.photoUrl}`} alt={entity.name}/>
                            : <LoadingOutlined />}
                </div>
            </div>
            <div className="name-holder">
                {entity ? entity.name : <LoadingOutlined />}
            </div>
            <div className="rating-holder">
                <StarOutlined />
                    RATING : {entity ? <text className={`${highlight ? "highlight": ""}`}>{entity.rating ?? "N/A"}</text>: <LoadingOutlined/>}
                <StarOutlined />
            </div>
        </div>
    )
}