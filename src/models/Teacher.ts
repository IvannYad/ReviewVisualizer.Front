export type Teacher = {
    id: number,
    firstName: string,
    lastName: string,
    academicDegree: AcademicDegree,
    academicRank: AcademicRank,
    photoUrl: string,
    rating: number
    departmentId: number
}

export type TeacherCreate = {
    firstName: string,
    lastName: string,
    academicDegree: AcademicDegree,
    academicRank: AcademicRank,
    photoUrl: string,
    departmentId: number
}

export enum AcademicDegree {
    NotSelected = -1,
    Associate = 0,
    Batchelor,
    Master,
    Doctoral
}

export enum AcademicRank {
    NotSelected = -1,
    Assistant = 0,
    Lecturer,
    SeniorResearcher,
    AssociateProfessor,
    FullProfessor
}