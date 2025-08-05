import { useContext, useEffect, useState } from "react";
import "./OwnerPage.scss"
import { ApisContext } from "../../app/layout/app/App";
import UserItem from "./user-item/UserItem";
import { User } from "../../models/User";

export default function OwnerPage(){
    const [users, setUsers] = useState<User[]>([]);
    const { userApi } = useContext(ApisContext);

    useEffect(() => {
        userApi.getAll()
            .then((users) => {
                setUsers(users ?? []);
            });
    }, [])

    const onUserRemoved = (userId?: number) => {
        if (!userId) return;

        const newUsers = users.filter(u => u.userId !== userId)
        setUsers(newUsers);
    }

    const renderedUsers = users && users.map(u => (
        <UserItem user={u} onUserRemoved={onUserRemoved}/>
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