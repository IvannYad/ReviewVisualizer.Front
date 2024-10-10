import "./AddTeacherButton.scss"

type AddTeacherButtonProps = {
    setAddTeacherModalVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddTeacherButton(props: AddTeacherButtonProps){
    return (
        <div onClick={() => props.setAddTeacherModalVisibility(true)} className="add-teacher-button">
            +
        </div>
    )   
}