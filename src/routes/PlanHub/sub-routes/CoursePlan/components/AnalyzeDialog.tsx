import { useStyles } from "../styles/analyzeDialog.classNames";
import { Dialog, DialogTrigger, DialogSurface, DialogBody, DialogTitle, DialogActions,} from "@fluentui/react-components";
import AnalyzeDialogContent from "./AnalyzeDialogContent";
import { useSemestersInfo, useCompletedCourses } from "../../../PlanHub";
import type { VagueDegreeRequirements } from "../../../../../types/degree.types";
import type { Course, CourseCode } from "../../../../../types/course.types";

export default function AnalyzeDialog() {
    const classes = useStyles();
    const { semestersInfo } = useSemestersInfo();
    const { completedCourses } = useCompletedCourses();
    
    function handleAnalysis() {
        const checkedCourses = new Set();
        let overallErrorMessages: string[] = []
        function checkPrerequisites(course: Course) {
            let errorMessages: string[] = []
            //This function is a recursive function used to decompose the complex prerequisite object
            function checkPrerequisitesHelper(key: "or" | "and", prerequisites: Array<CourseCode | VagueDegreeRequirements>) {
                /*  
                    This variable will be used to check if the prerequisite condition has been satisfied
                    If key is "and" then we need to show the existence of one unsatisfactory index
                    If key is "or" we need to prove the existence of one satisfactory index
                    Therefore satisfied initialized to "true" if "and", "or" if false
                */
                let satisfied = (key === "and");

                for(let i = 0; i < prerequisites.length; i++) {
                    const courseData = prerequisites[i]

                    //If the courseData is a string, then it is a courseCode
                    if(typeof courseData === "string") {
                        if(key === "and" && !checkedCourses.has(courseData)) {
                            satisfied = false;
                            errorMessages.push(`${course.code} ${course.name} missing prerequisite ${courseData}. Ensure it is done in a semester before the current one`)
                        }
                        else if(key === "or" && checkedCourses.has(courseData)) {
                            satisfied = true;
                        }
                    }
                    //It is a complex object made of vague requirements
                    else {
                        const [nextKey, value] = Object.entries(courseData)[0]
                        const result = checkPrerequisitesHelper(nextKey as "or" | "and", value)
                        if(key === "and" && !result) {
                            satisfied = false;
                        }
                        else if(key === "or" && result) {
                            satisfied = true;
                        }
                    }
                }
                // if(key === "or" && !satisfied)
                //     errorMessages.push(`${course.code} ${course.name} does not have any prerequisites satisfied from the list ${prerequisites}`)
                return satisfied;
            }
            //The course is empty or doesn't have prerequisites
            if(course === null || !course.prerequisites)
                return true;
            
            //If the course has one prerequisite, it is labelled as a string
            if(typeof course.prerequisites === "string" )
            {
                return checkedCourses.has(course.prerequisites);
            }

            //Otherwise we have a complex prerequisite object which is vague which has ANDs or ORS
            else {
                //The object only has one property ("and" or "or")
                const [key, value] = Object.entries(course.prerequisites)[0];
                const valid = checkPrerequisitesHelper(key as "or" | "and", value);
                if(key === "and" && !valid) {}
                return valid;
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
                    checkPrerequisites(curCourse)
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

        // console.log(errorMessages)
    }

    return (
        <Dialog>
            <DialogTrigger>
                <button onClick={handleAnalysis}>Analyze Schedule</button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody className={classes.outerCard}>
                    <DialogTitle>Schedule Analysis</DialogTitle>
                    <AnalyzeDialogContent />
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