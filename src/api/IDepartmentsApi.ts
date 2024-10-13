import { RcFile } from "antd/es/upload";
import { Department, DepartmentCreate } from "../models/Department";
import { AxiosResponse } from "axios";
import { GradeCatetory } from "./ITeachersApi";

export default interface IDepartmentApi{
    getAll(filter: ((task: Department) => boolean) | null): Promise<Department[] | void>;
    get(id: number): Promise<Department | void>;
    create(task: DepartmentCreate): Promise<void>;
    update(id: number, newTask: Department): Promise<void>;
    remove(id: number): Promise<void>;

    uploadIcon(name: string, file: RcFile): Promise<string | void>;
    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void>;

    getGrade(departmentId: number, category: GradeCatetory): Promise<void | (null | number)>;
}