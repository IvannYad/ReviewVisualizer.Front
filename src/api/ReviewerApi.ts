import axios from "axios";
import { Reviewer, ReviewerCreate } from "../models/Reviewer";
import IReviewerApi from "./IReviewerApi";
import { Teacher } from "../models/Teacher";
import { Dayjs } from "dayjs";

export default class ReviewerApi implements IReviewerApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }

    generateFireAndForget(reviewerId: number): Promise<void> {
        return axios.post(`${this.url}/generate-fire-and-forget?reviewerId=${reviewerId}`)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }

    generateDelayed(reviewerId: number, delay: Dayjs): Promise<void> {
        return axios.post(`${this.url}/generate-delayed?reviewerId=${reviewerId}&delay=${delay}`)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }

    generateRecurring(reviewerId: number, interval: Dayjs): Promise<void> {
        return axios.post(`${this.url}/generate-fire-and-forget?reviewerId=${reviewerId}&interval=${interval}`)
            .then(res => res.data)
            .catch(error => {
                console.log(error);
            });
    }
    
    getAll(): Promise<Reviewer[] | void> {
        const promise = axios.get(this.url);
        const dataPromise = promise
            .then(response => {
                return response.data;
            })
            .catch(error => console.log(error))

        return dataPromise;
    }

    create(reviewer: ReviewerCreate): Promise<void | boolean> {
        return axios.post(this.url, reviewer)
                    .then(res => {
                        return res.data;
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }

    remove(id: number): Promise<boolean> {
        return axios.delete(`${this.url}?reviewerId=${id}`)
                    .then(_ => {
                        return true;
                    })
                    .catch(error =>{
                        console.log(error);
                        alert(error.response?.data ?? "Error while deleting the reviewer");
                        return false;
                    })
    }

    addTeachers(reviewerId: number, teacherIds: number[]): Promise<void | Teacher[]> {
        return axios.post(`${this.url}/add-teachers?reviewerId=${reviewerId}`, teacherIds)
            .then(res => {
                return res.data;
            })
            .catch(error => console.log(error));
    }

    removeTeachers(reviewerId: number, teacherIds: number[]): Promise<void | number[]> {
        return axios.post(`${this.url}/remove-teachers?reviewerId=${reviewerId}`, teacherIds)
        .then(res => {
            return res.data;
        })
        .catch(error => console.log(error));
    }

}