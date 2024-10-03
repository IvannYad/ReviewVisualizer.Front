import "./AddDepartmentListItem.scss"

type AddDepartmentListItemProps = {
    setAddDepartmentModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddDepartmentListItem(props: AddDepartmentListItemProps){
    return (
        <div onClick={() => props.setAddDepartmentModalVisibility(true)} className="add-department-list-element">
            +
        </div>
    )   
}