import { useContext, useEffect, useState } from "react";
import { User } from "../../models/AuthModels";
import "./OwnerPage.scss"
import { ApisContext } from "../../app/layout/app/App";
import { GeneratorModifications, SystemRoles } from "../../models/Enums";
import UserItem from "./user-item/UserItem";

export default function OwnerPage(){
    const [users, setUsers] = useState<User[]>([]);
    const { userApi } = useContext(ApisContext);

    useEffect(() => {
        setUsers( [
        {
            userName: "test",
            systemRoles: SystemRoles.GeneratorAdmin | SystemRoles.Analyst,
            generatorModifications: GeneratorModifications.ModifyRecurring
        },
        {
            userName: "test2",
            systemRoles: SystemRoles.GeneratorAdmin,
            generatorModifications: GeneratorModifications.ModifyRecurring | GeneratorModifications.ModifyRecurring
        },
        {
            userName: "owner",
            systemRoles: SystemRoles.Owner,
            generatorModifications: GeneratorModifications.ModifyRecurring | GeneratorModifications.ModifyRecurring
        }
    ])

    }, [])

    const renderedUsers = users && users.map(u => (
        <UserItem user={u}/>
    ));

    return (
        <main className="page owner-page">
            <table className="users-holder">
                <tr className="headers-row">
                    <th className="user-name">UserName</th>
                    <th className="system-roles">System Roles</th>
                    <th className="generator-modifications">Generator Modifications</th>
                    <th className="buttons"></th>
                </tr>
                {renderedUsers}
            </table>
        </main>
    )   
}