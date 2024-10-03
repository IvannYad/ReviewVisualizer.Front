import { useState } from "react";
import AddDepartmentListItem from "../../../app/common/components/add-department-list-item/AddDepartmentListItem"
import DepartmentListElement from "../../../app/common/components/department-list-element/DepartmentListElement"
import "./DepartmentsHolder.scss"
import AddDepartmentModal from "../../../app/common/modals/add-department-modal/AddDepartmentModal";

export default function DepartmentHolder(){
    const [isAddDepartmentModalOpen, setAddDepartmentModalOpen] = useState(true);

    return (
        <div className="departments-holder">
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <DepartmentListElement />
            <AddDepartmentListItem setAddDepartmentModalVisibility={setAddDepartmentModalOpen}/>
            <AddDepartmentModal isOpen={isAddDepartmentModalOpen} closeHandler={(e) => {
                e.preventDefault();
                setAddDepartmentModalOpen(false);
            }}/>
        </div>
    )   
}