import { useState } from 'react'
import { useStyles } from "../styles/analyzeDialog.classNames";
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogActions,} from "@fluentui/react-components";
import AnalyzeDialogContent from "./AnalyzeDialogContent";
import { useSemestersInfo, useCompletedCourses } from "../../../PlanHub";
import type { VagueDegreeRequirements } from "../../../../../types/degree.types";
import type { Course, CourseCode } from "../../../../../types/course.types";

type SuccesfulPrerequisiteReturnType = {
    satisfied: true,
}

type UnsuccessfulPrerequisteReturnType = {
    satisfied: false,
    errorMessagesJSX: JSX.Element;
}

type ErrorCourseCodeType = {
    description: string,
    errorCourseCodes: (string | JSX.Element)[];
}

type CheckPrerequisiteHelperReturnType = SuccesfulPrerequisiteReturnType | UnsuccessfulPrerequisteReturnType

export interface SemesterErrors  {
    semesterKey: string,
    errorsInSemester: SpecificErrorType[]
}

type SpecificErrorType = {
    area: "Prerequisite" | "Corequisite" | "Antirequisite",
    errors: JSX.Element[]
}

export default function AnalyzeDialog() {
    const classes = useStyles();
    const { semestersInfo } = useSemestersInfo();
    const { completedCourses } = useCompletedCourses();
    const [errors, setErrors] = useState<SemesterErrors[]>([]);
    function handleAnalysis() {
        const checkedCourses = new Set();   
        function checkPrerequisites(course: Course) {
            //This function is a recursive function used to decompose the complex prerequisite object
            function checkPrerequisitesHelper(key: "or" | "and", prerequisites: Array<CourseCode | VagueDegreeRequirements>): CheckPrerequisiteHelperReturnType {
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
                            <>
                                <h5>{course.code}</h5>
                                <ul>
                                    <li><h6>Missing {course.prerequisites}</h6></li>
                                </ul>
                                
                            </>
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
                        <>
                            <h5>{course.code}</h5>
                            <ul>
                                {result.errorMessagesJSX}
                            </ul>
                        </>
                    )
                }
                return {
                    courseCode : course.code,
                    ...result
                }
            }
        }

        const errorsGenerated: SemesterErrors[] = []
        //Add courses completed previously
        for(let i = 0; i < completedCourses.length; i++) {
            checkedCourses.add(completedCourses[i]);
        }

        //Check the prerequisites for each course in each semester
        for(let i = 0; i < semestersInfo.length; i++) {
            const semesterErrorList: SemesterErrors = {
                semesterKey: `${semestersInfo[i].semesterNumber} ${semestersInfo[i].year} - ${semestersInfo[i].year+1}`,
                errorsInSemester: []
            }

            let semesterPrereqErrors: SpecificErrorType = {
                area: "Prerequisite",
                errors: []
            }

            for(let j = 0; j < semestersInfo[i].courseList.length; j++) {
                const curCourse = semestersInfo[i].courseList[j]
                if(curCourse) {
                    let results = checkPrerequisites(curCourse)
                    if(!results.satisfied && results.errorMessagesJSX) {
                        semesterPrereqErrors.errors.push(results.errorMessagesJSX)
                    }
                }
            }

            if(semesterPrereqErrors.errors.length > 0) {
                semesterErrorList.errorsInSemester.push(semesterPrereqErrors)
            }
            
            if(semesterErrorList.errorsInSemester.length > 0) {
                errorsGenerated.push(semesterErrorList)
            }
            
            /*
                After we check all the courses in a semester, we add them to checkedCourses
                We do this for two reasons:
                1. The courses in earlier semesters will be done before courses in later semesters assuming
                    the student passes
                2. If the prequisite for a course is done in the same semester as the course, this isn't allowed
                    so we can't add it as we check it or else we might get that the prerequisite requirement has been
                    satisfied
            */
            for(let j = 0; j < semestersInfo[i].courseList.length; j++) {
                const curCourse = semestersInfo[i].courseList[j]
                if(curCourse) {
                    checkedCourses.add(curCourse.code);
                }
            }
        }
        setErrors(errorsGenerated);
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button onClick={handleAnalysis}>Analyze Schedule</button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody className={classes.outerCard}>
                    <DialogTitle>Schedule Analysis</DialogTitle>
                    <AnalyzeDialogContent errors={errors}/>
                    <DialogActions>
                        <DialogTrigger>
                            <button>Close</button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}