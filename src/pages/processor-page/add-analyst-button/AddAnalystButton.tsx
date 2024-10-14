import "./AddAnalystButton.scss"

type AddAnalystButtonProps = {
    setAddAnalystModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddAnalystButton(props: AddAnalystButtonProps){
    return (
        <div onClick={() => props.setAddAnalystModalOpen(true)} className="add-analyst-button">
            +
        </div>
    )   
}