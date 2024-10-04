export type Department = {
    id: number,
    name: string,
    logoUrl: string,
    rating: number,
}

export type DepartmentCreate = {
    name: string,
    logoUrl: string,
}