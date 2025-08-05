import { User } from "../models/AuthModels";
import { SystemRoles, GeneratorModifications } from "../models/Enums";
import IUserApi from "./IUserApi";

export default class UserApi implements IUserApi {
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(): Promise<User[] | void> {
        throw new Error("Method not implemented.");
    }

    remove(userId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    setSystemRole(userId: number, roles: SystemRoles): Promise<void> {
        throw new Error("Method not implemented.");
    }

    setGeneratorModification(userId: number, modifications: GeneratorModifications): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
