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
    isStopped: boolean,
    teachers: Teacher[],
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
    isStopped: boolean,
}