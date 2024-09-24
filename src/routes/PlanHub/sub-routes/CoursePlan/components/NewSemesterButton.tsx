import Button from "./Button";
import { useStyles } from "../styles/coursePlan.classNames";
import type { CourseSemester } from "../../../../../types/course.types.ts"
import { DispatcherType } from "../../../types/StateProps.types";
export default function NewSemesterButton({setSemestersInfo, newSemesterContext, associatedSemesterIndex, initialSemester} : {
    setSemestersInfo: DispatcherType<CourseSemester[]>, 
    newSemesterContext: "above" | "below", 
    associatedSemesterIndex?: number, 
    initialSemester: {year: number, 
    semesterNumber: 1 | 2}
}) {
    const classes = useStyles();
    const addSemester = () => {
        setSemestersInfo((semesters) => {
            if(associatedSemesterIndex !== undefined){
                const semesterInfo = semesters[associatedSemesterIndex];
                if(newSemesterContext === "above") {
                    return [
                        ...(semesters.slice(0, associatedSemesterIndex)),
                        semesterInfo.semesterNumber === 1 ? {
                            year: semesterInfo.year - 1,
                            semesterNumber: 2,
                            maxCredits: 18,
                            courseList: []
                        } : {
                            year: semesterInfo.year,
                            semesterNumber: 1,
                            maxCredits: 18,
                            courseList: []
                        },
                        ...(semesters.slice(associatedSemesterIndex)),
                    ]
                }
                else if(newSemesterContext === "below"){
                    return [
                        ...(semesters.slice(0, associatedSemesterIndex+1)),
                        semesterInfo.semesterNumber === 1 ? {
                            year: semesterInfo.year,
                            semesterNumber: 2,
                            maxCredits: 18,
                            courseList: []
                        } : {
                            year: semesterInfo.year + 1,
                            semesterNumber: 1,
                            maxCredits: 18,
                            courseList: []
                        },
                        ...(semesters.slice(associatedSemesterIndex+1)),
                    ]
                }
                else {
                    return [];
                }
            }
            else {
                return ([{
                    year: initialSemester.year,
                    semesterNumber: initialSemester.semesterNumber,
                    maxCredits: 18,
                    courseList: []
                }])
            }
            
        })
       
    }
    return(
        <Button 
            HTMLButtonAttributes={{onClick: addSemester}} 
            contextClass={classes.addNewSemesterButton}>
                + Add New Semester
        </Button>
    )
}