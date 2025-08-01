import { Analyst, AnalystCreate } from "../models/Analyst";

export default interface IAnalystApi{
    getAll(): Promise<Analyst[] | void>;
    create(analyst: AnalystCreate): Promise<void |boolean>;
    //update(id: number, newTask: Department): Promise<void>;
    remove(id: number): Promise<boolean>;

    startAnalyst(analystId: number): Promise<boolean | void>;
    stopAnalyst(analystId: number): Promise<boolean | void>;

    getQueueSize(): Promise<number | void>;

    tryAccess(): Promise<void>;
}