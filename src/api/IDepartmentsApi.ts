import { RcFile } from "antd/es/upload";
import { Department, DepartmentCreate } from "../models/Department";
import { AxiosResponse } from "axios";

export default interface IDepartmentApi{
    getAll(filter: ((task: Department) => boolean) | null): Promise<Department[] | void>;
    get(id: number): Department;
    create(task: DepartmentCreate, onCreateNotifyHandler: () => void): void;
    update(id: number, newTask: Department, onUpdteNotifyHandler: () => void): void;
    remove(id: number, onDeleteNotifyHandler: () => void): void;

    uploadIcon(name: string, file: RcFile): Promise<string | void>;
    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void>;
}