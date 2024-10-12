import axios, { AxiosResponse } from "axios";
import { RcFile } from "antd/es/upload";
import ITeacherApi from "./ITeachersApi";
import { Teacher, TeacherCreate } from "../models/Teacher";

export default class TeacherApi implements ITeacherApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(filter: ((teacher: Teacher) => boolean) | null): Promise<Teacher[] | void> {
        let teachersToReturn: Teacher[];
        const promise = axios.get(this.url);
        const dataPromise = promise
            .then(response => {
                teachersToReturn = response.data;
                if (filter){
                    teachersToReturn = teachersToReturn!.filter((teacher: Teacher) => filter(teacher));
                }
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
        return axios.post(this.url, teacher)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }

    update(id: number, newTeacher: Teacher): Promise<void> {
        console.log(id, newTeacher);
        return axios.put(`${this.url}/${id}`, newTeacher)
                    .then(res => {
                        console.log("MyRes" + res);
                    });
    }

    remove(id: number): Promise<void> {
        return axios.delete(`${this.url}/${id}`)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
                    .catch(error =>{
                        console.log(error);
                    })
    }

    uploadIcon(name: string, file: RcFile): Promise<string | void> {
        const form = new FormData();
        form.append(name, file);

        return axios.post(`${this.url}/upload-image`, form, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(res => {
                return res.data; 
            })
            .catch(error =>{
                console.log(error);
            })
    }

    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void> {
        return axios.post(`${this.url}/delete-image?imgName=${name}`)
            .catch(error =>{
                console.log(error);
            })
    }

    getDepartmentRank(id: number): Promise<number | void> {
        return axios.get(`${this.url}/get-department-rank/${id}`)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => console.log(error))
    }


    getGlobalRank(id: number): Promise<number | void> {
        return axios.get(`${this.url}/get-global-rank/${id}`)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => console.log(error))
    }


}