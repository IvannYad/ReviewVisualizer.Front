import { GeneratorType } from "./GeneratorType";
import { Teacher } from "./Teacher";

export type Reviewer = {
    id: number,
    name: string,
    reviewGenerationFrequensyMiliseconds: number,
    teachingQualityMinGrage: number,
    teachingQualityMaxGrage: number,
    studentsSupportMinGrage: number,
    studentsSupportMaxGrage: number,
    communicationMinGrage: number,
    communicationMaxGrage: number,
    teachers: Teacher[],
    type: GeneratorType
}

export type ReviewerCreate = {
    name: string,
    reviewGenerationFrequensyMiliseconds: number,
    teachingQualityMinGrage: number,
    teachingQualityMaxGrage: number,
    studentsSupportMinGrage: number,
    studentsSupportMaxGrage: number,
    communicationMinGrage: number,
    communicationMaxGrage: number,
    type: GeneratorType
}