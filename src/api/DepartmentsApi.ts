import axios, { AxiosResponse } from "axios";
import { Department, DepartmentCreate } from "../models/Department";
import IDepartmentApi from "./IDepartmentsApi";
import { RcFile } from "antd/es/upload";

export default class DepartmentApi implements IDepartmentApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(filter: ((task: Department) => boolean) | null): Promise<Department[] | void> {
        let tasksToReturn: Department[];
        const promise = axios.get(this.url);
        const dataPromise = promise
        .then(response => {
            console.log(response.data!.result);
            tasksToReturn = response.data!.result;
            if (filter){
                tasksToReturn = tasksToReturn!.filter((task: Department) => filter(task));
            }
            return tasksToReturn;
        })
        .catch(error => console.log(error))

        return dataPromise;
    }
    get(id: number): Department {
        const taskToReturn: Department = { id: 1, name: "dasd", iconUrl: "ce" };
        axios.get(`${this.url}/${id}`)
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error))
        return taskToReturn;
    }
    create(task: DepartmentCreate, onCreateNotifyHandler: () => void): void {
        console.log(task);
        axios.post(this.url, task)
            .then(res => {
                console.log(res.data);
                onCreateNotifyHandler();
            })
            .catch(error => {
                console.log(error);
            });
    }
    update(id: number, newTask: Department, onUpdteNotifyHandler: () => void): void {
        console.log(id, newTask);
        axios.put(`${this.url}/${id}`, newTask)
            .then(res => {
                console.log("MyRes" + res);
                onUpdteNotifyHandler();
            });
    }
    remove(id: number, onDeleteNotifyHandler: () => void): void {
        axios.delete(`${this.url}/${id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        onDeleteNotifyHandler();
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
                console.log(res);
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

}