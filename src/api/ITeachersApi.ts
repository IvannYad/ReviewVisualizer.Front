import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";
import { Teacher, TeacherCreate } from "../models/Teacher";

export default interface ITeacherApi{
    getAll(filter: ((task: Teacher) => boolean) | null): Promise<Teacher[] | void>;
    getAllForDepartment(deptId: number): Promise<Teacher[] | void>;
    get(id: number): Promise<Teacher | void>;
    create(task: TeacherCreate): Promise<void>;
    update(id: number, newTask: Teacher): Promise<void>;
    remove(id: number): Promise<void>;

    uploadIcon(name: string, file: RcFile): Promise<string | void>;
    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void>;

    getDepartmentRank(id: number): Promise<void | number>;
    getGlobalRank(id: number): Promise<void | number>;
}