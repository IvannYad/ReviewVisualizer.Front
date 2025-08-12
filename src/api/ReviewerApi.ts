import axios from "axios";
import { Reviewer, ReviewerCreate } from "../models/Reviewer";
import IReviewerApi from "./IReviewerApi";
import { Teacher } from "../models/Teacher";
import { GeneratorType } from "../models/GeneratorType";
import { GenerateReviewRequest } from "../models/GenerateReviewRequest";
export default class ReviewerApi implements IReviewerApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
    }
    
    generateFireAndForget(reviewerId: number): Promise<void> {
        const request: GenerateReviewRequest = {
            reviewerId,
            type: GeneratorType.FIRE_AND_FORGET
        };
        return axios.post(`${this.url}/generate-review`, request,  {
            withCredentials: true
        })
            .then(res => res.data)
    }

    generateDelayed(reviewerId: number, delay: string): Promise<void> {
        const request: GenerateReviewRequest = {
            reviewerId,
            type: GeneratorType.DELAYED,
            delay
        };
        return axios.post(`${this.url}/generate-review`, request, {
            withCredentials: true
        })
            .then(res => res.data)
    }

    generateRecurring(reviewerId: number, cron: string): Promise<void> {
        const request: GenerateReviewRequest = {
            reviewerId,
            type: GeneratorType.RECURRING,
            cron
        };
        return axios.post(`${this.url}/generate-review`, request, {
            withCredentials: true
        })
            .then(res => res.data)
    }
    
    getAll(): Promise<Reviewer[] | void> {
        const promise = axios.get(this.url, {
            withCredentials: true
        });
        const dataPromise = promise
            .then(response => {
                return response.data;
            })

        return dataPromise;
    }

    create(reviewer: ReviewerCreate): Promise<void | boolean> {
        return axios.post(this.url, reviewer, {
            withCredentials: true
        })
        .then(res => {
            return res.data;
        })
    }

    remove(id: number): Promise<boolean> {
        return axios.delete(`${this.url}?reviewerId=${id}`, {
            withCredentials: true
        })
    }

    addTeachers(reviewerId: number, teacherIds: number[]): Promise<void | Teacher[]> {
        return axios.post(`${this.url}/add-teachers?reviewerId=${reviewerId}`, teacherIds, {
            withCredentials: true
        })
        .then(res => {
            return res.data;
        })
    }

    removeTeachers(reviewerId: number, teacherIds: number[]): Promise<void | number[]> {
        return axios.post(`${this.url}/remove-teachers?reviewerId=${reviewerId}`, teacherIds, {
            withCredentials: true
        })
        .then(res => {
            return res.data;
        });
    }

}