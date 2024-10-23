import { RcFile } from "antd/es/upload";
import { AxiosResponse } from "axios";
import { Teacher, TeacherCreate } from "../models/Teacher";

export default interface ITeacherApi{
    getAll(): Promise<Teacher[] | void>;
    getAllForDepartment(deptId: number): Promise<Teacher[] | void>;
    get(id: number): Promise<Teacher | void>;
    create(teacher: TeacherCreate): Promise<void>;
    update(id: number, newTask: Teacher): Promise<void>;
    remove(id: number): Promise<boolean>;

    uploadIcon(name: string, file: RcFile): Promise<string | void>;
    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void>;

    getDepartmentRank(id: number): Promise<void | number>;
    getGlobalRank(id: number): Promise<void | number>;

    getGrade(teacherId: number, category: GradeCatetory): Promise<void | (null | number)>;

    getTop10(): Promise<Teacher[] | void>;
    getTop10InDepartment(deptId: number): Promise<Teacher[] | void>;
    getBest(): Promise<Teacher | void>;
}

export enum GradeCatetory{
    TeachingQuality,
    StudentsSupport,
    Communication,
}