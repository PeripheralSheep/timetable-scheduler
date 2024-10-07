import type { CourseCode } from "../../../../../../../types/course.types";
import type { OverallDegreeRequirements, VagueDegreeRequirements } from "../../../../../../../types/degree.types";
import type { CheckReturnType, ErrorCourseCodeType } from "./validityReturnTypes";

export default function checkDegreeSatisfied(
    checkedCourses: Set<CourseCode>,
    degreeRequirements: OverallDegreeRequirements
): CheckReturnType {
    function checkDegreeRequirementsHelper(key: "or" | "and" | "minimum" | "maximum", requirements: Array<CourseCode | VagueDegreeRequirements>): CheckReturnType {
        /*  
            This variable will be used to check if the prerequisite condition has been satisfied
            If key is "and" then we need to show the existence of one unsatisfactory index
            If key is "or" we need to prove the existence of one satisfactory index
            Therefore satisfied initialized to "true" if "and", "or" if false
        */
        if(key === "minimum" || key === "maximum") {
            console.log(key, "here")
            return {
                satisfied: true
            }
        }
        let satisfied = (key === "and");
        let errorsOnLevel: ErrorCourseCodeType = {
            description: "",
            errorCourseCodes: []
        };
        
        for(let i = 0; i < requirements.length; i++) {
            const courseData = requirements[i]

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
                const result = checkDegreeRequirementsHelper(nextKey as "or" | "and" | "minimum" | "maximum", value)
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

    
    const result = checkDegreeRequirementsHelper("and", degreeRequirements["and"])
    if(!result.satisfied) {
        result.errorMessagesJSX = (
            <ul>
                {result.errorMessagesJSX}
            </ul>
        )
    }
    return {
        ...result
    }
}