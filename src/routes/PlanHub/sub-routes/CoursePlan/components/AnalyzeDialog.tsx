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
    errorMessages: string
}
type CheckPrerequisiteReturnType = SuccesfulPrerequisiteReturnType | UnsuccessfulPrerequisteReturnType
export default function AnalyzeDialog() {
    const classes = useStyles();
    const { semestersInfo } = useSemestersInfo();
    const { completedCourses } = useCompletedCourses();
    const [errors, setErrors] = useState<string>("");
    function handleAnalysis() {
        const checkedCourses = new Set();
        let overallErrorMessages: string[] = []
        
        function checkPrerequisites(course: Course): CheckPrerequisiteReturnType {
            //This function is a recursive function used to decompose the complex prerequisite object
            function checkPrerequisitesHelper(key: "or" | "and", prerequisites: Array<CourseCode | VagueDegreeRequirements>): CheckPrerequisiteReturnType {
                /*  
                    This variable will be used to check if the prerequisite condition has been satisfied
                    If key is "and" then we need to show the existence of one unsatisfactory index
                    If key is "or" we need to prove the existence of one satisfactory index
                    Therefore satisfied initialized to "true" if "and", "or" if false
                */
                let satisfied = (key === "and");
                let errorCourseCodes: string[] = []
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
                            errorCourseCodes.push(courseData);
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
                               
                            let resultErrorMessageWithCourseGroup = "";
                            if(typeof value !== "string") {
                                for(let i = 0; i < value.length; i++) {
                                    resultErrorMessageWithCourseGroup += value[i];
                                    if(i !== value.length - 1) 
                                        resultErrorMessageWithCourseGroup += ` ${key} `;
                                }
                            }
                            
                            resultErrorMessageWithCourseGroup += `<ul>${result.errorMessages}</ul>`
                            errorCourseCodes.push(resultErrorMessageWithCourseGroup)
                        }
                    }
                }
                if(!satisfied) {
                    let errorMessage = "";
                    if(key === "or") {
                        errorMessage = "Requires at least one of the following courses/group of courses:"
                    }
                    else if(key === "and"){
                        errorMessage = "Missing the following courses/group of courses:\n";
                    }

                    errorMessage += "<ul>"
                    for(let i = 0; i < errorCourseCodes.length; i++) {
                        errorMessage +=  `<li>${errorCourseCodes[i]}</li>`;
                    }
                    errorMessage += "</ul>"
                    return {
                        satisfied: satisfied,
                        errorMessages: errorMessage
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
                        errorMessages:`Prerequisite Error - ${course.code}\n\tMissing ${course.prerequisites}`
                    }
                }
            }

            //Otherwise we have a complex prerequisite object which is vague which has ANDs or ORS
            else {
                //The object only has one property ("and" or "or")
                const [key, value] = Object.entries(course.prerequisites)[0];
                const result = checkPrerequisitesHelper(key as "or" | "and", value);
                if(!result.satisfied) {
                    result.errorMessages = `${course.code}<ul>${result.errorMessages}</ul>`;
                }
                return result;
            }
        }

        //Add courses completed previously
        for(let i = 0; i < completedCourses.length; i++) {
            checkedCourses.add(completedCourses[i]);
        }

        //Check the prerequisites for each course in each semester
        for(let i = 0; i < semestersInfo.length; i++) {
            for(let j = 0; j < semestersInfo[i].courseList.length; j++) {
                const curCourse = semestersInfo[i].courseList[j]
                if(curCourse) {
                    let results = checkPrerequisites(curCourse)
                    if(!results.satisfied)
                        setErrors(results.errorMessages);
                }
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