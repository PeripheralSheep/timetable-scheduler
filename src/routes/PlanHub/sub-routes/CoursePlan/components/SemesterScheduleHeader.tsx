import { Delete32Regular } from "@fluentui/react-icons";
import { useStyles } from "../styles/coursePlan.classNames";
import type { CourseSemester } from "../../CompletedCourses/types/Degree.types";
export default function SemesterScheduleHeader({credits, semesterInfo} : {credits: number, semesterInfo: CourseSemester}) {
    const classes = useStyles();
    return(
        <div className={classes.semesterScheduleHeader}>
            <span>{credits}/{semesterInfo.maxCredits} Credits</span>
            <h2 className={classes.semesterTitle}><span>Semester {semesterInfo.semesterNumber}</span><span>{semesterInfo.year} - {semesterInfo.year+1}</span></h2>
            <Delete32Regular />
        </div>
    )
}