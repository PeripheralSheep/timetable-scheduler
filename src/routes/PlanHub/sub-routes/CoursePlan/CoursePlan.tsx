import { useStyles } from "./styles/coursePlan.classNames";
import SemesterScheduleContainer from "./components/SemesterScheduleContainer";
import AnalyzeDialog from "./components/AnalyzeDialog/AnalyzeDialog";
import { useSemestersInfo} from "../../PlanHub";
import { Link } from "react-router-dom";

export default function CoursePlan() {
    const classes = useStyles();
    const { semestersInfo, setSemestersInfo } = useSemestersInfo();

    return (
        <div className={classes.outerCard}>
            <h2>Make Course Plan</h2>
            <SemesterScheduleContainer semestersInfo={semestersInfo} setSemestersInfo={setSemestersInfo} />
            <div className={classes.analyzeScheduleDiv}>
                <Link to="..">Back</Link>
                <AnalyzeDialog />
            </div>
        </ div>
    )
}