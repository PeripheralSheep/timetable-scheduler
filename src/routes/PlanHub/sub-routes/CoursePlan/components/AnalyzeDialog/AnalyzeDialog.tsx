import { useState } from 'react'
import { useStyles } from "../../styles/analyzeDialog.classNames";
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogActions,} from "@fluentui/react-components";
import AnalyzeDialogContent from "./AnalyzeDialogContent";
import { useSemestersInfo, useCompletedCourses } from "../../../../PlanHub";
import type { CourseCode } from '../../../../../../types/course.types';
import checkPrerequisites from "./utility/checkPrerequisites"
import checkAntirequisites from './utility/checkAntirequisites';
import checkCorequisites from './utility/checkCorequisites';

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
        //Add courses completed previously to checkedCourses
        const checkedCourses = new Set<CourseCode>(completedCourses);   
        const errorsGenerated: SemesterErrors[] = []
        

        //Check the prerequisites for each course in each semester
        for(let i = 0; i < semestersInfo.length; i++) {
            
            const semesterCourseCodes = new Set(semestersInfo[i].courseList.map((course) => course?.code).filter(courseCode => courseCode));
            const semesterErrorList: SemesterErrors = {
                semesterKey: `${semestersInfo[i].semesterNumber} ${semestersInfo[i].year} - ${semestersInfo[i].year+1}`,
                errorsInSemester: []
            }

            const semesterPrereqErrors: SpecificErrorType = {
                area: "Prerequisite",
                errors: []
            }

            const semesterAntireqErrors: SpecificErrorType = {
                area: "Antirequisite",
                errors: []
            }

            const semesterCoreqErrors: SpecificErrorType = {
                area: "Corequisite",
                errors: []
            }

            for(let j = 0; j < semestersInfo[i].courseList.length; j++) {
                const curCourse = semestersInfo[i].courseList[j]
                if(curCourse) {
                    const prereqResults = checkPrerequisites(curCourse, checkedCourses)
                    const antireqResults = checkAntirequisites(curCourse, checkedCourses, semesterCourseCodes)
                    const coreqResults = checkCorequisites(curCourse, completedCourses, semesterCourseCodes)
                    if(!prereqResults.satisfied && prereqResults.errorMessagesJSX) {
                        semesterPrereqErrors.errors.push(prereqResults.errorMessagesJSX)
                    }
                    
                    if(!antireqResults.satisfied && antireqResults.errorMessagesJSX) {
                        semesterAntireqErrors.errors.push(antireqResults.errorMessagesJSX)
                    }

                    if(!coreqResults.satisfied && coreqResults.errorMessagesJSX) {
                        semesterCoreqErrors.errors.push(coreqResults.errorMessagesJSX)
                    }
                }
            }

            if(semesterPrereqErrors.errors.length > 0) {
                semesterErrorList.errorsInSemester.push(semesterPrereqErrors)
            }
            if(semesterAntireqErrors.errors.length > 0) {
                semesterErrorList.errorsInSemester.push(semesterAntireqErrors);
            }
            if(semesterCoreqErrors.errors.length > 0) {
                semesterErrorList.errorsInSemester.push(semesterCoreqErrors);
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