import { Reviewer, ReviewerCreate } from "../models/Reviewer";
import { Teacher } from "../models/Teacher";

export default interface IReviewerApi{
    getAll(): Promise<Reviewer[] | void>;
    create(reviewer: ReviewerCreate): Promise<void |boolean>;
    //update(id: number, newTask: Department): Promise<void>;
    remove(id: number): Promise<boolean>;

    generateFireAndForget(reviewerId: number): Promise<void>;
    generateDelayed(reviewerId: number, delay: string): Promise<void>;
    generateRecurring(reviewerId: number, cron: string): Promise<void>;
    
    addTeachers(reviewerId: number, teacherIds: number[]): Promise<void | Teacher[]>;
    removeTeachers(reviewerId: number, teacheIds: number[]): Promise<void | number[]>;

    tryAccess(): Promise<void>;
}