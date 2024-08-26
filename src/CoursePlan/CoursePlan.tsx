import { useStyles } from "./styles/coursePlan.classNames";
import { Delete32Regular } from "@fluentui/react-icons";
export default function CoursePlan() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <h2>Make Course Plan</h2>
            <div className={classes.semesterScheduleContainer}>
                <button className={classes.addNewSemesterButton}>+ Add New Semester</button>
                <div className={classes.semesterScheduleCard}>
                    <div className={classes.semesterScheduleHeader}>
                        <span>x Credits</span>
                        <h2 className={classes.semesterTitle}><span>Semester X</span><span>20xx-20xx</span></h2>
                        <Delete32Regular />
                    </div>
                    <div className={classes.courseSelection}>
                        <select name="" id="">
                            <option value="">CourseCourseCourseCourseCourseCourseCourseCourse</option>
                        </select>
                        <button>x</button>
                    </div>
                    <div className={classes.courseSelection}>
                        <select name="" id="">
                            <option value="">Course</option>
                        </select>
                        <button>x</button>
                    </div>
                    <button>+ Add New Course</button>
                </div>
                <button>+</button>
                <div className={classes.semesterScheduleCard}>
                    <div className={classes.semesterScheduleHeader}>
                        <span>x Credits</span>
                        <h2 className={classes.semesterTitle}><span>Semester X</span><span>20xx-20xx</span></h2>
                        <Delete32Regular />
                    </div>
                    <button>+ Add New Course</button>
                </div>
                <button className={classes.addNewSemesterButton}>+ Add New Semester</button>
            </div>
            
            <div className={classes.analyzeScheduleDiv}>
                <button>Analyze Schedule</button>
            </div>
        </ div>
    )
}