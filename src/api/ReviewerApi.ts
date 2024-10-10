import axios from "axios";
import { Reviewer, ReviewerCreate } from "../models/Reviewer";
import IReviewerApi from "./IReviewerApi";

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

    create(reviewer: ReviewerCreate): Promise<void> {
        return axios.post(this.url, reviewer)
                    .then(res => {
                        console.log(res.data);
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

    // remove(id: number): Promise<void> {
    //     return axios.delete(`${this.url}/${id}`)
    //                 .then(res => {
    //                     console.log(res);
    //                     console.log(res.data);
    //                 })
    //                 .catch(error =>{
    //                     console.log(error);
    //                 })
    // }

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

    addTeachers(teacherIds: number[]): Promise<void> {
        return axios.post(`${this.url}/add-teachers`, {
                data:{
                    teacherIds: teacherIds
                }
            }).then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    removeTeachers(teacherIds: number[]): Promise<void> {
        return axios.post(`${this.url}/remove-teachers`, {
                data:{
                    teacherIds: teacherIds
                }
            }).then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

}