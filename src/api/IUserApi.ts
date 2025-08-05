import { User } from "../models/AuthModels";
import { GeneratorModifications, SystemRoles } from "../models/Enums";

export default interface IUserAPi {
    getAll(): Promise<User[] | void>;
    remove(userId: number): Promise<boolean>;

    setSystemRole(userId: number, roles: SystemRoles): Promise<void>;
    setGeneratorModification(userId: number, modifications: GeneratorModifications): Promise<void>;
}