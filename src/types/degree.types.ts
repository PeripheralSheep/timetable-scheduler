import { CourseCode } from "./course.types"

export interface Degree {
    name: string,
    year: string,
    key: string,
    degreeRequirements?: string
}

export interface DegreesData {
    [key: string]: DegreeData
}

export interface DegreeData {
    name: string,
    [yearKey: string]: OverallDegreeRequirements | string
}

export interface OverallDegreeRequirements {
    and: Array<CourseCode | VagueDegreeRequirements>
}

export interface VagueDegreeRequirements {
    or?: Array<CourseCode | VagueDegreeRequirements>
    and?: Array<CourseCode | VagueDegreeRequirements>
    minimum?: DegreeChoicesObject,
    maximum?: DegreeChoicesObject
}

interface DegreeChoicesObject {
    credits: number,
    choices: string | CourseCode[]
}

