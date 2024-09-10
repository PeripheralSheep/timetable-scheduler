import { Delete32Regular } from "@fluentui/react-icons";
import { useStyles } from "../styles/coursePlan.classNames";
import type { CourseSemester } from "../../CompletedCourses/types/Degree.types";
export default function SemesterScheduleHeader({credits, semesterInfo, setSemesters} : {
    credits: number, 
    semesterInfo: CourseSemester, 
    setSemesters: React.Dispatch<React.SetStateAction<CourseSemester[]>>
}) {
    const classes = useStyles();
    const deleteSemester = () => {
        setSemesters((curSemesters) => curSemesters.filter((semester) => (
            !(semester.year === semesterInfo.year && 
                semester.semesterNumber === semesterInfo.semesterNumber)
        )))
    }
    return(
        <div className={classes.semesterScheduleHeader}>
            <span>{credits}/{semesterInfo.maxCredits} Credits</span>
            <h2 className={classes.semesterTitle}>
                <span>Semester {semesterInfo.semesterNumber}</span>
                <span>{semesterInfo.year} - {semesterInfo.year+1}</span>
            </h2>
            <Delete32Regular onClick={deleteSemester} />
        </div>
    )
}