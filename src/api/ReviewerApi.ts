import axios from "axios";
import { Reviewer, ReviewerCreate } from "../models/Reviewer";
import IReviewerApi from "./IReviewerApi";
import { Teacher } from "../models/Teacher";

export default class ReviewerApi implements IReviewerApi{
    private url: string;
    constructor(apiUrl: string){
        this.url = apiUrl;
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

    // update(id: number, newTeacher: Teacher): Promise<void> {
    //     console.log(id, newTeacher);
    //     return axios.put(`${this.url}/${id}`, newTeacher)
    //                 .then(res => {
    //                     console.log("MyRes" + res);
    //                 });
    // }

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

    startReviewer(reviewerId: number): Promise<void | boolean> {
        return axios.post(`${this.url}/start-reviewer/${reviewerId}`)
                    .then(res => res.data)
                    .catch(error => {
                        console.log(error);
                    });
    }

    stopReviewer(reviewerId: number): Promise<boolean | void> {
        return axios.post(`${this.url}/stop-reviewer/${reviewerId}`)
                    .then(res => res.data)
                    .catch(error => {
                        console.log(error);
                    });
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