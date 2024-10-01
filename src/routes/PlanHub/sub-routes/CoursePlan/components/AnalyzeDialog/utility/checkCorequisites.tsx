import type { Course, CourseCode } from "../../../../../../../types/course.types";
import type { CheckReturnType, ErrorCourseCodeType } from "./validityReturnTypes";


export default function checkCorequisites(
    course: Course, 
    previouslyCompletedCourses: Set<CourseCode>, 
    currentSemesterCourses: Set<CourseCode | undefined>
): CheckReturnType {
    if(!course.corequisites) {
        return {
            satisfied: true
        }
    }

    let satisfied = true;

    let errors: ErrorCourseCodeType = {
        description: "The following corequisites are missing in the same semester as this course",
        errorCourseCodes: []
    }
    
    for(let i = 0; i < course.corequisites.length; i++) {
        const currentCorequisite = course.corequisites[i]
        if(!previouslyCompletedCourses.has(currentCorequisite) && !currentSemesterCourses.has(currentCorequisite)) {
            satisfied = false;
            errors.errorCourseCodes.push(currentCorequisite)
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