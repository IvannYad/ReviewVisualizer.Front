import axios, { AxiosResponse } from "axios";
import { RcFile } from "antd/es/upload";
import ITeacherApi, { GradeCatetory } from "./ITeachersApi";
import { Teacher, TeacherCreate } from "../models/Teacher";

export default class TeacherApi implements ITeacherApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(): Promise<Teacher[] | void> {
        let teachersToReturn: Teacher[];
        const promise = axios.get(this.url);
        const dataPromise = promise
            .then(response => {
                teachersToReturn = response.data;
                return teachersToReturn;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    getAllForDepartment(deptId: number): Promise<Teacher[] | void> {
        let teachersToReturn: Teacher[];
        const promise = axios.get(`${this.url}/get-for-department/${deptId}`);
        const dataPromise = promise
            .then(response => {
                teachersToReturn = response.data;
                return teachersToReturn;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    get(id: number): Promise<Teacher | void> {
        return axios.get(`${this.url}/${id}`)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => console.log(error))
    }

    create(teacher: TeacherCreate): Promise<void> {
        console.log(teacher);
        return axios.post(this.url, teacher, {
            withCredentials: true
        })
            .then(res => {
                console.log(res.data);
            })
    }

    update(id: number, newTeacher: Teacher): Promise<void> {
        console.log(id, newTeacher);
        return axios.put(`${this.url}/${id}`, newTeacher, {
            withCredentials: true
        })
            .then(res => {
                console.log("MyRes" + res);
            });
    }

    remove(id: number): Promise<boolean> {
        return axios.delete(`${this.url}?teacherId=${id}`, {
            withCredentials: true
        })
            .then(_ => {
                return true;
            })
    }

    uploadIcon(name: string, file: RcFile): Promise<string | void> {
        const form = new FormData();
        form.append(name, file);

        return axios.post(`${this.url}/upload-image`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            })
            .then(res => {
                return res.data; 
            })
    }

    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void> {
        return axios.post(`${this.url}/delete-image?imgName=${name}`, {}, {
            withCredentials: true
        })
    }

    getDepartmentRank(id: number): Promise<number | void> {
        return axios.get(`${this.url}/get-department-rank/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }


    getGlobalRank(id: number): Promise<number | void> {
        return axios.get(`${this.url}/get-global-rank/${id}`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }

    getGrade(teacherId: number, category: GradeCatetory): Promise<void | (null | number)> {
        return axios.get(`${this.url}/get-grade/${teacherId}?category=${category}`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }

    getTop10(): Promise<Teacher[] | void> {
        let teachersToReturn: Teacher[];
        const promise = axios.get(`${this.url}/get-top`);
        const dataPromise = promise
            .then(response => {
                teachersToReturn = response.data;
                return teachersToReturn;
            })
            .catch(e => console.log(e))

        return dataPromise;
    }

    getTop10InDepartment(deptId: number): Promise<Teacher[] | void> {
        let teachersToReturn: Teacher[];
        const promise = axios.get(`${this.url}/get-top-in-department/${deptId}`);
        const dataPromise = promise
            .then(response => {
                teachersToReturn = response.data;
                return teachersToReturn;
            })
            .catch(e => console.log(e))

        return dataPromise;
    }

    getBest(): Promise<Teacher | void> {
        return axios.get(`${this.url}/get-best`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }
}
