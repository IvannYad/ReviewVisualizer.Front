import { GeneratorModifications, SystemRoles } from "../models/Enums";
import { User } from "../models/User";

export default interface IUserAPi {
    getAll(): Promise<User[] | void>;
    remove(userId: number): Promise<boolean>;

    setSystemRole(userId: number, roles: SystemRoles): Promise<void>;
    setGeneratorModification(userId: number, modifications: GeneratorModifications): Promise<void>;
}