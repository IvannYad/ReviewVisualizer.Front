import axios, { AxiosResponse } from "axios";
import { Department, DepartmentCreate } from "../models/Department";
import IDepartmentApi from "./IDepartmentsApi";
import { RcFile } from "antd/es/upload";
import { GradeCatetory } from "./ITeachersApi";

export default class DepartmentApi implements IDepartmentApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(filter: ((department: Department) => boolean) | null): Promise<Department[] | void> {
        let departmentsToReturn: Department[];
        const promise = axios.get(this.url);
        const dataPromise = promise
            .then(response => {
                console.log(response);
                departmentsToReturn = response.data;
                if (filter){
                    departmentsToReturn = departmentsToReturn!.filter((department: Department) => filter(department));
                }
                return departmentsToReturn;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    get(id: number): Promise<Department | void> {
        return axios.get(`${this.url}/${id}`)
                    .then(response => {
                        return response.data;
                    })
                    .catch(error => console.log(error))
    }

    create(department: DepartmentCreate): Promise<void> {
        console.log(department);
        return axios.post(this.url, department)
                    .then(res => {
                        console.log(res.data);
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }

    update(id: number, newTeacher: Department): Promise<void> {
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

    getGrade(departmentId: number, category: GradeCatetory): Promise<void | (null | number)> {
        return axios.get(`${this.url}/get-grade/${departmentId}?category=${category}`)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))
    }

    getTop10(): Promise<Department[] | void> {
        let departmentsToReturn: Department[];
        const promise = axios.get(`${this.url}/get-top`);
        const dataPromise = promise
            .then(response => {
                departmentsToReturn = response.data;
                return departmentsToReturn;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    getBest(): Promise<Department | void> {
        return axios.get(`${this.url}/get-best`)
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))
    }
}