import "./MainInfoCard.scss";
import { useContext, useEffect, useState } from "react";
import { Department } from "../../../models/Department";
import { LoadingOutlined, StarOutlined } from "@ant-design/icons";
import { ApisContext } from "../../../app/layout/app/App";

type MainInfoCardProps = {
    departmentId?: number
}

export default function MainInfoCard(props: MainInfoCardProps){
    const [highlight, setHighlight] = useState(false);
    const [department, setDepartment] = useState<Department>();
    const { departmentApi } = useContext(ApisContext);
   
    const getDepartment = () => {
        departmentApi.get(props.departmentId!).then(res => {
            if (res){
                setDepartment({ ...res });
            }
        })
    };

    useEffect(() => {
        if (props?.departmentId){
            getDepartment();

            const intervalId = setInterval(() => {
                getDepartment();
            }, 5000);

            return () => {
                clearInterval(intervalId);
            }
        };
    }, [props.departmentId])

    useEffect(() => {
        setHighlight(true);
        const timeout = setTimeout(() => setHighlight(false), 500);
        return () => clearTimeout(timeout);
    }, [department])

    return (
        <div className="main-info">
            <div className="dept-icon-holder">
                {department ? <img className="dept-icon" src={`${process.env.REACT_APP_IMAGE_SERVER_URL}/${department?.logoUrl}`} alt={department.name}/>
                    : <LoadingOutlined />}
            </div>
            {department ? (
                <>
                    <div className="text-holder dept-name">{department?.name ?? <LoadingOutlined/>}</div>
                    <div className="text-holder">
                        <StarOutlined />
                            RATING : <text className={`${highlight ? "highlight": ""}`}>{department.rating ?? "N/A"}</text> 
                        <StarOutlined />
                    </div>
                </>
            ) : <LoadingOutlined />}
        </div>
    )   
}