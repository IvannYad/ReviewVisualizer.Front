import axios, { AxiosResponse } from "axios";
import { RcFile } from "antd/es/upload";
import ITeacherApi, { GradeCatetory } from "./ITeachersApi";
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

    remove(id: number): Promise<boolean> {
        return axios.delete(`${this.url}?teacherId=${id}`)
                    .then(res => {
                        return true;
                    })
                    .catch(error =>{
                        console.log(error);
                        alert(error.response?.data ?? "Error while deleting the teacher");
                        return false;
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
                alert(error.response?.data ?? "Error uploading an image for the teacher");
            })
    }

    unloadIcon(name: string): Promise<AxiosResponse<any, any> | void> {
        return axios.post(`${this.url}/delete-image?imgName=${name}`)
            .catch(error =>{
                console.log(error);
                alert(error.response?.data ?? "Error deleting an image for the teacher");
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

    getGrade(teacherId: number, category: GradeCatetory): Promise<void | (null | number)> {
        return axios.get(`${this.url}/get-grade/${teacherId}?category=${category}`)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))
    }
}
