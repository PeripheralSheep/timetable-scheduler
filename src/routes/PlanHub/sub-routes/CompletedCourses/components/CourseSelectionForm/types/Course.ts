
export interface Course {
    code: string,
    name: string,
    credits: number,
    prerequisites?: string[],
    corequisites?: string[],
    antirequisites?: string[],
}