import { useStyles } from "./styles/coursePlan.classNames";
import SemesterScheduleContainer from "./components/SemesterScheduleContainer";
import AnalyzeDialog from "./components/AnalyzeDialog";
import { useSemestersInfo} from "../../PlanHub";
export default function CoursePlan() {
    const classes = useStyles();
    const { semestersInfo, setSemestersInfo } = useSemestersInfo();

    return (
        <div className={classes.outerCard}>
            <h2>Make Course Plan</h2>
            <SemesterScheduleContainer semestersInfo={semestersInfo} setSemestersInfo={setSemestersInfo} />
            <div className={classes.analyzeScheduleDiv}>
                <AnalyzeDialog />
            </div>
        </ div>
    )
}