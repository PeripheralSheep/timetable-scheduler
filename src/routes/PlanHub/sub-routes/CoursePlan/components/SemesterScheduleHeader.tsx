import { Delete32Regular } from "@fluentui/react-icons";
import { useStyles } from "../styles/coursePlan.classNames";
import type { CourseSemester } from "../../../../../types/course.types.ts"
import type { DispatcherType } from "../../../types/StateProps.types";


export default function SemesterScheduleHeader({credits, semesterInfo, setSemesters} : {
    credits: number, 
    semesterInfo: CourseSemester, 
    setSemesters: DispatcherType<CourseSemester[]>
}) {
    const classes = useStyles();
    const { maxCredits, semesterNumber, year } = semesterInfo;
    const academicYearString = `${year} - ${year+1}`
    const creditsString = `${credits}/${maxCredits} Credits`

    const deleteSemester = () => {
        setSemesters((curSemesters) => curSemesters.filter((semester) => (
            !(semester.year === semesterInfo.year && 
                semester.semesterNumber === semesterInfo.semesterNumber)
        )))
    }
    
    return(
        <div className={classes.semesterScheduleHeader}>
            <span>{creditsString}</span>
            <h2 className={classes.semesterTitle}>
                <span>Semester {semesterNumber}</span>
                <span>{academicYearString}</span>
            </h2>
            <Delete32Regular onClick={deleteSemester} />
        </div>
    )
}