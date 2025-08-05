import axios from "axios";
import { SystemRoles, GeneratorModifications } from "../models/Enums";
import IUserApi from "./IUserApi";
import { User } from "../models/User";

export default class UserApi implements IUserApi {
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(): Promise<User[] | void> {
        let toReturn: User[];
        const promise = axios.get(this.url, {
            withCredentials: true
        });
        const dataPromise = promise
            .then(response => {
                toReturn = response.data;
                return toReturn;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    remove(userId: number): Promise<boolean> {
        return axios.delete(`${this.url}?userId=${userId}`, {
            withCredentials: true
        })
            .then(_ => {
                return true;
            })
            .catch(error =>{
                console.log(error);
                return false;
            })
    }

    setSystemRole(userId: number, roles: SystemRoles): Promise<void> {
        return axios.patch(`${this.url}/system-roles`, { userId, roles } , {
            withCredentials: true
        })
    }

    setGeneratorModification(userId: number, modifications: GeneratorModifications): Promise<void> {
        return axios.patch(`${this.url}/generator-modifications`, { userId, modifications } , {
            withCredentials: true
        })
    }
}
