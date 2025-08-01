import axios from "axios";
import IAnalystApi from "./IAnalystApi";
import { Analyst, AnalystCreate } from "../models/Analyst";

export default class AnalystApi implements IAnalystApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    getAll(): Promise<Analyst[] | void> {
        throw new Error("Method not implemented.");
    }
    create(analyst: AnalystCreate): Promise<void | boolean> {
        throw new Error("Method not implemented.");
    }
    remove(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    startAnalyst(analystId: number): Promise<boolean | void> {
        throw new Error("Method not implemented.");
    }
    stopAnalyst(analystId: number): Promise<boolean | void> {
        throw new Error("Method not implemented.");
    }
    getQueueSize(): Promise<number | void> {
        throw new Error("Method not implemented.");
    }

    tryAccess(): Promise<void> {
        const promise = axios.get(`${this.url}/try-access`, {
            withCredentials: true
        })
        .then(() => {});

        return promise;
    }
}