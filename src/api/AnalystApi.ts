import axios from "axios";
import IAnalystApi from "./IAnalystApi";
import { Analyst, AnalystCreate } from "../models/Analyst";

export default class AnalystApi implements IAnalystApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    getAll(): Promise<Analyst[] | void> {
        const promise = axios.get(this.url);
        const dataPromise = promise
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    create(analyst: AnalystCreate): Promise<void | boolean> {
        return axios.post(this.url, analyst)
                    .then(res => {
                        return res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }

    // update(id: number, newTeacher: Teacher): Promise<void> {
    //     console.log(id, newTeacher);
    //     return axios.put(`${this.url}/${id}`, newTeacher)
    //                 .then(res => {
    //                     console.log("MyRes" + res);
    //                 });
    // }

    remove(id: number): Promise<boolean> {
        return axios.delete(`${this.url}/${id}`)
                    .then(_ => true)
                    .catch(error =>{
                        console.log(error);
                        return false;
                    })
    }

    startAnalyst(analystId: number): Promise<void | boolean> {
        return axios.post(`${this.url}/start-analyst/${analystId}`)
                    .then(res => res.data)
                    .catch(error => {
                        console.log(error);
                    });
    }

    stopAnalyst(analystId: number): Promise<boolean | void> {
        return axios.post(`${this.url}/stop-analyst/${analystId}`)
                    .then(res => res.data)
                    .catch(error => {
                        console.log(error);
                    });
    }

    getQueueSize(): Promise<number | void> {
        const promise = axios.get(`${this.url}/get-queue-size`);
        const dataPromise = promise
            .then(response => {
                return response.data ?? 0;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }
}