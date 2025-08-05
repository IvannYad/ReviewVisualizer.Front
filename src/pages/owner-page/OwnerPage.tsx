import { useContext, useState } from "react";
import { User } from "../../models/AuthModels";
import "./OwnerPage.scss"
import { ApisContext } from "../../app/layout/app/App";

export default function OwnerPage(){
    const [users, setUsers] = useState<User[]>([]);
    const { userApi } = useContext(ApisContext);

    return (
        <main className="page owner-page">
            <div className="users-holder">

            </div>
        </main>
    )   
}