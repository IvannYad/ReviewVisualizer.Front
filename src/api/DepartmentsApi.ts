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
        const promise = axios.get(this.url, {
            withCredentials: true
        });
        const dataPromise = promise
            .then(response => {
                console.log(response);
                departmentsToReturn = response.data;
                if (filter){
                    departmentsToReturn = departmentsToReturn!.filter((department: Department) => filter(department));
                }
                return departmentsToReturn;
            })
            .catch(e => console.log(e))

        return dataPromise;
    }

    get(id: number): Promise<Department | void> {
        return axios.get(`${this.url}/${id}`)
                    .then(response => {
                        return response.data;
                    })
    }

    create(department: DepartmentCreate): Promise<void> {
        console.log(department);
        return axios.post(this.url, department, {
            withCredentials: true
        })
                    .then(res => {
                        console.log(res.data);
                    })
    }

    update(id: number, newTeacher: Department): Promise<void> {
        console.log(id, newTeacher);
        return axios.put(`${this.url}/${id}`, newTeacher, {
            withCredentials: true
        })
                    .then(res => {
                        console.log("MyRes" + res);
                    });
    }
    remove(id: number): Promise<void> {
        return axios.delete(`${this.url}/${id}`, {
            withCredentials: true
        })
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
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

    getGrade(departmentId: number, category: GradeCatetory): Promise<void | (null | number)> {
        return axios.get(`${this.url}/get-grade/${departmentId}?category=${category}`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }

    getTop10(): Promise<Department[] | void> {
        let departmentsToReturn: Department[];
        const promise = axios.get(`${this.url}/get-top`);
        const dataPromise = promise
            .then(response => {
                departmentsToReturn = response.data;
                return departmentsToReturn;
            })
            .catch(e => console.log(e))

        return dataPromise;
    }

    getBest(): Promise<Department | void> {
        return axios.get(`${this.url}/get-best`)
            .then(response => {
                return response.data;
            })
            .catch(e => console.log(e))
    }
}