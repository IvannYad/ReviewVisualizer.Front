import { useContext, useEffect, useState } from "react";
import AddDepartmentListItem from "../../../app/common/components/add-department-list-item/AddDepartmentListItem"
import DepartmentListElement from "../../../app/common/components/department-list-element/DepartmentListElement"
import "./DepartmentsHolder.scss"
import AddDepartmentModal from "../../../app/common/modals/add-department-modal/AddDepartmentModal";
import { Department } from "../../../models/Department";
import { DepartmentApiContext } from "../../../app/layout/app/App";

export default function DepartmentHolder(){
    const [isAddDepartmentModalOpen, setAddDepartmentModalOpen] = useState(false);
    const [departments, setDepartments] = useState<Department[]>([]);
    const api = useContext(DepartmentApiContext);

    const renderedDepartments = departments
        .map(d => (
            <DepartmentListElement key={d.id} name={d.name} logoUrl={d.logoUrl}/>
        ))
    
    useEffect(() => {
       if (!isAddDepartmentModalOpen)
        api.getAll(null)
            .then(res => {
                if (res)
                    setDepartments(res);
            })
    }, []) 

    return (
        <div className="departments-holder">
            {renderedDepartments}
            <AddDepartmentListItem setAddDepartmentModalVisibility={setAddDepartmentModalOpen}/>
            <AddDepartmentModal isOpen={isAddDepartmentModalOpen} closeHandler={() => setAddDepartmentModalOpen(false)}/>
        </div>
    )   
}