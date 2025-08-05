import { Button, Checkbox, CheckboxOptionType } from "antd";
import { User } from "../../../models/AuthModels";
import "./UserItem.scss"
import { GeneratorModifications, SystemRoles } from "../../../models/Enums";
import { useState } from "react";
import { CrownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

export type UserItemProps = {
    user: User;
}

const getCheckedRoles: (user: User) => SystemRoles[] = (user) => {
    const roles: SystemRoles[] = [];
    if (!user || !user.systemRoles) return [];

    if (user.systemRoles & SystemRoles.Analyst) roles.push(SystemRoles.Analyst);
    if (user.systemRoles & SystemRoles.GeneratorAdmin) roles.push(SystemRoles.GeneratorAdmin);
    if (user.systemRoles & SystemRoles.Owner) roles.push(SystemRoles.Owner);

    return roles;
}

const getCheckedGeneratorModifications: (user: User) => GeneratorModifications[] = (user) => {
    const modifications: GeneratorModifications[] = [];
    if (!user || !user.generatorModifications) return [];

    if (user.generatorModifications & GeneratorModifications.ModifyFireAndForget) modifications.push(GeneratorModifications.ModifyFireAndForget);
    if (user.generatorModifications & GeneratorModifications.ModifyDelayed) modifications.push(GeneratorModifications.ModifyDelayed);
    if (user.generatorModifications & GeneratorModifications.ModifyRecurring) modifications.push(GeneratorModifications.ModifyRecurring);
    
    return modifications;
}

export default function UserItem({ user }: UserItemProps){
    const [checkedRoles, setCheckedRoles] = useState<SystemRoles[]>(getCheckedRoles(user));
    const [checkedGeneratorModifications, setCheckedGeneratorModifications] = useState<GeneratorModifications[]>(getCheckedGeneratorModifications(user));
    
    const systemRolesOptions: CheckboxOptionType<SystemRoles>[] = [
        { label: 'Analyst', value: SystemRoles.Analyst },
        { label: 'Generator Admin', value: SystemRoles.GeneratorAdmin },
        { label: 'Owner', value: SystemRoles.Owner },
    ];

    const generatorModificationsOptions: CheckboxOptionType<GeneratorModifications>[] = [
        { label: 'Fire And Forget', value: GeneratorModifications.ModifyFireAndForget },
        { label: 'Delayed', value: GeneratorModifications.ModifyDelayed },
        { label: 'Recurring', value: GeneratorModifications.ModifyRecurring },
    ];

    return (
        <tr>
            <td className="username-data">
                {
                    user.systemRoles && ((user.systemRoles | SystemRoles.Owner) === SystemRoles.Owner) ? (
                        <CrownOutlined />
                    ) : (
                        <div className="owner-icon-placeholder"></div>
                    )
                } {user.userName}
            </td>
            <td>
                <Checkbox.Group options={systemRolesOptions} onChange={() => {}} value={checkedRoles}/>
            </td>
            <td>
                <Checkbox.Group options={generatorModificationsOptions} onChange={() => {}} value={checkedGeneratorModifications}/>
            </td>
            <td className="buttons-holder">
                <Button className="send-button button"><EditOutlined /></Button>
                <Button className="delete-button button"><DeleteOutlined /></Button>
            </td>
        </tr>
    )   
}