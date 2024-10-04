import { useContext, useEffect, useState } from "react";
import AddDepartmentListItem from "../../../app/common/components/add-department-list-item/AddDepartmentListItem"
import DepartmentListElement from "../../../app/common/components/department-list-element/DepartmentListElement"
import "./DepartmentsHolder.scss"
import AddDepartmentModal from "../../../app/common/modals/add-department-modal/AddDepartmentModal";
import { Department } from "../../../models/Department";
import { DepartmentApiContext } from "../../../app/layout/app/App";
import { LoadingOutlined } from "@ant-design/icons";

export default function DepartmentHolder(){
    const [isAddDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const api = useContext(DepartmentApiContext);

    const renderedDepartments = departments
        .map(d => {
            const imgUrl = `${process.env.REACT_APP_IMAGE_SERVER_URL!}/${d.logoUrl}`;
            return (
                <DepartmentListElement key={d.id} id={d.id} name={d.name} logoUrl={imgUrl}/>
            )
        })
    
    useEffect(() => {
       if (!isAddDepartmentModalOpen)
        api.getAll(null)
            .then(res => {
                if (res)
                    setDepartments(res);
            })
    }, [isAddDepartmentModalOpen]) 

    return (
        <div className="departments-holder">
            {renderedDepartments ? renderedDepartments : <LoadingOutlined />}
            <AddDepartmentListItem setAddDepartmentModalVisibility={setAddDepartmentModalOpen}/>
            <AddDepartmentModal isOpen={isAddDepartmentModalOpen} closeHandler={() => setAddDepartmentModalOpen(false)}/>
        </div>
    )   
}