import { Reviewer, ReviewerCreate } from "../models/Reviewer";

export default interface IReviewerApi{
    getAll(): Promise<Reviewer[] | void>;
    create(reviewer: ReviewerCreate): Promise<void>;
    //update(id: number, newTask: Department): Promise<void>;
    //remove(id: number): Promise<void>;

    startReviewer(reviewerId: number): Promise<boolean | void>;
    stopReviewer(reviewerId: number): Promise<boolean | void>;
    
    addTeachers(teacherIds: number[]): Promise<void>;
    removeTeachers(teacheIds: number[]): Promise<void>;
}