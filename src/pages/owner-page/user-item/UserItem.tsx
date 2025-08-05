import { Button, Checkbox, CheckboxOptionType } from "antd";
import "./UserItem.scss"
import { GeneratorModifications, SystemRoles } from "../../../models/Enums";
import { useContext, useState } from "react";
import { CrownOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ApisContext, NotificationApiContext } from "../../../app/layout/app/App";
import { User } from "../../../models/User";

export type UserItemProps = {
    user: User;
    onUserRemoved: (userId?: number) => void;
}

const getCheckedRoles: (user: User) => SystemRoles[] = (user) => {
    const roles: SystemRoles[] = [];
    if (!user || !user.systemRoles) return [];

    if ((user.systemRoles & SystemRoles.Analyst) === SystemRoles.Analyst) roles.push(SystemRoles.Analyst);
    if ((user.systemRoles & SystemRoles.GeneratorAdmin) === SystemRoles.GeneratorAdmin) roles.push(SystemRoles.GeneratorAdmin);
    if ((user.systemRoles & SystemRoles.Owner) === SystemRoles.Owner) roles.push(SystemRoles.Owner);
    if ((user.systemRoles & SystemRoles.Visitor) === SystemRoles.Visitor) roles.push(SystemRoles.Visitor);

    return roles;
}

const getCheckedGeneratorModifications: (user: User) => GeneratorModifications[] = (user) => {
    const modifications: GeneratorModifications[] = [];
    if (!user || !user.generatorModifications) return [];

    if ((user.generatorModifications & GeneratorModifications.ModifyFireAndForget) === GeneratorModifications.ModifyFireAndForget) modifications.push(GeneratorModifications.ModifyFireAndForget);
    if ((user.generatorModifications & GeneratorModifications.ModifyDelayed) === GeneratorModifications.ModifyDelayed) modifications.push(GeneratorModifications.ModifyDelayed);
    if ((user.generatorModifications & GeneratorModifications.ModifyRecurring) === GeneratorModifications.ModifyRecurring) modifications.push(GeneratorModifications.ModifyRecurring);
    
    return modifications;
}

const combineCheckedRoles: (roles: SystemRoles[]) => SystemRoles = (roles) => {
    let combined = 0;
    for (const role of roles) {
        combined |= role;
    }
    return combined as SystemRoles;
};

const combineCheckedGeneratorModifications: (modifications: GeneratorModifications[]) => GeneratorModifications = (modifications) => {
    let combined = 0;
    for (const mod of modifications) {
        combined |= mod;
    }
    return combined as GeneratorModifications;
};

function arraysEqualUnordered<T>(arr1: T[] | undefined, arr2: T[] | undefined): boolean {
    if (arr1 === undefined || arr2 === undefined)
        return false;

    if (arr1.length !== arr2.length) {
        return false;
    }

    const countMap1 = new Map<T, number>();
    const countMap2 = new Map<T, number>();

    for (const item of arr1) {
        countMap1.set(item, (countMap1.get(item) || 0) + 1);
    }

    for (const item of arr2) {
        countMap2.set(item, (countMap2.get(item) || 0) + 1);
    }

    if (countMap1.size !== countMap2.size) {
        return false;
    }

    for (const [key, count] of countMap1.entries()) {
        if (countMap2.get(key) !== count) {
            return false;
        }
    }

    return true;
}

export default function UserItem({ user, onUserRemoved }: UserItemProps){
    const [checkedRoles, setCheckedRoles] = useState<SystemRoles[]>(getCheckedRoles(user));
    const [checkedGeneratorModifications, setCheckedGeneratorModifications] = useState<GeneratorModifications[]>(getCheckedGeneratorModifications(user));
    const { userApi } = useContext(ApisContext);
    const notificationAPi = useContext(NotificationApiContext)
    
    const systemRolesOptions: CheckboxOptionType<SystemRoles>[] = [
        { label: 'Visitor', value: SystemRoles.Visitor },
        { label: 'Analyst', value: SystemRoles.Analyst },
        { label: 'Generator Admin', value: SystemRoles.GeneratorAdmin },
        { label: 'Owner', value: SystemRoles.Owner }
    ];

    const generatorModificationsOptions: CheckboxOptionType<GeneratorModifications>[] = [
        { label: 'Fire And Forget', value: GeneratorModifications.ModifyFireAndForget },
        { label: 'Delayed', value: GeneratorModifications.ModifyDelayed },
        { label: 'Recurring', value: GeneratorModifications.ModifyRecurring },
    ];

    const onSystemRoleChange: ((checkedValue: SystemRoles[]) => void) | undefined = (checkedRolesInput) => {
        setCheckedRoles(checkedRolesInput);
    }

    const onCeneratorModificationChange: ((checkedValue: GeneratorModifications[]) => void) | undefined = (checkedModificationsInput) => {
        setCheckedGeneratorModifications(checkedModificationsInput);
    }

    const onUpdateClick: React.MouseEventHandler<HTMLElement> | undefined = async (e) => {
        e.preventDefault();
        const promises: Promise<void>[] = []

        if (!arraysEqualUnordered(getCheckedRoles(user), checkedRoles)) {
            promises.push(userApi.setSystemRole(user.userId!, combineCheckedRoles(checkedRoles)))
        }

        if (!arraysEqualUnordered(getCheckedGeneratorModifications(user), checkedGeneratorModifications)) {
            promises.push(userApi.setGeneratorModification(user.userId!, combineCheckedGeneratorModifications(checkedGeneratorModifications)))
        }

        await Promise.all(promises)
            .then(() => {
                notificationAPi && notificationAPi["success"]({
                    message: `User ${user.userName} is updated`,
                    className: "success-notification-box"
                });
            })
            .catch((e) => {
                notificationAPi && notificationAPi["error"]({
                        message: `Cannot update user ${user.userName} due to error`,
                        description: e,
                        className: "error-notification-box"
                    });
            })
    }

    const onRemoveClick: React.MouseEventHandler<HTMLElement> | undefined = async (e) => {
        e.preventDefault();

        await userApi.remove(user.userId!)
            .then(() => {
                onUserRemoved(user.userId);
            })
            .catch((e) => {
                notificationAPi && notificationAPi["error"]({
                        message: `Cannot update user ${user.userName} due to error`,
                        description: e,
                        className: "error-notification-box"
                    });
            })
    }

    return (
        <tr>
            <td className="username-data">
                {
                    user.systemRoles && ((user.systemRoles & SystemRoles.Owner) === SystemRoles.Owner) ? (
                        <CrownOutlined />
                    ) : (
                        <div className="owner-icon-placeholder"></div>
                    )
                } {user.userName}
            </td>
            <td>
                <Checkbox.Group options={systemRolesOptions} onChange={onSystemRoleChange} value={checkedRoles}/>
            </td>
            <td>
                <Checkbox.Group options={generatorModificationsOptions} onChange={onCeneratorModificationChange} value={checkedGeneratorModifications}/>
            </td>
            <td className="buttons-holder">
                <Button className="send-button button" onClick={onUpdateClick}><EditOutlined /></Button>
                <Button className="delete-button button" onClick={onRemoveClick}><DeleteOutlined /></Button>
            </td>
        </tr>
    )   
}