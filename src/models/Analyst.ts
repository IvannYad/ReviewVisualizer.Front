export type Analyst = {
    id: number,
    name: string,
    processingInterval: number,
    isStopped: boolean,
}

export type AnalystCreate = {
    name: string,
    processingInterval: number,
    isStopped: boolean,
}