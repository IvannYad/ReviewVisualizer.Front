import { GeneratorType } from "./GeneratorType";

export type GenerateReviewRequest = {
    reviewerId: number;
    type: GeneratorType;
    delay?: string;
    cron?: string;
}