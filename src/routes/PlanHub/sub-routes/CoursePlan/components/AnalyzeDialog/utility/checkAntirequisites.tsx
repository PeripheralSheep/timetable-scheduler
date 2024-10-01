import type { Course, CourseCode } from "../../../../../../../types/course.types";
import type { CheckReturnType, ErrorCourseCodeType } from "./validityReturnTypes";


export default function checkAntirequisites(
    course: Course, 
    checkedCourses: Set<CourseCode>,
    currentSemesterCourses: Set<CourseCode | undefined>
): CheckReturnType {
    if(!course.antirequisites) {
        return {
            satisfied: true
        }
    }

    let satisfied = true;

    let errors: ErrorCourseCodeType = {
        description: "The following antirequisites exist in or before this semester",
        errorCourseCodes: []
    }
    for(let i = 0; i < course.antirequisites.length; i++) {
        if(checkedCourses.has(course.antirequisites[i]) || currentSemesterCourses.has(course.antirequisites[i])) {
            satisfied = false;
            errors.errorCourseCodes.push(course.antirequisites[i])
        }
    }
    if(satisfied) {
        return {
            satisfied: satisfied
        }
    }
    else {
        const errorMessagesJSX: JSX.Element = (
            <li>
                <h5>{course.code}</h5>
                <h6>{errors.description}</h6>
                <ul>
                {
                    errors.errorCourseCodes.map( (error, i) => {
                        return <li key={i}>{error}</li>
                    })
                }
                </ul>
            </li>
        )
        return {
            satisfied: satisfied,
            errorMessagesJSX: errorMessagesJSX
        }
    }
}