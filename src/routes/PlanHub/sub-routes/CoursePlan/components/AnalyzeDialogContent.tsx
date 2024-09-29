import { DialogContent } from "@fluentui/react-components"
import { useStyles } from "../styles/analyzeDialog.classNames";
import type { SemesterErrors } from "./AnalyzeDialog";
export default function AnalyzeDialogContent({errors} : {errors?: SemesterErrors[]}) {
    const classes = useStyles()

    if(errors && errors.length > 0)
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
                    {errors?.map((semesterError) => {
                        return (
                            <>
                                <h3>Semester {semesterError.semesterKey}</h3>
                                <ul className={classes.failList}>
                                    {semesterError.errorsInSemester.map((errorInSemester) => {
                                        return (
                                            <li key={errorInSemester.area}>
                                                <h4>{errorInSemester.area} Errors</h4>
                                                {errorInSemester.errors}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </>
                        )
                    })}
                </div>
            </DialogContent>
        )
    else 
        return (
            <h2>All Good To Go!</h2>
        )
}