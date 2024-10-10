import "./AddReviewerButton.scss"

type AddReviewerButtonProps = {
    setAddReviewerModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddReviewerButton(props: AddReviewerButtonProps){
    return (
        <div onClick={() => props.setAddReviewerModalOpen(true)} className="add-reviewer-button">
            +
        </div>
    )   
}