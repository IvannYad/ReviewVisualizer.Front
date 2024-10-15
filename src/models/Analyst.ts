export type Analyst = {
    id: number,
    name: string,
    processingDurationMiliseconds: number,
    isStopped: boolean,
}

export type AnalystCreate = {
    name: string,
    processingDurationMiliseconds: number,
    isStopped: boolean,
}