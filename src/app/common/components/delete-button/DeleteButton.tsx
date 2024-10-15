import { DeleteOutlined } from "@ant-design/icons"
import "./DeleteButton.scss"

type DeleteButtonProps = {
    className: string,
    onClick: () => void
}

export default function DeleteButton(props: DeleteButtonProps){
    return (
        <div onClick={() => props.onClick()} className={`big-delete-btn ${props.className}`}>
            <DeleteOutlined />
        </div>
    )   
}