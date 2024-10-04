import "./AddTeacherListItem.scss"

type AddTeacherListItemProps = {
    setAddTeacherModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddTeacherListItem(props: AddTeacherListItemProps){
    return (
        <div onClick={() => props.setAddTeacherModalVisibility(true)} className="add-teacher-list-element">
            +
        </div>
    )   
}