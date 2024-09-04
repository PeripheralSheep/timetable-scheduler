import { useStyles } from "./styles/coursePlan.classNames";
import SemesterScheduleContainer from "./components/SemesterScheduleContainer";
export default function CoursePlan() {
    const classes = useStyles();
    return (
        <div className={classes.outerCard}>
            <h2>Make Course Plan</h2>
            <SemesterScheduleContainer />
            <div className={classes.analyzeScheduleDiv}>
                <button>Analyze Schedule</button>
            </div>
        </ div>
    )
}