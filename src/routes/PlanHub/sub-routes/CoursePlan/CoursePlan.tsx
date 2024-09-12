import { useState } from "react";
import { useStyles } from "./styles/coursePlan.classNames";
import SemesterScheduleContainer from "./components/SemesterScheduleContainer";
import AnalyzeDialog from "./components/AnalyzeDialog";
import type { CourseSemester } from "../../types/Degree.types";

export default function CoursePlan() {
    const classes = useStyles();
    const [semestersInfo, setSemestersInfo] = useState<CourseSemester[]>([
        {
            year: 2024,
            maxCredits: 18,
            semesterNumber: 1,
            courseList: []
        },
        {
            year: 2025,
            maxCredits: 18,
            semesterNumber: 1,
            courseList: []
        }
    ]);
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