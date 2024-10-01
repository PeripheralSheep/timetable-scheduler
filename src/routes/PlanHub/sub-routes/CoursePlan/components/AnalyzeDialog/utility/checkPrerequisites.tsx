import type { VagueDegreeRequirements } from "../../../../../../../types/degree.types";
import type { Course, CourseCode } from "../../../../../../../types/course.types";
import type { CheckReturnType, ErrorCourseCodeType } from "./validityReturnTypes";

export default function checkPrerequisites(course: Course, checkedCourses: Set<CourseCode>): CheckReturnType {
    //This function is a recursive function used to decompose the complex prerequisite object
    function checkPrerequisitesHelper(key: "or" | "and", prerequisites: Array<CourseCode | VagueDegreeRequirements>): CheckReturnType {
        /*  
            This variable will be used to check if the prerequisite condition has been satisfied
            If key is "and" then we need to show the existence of one unsatisfactory index
            If key is "or" we need to prove the existence of one satisfactory index
            Therefore satisfied initialized to "true" if "and", "or" if false
        */
        
        let satisfied = (key === "and");
        let errorsOnLevel: ErrorCourseCodeType = {
            description: "",
            errorCourseCodes: []
        };
        
        for(let i = 0; i < prerequisites.length; i++) {
            const courseData = prerequisites[i]

            //If the courseData is a string, then it is a courseCode
            if(typeof courseData === "string") {
                if(key === "or" && checkedCourses.has(courseData)) {
                    satisfied = true;
                }
                else if(!checkedCourses.has(courseData)) {
                    if(key === "and") {
                        satisfied = false;
                    }
                    errorsOnLevel.errorCourseCodes.push(courseData);
                }
            }
            //It is a complex object made of vague requirements
            else {
                const [nextKey, value] = Object.entries(courseData)[0]
                const result = checkPrerequisitesHelper(nextKey as "or" | "and", value)
                if(key === "or" && result.satisfied === true)
                    satisfied = true;
                else if(!result.satisfied) {
                    if(key === "and") {
                        satisfied = false;
                    }
                       
                    let errorMessageGroup = "";
                    if(typeof value !== "string") {
                        for(let i = 0; i < value.length; i++) {
                            errorMessageGroup += value[i];
                            if(i !== value.length - 1) 
                                errorMessageGroup += ` ${key} `;
                        }
                    }
                    const NewMessageGroup = (
                        <>
                            {errorMessageGroup}
                            <ul>
                                {result.errorMessagesJSX}
                            </ul>
                        </>
                    )
                    errorsOnLevel.errorCourseCodes.push(NewMessageGroup)
                }
            }
        }
        if(!satisfied) {
            if(key === "or") {
                errorsOnLevel.description = "Requires at least one of the following courses/group of courses:"
            }
            else if(key === "and"){
                errorsOnLevel.description = "Missing the following courses/group of courses:";
            }
            
            const NewErrorElement = (
                <li>
                    <h6>{errorsOnLevel.description}</h6>
                    <ul>
                    {
                        errorsOnLevel.errorCourseCodes.map( (error, i) => {
                            return <li key={i}>{error}</li>
                        })
                    }
                    </ul>
                </li>
            )

            return {
                satisfied: satisfied,
                errorMessagesJSX: NewErrorElement
            };
        }
        else {
            return {
                satisfied: satisfied
            }
        }
        
    }
    //The course is empty or doesn't have prerequisites
    if(course === null || !course.prerequisites)
        return {
            satisfied: true
        };
    
    //If the course has one prerequisite, it is labelled as a string
    if(typeof course.prerequisites === "string" )
    {
        if(checkedCourses.has(course.prerequisites))
            return {
                satisfied: true
            };
        else {
            return {
                
                satisfied: false,
                errorMessagesJSX: (
                    <li>
                        <h5>{course.code}</h5>
                        <ul>
                            <li><h6>Missing {course.prerequisites}</h6></li>
                        </ul>
                        
                    </li>
                )
            }
        }
    }

    //Otherwise we have a complex prerequisite object which is vague which has ANDs or ORS
    else {
        //The object only has one property ("and" or "or")
        const [key, value] = Object.entries(course.prerequisites)[0];
        const result = checkPrerequisitesHelper(key as "or" | "and", value);
        if(!result.satisfied) {
            result.errorMessagesJSX = (
                <li>
                    <h5>{course.code}</h5>
                    <ul>
                        {result.errorMessagesJSX}
                    </ul>
                </li>
            )
        }
        return {
            ...result
        }
    }
}