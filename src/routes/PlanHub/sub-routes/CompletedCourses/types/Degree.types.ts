export interface Course {
    code: string,
    name: string,
    credits: number,
    prerequisites?: string[],
    corequisites?: string[],
    antirequisites?: string[],
    semester?: 1 | 2
}

export interface CourseSemester {
    year: number,
    semesterNumber: 1 | 2,
    courseList: (Course | null)[],
    maxCredits: number
}

export interface Degree {
    name: string,
    year: string,
    key: string,
    degreeRequirements?: string
}