import { DialogContent } from "@fluentui/react-components"
import { useStyles } from "../styles/analyzeDialog.classNames";

export default function AnalyzeDialogContent({errors} : {errors: string}) {
    const classes = useStyles()
    return (
        <DialogContent>
            <div className={classes.passFailCards}>
                <h2>Passed</h2>
                <ul className={classes.passList}>
                    <li>Credit Requirement Passed</li>
                    <li>All Mandatory Courses Taken</li>
                    <li>Elective Requirement Satisfied</li>
                </ul>
            </div>
            <div className={classes.passFailCards}>
                <h2>Failed</h2>
                <h3>General</h3>
                <ul className={classes.failList}>
                    <li>
                        <h4>Prerequisite Errors</h4>
                        <ul>
                            <li dangerouslySetInnerHTML={{__html: errors}}></li>
                        </ul>
                    </li>
                </ul>
                
            </div>
            <div className={classes.passFailCards}>
                <h2>Failed</h2>
                <h3>General</h3>
                <ul className={classes.failList}>
                    <li>
                        <h4>Courses Missing</h4>
                        <ul>
                            <li>Course Code Course Name</li>
                        </ul>
                    </li>
                </ul>
                <h3>Semester x 20xx-20xx</h3>
                <ul className={classes.failList}>
                    <li>
                        <h4>Insufficient Credits</h4>
                        <ul>
                            <li>By the time you reach this Semester,
                            you will have xx credits, this is not enough to do
                            Courses xx </li>
                        </ul>
                    </li>
                    <li>
                        <h4>Prerequisite Errors</h4>
                        <ul>
                            <li>Course is missing prerequisite xx</li>
                        </ul>
                    </li>
                    <li>
                        <h4>Corequisite Errors</h4>
                        <ul>
                            <li>Course must be done at the same time
                            as xx unless passed</li>
                        </ul>
                    </li>
                    <li>
                        <h4>Antirequisite Errors</h4>
                        <ul>
                            <li>Course xx is an antirequisite and is
                            done in an earlier semester</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </DialogContent>
    )
}