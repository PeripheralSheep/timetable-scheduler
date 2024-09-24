export type MathElectives = "MATH3590"

export type MathCourses =  
                    "MATH1141" |
                    "MATH1152" |
                    "MATH1190" |
                    "MATH1195" |
                    "MATH1235" |
                    "MATH2304" |
                    "MATH2305" |
                    "MATH2310" |
                    "MATH2315" |
                    "MATH2321" |
                    "MATH3543" |
                    "MATH3545" |
                    "MATH3550" |
                    "MATH3555" |
                    "MATH3560" |
                    MathElectives

export type CSCourses = 
                    "COMP1170" |
                    "COMP1180" |
                    "COMP1205" |
                    "COMP1210" |
                    "COMP1215" |
                    "COMP2210" |
                    "COMP2220" |
                    "COMP2225" |
                    "COMP2232" |
                    "COMP2611" |
                    "COMP3310" |
                    "COMP3320" |
                    "COMP3330" 

export type FOUNCourses = "FOUN1301"

export type CourseCode = MathCourses | CSCourses | FOUNCourses

export type CoursesJSON = {
    [Property in keyof CourseCode]: Course
}

type ComplexPrerequisiteOr = {
    or: Array<CourseCode | ComplexPrerequisite>,
    and?: never
}

type ComplexPrerequisiteAnd = {
    and: Array<CourseCode | ComplexPrerequisite>,
    or?: never
}
export type ComplexPrerequisite = ComplexPrerequisiteOr | ComplexPrerequisiteAnd

export type ComplexPrequisitesType = CourseCode | ComplexPrerequisite

export interface Course {
    code: CourseCode,
    name: string,
    credits: number,
    prerequisites?: ComplexPrequisitesType,
    corequisites?: CourseCode[],
    antirequisites?: CourseCode[],
    semester?: 1 | 2
}

export interface CourseSemester {
    year: number,
    semesterNumber: 1 | 2,
    courseList: (Course | null)[],
    maxCredits: number
}




                
                